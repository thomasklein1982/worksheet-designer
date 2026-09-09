import { getFromScope, setInScope, getPropsPT } from "../functions/createHtmlCode"

export default {
  props: {
    x1: Number,
    y1: Number,
    x2: Number,
    y2: Number,
    spitze: String
  },
  create(x1,y1,x2,y2,spitze,pt,scope){
    let g=getFromScope(scope,"grafik");
    let spitzen=["dreieck"];
    if(spitzen.indexOf(spitze)<0) spitze=spitzen[0];
    if(!x1) x1=0;
    if(!y1) y1=0;
    if(!x2) x2=0;
    if(!y2) y2=0;
    let open=`<line class="pfeil" x1="${x1*g.zoomX}" y1="${y1*g.zoomY}" x2="${x2*g.zoomX}" y2="${y2*g.zoomY}" marker-end="url(#pfeil-${spitze})">`;
    let close="</line>";
    return {open,close};
  },
  createFromHtml(node,code,scope){
    let {props,pt}=getPropsPT(node,code,this.props,scope);
    return this.create(props.x1, props.y1, props.x2, props.y2,props.spitze,pt,scope);
  }
}