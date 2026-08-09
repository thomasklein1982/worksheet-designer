import { getFromScope, setInScope, getPropsPT, replaceScopeVariables, interpolateText } from "../functions/createHtmlCode"

export default {
  props: {
    
  },
  create(anzahl,pt,scope){
    anzahl*=1;
    scope.variables.punkte+=anzahl;
    scope.endVariables.punkte+=anzahl;
    let text=scope.setup.punkte;
    if(!text) text="(# P)";
    text=interpolateText(text,scope);
    let parts=text.split("#");
    let before=parts[0];
    let after=parts[1];
    if(!before) before="";
    if(!after) after="";
    let open=`<span class="punkte">${before}`;
    let close=`${after}</span>`;
    return {open,close};
  },
  createFromHtml(node,code,scope){
    let {props,pt}=getPropsPT(node,code,this.props,scope);
    let nodeCode=code.substring(node.from,node.to);
    let from=nodeCode.indexOf(">");
    let to=nodeCode.lastIndexOf("<");
    
    let content=nodeCode.substring(from+1,to);
    let anzahl=content*1;
    return this.create(anzahl,pt,scope);
  }
}