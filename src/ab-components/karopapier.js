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
    "breite": {
      type: Number,
      default: 1
    },
    "hoehe": {
      type: Number,
      default: 1
    }
  },
  create(sx,sy,b,h,pt,scope){
    let open="<g class='karopapier' "+pt+" >";
    if(sx===undefined){
      let g=getFromScope(scope,"grafik");
      sx=Math.floor((g.minX-g.rahmen)*2)/2;
      sy=Math.floor((g.minY-g.rahmen)*2)/2;
      b=Math.ceil(g.width);
      h=Math.ceil(g.height);
    }
    let x=sx;
    for(let i=0;i<=b*2;i++){
      open+=`<line x1="${x}" y1="${sy}" x2="${x}" y2="${sy+h}" />`;
      x+=0.5;
    }
    let y=sy;
    for(let i=0;i<=h*2;i++){
      open+=`<line x1="${sx}" y1="${y}" x2="${sx+b}" y2="${y}" />`;
      y+=0.5;
    }
    let close="</g>";
    return {open,close};
  },
  createFromHtml(node,nodeCode,scope){
    let {props,pt}=getPropsPT(node,nodeCode,this.props);
    return this.create(props.x,props.y,props.breite,props.hoehe,pt,scope);
  }
}