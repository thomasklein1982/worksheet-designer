import { getFromScope, setInScope, getPropsPT } from "../functions/createHtmlCode"

export default {
  props: {
    link: String,
    nummer: {
      type: Number,
      default: 1
    },
    seed: Number,
    spalten: Number,
    hoehe: {
      type: String,
      default: "3cm"
    },
    style: {
      type: String,
      default: ""
    }
  },
  create(link, nummer, seed, spalten, hoehe,style,pt,scope){
    let open,close;
    let pos=link.indexOf("#");
    let before=link.substring(0,pos+1);
    let single={
      n: nummer
    };
    if(spalten) single.c=spalten;
    if(seed!==undefined) single.s=seed;
    single=JSON.stringify(single);
    single=encodeURIComponent(single);
    let after=link.substring(pos+1);
    let realLink=before+"single="+single+";"+after;
    console.log("realLink",realLink);
    style="border: none; outline: none; width: 100%;"+style;
    if(hoehe){
      style="height: "+hoehe+";"+style;
    }
    open=`<iframe class="mathe-trainer" src="${realLink}" style="${style}" ${pt}>`;
    close="</iframe>"
    return {open,close};
  },
  createFromHtml(node,nodeCode,scope){
    let {props,pt}=getPropsPT(node,nodeCode,this.props,scope);
    return this.create(props.link, props.nummer, props.seed,props.spalten, props.hoehe,props.style,pt,scope);
  }
}