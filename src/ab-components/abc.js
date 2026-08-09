import { getFromScope, setInScope, getPropsPT } from "../functions/createHtmlCode";

export default {
  props: {
    zeilen: Number,
    spalten: Number,
    zeichen: {
      type: String /*a, A, n, -, o, ., >*/,
      default: "a)"
    }
  },
  create(zeilen,spalten, zeichen, pt,scope){
    zeichen=zeichen.trim();
    zeichen=zeichen.replace(/</g,"arrow");
    if(zeichen.startsWith("(")) zeichen="rbopen-"+zeichen.substring(1);
    if(zeichen.endsWith(")")) zeichen=zeichen.substring(0,zeichen.length-1)+"-rbclose";
    if(zeichen.endsWith(".")) zeichen=zeichen.substring(0,zeichen.length-1)+"-dot";

    let gridTemplate="";
    if(spalten!==undefined){
      gridTemplate+=`grid-template-columns: repeat(${spalten},1fr);`;
    }
    if(zeilen!==undefined){
      gridTemplate+=`grid-template-rows: repeat(${zeilen},1fr);`;
      if(spalten===undefined){
        gridTemplate+="grid-auto-flow: column;";
      }
    }
    if(zeilen!==undefined && spalten!==undefined){
      gridTemplate+="grid-auto-flow: column;";
    }
    let open=`<div ${pt} class="teilaufgaben teilaufgaben-${zeichen}" style="${gridTemplate}">`;
    let close=`</div>`;
    // setInScope(scope,"abc",{
    //   zeilen,spalten,anzahlTeilaufgaben: 0, zeichen
    // });
    return {open,close};
  },
  createFromHtml(node,nodeCode,scope){
    let {props,pt}=getPropsPT(node,nodeCode,this.props,scope);
    return this.create(props.zeilen,props.spalten,props.zeichen,pt,scope);
  }
}