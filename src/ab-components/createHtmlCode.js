import arbeitsblatt from "./arbeitsblatt";

export default function createHtmlCode(code,tree){
  let newCode="";
  let scope={
    layers: [],
    interpolates: []
  };
  try{
    let node=tree.topNode;
    newCode=parseNode(code,node,scope);
  }catch(e){
    console.log(e);
    newCode=code;
  }
  console.log(newCode);
  newCode+=`<script>
  function renderKatexFormula(el){
    let f=el.textContent;
    try{
      katex.render(f, el);
    }catch(e){
      el.textContent="Fehler in Formel '"+f+"': "+e;
    }
  }
  function replaceInterpolate(index,code){
    try{
      eval("window.value="+JSON.stringify(code));
    }catch(e){
      window.value="Interpolationsfehler "+code;
    }
    let el=document.getElementById("interpolate-"+index);
    el.innerHTML=window.value;
  }`
  for(let i=0;i<scope.interpolates.length;i++){
    newCode+=`replaceInterpolate(${i},${scope.interpolates[i]});`;
  }
  newCode+=`setTimeout(()=>{
    let formulas=document.getElementsByTagName("formel");
    for(let i=0;i<formulas.length;i++){
      renderKatexFormula(formulas[i]);
    }
  },0);
  `;
  newCode+=`</script>`;
  return newCode;
}


function parseNode(code,node,scope){
  let newCode="";
  if(node.name==="Element"){
    let tag=node;
    let openTag=tag.firstChild;
    let nameTag=openTag.firstChild.nextSibling;
    let closeTag=null;
    if(openTag.name==="OpenTag"){
      closeTag=tag.lastChild;
      if(closeTag.name!=="CloseTag") closeTag=null;
    }else if(openTag.name==="SelfClosingTag"){

    }else{
      throw "Seltsamer Tag?!?";
    }
    let name=code.substring(nameTag.from,nameTag.to).toLowerCase();
    console.log(name);
    let openTagCode="",closeTagCode="";
    let goOn=true;
    if(name==="script" || name==="style"){
      let tagCode=code.substring(tag.from,tag.to);
      newCode+=tagCode;
      goOn=false;
    }else if(name in SpecialTags){
      let tagCode=code.substring(tag.from,tag.to);
      scope.push({});
      let {open,close}=SpecialTags[name].createFromHtml(tag,tagCode,scope);
      
      nodes.push({
        name: name,
        from: openTag.from,
        to: openTag.to,
        code: open
      });
      if(closeTag){
        nodes.push({
          name: name,
          from: closeTag.from,
          to: closeTag.to,
          code: close
        });
      }else{
        nodes.push({
          name: name,
          from: tag.to,
          to: tag.to,
          code: close
        });
      }
    }else{
      openTagCode=code.substring(openTag.from,openTag.to);
      if(closeTag){
        closeTagCode=code.substring(closeTag.from,closeTag.to);
      }
    }
    if(goOn){
      newCode+=openTagCode;
      let child=openTag.nextSibling;
      while(child && child!==closeTag){
        newCode+=parseNode(code,child,scope);
        child=child.nextSibling;
      }
      newCode+=closeTagCode;
    }
  }else if(node.name==="Text"){
    let t=interpolateText(code.substring(node.from,node.to),scope);
    newCode+=t;
  }else{
    let child=node.firstChild;
    while(child){
      newCode+=parseNode(code,child,scope);
      child=child.nextSibling;
    }
    
  }
  return newCode;
}

function interpolateText(text,scope){
  let open="{{";
  let close="}}";
  let start=-1;
  let end=-1;
  let newText="";
  let index=0;
  while(true){
    start=text.indexOf(open,start+1);
    while(text.charAt(start+2)==="{") start++;
    if(start<0) break;
    end=text.indexOf(close,start+1);
    if(end<0) break;
    let it=text.substring(start+2,end);
    newText+=text.substring(index,start)+"<span id='interpolate-"+scope.interpolates.length+"'></span>";
    index=end+2;
    scope.interpolates.push(it);
  }
  newText+=text.substring(index);
  return newText;
}

export function adaptHtmlCode(code,tree){
  let newCode="";
  let scope=[];
  try{
    let nodes=[];
    tree.cursor().iterate((cursor)=>{
      if(cursor.name!=="TagName") return;
      let node=cursor.node;
      let openTag=node.parent;
      let closeTag=null;
      let tag=openTag.parent;
      if(openTag.name==="OpenTag"){
        closeTag=tag.lastChild;
        if(closeTag.name!=="CloseTag") closeTag=null;
      }else if(openTag.name==="SelfClosingTag"){

      }else return;
      let tagCode=code.substring(tag.from,tag.to);
      let name=code.substring(cursor.from,cursor.to);
      console.log(name);
      if(name in SpecialTags){
        let tagCode=code.substring(tag.from,tag.to);
        scope.push({});
        let {open,close}=SpecialTags[name].createFromHtml(tag,tagCode,scope);

        nodes.push({
          name: name,
          from: openTag.from,
          to: openTag.to,
          code: open
        });
        if(closeTag){
          nodes.push({
            name: name,
            from: closeTag.from,
            to: closeTag.to,
            code: close
          });
        }else{
          nodes.push({
            name: name,
            from: tag.to,
            to: tag.to,
            code: close
          });
        }
      }
    });
    nodes.sort((a,b)=>{
      return a.from-b.from;
    });
    console.log(nodes);
    //replace the code:
    if(nodes.length===0) return code;
    
    let start=0;
    
    for(let i=0;i<nodes.length;i++){
      let node=nodes[i];
      newCode+=code.substring(start,node.from)+node.code;
      start=node.to;
    }
    newCode+=code.substring(start);
    console.log(newCode);
    
  }catch(e){
    console.log(e);
    newCode=code;
  }
  return `<!DOCTYPE html>
<html>
  <head>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.17.0/dist/katex.min.css" integrity="sha384-vlBdW0r3AcZO/HboRPznQNowvexd3fY8qHOWkBi5q7KGgqJ+F48+DceybYmrVbmB" crossorigin="anonymous">

    <!-- The loading of KaTeX is deferred to speed up page rendering -->
    <script defer src="https://cdn.jsdelivr.net/npm/katex@0.17.0/dist/katex.min.js" integrity="sha384-AtrdNsnxl/75rvBneBVH7DtOvCxSVahR2zWqle1coBKd8DEmLoviqNeJSx64gNAs" crossorigin="anonymous"></script>

    <!-- To automatically render math in text elements, include the auto-render extension: -->
    <script defer src="https://cdn.jsdelivr.net/npm/katex@0.17.0/dist/contrib/auto-render.min.js" integrity="sha384-bjyGPfbij8/NDKJhSGZNP/khQVgtHUE5exjm4Ydllo42FwIgYsdLO2lXGmRBf5Mz" crossorigin="anonymous"
        onload="renderMathInElement(document.body);"></script>
  </head>
  <body>${newCode}</body></html>`;
}

const scale=1;

let SpecialTags={
  arbeitsblatt,
  // "achse": {
  //   getCode(node,nodeCode){
  //     let propList={
  //       "x": {
  //         type: Number,
  //         default: 0
  //       },
  //       "y": {
  //         type: Number,
  //         default: 0
  //       },
  //       "dx": {
  //         type: Number,
  //         default: 1
  //       },
  //       "dy": {
  //         type: Number,
  //         default: 0
  //       },
  //       "min": {
  //         type: Number,
  //         default: 0
  //       },
  //       "max": {
  //         type: Number,
  //         default: 10
  //       },
  //       "schritt": {
  //         type: Number,
  //         default: 1
  //       },
  //       "verbergen": {
  //         type: String,
  //         default: ""
  //       }
  //     };
  //     let {props,pt}=getPropsPT(node,nodeCode,propList);
  //     return this.createCode(props.x,props.y,props.dx,props.dy,props.min,props.max,props.schritt,props.verbergen,pt);
  //   },
  //   createCode(x,y,dx,dy,min,max,schritt,verbergen,pt){
  //     let sx=x+min*dx;
  //     let sy=y+min*dy;
  //     let ex=x+max*dx;
  //     let ey=y+max*dy;
  //     let open=`<g ${pt}><line x1="${sx}" y1="${sy}" x2="${ex}" y2="${ey}"></line>`;
  //     let close="</g>";
  //     return {open,close};
  //   }
  // },
  // "karopapier": {
  //   getCode(node,nodeCode){
  //     let propList={
  //       "x": {
  //         type: Number,
  //         default: 0
  //       },
  //       "y": {
  //         type: Number,
  //         default: 0
  //       },
  //       "breite": {
  //         type: Number,
  //         default: 1
  //       },
  //       "hoehe": {
  //         type: Number,
  //         default: 1
  //       }
  //     };
  //     let {props,pt}=getPropsPT(node,nodeCode,propList);
  //     return this.createCode(props.x,props.y,props.breite,props.hoehe,pt);
  //   },
  //   createCode(sx,sy,b,h,pt){
  //     let open="<g style='stroke: gray; stroke-width: 0.04' "+pt+" >";
  //     let x=sx;
  //     for(let i=0;i<=b*2;i++){
  //       open+=`<line x1="${x}" y1="${sy}" x2="${x}" y2="${sy+h}" />`;
  //       x+=0.5;
  //     }
  //     let y=sy;
  //     for(let i=0;i<=h*2;i++){
  //       open+=`<line x1="${sx}" y1="${y}" x2="${sx+b}" y2="${y}" />`;
  //       y+=0.5;
  //     }
  //     let close="</g>";
  //     return {open,close};
  //   }
  // },
  // "kreis": {
  //   getCode(node,nodeCode){
  //     let propList={
  //       "x": {
  //         type: Number,
  //         default: 0
  //       },
  //       "y": {
  //         type: Number,
  //         default: 0
  //       },
  //       "r": {
  //         type: Number,
  //         default: 1
  //       }
  //     };
  //     let {props,pt}=getPropsPT(node,nodeCode,propList);
  //     let x=props.x; let y=props.y; let r=props.r;
  //     return this.createCode(x,y,r,pt);
  //   },
  //   createCode(x,y,r,pt){
  //     let open=`<circle cx="${x}" cy="${y}" r="${r}" ${pt} ><script>if(!window.p) p=1; else p=p+1; console.log('kreis',${x},p);</script>`;
  //     let close="</circle>";
  //     return {open,close};
  //   }
  // },
  // "ab-grafik": {
  //   getCode: (node,nodeCode)=>{
  //     let propList={
  //       "min-x": {
  //         type: Number,
  //         default: 0
  //       },
  //       "max-x": {
  //         type: Number,
  //         default: 10
  //       },
  //       "min-y": {
  //         type: Number,
  //         default: 0
  //       },
  //       "max-y": {
  //         type: Number,
  //         default: 10
  //       },
  //       "style": {
  //         type: String,
  //         default: ""
  //       },
  //       "zoom-x": {
  //         type: Number,
  //         default: 1
  //       },
  //       "zoom-y": {
  //         type: Number,
  //         default: 1
  //       },
  //       "karopapier": {
  //         type: Boolean,
  //         default: false
  //       },
  //       "system": {
  //         type: Boolean,
  //         default: false
  //       }
  //     };
  //     let {props,pt}=getPropsPT(node,nodeCode,propList);
  //     let minX=props["min-x"];
  //     let maxX=props["max-x"];
  //     let minY=props["min-y"];
  //     let maxY=props["max-y"];
  //     let zoomX=props["zoom-x"];
  //     let zoomY=props["zoom-y"];
  //     let karopapier=props.karopapier;
  //     let system=props.system;
  //     let sizeX=maxX-minX;
  //     let sizeY=maxY-minY;
  //     let width=sizeX*zoomX;
  //     let height=sizeY*zoomY;
  //     let viewBox="0 0 "+width*scale+" "+height*scale;
  //     let transformation="matrix("+(scale)+",0,0,"+(-scale)+","+(-minX*scale)+","+(maxY*scale)+")";
  //     let code=`<div style="display: inline-block; position:relative; width: ${width}cm; height: ${height}cm;${props.style}" ${pt}><svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" preserveAspectRatio="none" style="width: 100%; height: 100%; overflow: hidden;" viewBox="${viewBox}">
  //   <defs>
  //     <filter x="0" y="0" width="1" height="1" id="white0.5">
  //       <feFlood flood-color="white" flood-opacity="0.5" result="bg" />
  //       <feMerge>
  //         <feMergeNode in="bg"/>
  //         <feMergeNode in="SourceGraphic"/>
  //       </feMerge>
  //     </filter>
  //   </defs>
  //   <g transform="${transformation}" style="stroke: black; fill: none; stroke-width: 0.06">
  //     `;
  //     if(karopapier){
  //       let k=SpecialTags.karopapier.createCode(Math.floor(minX*2)/2, Math.floor(minY*2)/2,Math.ceil(width),Math.ceil(height),"");
  //       code+=k.open+k.close;
  //     }
  //     if(system){
  //       let achse=SpecialTags.achse.createCode(0,0,1,0,minX,maxX,1,"","");
  //       code+=achse.open+achse.close;
  //       achse=SpecialTags.achse.createCode(0,0,0,1,minY,maxY,1,"","");
  //       code+=achse.open+achse.close;
  //     }
  //     return {
  //       open: code,
  //       close: "</g></svg>"
  //     };
  //   }
  // }
};

export function getPropsPT(elementNode,elementCode,props){
  let res={
    props: {},
    pt: ""
  };
  let attrs=getAttributes(elementNode,elementCode);
  for(let a in props){
    let p=props[a];
    let v=attrs[a];
    delete attrs[a];
    if(p===Number){
      if(v) v*=1;
      else v=0;
    }else if(p.type){
      if(p.type===Number){
        if(v) v*=1;
        else{
          if(p.default) v=p.default; else v=0;
        }
      }else{
        if(v===undefined) v=p.default;
      }
    }
    res.props[a]=v;
  }
  for(let a in attrs){
    let v=attrs[a];
    res.pt+=a+'='+JSON.stringify(v)+" ";
  }
  return res;
}

function getAttributes(elementNode,src){
  let attrs={};
  let offset=elementNode.from;
  let node=elementNode.firstChild.firstChild.nextSibling.nextSibling;
  while(node.name==="Attribute"){
    let name, value;
    let n=node.firstChild;
    name=src.substring(n.from-offset,n.to-offset);
    n=n.nextSibling;
    if(!n){
      value=true;
    }else{
      n=n.nextSibling;
      if(n.name==="UnquotedAttributeValue"){
        value=src.substring(n.from-offset,n.to-offset);
      }else if(n.name==="AttributeValue"){
        value=src.substring(n.from+1-offset,n.to-1-offset);
      }
    }
    attrs[name]=value;
    
    node=node.nextSibling;
  }
  console.log("attrs",attrs);
  return attrs;
}