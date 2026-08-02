import { getFromScope, setInScope, getPropsPT, runCodeWithScope } from "./createHtmlCode"

export default {
  props: {
    for: String
  },
  create(forv, pt,scope){
    let close=null;
    let open;
    let posIn=forv.indexOf(" in ");
    if(posIn<0){
      throw "'in' fehlt in for-Attribut";
    }
    let a=forv.substring(0,posIn).trim();
    let src=forv.substring(posIn+4).trim();
    if(/^\d+$/.test(src)) src=src*1;
    else src=runCodeWithScope(src);
    let value,index;
    if(a.startsWith("(")){
      if(!a.endsWith(")")) throw "')' fehlt in for-Attribut";
      a=a.substring(1,a.length-1);
      a=a.split(",");
      value=a[0];
      index=a[1];
      open={
        loop: true,
        value, index, src
      }
    }else{
      value=a;
      open={
        loop: true,
        value, src
      }
    }
    return {open,close};
  },
  createFromHtml(node,nodeCode,scope){
    let {props,pt}=getPropsPT(node,nodeCode,this.props,scope);
    return this.create(props.for,pt,scope);
  }
}