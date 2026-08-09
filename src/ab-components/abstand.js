import { getFromScope, setInScope, getPropsPT } from "../functions/createHtmlCode";

export default {
  props: {
    x: String,
    y: String,
    style: {
      type: String,
      default: ""
    }
  },
  create(x,y, style,pt,scope){
    let css;
    let open="";
    if(y){
      css="margin-top: "+y+";"+style;
      open+=`<div ${pt} class="abstand-y" style="${css}"></div>`;
    }
    if(x){
      css="margin-left: "+x+";"+style;
      open+=`<div ${pt} class="abstand-x" style="${css}"></div>`;
    }
    let close=``;
    return {open,close};
  },
  createFromHtml(node,nodeCode,scope){
    let {props,pt}=getPropsPT(node,nodeCode,this.props,scope);
    return this.create(props.x,props.y,props.style,pt,scope);
  }
}