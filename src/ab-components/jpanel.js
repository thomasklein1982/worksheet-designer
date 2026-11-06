import { getFromScope, setInScope, getPropsPT, getTagContentAsString } from "../functions/createHtmlCode"
import { generateStyleFromLayout } from "./jframe";

export default {
  props: {
    layout: String,
    style: {
      type: String,
      default: ""
    }
  },
  create(layout,style,pt,scope){
    style=generateStyleFromLayout(layout)+";"+style;
    let open=`<div class="jpanel" style="${style}" ${pt}>`;
    let close="</div>";
    return {open,close};
  },
  createFromHtml(node,code,scope){
    let {props,pt}=getPropsPT(node,code,this.props,scope);
    return this.create(props.layout,props.style,pt,scope);
  }
}
