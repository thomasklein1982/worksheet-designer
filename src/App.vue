<template>
  <Editor ref="editor" :abs="abs"/>
</template>

<script>
import Arbeitsblatt from './classes/arbeitsblatt.js';
import Editor from './components/editor.vue';
import { download, upload } from './functions/helper.js';

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
      cmInPx: 1
    }
  },
  mounted(){
    let div=document.getElementById("div1cm");
    this.cmInPx=div.offsetWidth;
    console.log("cm in px",this.cmInPx);
  },
  methods: {
    createAB(){
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
      this.abs.push(a);
      this.$refs.editor.selectAB(this.abs.length-1);
    },
    saveAB(ab){
      download(JSON.stringify(ab.getSaveObject(),null," "),ab.name+".txt","text/txt");
    },
    renameAB(ab){
      let n=prompt("Neuer Name",ab.name);
      if(!n) return;
      ab.name=n;
    },
    getABIndexByName(name){
      for(let i=0;i<this.abs.length;i++){
        let a=this.abs[i];
        if(a.name===name) return i;
      }
      return -1;
    },
    printAB(ab){
      let print=document.getElementById("print");
      print.innerHTML=ab.realHtml;
      setTimeout(()=>{
        window.print();
      },100);
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
    }
  }
}
</script>