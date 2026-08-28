import { setInScope, getPropsPT, parseNode } from "../functions/createHtmlCode";
import kopfzeile from "./kopfzeile-alt";

export default{
  props: {
    
  },
  create(pt,scope){
    scope.variables.seite++;
    scope.endVariables.seite++;
    let templates=["links","mitte","rechts"];
    let open=`<div class='papier'><div class="seite"><div class="kopfzeile">`;
    let template;
    for(let i=0; i<templates.length;i++){
      template=scope.templates["kopfzeile-"+templates[i]];
      if(template){
        let code=parseNode(template.code,template.node,scope,true);
        open+=code;
      }
    }
    open+=`</div>`;
    open+=`<div class="seiteninhalt">`;
    let close=`</div>`;
    close+=`<div class="fusszeile">`;
    for(let i=0; i<templates.length;i++){
      template=scope.templates["fusszeile-"+templates[i]];
      if(template){
        let code=parseNode(template.code,template.node,scope,true);
        close+=code;
      }
    }
    close+=`</div></div></div>`;
    return {
      open, close
    };
  },
  createFromHtml(node,nodeCode,scope){
    let {props,pt}=getPropsPT(node,nodeCode,this.props,scope);
    return this.create(pt,scope);
  }
}