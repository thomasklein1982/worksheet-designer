import abc from "./abc";
import abstand from "./abstand";
import arbeitsblatt from "./arbeitsblatt";
import aufgabe from "./aufgabe";
import bild from "./bild";
import box from "./box";
import fusszeile from "./fusszeile";
import grafik from "./grafik";
import karopapier from "./karopapier";
import kopfzeile from "./kopfzeile";
import kreis from "./kreis";
import ksystem from "./ksystem";
import seite from "./seite";

let SpecialTags={
  arbeitsblatt, aufgabe, abc, grafik, karopapier, kreis, seite, ksystem, bild, kopfzeile, fusszeile, box, abstand
};

export default function createHtmlCode(ab,code,tree){
  let newCode="";
  let scope={
    layers: [],
    interpolates: [],
    ab,
    variables: {
      aufgabe: 0,
      seite: 0
    },
    endVariables: {
      seiten: 0,
      aufgaben: 0
    },
    templates: {
      kopfzeile: null, 
      fusszeile: null
    },
    code
  };
  try{
    let node=tree.topNode;
    newCode=parseNode(code,node,scope);
  }catch(e){
    console.log(e);
    newCode=code;
  }
  // console.log(newCode);
  newCode+=`<script>
  let scope={
    variables: {
      seiten: ${scope.endVariables.seiten},
      aufgaben: ${scope.endVariables.aufgaben}
    }
  }
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
    el.innerHTML=window.value;
  }`;
  newCode+="\n"+replaceScopeVariables.toString();
  newCode+="\n\n"+parseVariable.toString()+"\n\n";

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
      newCode+=tagCode;
      goOn=false;
    }else if(name in SpecialTags){
      let st=SpecialTags[name];
      if(st.templateName && !forceTemplateRendering){
        scope.templates[st.templateName]=tag;
        goOn=false;
      }else{
        let tagCode=code.substring(tag.from,tag.to);
        pushLayerToScope(scope, {});
        extraLayerPushed=true;
        let {open,close}=st.createFromHtml(tag,tagCode,scope);
        openTagCode=open;
        closeTagCode=close;
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
    it=replaceScopeVariables(it,scope);
    scope.interpolates.push(it);
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
    start=pos+1;
    let w=parseVariable(text,start);
    start+=w.length;
    if(!w) continue;
    if(w in scope.variables){
      newText+=scope.variables[w];
    }else if(w in scope.endVariables){
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