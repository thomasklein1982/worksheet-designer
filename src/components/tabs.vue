<template>
  <div>
    <button :class="selectedIndex===i? 'selected':'not-selected'" @click="changeTab(i)" v-for="(ab,i) in abs">{{ ab.name }}</button>
  </div>
</template>

<script>
export default{
  props: {
    abs: Array,
    selectedIndex: Number
  },
  components: {

  },
  methods: {
    changeTab(index){
      this.$emit("changeTab",index);
    }
  }
}
</script>

<style scoped>
.selected{
  background-color: yellow;
}
.not-selected{
  background-color: white;
}
</style>