import { getFromScope, setInScope, getPropsPT } from "../functions/createHtmlCode"

export default {
  props: {
    "x": {
      type: Number,
      default: 0
    },
    "y": {
      type: Number,
      default: 0
    },
    "form": String,
    pos: String,
    farbe: {
      type: "String",
      default: "black"
    },
    groesse: {
      type: String,
      default: "0.5pt"
    }
  },
  create(x,y,form,pos,farbe,groesse,pt,scope){
    let g=getFromScope(scope,"grafik");
    x*=g.zoomX;
    y*=g.zoomY;
    let transformText=`matrix(1,0,0,-1,0,0)`;
    let transformGroup=`matrix(1,0,0,1,${x},${y})`;
    let open=`<g class="punkt" transform="${transformGroup}" ${pt}>`;
    if(form==="."){
      open+=`<circle fill="${farbe}" cx="0" cy="0" r="0.1" ></circle>`;
    }else if(form==="x"){
      let size=0.11;
      open+=`<line stroke="${farbe}" x1="${-size}" y1="${-size}" x2="${size}" y2="${size}"/><line stroke="${farbe}" x1="${-size}" y1="${size}" x2="${size}" y2="${-size}"/>`
    }
    let dx=0; let dy=0;
    let baseline="middle";
    let anchor="middle";
    if(pos!==undefined){
      pos=pos.toLowerCase();
      let distX=0.2;
      let dist=0.5;
      if(pos.indexOf("n")>=0){
        dy=-dist;
      }
      if(pos.indexOf("s")>=0){
        dy=dist;
      }
      if(pos.indexOf("w")>=0){
        dx=-distX;
        anchor="end";
      }
      if(pos.indexOf("o")>=0){
        dx=distX;
        anchor="start";
      }
    }
    open+=`<text transform="${transformText}" stroke="none" fill="${farbe}" dominant-baseline="${baseline}" text-anchor="${anchor}" font-size="${groesse}" x="0" y="0" dx="${dx}" dy="${dy}">`;
    let close="</text></g>";
    return {open,close};
  },
  createFromHtml(node,nodeCode,scope){
    let {props,pt}=getPropsPT(node,nodeCode,this.props,scope);
    return this.create(props.x,props.y,props.form,props.pos,props.farbe,props.groesse,pt,scope);
  }
}