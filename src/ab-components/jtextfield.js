import { getFromScope, setInScope, getPropsPT, getTagContentAsString } from "../functions/createHtmlCode"

export default {
  props: {
    value: {
      type: String,
      default: ""
    }
  },
  create(value,pt,scope){
    let open=`<input class="jtextfield" value="${value}" ${pt}>`;
    let close="</input>";
    return {open,close};
  },
  createFromHtml(node,code,scope){
    let {props,pt}=getPropsPT(node,code,this.props,scope);
    return this.create(props.value,pt,scope);
  }
}
