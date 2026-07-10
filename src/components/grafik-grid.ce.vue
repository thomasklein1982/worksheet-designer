<template>
  <g :style="{'stroke-width':0.1*lineWidth+'ex',stroke: realColor}">
    <g>
      <line v-for="i in (divX+1)" v-if="!(skipOuter && (i===1 || i===(divX+1)))" :x1="scale(minX+(i-1)*stepX)" :y1="scale(minY)" :x2="scale(minX+(i-1)*stepX)" :y2="scale(maxY)"></line>
      <line v-for="i in (divY+1)" v-if="!(skipOuter && (i===1 || i===(divY+1)))" :y1="scale(minY+(i-1)*stepY)" :x1="scale(minX)" :y2="scale(minY+(i-1)*stepY)" :x2="scale(maxX)"></line>
    </g>
  </g>
</template>

<script>
export default {
  components: {

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
    divX: {
      type: Number,
      default: 1
    },
    divY: {
      type: Number,
      default: 1
    },
    lineWidth: {
      type: Number,
      default: 1
    },
    color: {
      type: [Number,String],
      default: 1
    },
    skipOuter: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    realColor: function(){
      if(this.color.substring){
        return this.color;
      }else{
        return "rgb("+[100*this.color,100*this.color,100*this.color].join(",")+")";
      }
    },
    stepX: function(){
      return (this.maxX-this.minX)/this.divX;
    },
    stepY: function(){
      return (this.maxY-this.minY)/this.divY;
    }
  },
  methods: {
    scale: function(a){
      return a;
    }
  }
}
</script>
