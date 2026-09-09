import { setInScope,getFromScope, getPropsPT } from "../functions/createHtmlCode";

export default {
  props: {
    "x": {
      type: String,
      default: "auto"
    },
    "y": {
      type: String,
      default: "auto"
    },
    breite: Number,
    hoehe: Number

  },
  create(x,y,breite,hoehe,pt,scope){
    let g=getFromScope(scope,"grafik");
    let open="<g class='karopapier' "+pt+" >";
    if(!x || x===true) x="auto";
    if(!y || y===true) y="auto";
    if(!breite) breite=0.5/g.zoomX;
    if(!hoehe) hoehe=0.5/g.zoomY;
    let minX, maxX, minY, maxY;
    if(x==="auto"){
      minX=g.minX;
      maxX=g.maxX;
    }else{
      let parts=x.split(":");
      minX=parts[0]*1;
      maxX=parts[1]*1;
    }
    if(y==="auto"){
      minY=g.minY;
      maxY=g.maxY;
    }else{
      let parts=y.split(":");
      minY=parts[0]*1;
      maxY=parts[1]*1;
    }

    let sx=Math.ceil(minX/breite)*breite;
    let ex=Math.floor(maxX/breite)*breite;
    let sy=Math.floor(minY/hoehe)*hoehe;
    let ey=Math.floor(maxY/hoehe)*hoehe;

    x=sx;
    while(x<=ex){
      open+=`<line x1="${x*g.zoomX}" y1="${sy*g.zoomY}" x2="${x*g.zoomX}" y2="${ey*g.zoomY}" />`;
      x+=breite;
    }
    y=sy;
    while(y<=ey){
      open+=`<line y1="${y*g.zoomY}" x1="${sx*g.zoomX}" y2="${y*g.zoomY}" x2="${ex*g.zoomX}" />`;
      y+=hoehe;
    }
    let close="</g>";
    return {open,close};
  },
  createFromHtml(node,nodeCode,scope){
    let {props,pt}=getPropsPT(node,nodeCode,this.props,scope);
    return this.create(props.x,props.y,props.breite,props.hoehe,pt,scope);
  }
}