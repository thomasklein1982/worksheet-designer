import { getFromScope, setInScope, getPropsPT, getTagContentAsString } from "../functions/createHtmlCode"

export default {
  props: {
    value: {
      type: String,
      default: ""
    }
  },
  create(value,pt,scope){
    let open=`<div class="backdrop"><div class="jdialog"${pt}>
    `;
    let close=`<div><input style="margin: 0.2rem;width: calc(100% - 0.4rem); font-size: inherit;" value="${value}"></input></div><div style="text-align: right"><button>OK</button></div>`;
    close+="</div></div>";
    return {open,close};
  },
  createFromHtml(node,code,scope){
    let {props,pt}=getPropsPT(node,code,this.props,scope);
    return this.create(props.value,pt,scope);
  }
}
