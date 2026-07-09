<template>
  <div id="wrapper" v-html="content">

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