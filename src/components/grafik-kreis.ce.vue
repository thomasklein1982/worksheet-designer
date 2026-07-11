<template>
  <circle :config="configCircle"></circle>
</template>

<script>
import { Circle } from 'vue-konva';
export default {
  components: {Circle},
  props: {
    x: {
      type: String,
      default: 0
    },
    y: {
      type: String,
      default: 10
    },
    r: {
      type: String,
      default: 1
    }
  },
  computed: {
    configCircle(){
      return {
        x: this.x*1,
        y: this.y*1,
        radius: this.r*1,
        fill: "red",
        stroke: "black",
        strokeWidth: 4
      };
    }
  }
}
</script>