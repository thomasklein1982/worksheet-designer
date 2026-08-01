import { getFromScope, setInScope, getPropsPT } from "./createHtmlCode"

export default {
  props: {
    cond: String
  },
  create(cond, pt,scope){
    console.error("This should never be called");
    return {open: "",close: null};
  },
  createFromHtml(node,code,scope){
    let {props,pt}=getPropsPT(node,code,this.props,scope);
    let cond=props.cond;
    let next=node.nextSibling;
    while(next && next.name==="Text") next=next.nextSibling;
    let close=null;
    let open={
      ifelse: true,
      ifs: [{node,cond}],
      else: null
    };
    let ended=false;
    while(next){
      let tag=next;
      let openTag=tag.firstChild;
      if(!openTag) break;
      let nameTag=openTag.firstChild?.nextSibling;
      if(!nameTag) break;
      let name=code.substring(nameTag.from,nameTag.to).toLowerCase();
      if(name==="else"){
        if(open.else) throw "Doppeltes 'else'";

        open.else=next;
      }else if(name==="elseif"){
        if(open.else) throw "'elseif' nach 'else'";
        let {props,pt}=getPropsPT(next,code,this.props,scope);
        let cond=props.cond;
        open.ifs.push({
          node: next,
          cond
        });
      }else{
        break;
      }
      next=next.nextSibling;
      while(next && next.name==="Text") next=next.nextSibling;
    }
    return { open,close };
  }
}