import { getFromScope, setInScope, getPropsPT } from "../functions/createHtmlCode"

export default {
  props: {
    
  },
  create(pt,scope){
    let open=`<table class="punktspiegel randlos">
      <tr>
        <th>1</th><th>2</th><th>3</th><th>4</th><th>5</th><th>6</th><th>⌀</th>
      </tr>
      <tr>
        <td>&nbsp;</td><td></td><td></td><td></td><td></td><td></td><td></td>
      </tr>`;
    let close="</table>"
    return {open,close};
  },
  createFromHtml(node,code,scope){
    let {props,pt}=getPropsPT(node,code,this.props,scope);
    return this.create(pt,scope);
  }
}