import { getFromScope, setInScope, getPropsPT } from "./createHtmlCode"

export default {
  props: {
    titel: {
      type: String,
      default: null
    },
    name: {
      type: String,
      default: null
    }
  },
  create(titel,name,pt,scope){
    let open=`<div ${pt}>`;
    if(titel){
      scope.counter.aufgaben++;
      titel=titel.replace(/#N/g,scope.counter.aufgaben);
      open+=`<h2 class="aufgabentitel">${titel}</h2>`;
    }
    let close=`</div>`;
    setInScope(scope,"aufgabe",{
      titel, name
    });
    return {open,close};
  },
  createFromHtml(node,nodeCode,scope){
    let {props,pt}=getPropsPT(node,nodeCode,this.props);
    return this.create(props.titel,props.name,pt,scope);
  }
}