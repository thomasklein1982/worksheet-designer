import Asset from "./asset";

export default class Arbeitsblatt{
  constructor(){
    this.name="AB";
    this.assets=[];
    this.html=`<ab-arbeitsblatt titel="Mein Arbeitsblatt">
  <ab-aufgabe>
    Berechne.
    <ab-teilaufgaben zeilen="1" spalten="2">
      <ab-formel tex="\\frac12-0,45"></ab-formel>
      <ab-formel tex="7:4"></ab-formel>
    </ab-teilaufgaben>
  </ab-aufgabe>
  <ab-grafik min-x="0" max-x="10" karo-papier breite="5cm">
    <line stroke="black" x1="0" x2="10" y1="0" y2="4"></line>
  </ab-grafik>
</ab-arbeitsblatt>`;
    this.js="";
    this.css="";
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