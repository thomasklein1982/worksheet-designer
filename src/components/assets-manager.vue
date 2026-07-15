<template>
  <div class="dialog-backdrop" :style="backdropStyle">
    <div class="dialog" v-if="ab">
      <div class="flex-1 flex-container-column" style="overflow: hidden">
        <h1>Assets für {{ ab.name }}</h1>
        <div class="flex-1 flex-container" style="flex-wrap: wrap; overflow: auto">
          <AssetItem v-for="(a,i) in ab.assets" :asset="a"/>
        </div>
      </div>
      <div style="text-align: right">
        <button @click="uploadAsset">Hochladen</button>
        <button @click="show=false">Schließen</button>
      </div>
    </div>
  </div>
</template>

<script>
import Asset from '../classes/asset.js';
import { upload } from '../functions/helper.js';
import AssetItem from './asset-item.vue';


export default{
  components: {
    AssetItem
  },
  computed: {
    backdropStyle(){
      return {
        display: this.show? '':'none'
      };
    }
  },
  data(){
    return {
      show: false,
      ab: null
    }
  },
  methods: {
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
      this.show=true;
    }
  }
}
</script>