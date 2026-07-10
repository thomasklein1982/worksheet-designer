<template>
  <div id="wrapper">
    <div style="transform: scale(0.75); transform-origin: top left;" v-html="content"></div>
  </div>
</template>

<script>
export default{
  components: {

  },
  data(){
    return {
      content: "",
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
}
</style>