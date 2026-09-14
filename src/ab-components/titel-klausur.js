import { getPropsPT, interpolateText } from "../functions/createHtmlCode";

export default {
  props: {
    gruppe: String,
    zeit: {
      type: String,
      default: "45"
    },
    punkte: {
      type: String,
      default: "auto"
    },
    hilfsmittel: {
      type: String,
      default: "keine"
    }
  },
  create(gruppe, zeit, punkte, hilfsmittel,pt,scope){
    if(!punkte) punkte="auto";
    if(punkte==="auto") punkte="{{##punkte}}";
    punkte=interpolateText(punkte+"",scope);
    hilfsmittel=interpolateText(hilfsmittel+"",scope);
    gruppe=interpolateText(gruppe+"",scope);
    let open="<div class='titel-klausur'><h1 class='titel-klausur-titel'>";
    let close=`</h1><table class="titel-klausur-tabelle">
    <tr><th>Lerngruppe:</th><td>${gruppe}</td></tr>
    <tr><th>Bearbeitungszeit:</th><td>${zeit} Minuten</td></tr>
    <tr><th>Erreichbare Punkte:</th><td>${punkte}</td></tr>
    <tr><th>Zugelassene Hilfsmittel:</th><td>${hilfsmittel}</td></tr>
    </table></div>`;
    return {open,close};
  },
  createFromHtml(node,nodeCode,scope){
    let {props,pt}=getPropsPT(node,nodeCode,this.props,scope);
    return this.create(props.gruppe,props.zeit, props.punkte, props.hilfsmittel,pt,scope);
  }
}