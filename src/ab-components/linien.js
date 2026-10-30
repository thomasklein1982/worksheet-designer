import { getFromScope, setInScope, getPropsPT, getTagContentAsString } from "../functions/createHtmlCode"

export default {
  props: {
    anzahl: {
      type: Number,
      default: 1
    },
    abstand: {
      type: String,
      default: "3ex"
    }
  },
  create(anzahl,abstand,pt,scope){
    let open=`<div class="linien">`;
    for(let i=0;i<anzahl;i++){
      open+=`<div style="height: ${abstand}"></div>`;
    }
    let close="</div>";
    return {open,close};
  },
  createFromHtml(node,code,scope){
    let {props,pt}=getPropsPT(node,code,this.props,scope);
    return this.create(props.anzahl, props.abstand,pt,scope);
  }
}