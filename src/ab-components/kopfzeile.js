import { getPropsPT } from "./createHtmlCode";

export default {
  props: {
    links: {
      type: Boolean,
      default: false
    },
    rechts: {
      type: Boolean,
      default: false
    },
  },
  isTemplate: true,
  create(links,  rechts, pt,scope, getAsTemplate){
    let pos="mitte";
    if(links) pos="links";
    if(rechts) pos="rechts";
    let name="kopfzeile-"+pos;
    if(getAsTemplate){
      return name;
    }
    let open=`<div class="kopfzeile-${pos}" ${pt}>`;
    let close=`</div>`;
    return {open,close};
  },
  createFromHtml(node,nodeCode,scope,getAsTemplate){
    let {props,pt}=getPropsPT(node,nodeCode,this.props,scope);
    return this.create(props.links,props.rechts,pt,scope,getAsTemplate);
  }
}