export default class Asset{
  constructor(){
    this.name="";
    this.dataURL="";
  }
  getSaveObject(){
    return {
      name: this.name,
      dataURL: this.dataURL
    }
  }
  static createFromSaveObject(obj){
    let a=new Asset();
    a.fromSaveObject(obj);
    return a;
  }
  fromSaveObject(obj){
    this.name=obj.name;
    this.dataURL=obj.dataURL;
  }
}