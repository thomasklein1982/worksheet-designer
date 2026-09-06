import { getFromScope, setInScope, getPropsPT } from "../functions/createHtmlCode"

export default {
  props: {
    breite: String,
    style: {
      type: String,
      default: ""
    }
  },
  create(breite,style,pt,scope){
    if(breite){
      style="width: "+breite+";"+style;
    }
    let open=`<div class="hessenkasten-aussen"><div style="${style}" class="hessenkasten">`;
    let close="</div></div>";
    return {open,close};
  },
  createFromHtml(node,nodeCode,scope){
    let {props,pt}=getPropsPT(node,nodeCode,this.props,scope);
    return this.create(props.breite,props.style,pt,scope);
  }
}