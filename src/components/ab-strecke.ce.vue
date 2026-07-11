<template>
  <g><line stroke="black" :x1="x1*1" :y1="y1*1" :x2="x2*1" :y2="y2*1"></line></g>
</template>

<script>
export default {
  shadowRoot: false,
  components: {

  },
  props: {
    x1: {
      type: Number,
      default: 0
    },
    y1: {
      type: Number,
      default: 0
    },
    x2: {
      type: Number,
      default: 0
    },
    y2: {
      type: Number,
      default: 0
    },
  },
  computed: {
    
  },
  methods: {
    
  }
}
</script>
