import { setInScope, getPropsPT, parseNode } from "./createHtmlCode";
import kopfzeile from "./kopfzeile";

export default{
  props: {
    
  },
  create(pt,scope){
    let open=`<div class='seite'>`;
    let tag=scope.templates.kopfzeile;
    if(tag){
      let code=parseNode(scope.code,tag,scope,true);
      open+=code;
    }
    open+=`<div class="seiteninhalt">`;
    let close=`</div>`;
    tag=scope.templates.fusszeile;
    if(tag){
      let code=parseNode(scope.code,tag,scope,true);
      close+=code;
    }
    close+=`</div>`;
    return {
      open, close
    };
  },
  createFromHtml(node,nodeCode,scope){
    let {props,pt}=getPropsPT(node,nodeCode,this.props);
    return this.create(pt,scope);
  }
}