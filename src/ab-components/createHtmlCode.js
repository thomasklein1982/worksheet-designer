import abc from "./abc";
import abstand from "./abstand";
import arbeitsblatt from "./arbeitsblatt";
import aufgabe from "./aufgabe";
import bild from "./bild";
import box from "./box";
import fusszeile from "./fusszeile";
import grafik from "./grafik";
import ifelse from "./ifelse";
import karopapier from "./karopapier";
import kopfzeile from "./kopfzeile";
import kreis from "./kreis";
import ksystem from "./ksystem";
import loop from "./loop";
import punkt from "./punkt";
import punkte from "./punkte";
import seite from "./seite";

let SpecialTags={
  arbeitsblatt, aufgabe, abc, grafik, karopapier, kreis, seite, ksystem, bild, fusszeile, box, abstand, kopfzeile, punkte, punkt, loop, "if": ifelse
};
let IgnoreTags={
  "elseif": true, "else": true
}

export default function createHtmlCode(ab,code,tree){
  let newCode=`<script>
  window.scope={
    variables: {
    }
  };
  window.$=window.scope.variables;
  </script>
  `;
  let scope={
    layers: [],
    interpolates: [],
    ab,
    variables: {
      aufgabe: 0,
      seite: 0,
      punkte: 0
    },
    endVariables: {
      aufgabe: 0,
      seite: 0,
      punkte: 0
    },
    templates: {
      "kopfzeile-links": null,
      "kopfzeile-rechts": null,
      "kopfzeile-mitte": null,
      "fusszeile-links": null,
      "fusszeile-rechts": null,
      "fusszeile-mitte": null,
    },
    code
  };
  window.$=scope.variables;
  try{
    let node=tree.topNode;
    newCode+=parseNode(code,node,scope);
  }catch(e){
    console.log(e);
    newCode=code;
  }
  // console.log(newCode);
  newCode+=`
  <script>
  scope.variables.seite=${scope.endVariables.seite};
  scope.variables.aufgabe=${scope.endVariables.aufgabe};
  scope.variables.punkte=${scope.endVariables.punkte};
  let macros={
    
  };
  function renderKatexFormula(el){
    let f=el.textContent;
    let block=el.getAttribute("block")!==null;
    try{
      katex.render(f, el, {
        macros, 
        displayMode: block
      });
    }catch(e){
      el.textContent="Fehler in Formel '"+f+"': "+e;
    }
  }
  function replaceInterpolate(index,code){
    try{
      code=replaceScopeVariables(code,scope);
      eval("window.value="+code);
    }catch(e){
      window.value="Interpolationsfehler "+code;
    }
    let el=document.getElementById("interpolate-"+index);
    if(!el) return;
    el.innerHTML=window.value;
  }`;
  //muss angepasst werden mit Funktionen unten:
  newCode+=`
function replaceScopeVariables(text,scope){
  let newText="";
  const len=text.length;
  let start=0;
  while(start<len){
    let pos=text.indexOf("#",start);
    if(pos<0) break;
    newText+=text.substring(start,pos);
    let variables;
    if(text.charAt(pos+1)==="#"){
      variables=scope.endVariables;
      pos++;
    }else{
      variables=scope.variables;
    }
    start=pos+1;
    let w=parseVariable(text,start);
    start+=w.length;
    if(!w) continue;
    if(w in variables){
      if(variables===scope.variables){
        newText+=scope.variables[w];
      }else{
        newText+="#"+w;
      }
    }else{
      newText+="#"+w;
    }
  }
  newText+=text.substring(start);
  return newText;
}

function parseVariable(text,start){
  let len=text.length;
  let w="";
  while(start<len){
    let c=text.codePointAt(start);
    if(c===95 || c>=48 && c<=57 || c>=97 && c<=122){
      w+=text.charAt(start);
    }else{
      break;
    }
    start++;
  }
  return w;
}`;

  for(let i=0;i<scope.interpolates.length;i++){
    newCode+=`replaceInterpolate(${i},"${scope.interpolates[i]}");`;
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


export function parseNode(code,node,scope,forceTemplateRendering){
  let newCode="";
  if(!node){
    return newCode;
  }
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
    let openTagCode="",closeTagCode="";
    let goOn=true;
    let extraLayerPushed=false;
    if(name==="script" || name==="style"){
      let tagCode=code.substring(tag.from,tag.to);
      goOn=false;
      if(name==="script"){
        let s=node.firstChild.nextSibling;
        let c=code.substring(s.from,s.to);
        console.log("script",c);
        c="let scope=window.scope; let $=window.$;\n"+c;
        eval(c);
        tagCode="<script>\n"+c+"\n</script>";
      }
      newCode+=tagCode;
    }else if(name in SpecialTags){
      let st=SpecialTags[name];
      let tagCode=code.substring(tag.from,tag.to);
      if(st.isTemplate && !forceTemplateRendering){
        let name=st.createFromHtml(tag,code,scope,true);
        scope.templates[name]=tag;
        goOn=false;
      }else{
        pushLayerToScope(scope, {});
        extraLayerPushed=true;
        let {open,close}=st.createFromHtml(tag,code,scope);
        openTagCode=open;
        closeTagCode=close;
      }
    }else if(name in IgnoreTags){
      return "";
    }else{
      openTagCode=code.substring(openTag.from,openTag.to);
      if(closeTag){
        closeTagCode=code.substring(closeTag.from,closeTag.to);
      }
    }
    if(goOn){
      if(openTagCode.loop){
        let index=openTagCode.index;
        let value=openTagCode.value;
        let src=openTagCode.src;
        if(Array.isArray(src)){
          for(let i=0;i<src.length;i++){
            let a=src[i];
            scope.variables[value]=a;
            window[value]=a;
            if(index!==undefined){
              window[index]=i;
              scope.variables[index]=window[index];
            }
            let child=openTag.nextSibling;
            while(child && child!==closeTag){
              newCode+=parseNode(code,child,scope);
              child=child.nextSibling;
            }
          }
        }else if(typeof src === "number"){
          for(let i=1;i<=src;i++){
            let a=i;
            scope.variables[value]=a;
            window[value]=a;
            if(index!==undefined){
              window[index]=i-1;
              scope.variables[index]=window[index];
            }
            let child=openTag.nextSibling;
            while(child && child!==closeTag){
              newCode+=parseNode(code,child,scope);
              child=child.nextSibling;
            }
          }
        }
      }else if(openTagCode.ifelse){
        for(let i=0;i<openTagCode.ifs.length;i++){
          let data=openTagCode.ifs[i];
          let res=runCodeWithScope(data.cond);
          if(res){
            let n=getFirstHtmlChild(data.node);
            if(n) newCode+=parseNode(code,n,scope);
            return newCode;
          }
        }
        if(openTagCode.else){
          let n=getFirstHtmlChild(openTagCode.else.node);
          if(n) newCode+=parseNode(code,n,scope);
          return newCode;
        }
      }else{
        newCode+=openTagCode;
        let child=openTag.nextSibling;
        while(child && child!==closeTag){
          newCode+=parseNode(code,child,scope);
          child=child.nextSibling;
        }
        newCode+=closeTagCode;
      }
      if(extraLayerPushed) popLayerFromScope(scope);
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

export function getFirstHtmlChild(node,code){
  let open=node.firstChild;
  if(!open) return null;
  let content=open.nextSibling;
  return content;
}

export function runCodeWithScope(code){
  return eval("let scope=window.scope; let $=window.$;\n"+code+";");
}

export function pushLayerToScope(scope, layer){
  scope.layers.push(layer);
}

export function popLayerFromScope(scope){
  return scope.layers.pop();
}

export function setInScope(scope,key,value){
  let layer=scope.layers;
  layer=layer[layer.length-1];
  layer[key]=value;
}

export function getFromScope(scope,key){
  let layers=scope.layers;
  for(let i=layers.length-1;i>=0;i--){
    let layer=layers[i];
    if(key in layer){
      return layer[key];
    }
  }
  return undefined;
}

export function interpolateText(text,scope){
  let open="{{";
  let close="}}";
  let start=-1;
  let end=-1;
  let newText="";
  let index=0;
  while(true){
    start=text.indexOf(open,start+1);
    if(start<0) break;
    while(text.charAt(start+2)==="{") start++;
    end=text.indexOf(close,start+1);
    if(end<0) break;
    let it=text.substring(start+2,end);
    newText+=text.substring(index,start);
    if(it){

      // let parts=it.split(".");
      // if(parts[0] in scope.variables){
      //   let val=scope.variables[parts[0]];
      //   for(let i=1;i<parts.length;i++){
      //     let p=parts[i];
      //     val=val[p];
      //   }
      //   newText+=JSON.stringify(val);
      // }else{
      //   newText+="<span id='interpolate-"+scope.interpolates.length+"'></span>";
      // }
      it=replaceScopeVariables(it,scope);
      // scope.interpolates.push(it);
      try{
        let val=runCodeWithScope(it);
        newText+=JSON.stringify(val);
      }catch(e){
        newText+="<span id='interpolate-"+scope.interpolates.length+"'></span>";
        //newText+=it;
        scope.interpolates.push(it);
      }
    }
    index=end+2;
  }
  newText+=text.substring(index);
  return newText;
}

function replaceScopeVariables(text,scope){
  let newText="";
  const len=text.length;
  let start=0;
  while(start<len){
    let pos=text.indexOf("#",start);
    if(pos<0) break;
    newText+=text.substring(start,pos);
    let variables;
    if(text.charAt(pos+1)==="#"){
      variables=scope.endVariables;
      pos++;
    }else{
      variables=scope.variables;
    }
    start=pos+1;
    let w=parseVariable(text,start);
    start+=w.length;
    if(!w) continue;
    if(w in variables){
      if(variables===scope.variables){
        newText+=scope.variables[w];
      }else{
        newText+="#"+w;
      }
    }else{
      newText+="#"+w;
    }
  }
  newText+=text.substring(start);
  return newText;
}

function parseVariable(text,start){
  let len=text.length;
  let w="";
  while(start<len){
    let c=text.codePointAt(start);
    if(c===95 || c>=48 && c<=57 || c>=97 && c<=122){
      w+=text.charAt(start);
    }else{
      break;
    }
    start++;
  }
  return w;
}

const scale=1;



export function getPropsPT(elementNode,code,props,scope){
  let res={
    props: {},
    pt: ""
  };
  let attrs=getAttributes(elementNode,code,scope);
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
          if("default" in p) v=p.default; else v=0;
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

function getAttributes(elementNode,src,scope){
  let attrs={};
  let offset=0;//elementNode.from;
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
      if(value){
        value=interpolateText(value,scope);
      }
    }
    attrs[name]=value;
    
    node=node.nextSibling;
  }
  return attrs;
}