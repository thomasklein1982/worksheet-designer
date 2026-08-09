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
    "form": {
      type: String,
      default: "x"
    },
    text: String,
    abstand: {
      type: Number,
      default: "0.5cm"
    },
    winkel: {
      type: Number,
      default: 270
    }
  },
  create(x,y,form,text,abstand,winkel,pt,scope){
    let open=`<g class="punkt" ${pt} fill="black" stroke="none" >`;
    if(form==="."){
      open+=`<circle  cx="${x}" cy="${y}" r="0.1" ></circle>`;
    }else if(form==="x"){
      open+=`<g><line x1="${x-0.1}" y1="${y-0.1}" x2="${x+0.1}" y2="${y+0.1}"/><line x1="${x-0.1}" y1="${y+0.1}" x2="${x+0.1}" y2="${y-0.1}"/></g>`
    }
    if(text){

    }
    let close="</g>";
    return {open,close};
  },
  createFromHtml(node,nodeCode,scope){
    let {props,pt}=getPropsPT(node,nodeCode,this.props,scope);
    return this.create(props.x,props.y,props.form,props.text,props.abstand,props.winkel,pt,scope);
  }
}