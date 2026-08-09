<template>
  <Dialog ref="dialog">
    <template #header v-if="ab">
      <h1>Assets für {{ ab.name }}</h1>
    </template>
    <template #content>
      <template v-if="ab">
        <AssetItem 
          v-for="(a,i) in ab.assets" 
          :asset="a"
          @remove="removeAssetAt(i)"
        />
      </template>
    </template>
    <template #controls>
      <button @click="uploadAsset">Hochladen</button>
      <button @click="$refs.dialog.close()">Schließen</button>
    </template>
  </Dialog>
</template>

<script>
import Asset from '../classes/asset.js';
import { upload } from '../functions/helper.js';
import AssetItem from './asset-item.vue';
import Dialog from './dialog.vue';


export default{
  components: {
    AssetItem, Dialog
  },
  data(){
    return {
      ab: null
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
    open(ab){
      this.ab=ab;
      this.$refs.dialog.open();
    }
  }
}
</script>