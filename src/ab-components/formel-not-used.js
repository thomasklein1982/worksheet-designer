import { getFromScope, setInScope, getPropsPT } from "../functions/createHtmlCode"

export default {
  props: {
    "block": {
      type: Boolean,
      default: false
    }
  },
  create(block,scope){
    let open,close;
    if(block){
      open="\\[";
      close="\\]";
    }else{
      open="\\(";
      close="\\)";
    }
    return {open,close};
  },
  createFromHtml(node,nodeCode,scope){
    let {props,pt}=getPropsPT(node,nodeCode,this.props,scope);
    return this.create(props.block,pt,scope);
  }
}