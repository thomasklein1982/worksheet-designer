import achse from "./achse";
import { setInScope,getFromScope, getPropsPT } from "../functions/createHtmlCode";

export default {
  props: {
    x: String,
    y: String
  },
  create(x,y,pt,scope){
    let g=getFromScope(scope,"grafik");
    let minX, maxX, schrittX=1, minY, maxY, schrittY=1;
    if(x){
      let parts=x.split(":");
      minX=parts[0]*1;
      maxX=parts[1]*1;
      if(parts.length===3) schrittX=parts[2]*1;
    }else{
      minX=g.minX;
      maxX=g.maxX;
    }
    if(y){
      let parts=y.split(":");
      minY=parts[0]*1;
      maxY=parts[1]*1;
      if(parts.length===3) schrittY=parts[2]*1;
    }else{
      minY=g.minY;
      maxY=g.maxY;
    }
    
    let xa=achse.create(0,0,1,0,minX,maxX,schrittX,"0","",scope);
    let ya=achse.create(0,0,0,1,minY,maxY,schrittY,"0","",scope);
    let open=`<g ${pt}>`+xa.open+xa.close+ya.open+ya.close+"</g>";
    let close="";
    return {open,close};
  },
  createFromHtml(node,nodeCode,scope){
    let {props,pt}=getPropsPT(node,nodeCode,this.props,scope);
    return this.create(props.x,props.y,pt,scope);
  }
}