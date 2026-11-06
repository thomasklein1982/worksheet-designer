import { getFromScope, setInScope, getPropsPT, getTagContentAsString } from "../functions/createHtmlCode"

export default {
  props: {
    
  },
  create(pt,scope){
    let open=`<span class="jlabel" ${pt}>`;
    let close="</span>";
    return {open,close};
  },
  createFromHtml(node,code,scope){
    let {props,pt}=getPropsPT(node,code,this.props,scope);
    return this.create(pt,scope);
  }
}
