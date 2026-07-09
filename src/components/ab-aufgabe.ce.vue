<template>
  <h3>Aufgabe {{number}}{{ titel? ':'+titel:'' }}</h3>
  <div><slot></slot></div>
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
      number: 0
    };
  },
  mounted(){
    let p=this.$parent;
    p.aufgabenCount++;
    this.number=p.aufgabenCount;
  }
}
</script>

<style scoped>
h1{
  color: red;
  font-size: 8px;
}
</style>