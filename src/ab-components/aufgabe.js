import { getPropsPT } from "./createHtmlCode"

export default {
  props: {
    titel: {
      type: String,
      default: ""
    }
  },
  create(titel,pt){
    let open=`<div>
    <h3>Aufgabe :${titel}</h3>`;
    let close=`</div>`;
    return {open,close};
  },
  createFromHtml(node,nodeCode){
    let {props,pt}=getPropsPT(node,nodeCode,this.props);
    return this.create(props.titel,pt);
  }
}