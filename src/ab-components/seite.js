import { setInScope, getPropsPT, parseNode } from "./createHtmlCode";
import kopfzeile from "./kopfzeile-alt";

export default{
  props: {
    
  },
  create(pt,scope){
    scope.variables.seite++;
    scope.endVariables.seiten++;
    let templates=["links","mitte","rechts"];
    let open=`<div class='papier'><div class="seite"><div class="kopfzeile">`;
    let tag;
    for(let i=0; i<templates.length;i++){
      tag=scope.templates["kopfzeile-"+templates[i]];
      if(tag){
        let code=parseNode(scope.code,tag,scope,true);
        open+=code;
      }
    }
    open+=`</div>`;
    // let tag=scope.templates.kopfzeile;
    // if(tag){
    //   let code=parseNode(scope.code,tag,scope,true);
    //   open+=code;
    // }
    open+=`<div class="seiteninhalt">`;
    let close=`</div>`;
    // let flinks=scope.templates["fusszeile-links"];
    // let fmitte=scope.templates["fusszeile-mitte"];
    // let frechts=scope.templates["fusszeile-rechts"];
    // let zeile="";
    // if(flinks){
    //   if(fmitte){
    //     if(frechts){
    //       zeile="lmr";
    //     }else{
    //       zeile="lm";
    //     }
    //   }else{
    //     if(frechts){
    //       zeile="lr";
    //     }else{
    //       zeile="l";
    //     }
    //   }
    // }else{
    //   if(fmitte){
    //     if(frechts){
    //       zeile="mr";
    //     }else{
    //       zeile="m";
    //     }
    //   }else{
    //     if(frechts){
    //       zeile="r";
    //     }else{
    //       zeile="none";
    //     }
    //   }
    // }
    close+=`<div class="fusszeile">`;
    for(let i=0; i<templates.length;i++){
      tag=scope.templates["fusszeile-"+templates[i]];
      if(tag){
        let code=parseNode(scope.code,tag,scope,true);
        close+=code;
      }
    }
    close+=`</div></div></div>`;
    return {
      open, close
    };
  },
  createFromHtml(node,nodeCode,scope){
    let {props,pt}=getPropsPT(node,nodeCode,this.props);
    return this.create(pt,scope);
  }
}