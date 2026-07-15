import { setInScope,getFromScope, getPropsPT } from "./createHtmlCode";

export default {
  props: {
    "x": {
      type: Number,
      default: undefined
    },
    "y": {
      type: Number,
      default: 0
    },
    "dx": {
      type: Number,
      default: 1
    },
    "dy": {
      type: Number,
      default: 0
    },
    "min": {
      type: Number,
      default: 0
    },
    "max": {
      type: Number,
      default: 10
    },
    "schritt": {
      type: Number,
      default: 1
    },
    "verbergen": {
      type: String,
      default: ""
    }
  },
  create(x,y,dx,dy,min,max,schritt,verbergen,pt,scope){
    let sx=x+min*dx;
    let sy=y+min*dy;
    let ex=x+max*dx;
    let ey=y+max*dy;
    let open=`<g ${pt}><line x1="${sx}" y1="${sy}" x2="${ex}" y2="${ey}"></line>`;
    let close="</g>";
    return {open,close};
  },
  createFromHtml(node,nodeCode,scope){
    let {props,pt}=getPropsPT(node,nodeCode,this.props);
    return this.createCode(props.x,props.y,props.dx,props.dy,props.min,props.max,props.schritt,props.verbergen,pt,scope);
  }
}