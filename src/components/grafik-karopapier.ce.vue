<template>
  <grafik-grid :color="color*1.8" :line-width="lineWidth*0.8" :min-x="minX" :max-x="maxX" :min-y="minY" :max-y="maxY" :div-x="(maxX-minX)/boxSize" :div-y="(maxY-minY)/boxSize"/>
  
</template>

<script>
import GrafikGrid from './grafik-grid.ce.vue';


export default {
  shadowRoot: false,
  components: {
    GrafikGrid
  },
  props: {
    minX: {
      type: Number,
      default: 0
    },
    maxX: {
      type: Number,
      default: 10
    },
    minY: {
      type: Number,
      default: 0
    },
    maxY: {
      type: Number,
      default: 10
    },
    boxSize: {
      type: Number,
      default: 0.5
    },
    subBoxSize: {
      type: Number,
      default: 0
    },
    color: {
      type: Number,
      default: 1
    },
    lineWidth: {
      type: Number,
      default: 1
    }
  }
}
</script>
