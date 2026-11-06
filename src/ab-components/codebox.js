import { getFromScope, setInScope, getPropsPT, getTagContentAsString } from "../functions/createHtmlCode"

export default {
  props: {
    
  },
  create(code,pt,scope){
    // code=code.replace(/</g,"&lt;");
    // code=code.replace(/>/g,"&gt;");
    let id="codebox"+Math.floor(Math.random()*100000000);
    let lines=code.split("\n");
    let open=`<div class="codebox" ${pt}><textarea disabled class="codebox-numbers">`;
    let linenumber=1;
    for(let i=0;i<lines.length;i++){
      open+=linenumber+"\n";
      linenumber++;
    }
    open+=`</textarea><textarea disabled id="${id}" class="codebox-code"></textarea><div style="display: none">`;
    let close="</div></div><script>setTimeout(()=>{document.getElementById("+JSON.stringify(id)+").value="+JSON.stringify(code)+";},10);</script>";
    return {open,close};
  },
  createFromHtml(node,code,scope){
    let content=getTagContentAsString(node,code);
    let {props,pt}=getPropsPT(node,code,this.props,scope);
    return this.create(content,pt,scope);
  }
}
