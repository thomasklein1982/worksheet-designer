import { getFromScope, setInScope, getPropsPT, getTagContentAsString } from "../functions/createHtmlCode"

export default {
  props: {
    layout: {
      type: String,
      default: "1"
    },
    breite: String,
    hoehe: String
  },
  create(layout,breite,hoehe,pt,scope){
    let style=generateStyleFromLayout(layout);
    if(breite){
      style+="; width: "+breite+";";
    }
    if(hoehe){
      style+="height: "+hoehe+";";
    }
    let open=`<div class="jframe" style="${style}" ${pt}>`;
    let close="</div>";
    return {open,close};
  },
  createFromHtml(node,code,scope){
    let {props,pt}=getPropsPT(node,code,this.props,scope);
    return this.create(props.layout,props.breite,props.hoehe,pt,scope);
  }
}

export function generateStyleFromLayout(layout){
  let style=[];
  if(!layout){
    style.push("overflow: auto");
    return style.join(";");
  }
  style.push("display: grid");
  let teile=layout.split("/");
  for(let i=0;i<teile.length;i++){
    var t=teile[i].trim();
    if(/^\d+$/.test(t)){
      teile[i]="repeat("+t+",minmax(0,1fr))";
    }
  }
  if(teile.length===2){
    style.push(`grid-template-rows: ${teile[0]}; grid-template-columns: ${teile[1]}`);
  }else{
    style.push(`grid-template-columns: ${teile[0]}`);
  }
  style.push(`grid-auto-rows: minmax(0,1fr); display: grid; align-items: safe center; justify-items: safe center; grid-column-gap: 0; grid-row-gap: 0; column-gap: 0; row-gap: 0; overflow: auto;`);
  return style.join(";");
}