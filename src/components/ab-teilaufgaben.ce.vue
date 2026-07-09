<template>
  <div class="teilaufgaben" style="margin-top: 0.2rem;display: grid; grid-auto-flow: column;" :style="{'grid-template-columns': 'repeat('+spalten+',1fr)','grid-template-rows': 'repeat('+zeilen+',1fr)'}">
    <slot></slot>
  </div>
</template>

<script>
export default {
  components: {

  },
  props: {
    spalten: {
      type: [String,Number],
      default: "1"
    },
    zeilen: {
      type: [String,Number],
      default: "1"
    }
  },
  data(){
    return {
      teilaufgabenCount: 0
    };
  },
  mounted(){
    
  }
}
</script>

<style scoped>

</style>