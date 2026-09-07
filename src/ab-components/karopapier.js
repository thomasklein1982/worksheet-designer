import { setInScope,getFromScope, getPropsPT } from "../functions/createHtmlCode";

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
    let g=getFromScope(scope,"grafik");
    let open="<g class='karopapier' "+pt+" >";
    if(sx===undefined){
      sx=Math.floor((g.minX-g.rahmen)*2)/2;
      sy=Math.floor((g.minY-g.rahmen)*2)/2;
      b=Math.ceil(g.sizeX);
      h=Math.ceil(g.sizeY);
    }
    sx*=g.zoomX;
    sy*=g.zoomY;
    // b*=g.zoomX;
    // h*=g.zoomY;
    let x=sx;
    for(let i=0;i<=b*2;i++){
      open+=`<line x1="${x}" y1="${sy}" x2="${x}" y2="${sy+h*g.zoomY}" />`;
      x+=0.5*g.zoomX;
    }
    let y=sy;
    for(let i=0;i<=h*2;i++){
      open+=`<line x1="${sx}" y1="${y}" x2="${sx+b*g.zoomX}" y2="${y}" />`;
      y+=0.5*g.zoomY;
    }
    let close="</g>";
    return {open,close};
  },
  createFromHtml(node,nodeCode,scope){
    let {props,pt}=getPropsPT(node,nodeCode,this.props,scope);
    return this.create(props.x,props.y,props.breite,props.hoehe,pt,scope);
  }
}