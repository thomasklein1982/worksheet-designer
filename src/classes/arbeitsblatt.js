import Asset from "./asset";

export default class Arbeitsblatt{
  constructor(){
    this.name="AB";
    this.assets={};
    this.html=`<aufgabe>
  Berechne.
  <abc zeilen="1" spalten="2">
    <formel>\\frac12-0,45</formel>
    <formel>7:4</formel>
  </abc>
</aufgabe>
<grafik min-x=0 max-x=10 min-y=0 max-y=10>
  <kreis x=0 y=0 r=4 />
</grafik>`;
    this.realHtml=this.html;
    this.js="";
    this.css="";
  }
  getFullHtmlCode(printButton){
    let code="";
    if(printButton){
      code+="<div class='no-print'><button onclick='window.print()'>Drucken</button></div>";
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
  <body>
  ${code}
  </body>
</html>`;
  }
  getSaveObject(){
    let obj={
      name: this.name,
      html: this.html,
      js: this.js,
      css: this.css,
      assets: {}
    };
    for(let n in this.assets){
      let a=this.assets[n];
      obj.assets[a.name.toLowerCase()]=a.getSaveObject();
    }
    return obj;
  }
  addAsset(a){
    this.assets[a.name.toLowerCase()]=a;
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
    this.assets={};
    for(let n in obj.assets){
      let a=obj.assets[n];
      a=Asset.createFromSaveObject(a);
      this.addAsset(a);
    }
  }
}