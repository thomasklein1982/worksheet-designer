import { getFromScope, setInScope, getPropsPT } from "./createHtmlCode"

export default {
  props: {
    zeilen: Number,
    spalten: Number
  },
  create(zeilen,spalten, pt,scope){
    let open=`<div ${pt} class="teilaufgaben" style="grid-template-columns: repeat(${spalten},1fr); grid-template-rows: repeat(${zeilen},1fr)">`;
    let close=`</div>`;
    setInScope(scope,"abc",{
      zeilen,spalten,anzahlTeilaufgaben: 0
    });
    return {open,close};
  },
  createFromHtml(node,nodeCode,scope){
    let {props,pt}=getPropsPT(node,nodeCode,this.props);
    return this.create(props.zeilen,props.spalten,pt,scope);
  }
}