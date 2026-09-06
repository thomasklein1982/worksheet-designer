import { getFromScope, setInScope, getPropsPT } from "../functions/createHtmlCode"

export default {
  props: {
    
  },
  create(pt,scope){
    let open=`<div class="zentriert">`;
    let close="</div>";
    return {open,close};
  },
  createFromHtml(node,nodeCode,scope){
    let {props,pt}=getPropsPT(node,nodeCode,this.props,scope);
    return this.create(pt,scope);
  }
}