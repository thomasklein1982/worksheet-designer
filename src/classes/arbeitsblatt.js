import Asset from "./asset";

export default class Arbeitsblatt{
  constructor(){
    this.name="AB";
    this.assets=[];
    this.html=`<arbeitsblatt titel="Mein Arbeitsblatt">
  <aufgabe>
    Berechne.
    <abc zeilen="1" spalten="2">
      <formel>\\frac12-0,45</formel>
      <formel>7:4</formel>
    </abc>
  </aufgabe>
  <grafik min-x=0 max-x=10 min-y=0 max-y=10>
    <kreis x=0 y=0 r=4 />
  </grafik>
</arbeitsblatt>`;
    this.realHtml=this.html;
    this.js="";
    this.css="";
  }
  getFullHtmlCode(printButton){
    let code="";
    if(printButton){
      code+="<button class='no-print' onclick='window.print()'>Drucken</button>";
    }
    code+=this.realHtml;
    return `<!DOCTYPE html>
<html>
  <head>
    ${window.additionalCode}
    <style>
      @media print{
        .no-print{
          display: none;
        }
      }
      @media screen{
        .only-print{
          display: none;
        }
      }
    </style>
    
  </head>
  <body>${code}</body><script>
      //katex.render("\\\\pm\\\\int\\\\limits_2^5 f(x) dx", document.body);
    </script></html>`;
  }
  getSaveObject(){
    let obj={
      name: this.name,
      html: this.html,
      js: this.js,
      css: this.css,
      assets: []
    };
    for(let i=0;i<this.assets.length;i++){
      let a=this.assets[i];
      obj.assets.push(a.getSaveObject());
    }
    return obj;
  }
  static createFromSaveObject(obj){
    let a=new Arbeitsblatt();
    a.fromSaveObject(obj);
    return a;
  }
  fromSaveObject(obj){
    this.name=obj.name;
    this.html=obj.html;
    this.css=obj.css;
    this.js=obj.js;
    this.assets=[];
    for(let i=0;i<obj.assets.length;i++){
      let a=obj.assets[i];
      obj.assets.push(Asset.createFromSaveObject(a));
    }
  }
}