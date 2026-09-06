import { getFromScope, setInScope, getPropsPT, getChildElements } from "../functions/createHtmlCode";

export default {
  props: {
    spalten: Number,
    zeichen: {
      type: String /*a, A, n, -, o, ., >*/,
      default: "a)"
    },
    style: {
      type: String,
      default: ""
    }
  },
  create(anzahlItems,spalten, zeichen, style, pt,scope){
    if(!spalten) spalten=1;
    let zeilen=Math.ceil(anzahlItems/spalten);
    
    zeichen=zeichen.trim();
    let before="";
    let after="";
    let pos=zeichen.indexOf("a");
    if(pos>=0){
      before=zeichen.substring(0,pos);
      after=zeichen.substring(pos+1);
      zeichen="a";
    }else{
      pos=zeichen.indexOf("A");
      if(pos>=0){
        before=zeichen.substring(0,pos);
        after=zeichen.substring(pos+1);
        zeichen="A";
      }else{
        pos=zeichen.indexOf("1");
        if(pos>=0){
          before=zeichen.substring(0,pos);
          after=zeichen.substring(pos+1);
          zeichen="1";
        }
      }
    }

    let gridTemplate="";
    gridTemplate+=`grid-template-columns: repeat(${spalten},1.3em 1fr);`;
    gridTemplate+=`grid-template-rows: repeat(${zeilen},1fr);`;
    gridTemplate+="grid-auto-flow: column;";

    let open=`<div ${pt} class="abc" style="${style};${gridTemplate}">`;
    for(let i=1;i<=zeilen*spalten;i++){
      let c=Math.ceil(i/zeilen)*2-1;
      let r=(i-1)%zeilen+1;
      let z;
      if(i>anzahlItems) z="";
      else{
        z=before;
        if(zeichen==="a") z+=String.fromCodePoint(96+i);
        else if(zeichen==="1") z+=i;
        else if(zeichen==="A") z+=String.fromCodePoint(64+i);
        else z+=zeichen;
        z+=after;
      }
      open+=`<div class="abc-number" style="grid-row: ${r}; grid-column: ${c};">${z}</div>`;
    }
    let close=`</div>`;
    // setInScope(scope,"abc",{
    //   zeilen,spalten,anzahlTeilaufgaben: 0, zeichen
    // });
    return {open,close};
  },
  createFromHtml(node,nodeCode,scope){
    let {props,pt}=getPropsPT(node,nodeCode,this.props,scope);
    console.log("abc",node);
    let childElements=getChildElements(node);
    console.log(childElements);
    return this.create(childElements.length,props.spalten,props.zeichen,props.style,pt,scope);
  }
}