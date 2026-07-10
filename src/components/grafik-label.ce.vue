<template>
  <g :transform="transformation"><circle v-if="dot>0" :style="{stroke:dotColor,fill:dotColor}" :cx="rx" :cy="ry" :r="dot"></circle><text :style="{fill: color, fontSize: (scale*100)+'%'}" :filter="filter" :text-anchor="textAnchor" dominant-baseline="middle" :dy="dy" style="stroke:none;fill:black" :x="rx" :y="ry"><slot></slot></text></g>
</template>

<script>

export default {
  components: {
    
  },
  props: {
    x: {
      type: [Number,Object]
    },
    y: {
      type: [Number,Object]
    },
    pos: {
      type: String,
      default: "c"
    },
    background: {
      type: String,
      default: 'none'
    },
    color: {
      type: String,
      default: "black"
    },
    dotColor: {
      type: String,
      default: "black"
    },
    dot: {
      type: Number,
      default: 0
    },
    scale: {
      type: Number,
      default: 1
    }
  },
  computed: {
    filter: function(){
      if(this.background==='none'){
        return '';
      }
      return 'url(#'+this.background+')';
    },
    rx: function(){
      var x=this.x;
      if(x.value){
        x=x.value();
      }
      return 1*x;
    },
    ry: function(){
      var y=this.y;
      if(y.value){
        y=y.value();
      }
      return 1*y;
    },
    transformation: function(){
      var y=this.y;
      if(y.value){
        y=y.value();
      }
      return "matrix(1,0,0,-1,0,"+(2*y*1)+")";
    },
    posHV: function(){
      var p={};
      var s=this.pos.toLowerCase();
      if(s.length===1){
        if(s==="l" || s==="r" || s==="c"){
          p.h=s;
        }
        if(s==="t" || s==="b" || s==="c"){
          p.v=s;
        }
      }else{
        p.h=s.charAt(0);
        p.v=s.charAt(1);
      }
      return p;
    },
    dy: function(){
      if(this.posHV.v==="b"){
        return "0.8em";
      }else if(this.posHV.v==="t"){
        return "-0.8em";
      }else{
        return "0";
      }
    },
    baseline: function(){
      if(this.posHV.v==="b"){
        return "hanging";
      }else if(this.posHV.v==="t"){
        return "auto";
      }else{
        return "middle";
      }
    },
    textAnchor: function(){
      if(this.posHV.h==="r"){
        return "start";
      }else if(this.posHV.h==="l"){
        return "end";
      }else{
        return "middle";
      }
    }
  }
}
</script>
