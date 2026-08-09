<template>
  <Editor ref="editor" :abs="abs"/>
</template>

<script>
import jsPDF from 'jspdf';
import Arbeitsblatt from './classes/arbeitsblatt.js';
import Editor from './components/editor.vue';
import { download, upload } from './functions/helper.js';
import html2canvas from 'html2canvas';
import {version} from "../package.json";
import sleep from './functions/sleep.js';
import localforage from 'localforage';

const KEY_ABS="worksheet-designer-abs";

export default{
  components: {
    Editor
  },
  computed: {
    currentAB(){
      return this.abs[this.currentABIndex];
    }
  },
  data(){
    return {
      abs: [],
      cmInPx: 1,
      version: version,
      setupData: {
        width: 21,
        height: 29.7
      }
    }
  },
  mounted(){
    let div=document.getElementById("div1cm");
    this.cmInPx=div.offsetWidth;
    console.log("cm in px",this.cmInPx);
    this.loadLocally();
  },
  methods: {
    saveLocally(){
      let abs=[];
      for(let i=0;i<this.abs.length;i++){
        abs.push(this.abs[i].getSaveObject());
      }
      localforage.setItem(KEY_ABS,JSON.stringify(abs));
    },
    async loadLocally(){
      let abs=await localforage.getItem(KEY_ABS);
      if(!abs) return;
      abs=JSON.parse(abs);
      this.abs=[];
      for(let i=0;i<abs.length;i++){
        let ab=Arbeitsblatt.createFromSaveObject(abs[i]);
        this.abs.push(ab);
      }
      this.$refs.editor.selectAB(0);
    },
    getCurrentAB(){
      return this.$refs.editor.currentAB;
    },
    createAB(template){
      let namePrefix="AB";
      let name=namePrefix;
      let index=this.getABIndexByName(name);
      let i=0;
      while(index>=0){
        i++;
        name=namePrefix+i;
        index=this.getABIndexByName(name);
      }
      let a=new Arbeitsblatt();
      a.name=name;
      a.html=template.content;
      this.abs.push(a);
      this.$refs.editor.selectAB(this.abs.length-1);
      this.saveLocally();
    },
    saveAB(ab){
      download(JSON.stringify(ab.getSaveObject(),null," "),ab.name+".txt","text/txt");
    },
    renameAB(ab){
      let n=prompt("Neuer Name",ab.name);
      if(!n) return;
      ab.name=n;
      this.saveLocally();
    },
    getABIndexByName(name){
      for(let i=0;i<this.abs.length;i++){
        let a=this.abs[i];
        if(a.name===name) return i;
      }
      return -1;
    },
    async exportAB(ab){
      let code=ab.getFullHtmlCode(true);
      //const doc=new jsPDF();
      let body=this.$refs.editor.$refs.preview.iframe.contentWindow.document.body;
      let seiten=body.querySelectorAll(".papier");
      let w=app.setupData.width*10;
      let h=app.setupData.height*10;
      const pdf = new jsPDF({
        orientation: w<=h? "p": "l",
        unit: "mm",
        format: [w,h]
      });
      let pdfHeight=pdf.internal.pageSize.height;
      let pdfWidth=pdf.internal.pageSize.width;
      for(let i=0;i<seiten.length;i++){
        if(i>0){
          pdf.addPage();
        }
        let seite=seiten[i];
        let canvas = await html2canvas(seite, {
          scale: 2, // 2x resolution for sharper output
          useCORS: true, // Enable cross-origin images
          logging: false,
          backgroundColor: "#ffffff",
        });
        
        let imgData = canvas.toDataURL("image/png");

        pdf.addImage(imgData, "JPEG", 0, 0, pdfWidth, pdfHeight, null, 'FAST');
      }
      pdf.save(ab.name+".pdf");
    },
    printAB(ab){
      let code=ab.getFullHtmlCode(true);

      const blob = URL.createObjectURL(
        new Blob([code], { type: "text/html" })
      );
      window.open(blob);
      //URL.revokeObjectURL(blob);
      // let print=document.getElementById("print");
      // print.innerHTML=ab.realHtml;
      // setTimeout(()=>{
      //   window.print();
      // },100);
    },
    async openAB(){
      let f=await upload();
      if(!f) return;
      let a=Arbeitsblatt.createFromSaveObject(JSON.parse(f.code));
      if(!a) return;
      let pos=f.fileName.lastIndexOf(".");
      a.name=f.fileName.substring(0,pos);
      let index=this.getABIndexByName(a.name);
      if(index>=0){
        let ans=confirm("Du hast diese Datei bereits geöffnet.\n\nWenn du sie erneut öffnest, gehen deine Änderungen verloren.\n\nWillst du fortfahren?");
        if(!ans) return;
        this.abs.splice(index,1,a);
      }else{
        index=this.abs.length;
        this.abs.push(a);
      }
      this.$refs.editor.selectAB(index);
      this.saveLocally();
    }
  }
}
</script>