<template>
  <div style="border: 1pt solid black; overflow: auto">
    {{ asset.name }}
    <img v-if="isImage" :src="asset.dataURL" style="max-width: 100px; max-height: 100px"/>
    <div>
      <button @click="download">💾</button>
      <button @click="remove">🗑</button>
      <button @click="rename">✎</button>
    </div>
  </div>
</template>

<script>
import { download } from '../functions/helper';

export default{
  props: {
    asset: Object
  },
  computed: {
    isImage(){
      return this.asset.mime.startsWith("image");
    }
  },
  data(){
    return {

    };
  },
  methods: {
    download(){
      download(this.asset.dataURL,this.asset.name+"."+this.asset.fileExtension);
    },
    remove(){
      this.$emit("remove");
    },
    rename(){
      let a=prompt("Neuen Name eingeben:",this.asset.name);
      if(!a) return;

      this.asset.name=a;
    }
  }
}
</script>