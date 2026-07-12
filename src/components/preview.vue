<template>
  <div id="wrapper">
    <div id="controls">
      <input type="range" v-model="scale">
    </div>
    <div style="transform-origin: top left; aspect-ratio: 21/29.7; border: 1pt solid black; width: 21cm; padding: 1cm" :style="{transform: 'scale('+(scale/100)+')'}" v-html="content"></div>
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
      this.content=t;
    }
  }
}
</script>

<style scoped>
#wrapper{
  overflow: auto;
  position: relative;
}
#controls{
  position: fixed;
  right: 0;
  top: 0;
}
</style>