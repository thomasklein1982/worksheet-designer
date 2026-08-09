import { getFromScope, setInScope, getPropsPT, interpolateText, replaceScopeVariables } from "../functions/createHtmlCode"
import punkte from "./punkte";

export default {
  props: {
    titel: {
      type: String,
      default: null
    },
    name: {
      type: String,
      default: null
    },
    punkte: String
  },
  create(titel,name,anzahlPunkte,pt,scope){
    let open=`<div class="aufgabe" ${pt}>`;
    scope.variables.aufgabe++;
    scope.endVariables.aufgabe++;
    let text=scope.setup.aufgabe;
    if(!text) text="#aufgabe";
    text=replaceScopeVariables(text,scope);
    text=interpolateText(text,scope);
    open+=`<span class="aufgabennummer">${text}</span>`;
    let close="";
    if(anzahlPunkte!==undefined){
      let p=punkte.create(anzahlPunkte,"",scope);
      open+=p.open+anzahlPunkte+p.close;
    }
    if(titel!==null){
      open+=`<span class="aufgabentitel">${titel}</span><div></div>`;
    }
    close+=`</div>`;
    setInScope(scope,"aufgabe",{
      titel, name
    });
    return {open,close};
  },
  createFromHtml(node,nodeCode,scope){
    let {props,pt}=getPropsPT(node,nodeCode,this.props,scope);
    return this.create(props.titel,props.name,props.punkte,pt,scope);
  }
}