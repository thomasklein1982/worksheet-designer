<template>
  <slot name="titel"><h1>{{ titel }}</h1></slot>
  <slot></slot>
</template>

<script>
export default {
  components: {

  },
  props: {
    titel: String
  },
  data(){
    return {
      aufgabenCount: 0
    }
  }
}
</script>

<style scoped>
h1{
  
}
</style>