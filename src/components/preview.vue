<template>
  <div id="wrapper">
    <div id="controls">
      <input type="range" v-model="scale">
    </div>
    <div ref="content" style="transform-origin: top left; aspect-ratio: 21/29.7; border: 1pt solid black; width: 21cm; padding: 1cm" :style="{transform: 'scale('+(scale/100)+')'}" >
      
    </div>
  </div>
</template>

<script>
export default{
  components: {

  },
  computed: {
  },
  data(){
    return {
      content: "",
      scale: 75
    }
  },
  methods: {
    setContent(t){
      //this.$refs.content.$el.innerHTML=t;
      this.content=t;
      let iframe=document.createElement("iframe");
      iframe.style="background-color: white; width: 100%; height: 100%; overflow: auto";
      if(this.$refs.content.firstChild){
        this.$refs.content.removeChild(this.$refs.content.firstChild);
      }
      this.$refs.content.appendChild(iframe);
      let code=t;
      const blob = URL.createObjectURL(
        new Blob([code], { type: "text/html" })
      );
      iframe.src=blob;
      URL.revokeObjectURL(blob);
    }
  }
}
</script>

<style scoped>
#wrapper{
  overflow: hidden;
  position: relative;
}
#controls{
  position: fixed;
  right: 0;
  top: 0;
}
</style>