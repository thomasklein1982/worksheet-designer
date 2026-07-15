export default class Asset{
  constructor(name,dataURL,mime,fileExtension){
    this.name=name;
    this.dataURL=dataURL;
    this.mime=mime;
    this.fileExtension=fileExtension;
  }
  getSaveObject(){
    return {
      name: this.name,
      dataURL: this.dataURL,
      mime: this.mime,
      fileExtension: this.fileExtension
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
    this.mime=obj.mime;
    this.fileExtension=obj.fileExtension;
  }
}