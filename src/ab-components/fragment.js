import abHtml from "../functions/ab-html";
import { getFromScope, setInScope, getPropsPT, createHtmlCode } from "../functions/createHtmlCode"
import { app } from "../main";

export default {
  props: {
    name: String
  },
  create(name,pt,scope){
    let open,close;
    let f=app.getFragmentByName(name);
    if(!f) throw "Es gibt kein Fragment namens "+name;
    let code=f.html;
    let tree=abHtml.language.parser.parse(code);
    let html=createHtmlCode(code,tree,scope);
    open=html;
    close="";
    return {open,close};
  },
  createFromHtml(node,nodeCode,scope){
    let {props,pt}=getPropsPT(node,nodeCode,this.props,scope);
    return this.create(props.name,pt,scope);
  }
}