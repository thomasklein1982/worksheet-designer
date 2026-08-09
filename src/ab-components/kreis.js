import { getFromScope, setInScope, getPropsPT } from "../functions/createHtmlCode"

export default {
  props: {
    "x": {
      type: Number,
      default: 0
    },
    "y": {
      type: Number,
      default: 0
    },
    "r": {
      type: Number,
      default: 1
    }
  },
  create(x,y,r,pt,scope){
    let open=`<circle cx="${x}" cy="${y}" r="${r}" ${pt} >`;
    let close="</circle>";
    return {open,close};
  },
  createFromHtml(node,nodeCode,scope){
    let {props,pt}=getPropsPT(node,nodeCode,this.props,scope);
    return this.create(props.x,props.y,props.r,pt,scope);
  }
}