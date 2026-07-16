import { getFromScope, setInScope, getPropsPT } from "./createHtmlCode"

export default {
  props: {
    
  },
  create(anzahl,pt,scope){
    scope.variables.punkte+=anzahl;
    scope.endVariables.gesamtpunkte+=anzahl;
    let open=`<span class="punkte">`;
    let close="</span>";
    return {open,close};
  },
  createFromHtml(node,nodeCode,scope){
    let {props,pt}=getPropsPT(node,nodeCode,this.props);
    console.log(node.nextSibling.toString());
    let from=nodeCode.indexOf(">");
    let to=nodeCode.lastIndexOf("<");
    
    let content=nodeCode.substring(from+1,to);
    let anzahl=content*1;
    return this.create(anzahl,pt,scope);
  }
}