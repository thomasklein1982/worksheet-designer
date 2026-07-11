export default function adaptHtmlCode(code,tree){
  try{
    let nodes=[];
    tree.cursor().iterate((cursor)=>{
      if(cursor.name!=="TagName") return;
      let node=cursor.node;
      let openTag=node.parent;
      if(openTag.name!=="OpenTag") return;
      let tag=openTag.parent;
      let closeTag=tag.lastChild;
      if(closeTag.name!=="CloseTag") closeTag=null;
      let name=code.substring(cursor.from,cursor.to);
      console.log(name);
      if(name in SpecialTags){
        let tagCode=code.substring(tag.from,tag.to);
        let {open,close}=SpecialTags[name].getCode(tag,tagCode)
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
    let newCode="";//code.substring(0,node.from)+node.code;
    for(let i=0;i<nodes.length;i++){
      let node=nodes[i];
      newCode+=code.substring(start,node.from)+node.code;
      start=node.to;
    }
    newCode+=code.substring(start);
    console.log(newCode);
    return newCode;
  }catch(e){
  return code;
}
}

const scale=10;

let SpecialTags={
  "kreis": {
    getCode: (node,nodeCode)=>{
      let propList={
        "x": {
          type: Number,
          default: 0
        },
        "y": {
          type: Number,
          default: 0
        },
        "r": {
          type: Number,
          default: 1
        }
      };
      let {props,pt}=getPropsPT(node,nodeCode,propList);
      let x=props.x; let y=props.y; let r=props.r;
      let open=`<circle x="${x}" y="${y}" radius="${r}">`;
      let close="</circle>";
      return {open,close};
    }
  },
  "ab-grafik": {
    getCode: (node,nodeCode)=>{
      let propList={
        "min-x": {
          type: Number,
          default: 0
        },
        "max-x": {
          type: Number,
          default: 10
        },
        "min-y": {
          type: Number,
          default: 0
        },
        "max-y": {
          type: Number,
          default: 10
        },
        "style": {
          type: String,
          default: ""
        },
        "zoom-x": {
          type: Number,
          default: 1
        },
        "zoom-y": {
          type: Number,
          default: 1
        }
      };
      let {props,pt}=getPropsPT(node,nodeCode,propList);
      console.log(props);
      console.log(pt);
      let minX=props["min-x"];
      let maxX=props["max-x"];
      let minY=props["min-y"];
      let maxY=props["max-y"];
      let zoomX=props["zoom-x"];
      let zoomY=props["zoom-y"];
      let sizeX=maxX-minX;
      let sizeY=maxY-minY;
      let width=sizeX*zoomX;
      let height=sizeY*zoomY;
      let viewBox="0 0 "+width*scale+" "+height*scale;
      let transformation="matrix("+(scale)+",0,0,"+(-scale)+","+(-minX*scale)+","+(maxY*scale)+")";
      let code=`<div style="display: inline-block; position:relative; width: ${width}; height: ${height};${props.style}" ${pt}><svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" preserveAspectRatio="none" style="width: 100%; height: 100%; overflow: hidden;" viewBox="${viewBox}">
    <defs>
      <filter x="0" y="0" width="1" height="1" id="white0.5">
        <feFlood flood-color="white" flood-opacity="0.5" result="bg" />
        <feMerge>
          <feMergeNode in="bg"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
    </defs>
    <g :transform="${transformation}">
      `;
      return {
        open: code,
        close: "</g></svg>"
      };
    }
  }
};

function getPropsPT(elementNode,elementCode,props){
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
        if(!v) v=p.default; else v=undefined;
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
    n=n.nextSibling;
    if(n.name==="UnquotedAttributeValue"){
      value=src.substring(n.from-offset,n.to-offset);
    }else if(n.name==="AttributeValue"){
      value=src.substring(n.from+1-offset,n.to-1-offset);
    }
    attrs[name]=value;
    
    node=node.nextSibling;
  }
  console.log("attrs",attrs);
  return attrs;
}