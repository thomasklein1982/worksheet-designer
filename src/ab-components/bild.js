import { getFromScope, setInScope, getPropsPT } from "./createHtmlCode"

export default {
  props: {
    datei: String,
    breite: String,
    hoehe: String,
    style: {
      type: String,
      default: ""
    }
  },
  create(datei,breite,hoehe,style, pt,scope){
    let url=datei;
    let asset=scope.ab.assets[url.toLowerCase()];
    if(asset) url=asset.dataURL;
    let css="";
    if(breite){
      css="width: "+breite+";";
      if(hoehe){
        css+="height: "+hoehe+";";
      }
    }else{
      if(hoehe){
        css="height: "+hoehe+";";
      }
    }
    css+=style;
    let open=`<img ${pt} class="bild" src="${url}" style="${css}" ${pt}/>`;
    let close=``;
    return {open,close};
  },
  createFromHtml(node,nodeCode,scope){
    let {props,pt}=getPropsPT(node,nodeCode,this.props);
    return this.create(props.datei,props.breite,props.hoehe,props.style,pt,scope);
  }
}