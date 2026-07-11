<template>
  <stage :config="configKonva" style="width: 5cm">
    <layer>
      <slot></slot>
    </layer>
  </stage>
</template>

<script>
import {Layer, Stage} from "vue-konva/core"
export default {
  shadowRoot: false,
  components: {
    Layer, Stage
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
    scale: {
      type: Number,
      default: 1
    },
    fontScale: {
      type: Number,
      default: 1
    },
    system: {
      type: Boolean,
      default: false
    },
    karoPapier: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    configKonva(){
      let width=this.maxX*1-this.minX*1;
      let height=this.maxY*1-this.minY*1;
      return {
        width, height
      };
    }
  }
}
</script>