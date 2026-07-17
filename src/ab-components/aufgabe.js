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
    let open=`<div class="aufgabe" ${pt}>`;
    scope.variables.aufgabe++;
    scope.endVariables.aufgabe++;
    open+=`<span class="aufgabennummer">${scope.variables.aufgabe}</span>`;
    if(titel!==null){
      open+=`<span class="aufgabentitel">${titel}</span><div></div>`;
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