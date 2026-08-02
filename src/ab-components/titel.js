import { getPropsPT } from "./createHtmlCode";

export default {
  props: {
    groesse: {
      type: Number,
      default: 1
    }
  },
  create(groesse,pt,scope){
    if([1,2,3,4,5].indexOf(groesse)<0) groesse=1;
    let open="<h"+groesse+" class='titel'>";
    let close=`</h`+groesse+">";
    return {open,close};
  },
  createFromHtml(node,nodeCode,scope){
    let {props,pt}=getPropsPT(node,nodeCode,this.props,scope);
    return this.create(props.groesse,pt,scope);
  }
}