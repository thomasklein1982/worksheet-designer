import { getFromScope, setInScope, getPropsPT } from "../functions/createHtmlCode"

export default {
  props: {
    links: {
      type: Boolean,
      default: false
    }
  },
  create(links,pt,scope){
    let open=`<div class="daneben-${links? 'links':'rechts'}">`;
    let close="</div>";
    return {open,close};
  },
  createFromHtml(node,nodeCode,scope){
    let {props,pt}=getPropsPT(node,nodeCode,this.props,scope);
    return this.create(props.links,pt,scope);
  }
}