import { getPropsPT, setInScope } from "./createHtmlCode"

export default {
  props: {
    titel: {
      type: String,
      default: ""
    },
    aufgabentitel: {
      type: String,
      default: null
    }
  },
  create(titel,aufgabentitel,pt,scope){
    let open=`<div class="arbeitsblatt" ${pt}>
    <h1>${titel}</h1>`;
    let close=`</div>`;
    setInScope(scope,"ab",{
      anzahlAufgaben: 0,
      aufgabentitel, titel
    });
    return {open,close};
  },
  createFromHtml(node,nodeCode,scope){
    let {props,pt}=getPropsPT(node,nodeCode,this.props);
    return this.create(props.titel,props.aufgabentitel,pt,scope);
  }
}