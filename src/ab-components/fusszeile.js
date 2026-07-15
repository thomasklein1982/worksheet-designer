import { getPropsPT } from "./createHtmlCode";

export default {
  props: {
    
  },
  templateName: "fusszeile",
  create(pt,scope){
    let open=`<div class="fusszeile" ${pt}>`;
    let close=`</div>`;
    return {open,close};
  },
  createFromHtml(node,nodeCode,scope){
    let {props,pt}=getPropsPT(node,nodeCode,this.props);
    return this.create(pt,scope);
  }
}