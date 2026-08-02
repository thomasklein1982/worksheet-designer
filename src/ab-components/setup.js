import { getPropsPT } from "./createHtmlCode";

export default {
  props: {
    papier: String,
    aufgabe: String,
    punkte: String
  },
  create(papier, aufgabe,punkte,pt,scope){
    if(papier){
      let w=21;
      let h=29.7;
      
      papier=papier.toLowerCase();
      let parts=papier.split("x");
      if(parts.length===2){
        w=parts[0]*1;
        h=parts[1]*1;
      }else{
        if(papier==="a5"){
          h=21;
          w=14.8;
        }
      }
      app.setupData.width=w;
      app.setupData.height=h;
    }
    if(aufgabe!==undefined){
      scope.setup.aufgabe=aufgabe;
    }
    if(punkte!==undefined){
      scope.setup.punkte=punkte;
    }
    let open=null;
    let close=null;
    return {open,close};
  },
  createFromHtml(node,code,scope){
    let {props,pt}=getPropsPT(node,code,this.props,scope);
    return this.create(props.papier,props.aufgabe,props.punkte,pt,scope);
  }
}