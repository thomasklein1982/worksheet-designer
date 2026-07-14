import { getPropsPT } from "./createHtmlCode"

export default {
  props: {
    titel: {
      type: String,
      default: ""
    }
  },
  create(titel,pt,scope){
    let open=`<div>
    <h1>${titel}</h1>`;
    let close=`</div>`;
    scope.push({
      anzahlAufgaben: 0
    });
    return {open,close};
  },
  createFromHtml(node,nodeCode,scope){
    let {props,pt}=getPropsPT(node,nodeCode,this.props);
    return this.create(props.titel,pt,scope);
  }
}