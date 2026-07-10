<template>
  <g>
    <g v-if="direction!==null">
      <line :x1="scaleX(min*direction[0])" :y1="scaleY(min*direction[1])" :x2="scaleX(max*direction[0])" :y2="scaleY(max*direction[1])"></line>
      <polygon v-if="arrow>0" :points="arrowPoints"></polygon>
      <g v-if="marker>0" style="stroke-width: 0.2ex">
        <g v-for="i in labelCount">
          <line :x1="scaleX((minLabel+(i-1)*step)*direction[0]-normalVector[0]*marker)" :y1="scaleY((minLabel+(i-1)*step)*direction[1]-normalVector[1]*marker)" :x2="scaleX((minLabel+(i-1)*step)*direction[0]+normalVector[0]*marker)" :y2="scaleY((minLabel+(i-1)*step)*direction[1]+normalVector[1]*marker)"></line>
          <grafik-label :scale="0.8" v-if="labels && minLabel+(i-1)*step!==0" :x="(minLabel+(i-1)*step)*direction[0]+normalVector[0]*2*marker" :y="(minLabel+(i-1)*step)*direction[1]+normalVector[1]*3*marker" pos="cc">{{minLabel+(i-1)*step}}</grafik-label>
        </g>
      </g>
      <grafik-label color="red" :scale="0.8" :x="scaleX((max)*direction[0]+normalVector[0]*labelDistanceFactor*marker*3)" :y="scaleY((max)*direction[1]+normalVector[1]*labelDistanceFactor*marker*3)" pos="cc">{{label}}</grafik-label>
    </g>
    <g v-else-if="isX">
      <line :x1="scaleX(min)" :y1="scaleY(offset)" :x2="scaleX(max)" :y2="scaleY(offset)"></line>
      <polygon v-if="arrow>0" :points="arrowPoints"></polygon>
      <g v-if="marker>0" style="stroke-width: 0.2ex">
        <g v-for="i in labelCount">
          <line  :x1="scaleX(minLabel+(i-1)*step)" :y1="scaleY(offset-marker)" :x2="scaleX(minLabel+(i-1)*step)" :y2="scaleY(offset+marker)"></line>
          <grafik-label :scale="0.8" v-if="labels && (minLabel+(i-1)*step!==0 || includeZero)" :x="scaleX(minLabel+(i-1)*step)" :y="scaleY(offset-marker*1.5)" pos="cb">{{minLabel+(i-1)*step}}</grafik-label>
        </g>
      </g>
      <grafik-label color="red" :scale="0.8" :x="scaleX(max)" :y="scaleY(labelDistanceFactor*marker)" pos="cb">{{label}}</grafik-label>
    </g>
    <g v-else>
      <line :x1="scaleX(offset)" :y1="scaleY(min)" :x2="scaleX(offset)" :y2="scaleY(max)"></line>
      <polygon v-if="arrow>0" :points="arrowPoints"></polygon>
      <g v-if="marker>0" style="stroke-width: 0.2ex">
        <g v-for="i in labelCount">
          <line  :y1="scaleY((minLabel+(i-1)*step))" :x1="scaleX(offset-marker)" :y2="scaleY(minLabel+(i-1)*step)" :x2="scaleX(offset+marker)"></line>
          <grafik-label :scale="0.8" v-if="labels && (minLabel+(i-1)*step!==0 || includeZero)" :y="scaleY(minLabel+(i-1)*step)" :x="scaleX(offset-marker*1.5)" pos="lc">{{minLabel+(i-1)*step}}</grafik-label>
        </g>
      </g>
      <grafik-label color="red" :scale="0.8" :x="scaleX(-labelDistanceFactor*marker)" :y="scaleY(max)" pos="lc">{{label}}</grafik-label>
    </g>
  </g>
</template>

<script>
import GrafikLabel from './grafik-label.ce.vue';


export default {
  components: {
    GrafikLabel
  },
  props: {
    unit: {
      type: Number,
      default: 1
    },
    includeZero: {
      type: Boolean,
      default: false
    },
    marker: {
      type: Number,
      default: 0.1
    },
    min: {
      type: Number,
      default: 0
    },
    max: {
      type: Number,
      default: 10
    },
    offset: {
      type: Number,
      default: 0
    },
    isX: {
      type: Boolean,
      default: true
    },
    direction: {
      type: Array,
      default: null
    },
    step: {
      type: Number,
      default: 1
    },
    div: {
      type: Number,
      default: 1
    },
    labels: {
      type: Boolean,
      default: true
    },
    label: {
      type: String,
      default: ""
    },
    labelDistanceFactor: {
      type: Number,
      default: 1
    },
    arrow: {
      type: Number,
      default: 0.05
    }
  },
  methods: {
    scaleX: function(a){
      var  s=1*a;
      if(this.isX){
        return s*this.unit;
      }
      return s;
    },
    scaleY: function(a){
      var  s=1*a;
      if(!this.isX && !this.direction){
        return s*this.unit;
      }
      return s;
    }
  },
  computed: {
    normalVector: function(){
      if(this.direction!==null){
        var d=this.direction;
        var nl=Math.sqrt(d[0]*d[0]+d[1]*d[1]);
        return [-d[1]/nl,d[0]/nl];
      }
    },
    arrowPoints: function(){
      var a=(this.arrow);
      if(this.direction!==null){
        var n=this.normalVector;
        var d=this.direction;
        var P=[this.max*d[0],this.max*d[1]];
        var A=[P[0]+a*n[0],P[1]+a*n[1]];
        var B=[P[0]-a*n[0],P[1]-a*n[1]];
        var C=[P[0]+2*a*d[0],P[1]+2*a*d[1]];
        var p=A[0]+" "+A[1]+" "+B[0]+" "+B[1]+" "+C[0]+" "+C[1];
        return p;
      }else if(this.isX){
        var x=this.scaleX(this.max);
        var y=this.scaleY(this.offset);
        var p=x+" "+(y-this.scaleY(a))+" "+x+" "+(y+this.scaleY(a))+" "+(x+2*this.scaleX(a))+" "+y;
        return p;
      }else{
        var y=this.scaleY(this.max);
        var x=this.scaleX(this.offset);
        var p=(x-this.scaleX(a))+" "+(y)+" "+(x+this.scaleX(a))+" "+(y)+" "+(x)+" "+(y+2*this.scaleY(a));
        return p;
      }
    },
    labelCount: function(){
      var c=this.maxLabel-this.minLabel+1;
      return c;
    },
    minLabel: function(){
      return Math.ceil(this.min);
    },
    maxLabel: function(){
      return Math.floor(this.max);
    }
  }
}
</script>
