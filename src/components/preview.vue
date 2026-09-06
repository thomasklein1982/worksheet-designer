<template>
  <div id="wrapper" class="flex-container-column">
    <div id="controls" >
      <input type="range" v-model="scale"></input>
    </div>
    <div id="scroll" >
      <div ref="content"  style="transform-origin: top left; aspect-ratio: 21/29.7; border: 1pt solid black; width: 21cm;  height: 100%;" :style="{transform: 'scale('+(realScale)+')', height: (100/realScale-2)+'%', 'aspect-ratio': $root.setupData.width/$root.setupData.height, width: $root.setupData.width+1+'cm'}" >
        
      </div>
    </div>
  </div>
</template>

<script>
export default{
  components: {

  },
  computed: {
    realScale(){
      return (this.scale*1+25)/125.0;
    }
  },
  data(){
    return {
      content: "",
      scale: 40,
      iframe: null
    }
  },
  methods: {
    setContent(t){

      let oldDoc=this.$refs.content?.childNodes[0]?.contentDocument;
      let scrollX=0;
      let scrollY=0;
      if(oldDoc){
        scrollX=oldDoc.documentElement.scrollLeft;
        //window.iframe.contentDocument.documentElement.scrollTop
        scrollY=oldDoc.documentElement.scrollTop;
      }
      console.log(scrollX,scrollY);
      //this.$refs.content.$el.innerHTML=t;
      this.content=t;
      let iframe=document.createElement("iframe");
      window.iframe=iframe;
      this.iframe=iframe;
      iframe.style="background-color: white; width: 100%; height: 100%; overflow: auto";
      if(this.$refs.content.firstChild){
        this.$refs.content.removeChild(this.$refs.content.firstChild);
      }
      this.$refs.content.appendChild(iframe);
      let code=t;
      const blob = URL.createObjectURL(
        new Blob([code], { type: "text/html" })
      );
      iframe.onload=()=>{
        iframe.contentDocument.documentElement.scrollLeft=scrollX;
        iframe.contentDocument.documentElement.scrollTop=scrollY;
      };
      iframe.src=blob;
      URL.revokeObjectURL(blob);
      
      setTimeout(()=>{
      },100)
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
  position: absolute;
  right: 0;
  top: 0;
  z-index: 1;
}
#scroll{
  overflow-x: auto;
  overflow-y: hidden;
}
</style>