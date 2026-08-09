import { getPropsPT } from "../functions/createHtmlCode";

export default {
  props: {
    links: String,
    rechts: String,
    oben: String,
    unten: String,
    style: {
      type: String,
      default: ""
    }
  },
  create(links,rechts,oben,unten, style,pt,scope){
    let css="";
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
    let open=`<div ${pt} class="box" style="${css}">`;
    let close=`</div>`;
    return {open,close};
  },
  createFromHtml(node,nodeCode,scope){
    let {props,pt}=getPropsPT(node,nodeCode,this.props,scope);
    return this.create(props.links,props.rechts,props.oben,props.unten,props.style,pt,scope);
  }
}