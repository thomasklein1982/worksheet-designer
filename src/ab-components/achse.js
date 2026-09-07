import { getFromScope, setInScope, getPropsPT } from "../functions/createHtmlCode";
import punkt from "./punkt";

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
    "verbergen": String
  },
  create(x,y,dx,dy,min,max,schritt,verbergen,pt,scope){
    let grafik=getFromScope(scope,"grafik");
    x*=grafik.zoomX;
    y*=grafik.zoomY;
    let ox=-dy*0.15;
    let oy=dx*0.15;
    let rdx=dx*grafik.zoomX;
    let rdy=dy*grafik.zoomY;
    let sx=x+min*rdx;
    let sy=y+min*rdy;
    let ex=x+max*rdx;
    let ey=y+max*rdy;
    let open=`<g ${pt}><line x1="${sx}" y1="${sy}" x2="${ex}" y2="${ey}"></line>`;
    let start=Math.ceil(min*schritt)/schritt;
    let end=Math.floor(max*schritt)/schritt;
    if(verbergen){
      verbergen=verbergen.split(",");
    }
    while(start<=end){
      let ok=true;
      if(verbergen){
        for(let i=0;i<verbergen.length;i++){
          let v=verbergen[i]*1;
          if(Math.abs(v-start)<0.0001){
            ok=false;
            break;
          }
        }
      }
      if(ok){
        let rx=x+start*dx;
        let ry=y+start*dy;
        open+=`<line x1="${rx*grafik.zoomX+ox}" y1="${ry*grafik.zoomY+oy}" x2="${rx*grafik.zoomX-ox}" y2="${ry*grafik.zoomY-oy}"></line>`;
        let pos;
        if(dx!==0 && dy===0) pos="s";
        if(dx===0 && dy>0) pos="w";
        if(dx===0 && dy<0) pos="e";
        let p=punkt.create(rx+ox*2,ry-oy*2,pos,undefined,"black","0.25pt","",scope);
        open+=p.open+start+p.close;
      }
      start+=schritt;
    }
    let close="</g>";
    return {open,close};
  },
  createFromHtml(node,nodeCode,scope){
    let {props,pt}=getPropsPT(node,nodeCode,this.props,scope);
    return this.createCode(props.x,props.y,props.dx,props.dy,props.min,props.max,props.schritt,props.verbergen,pt,scope);
  }
}