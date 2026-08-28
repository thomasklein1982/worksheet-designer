<template>
  <Dialog ref="dialog">
    <template #header>
      <h1>Fragmente</h1>
    </template>
    <template #content>
      Fragmente sind Dateien, die in andere Dateien mittels <code>&lt;fragment&gt;&lt;/fragment\&gt;</code> eingefügt werden können.
      <template v-for="(f,i) in fragments">
        <FragmentItem 
          :fragment="f"
          @open="$emit('open-fragment',f)"
        />
      </template>
    </template>
    <template #controls>
      <button @click="$refs.dialog.close()">Schließen</button>
    </template>
  </Dialog>
</template>

<script>

import Dialog from './dialog.vue';
import FragmentItem from './fragment-item.vue';


export default{
  components: {
    FragmentItem, Dialog
  },
  props: {
    fragments: Array
  },
  data(){
    return {
      
    }
  },
  methods: {
    removeAssetAt(index){
      let a=confirm("Willst du das Asset '"+this.ab.assets[index].name+"' wirklich löschen?");
      if(!a) return;
      this.ab.removeAssetAt(index);
    },
    async uploadAsset(){
      let files=await upload({multi: true, dataURL: true});
      if(!files) return;
      console.log(files);
      for(let i=0;i<files.length;i++){
        let f=files[i];
        let name=f.fileName;
        let pos=name.lastIndexOf(".");
        let ext=name.substring(pos+1);
        name=name.substring(0,pos);
        let a=new Asset(name,f.code,f.mime,ext);
        this.ab.addAsset(a);
      }
    },
    open(){
      
      this.$refs.dialog.open();
    },
    close(){
      this.$refs.dialog.close();
    }
  }
}
</script>