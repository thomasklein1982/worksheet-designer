<template>
  <g>
    <grafik-grid v-if="grid" :min-x="minX" :maxX="maxX" :minY="minY" :maxY="maxY" :stepX="stepX" :stepY="stepY"></grafik-grid>
    <grafik-achse :label="labelX" :is-x="true" :min="minX" :max="maxX" :step="stepX" :div="divX" :offset="offsetX" :labels="labelsX" :marker="markerX" :arrow="arrowX"></grafik-achse>
    <grafik-achse :label="labelY" :is-x="false" :min="minY" :max="maxY" :step="stepY" :div="divY" :offset="offsetY" :labels="labelsY" :marker="markerY" :arrow="arrowY"></grafik-achse>
  </g>
</template>

<script>
import GrafikAchse from './grafik-achse.ce.vue';
import GrafikGrid from './grafik-grid.ce.vue';


export default {
  components: {
    GrafikAchse, GrafikGrid
  },
  props: {
    markerX: {
      type: Number,
      default: 0.1
    },
    markerY: {
      type: Number,
      default: 0.1
    },
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
    offsetX: {
      type: Number,
      default: 0
    },
    offsetY: {
      type: Number,
      default: 0
    },
    stepX: {
      type: Number,
      default: 1
    },
    stepY: {
      type: Number,
      default: 1
    },
    divX: {
      type: Number,
      default: 1
    },
    divY: {
      type: Number,
      default: 1
    },
    labelsX: {
      type: Boolean,
      default: true
    },
    labelsY: {
      type: Boolean,
      default: true
    },
    labelX: {
      type: String,
      default: "x"
    },
    labelY: {
      type: String,
      default: "y"
    },
    grid: {
      type: Boolean,
      default: false
    },
    arrowX: {
      type: Number,
      default: 0.05
    },
    arrowY: {
      type: Number,
      default: 0.05
    }
  }
}
</script>
