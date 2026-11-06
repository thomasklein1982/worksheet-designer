import { getFromScope, setInScope, getPropsPT, getTagContentAsString } from "../functions/createHtmlCode"

export default {
  props: {
    titel: {
      type: String,
      default: ""
    }
  },
  create(titel, pt,scope){
    scope.variables.material++;
    scope.endVariables.material++;
    let text="";
    if(titel){
      text=": "+titel;
    }
    let open=`<div class="material" ${pt}><h3>Material ${scope.variables.material}${text}</h3>`;

    let close="</div>";
    return {open,close};
  },
  createFromHtml(node,code,scope){
    let {props,pt}=getPropsPT(node,code,this.props,scope);
    return this.create(props.titel,pt,scope);
  }
}
