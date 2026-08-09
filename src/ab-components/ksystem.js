import achse from "./achse";
import { setInScope,getFromScope, getPropsPT } from "../functions/createHtmlCode";

export default {
  props: {
    "min-x": {
      type: Number,
      default: undefined
    },
    "max-x": {
      type: Number,
      default: undefined
    },
    "min-y": {
      type: Number,
      default: undefined
    },
    "max-y": {
      type: Number,
      default: undefined
    },
    "schritt-x": {
      type: Number,
      default: 1
    },
    "schritt-y": {
      type: Number,
      default: 1
    },
  },
  create(minX,maxX,minY,maxY,schrittX,schrittY,pt,scope){
    let g=getFromScope(scope,"grafik");

    if(minX===undefined)minX=g.minX;
    if(maxX===undefined)maxX=g.maxX;
    if(minY===undefined)minY=g.minY;
    if(maxY===undefined)maxY=g.maxY;
    
    let x=achse.create(0,0,1,0,minX,maxX,schrittX,"","");
    let y=achse.create(0,0,0,1,minY,maxY,schrittY,"","");
    let open=`<g ${pt}>`+x.open+x.close+y.open+y.close+"</g>";
    let close="";
    return {open,close};
  },
  createFromHtml(node,nodeCode,scope){
    let {props,pt}=getPropsPT(node,nodeCode,this.props,scope);
    return this.create(props["min-x"],props["max-x"],props["min-y"],props["max-y"],props["schritt-x"],props["schritt-y"],pt,scope);
  }
}