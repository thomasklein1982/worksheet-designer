import Asset from "./asset";

export default class Arbeitsblatt{
  constructor(){
    this.name="AB";
    this.assets={};
    this.html=`<style>
  .seiteninhalt{
    margin: 1cm 2cm;
  }
  .kopfzeile{
    background-color: lightgrey;
    padding: 0cm 1cm;
  }
  .fusszeile{
    padding-bottom: 1cm;
  }
</style>

<fusszeile>Seite {{#seite}} von {{##seite}}</fusszeile>

<kopfzeile links>Mathematik 7a</kopfzeile>
<kopfzeile><h2>Wiederholung Bruchrechnung</h1></kopfzeile>
<kopfzeile rechts>Frau Klein</kopfzeile>

<script>
  $.a=7
  $.werte=["Test","Bla","Blup","Grrr"]
</script>

<loop for="(a,i) in werte">
  {{i}}. {{a}}
  <if cond="i===1">
    i ist 1
  </if>
  <elseif cond="i===0">
    i ist 0
  </elseif>
  <else>
    i ist etwas anderes
  </else>
</loop>

<seite>
  Gesamtpunkte: {{##punkte}}

  <abstand y=1cm></abstand>
  
  <aufgabe>
    <punkte>4</punkte>
    Berechne.
    <abc zeilen=1 spalten=2>
      <formel>\\frac12-0{,}45</formel>
      <formel>7:4</formel>
    </abc>
    <bild datei="streckenplan" breite="4cm"/>
  </aufgabe>
  <aufgabe>
    <punkte>3</punkte>Bestimme näherungsweise den Flächeninhalt des blauen Kreises.
    <abstand y=0.2cm></abstand>
    <grafik min-x=0 max-x=6 min-y=0 max-y=6>
      <karopapier/>
      <kreis x=3 y=3 r=2 fill=rgba(0,0,255,0.5) />
    </grafik>
  </aufgabe>
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
    <meta charset="UTF-8"></meta>
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