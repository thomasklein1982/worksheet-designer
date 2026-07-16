import Asset from "./asset";

export default class Arbeitsblatt{
  constructor(){
    this.name="AB";
    this.assets={};
    this.html=`<style>
  .seite{
    margin: 1cm;
  }
</style>

<fusszeile>
  <div>Links</div>
  <div>Seite {{#seite}} von {{#seiten}}</div>
  <div>Rechts</div>
</fusszeile>

<kopfzeile>
  <div>
    <bild datei="https://thomaskl.uber.space/Apps/java-app/Logo.png" hoehe=2cm></bild>
  </div>
  <div>Physik 7d</div>
  <div>Frau Klein</div>
</kopfzeile>

<seite>
  <aufgabe>
    Berechne.
    <abc zeilen=1 spalten=2>
      <formel>\\frac12-0{,}45</formel>
      <formel>7:4</formel>
    </abc>
    <bild datei="streckenplan" breite="4cm"/>
  </aufgabe>
  <grafik min-x=0 max-x=10 min-y=0 max-y=10>
    <kreis x=0 y=0 r=4 />
  </grafik>
</seite>

<seite>
  <aufgabe>
    Berechne.
    <abc zeilen="1" spalten="2">
      <formel>\\frac12-0{,}45</formel>
      <formel>7:4</formel>
    </abc>
    <bild datei="streckenplan" breite="4cm"/>
  </aufgabe>
  <grafik min-x=0 max-x=10 min-y=0 max-y=10>
    <kreis x=0 y=0 r=4 />
  </grafik>
</seite>`;
    this.realHtml=this.html;
    this.js="";
    this.css="";
  }
  
  getFullHtmlCode(production){
    let code="";
    if(production){
      code+=`<div class='no-print'>
  <button style='height: 1cm' onclick='window.print()'>Drucken</button>
</div>`;
    }
    code+=this.realHtml;
    return `<!DOCTYPE html>
<html>
  <head>
    ${window.additionalCode}
    <style>
      
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