import { getFromScope, setInScope, getPropsPT, getTagContentAsString } from "../functions/createHtmlCode"

export default {
  props: {
    
  },
  create(url,pt,scope){
    let open=`<a class="weblink" target="_blank" href="https://${url}">`;
    let close="</a>";
    return {open,close};
  },
  createFromHtml(node,code,scope){
    let {props,pt}=getPropsPT(node,code,this.props,scope);
    let url=getTagContentAsString(node,code);
    return this.create(url,pt,scope);
  }
}