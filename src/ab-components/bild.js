import { getFromScope, setInScope, getPropsPT } from "./createHtmlCode"

export default {
  props: {
    datei: String,
    breite: String,
    hoehe: String,
    links: String,
    rechts: String,
    oben: String,
    unten: String,
    style: {
      type: String,
      default: ""
    }
  },
  create(datei,breite,hoehe,links, rechts, oben, unten, style, pt,scope){
    let url=datei;
    let asset=scope.ab.getAssetByName(url);
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
    if(links || rechts || oben || unten) css+="position: absolute;";
    if(links){
      css+="left: "+links+";";
      if(!rechts){
        css+="max-width: calc(100% - "+links+");";
      }
    }
    if(rechts){
      css+="right: "+rechts+";";
      if(!links){
        css+="max-width: calc(100% - "+rechts+");";
      }
    }
    if(oben){
      css+="top: "+oben+";";
      if(!unten){
        css+="max-height: calc(100% - "+oben+");";
      }
    }
    if(unten){
      css+="bottom: "+unten+";";
      if(!oben){
        css+="max-height: calc(100% - "+unten+");";
      }
    }
    css+=style;
    let open=`<img ${pt} class="bild" src="${url}" style="${css}" ${pt}/>`;
    let close=``;
    return {open,close};
  },
  createFromHtml(node,nodeCode,scope){
    let {props,pt}=getPropsPT(node,nodeCode,this.props,scope);
    return this.create(props.datei,props.breite,props.hoehe,props.links,props.rechts,props.oben,props.unten,props.style,pt,scope);
  }
}