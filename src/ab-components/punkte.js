import { getFromScope, setInScope, getPropsPT } from "./createHtmlCode"

export default {
  props: {
    
  },
  create(anzahl,pt,scope){
    scope.variables.punkte+=anzahl;
    scope.endVariables.punkte+=anzahl;
    let open=`<span class="punkte">`;
    let close="</span>";
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