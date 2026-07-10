<template>
  <div ref="wrapper" style="display: inline-block; position:relative" :style="{'user-select': 'none', width: size.w, height: size.h}">
    <svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" preserveAspectRatio="none" :style="{'font-size': fontSize, stroke: 'black', 'stroke-width': strokeWidth}" style="width: 100%; height: 100%; overflow: hidden; font-family: Roboto,-apple-system,BlinkMacSystemFont,Segoe UI,Oxygen,Ubuntu,Cantarell,Fira Sans,Droid Sans,Helvetica,Arial,sans-serif;" :viewBox="viewBox">
      <defs>
        <filter x="0" y="0" width="1" height="1" id="white0.5">
          <feFlood flood-color="white" flood-opacity="0.5" result="bg" />
          <feMerge>
            <feMergeNode in="bg"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      <g :transform="transformation">
        <grafik-karopapier v-if="karoPapier" :min-x="Math.floor(minX*1)" :max-x="Math.ceil(maxX*1)" :min-y="Math.floor(minY*1)" :max-y="Math.ceil(maxY*1)"/>
        <grafik-system v-if="system" :min-x="systemAttributes.minX" :min-y="systemAttributes.minY" :max-x="systemAttributes.maxX" :max-y="systemAttributes.maxY" :marker-x="systemAttributes.markerX" :marker-y="systemAttributes.markerY" :offset-x="systemAttributes.offsetX" :offset-y="systemAttributes.offsetY" :step-x="systemAttributes.stepX" :step-y="systemAttributes.stepY" :div-x="systemAttributes.markerX" :div-y="systemAttributes.divY" :labels-x="systemAttributes.labelsX" :labels-y="systemAttributes.labelsY" :arrow-x="systemAttributes.arrowX" :arrow-y="systemAttributes.arrowY" :grid="systemAttributes.grid"></grafik-system>
        <slot></slot>
      </g>
    </svg>
  </div>
</template>

<script>
import GrafikKaropapier from './grafik-karopapier.ce.vue';
import GrafikSystem from './grafik-system.ce.vue';


export default {
  shadowRoot: false,
  components: {
    GrafikKaropapier, GrafikSystem
  },
  data(){
    return {
      isFrame: true,
      boundingRect: null,
    }
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
    breite: {
      type: String,
      default: "auto"
    },
    hoehe: {
      type: String,
      default: "auto"
    },
    scale: {
      type: Number,
      default: 1
    },
    fontScale: {
      type: Number,
      default: 1
    },
    ratioXY: {
      type: Number,
      default: 1
    },
    system: {
      type: [Object,Boolean],
      default: false
    },
    karoPapier: {
      type: Boolean,
      default: false
    }
  },
  mounted: function(){
    if(this.enableTouch){
      addTouchHandler(this.$refs.canvas,this);
      var c=this.$refs.canvas.getContext("2d");
      c.lineCap="round";
    }
  },
  computed: {
    systemAttributes: function(){
      var attr={};
      attr.markerX=0.1;
      attr.markerY=attr.markerX;
      attr.offsetX=0;
      attr.offsetY=0;
      attr.stepX=1;
      attr.stepY=1;
      attr.divX=1;
      attr.divY=1;
      attr.labelsX=true;
      attr.labelsY=true;
      attr.grid=false;
      attr.arrowX=0.05;
      attr.arrowY=attr.arrowX;
      if(this.system!==true&& this.system!==false){
        for(var a in attr){
          if(this.system[a]!==undefined){
            attr[a]=this.system[a];
          }
        }
      }
      attr.minX=(this.minX*1);
      attr.maxX=this.maxX*1-attr.arrowX*3;
      attr.minY=this.minY*1;
      attr.maxY=this.maxY*1-attr.arrowY*3;

      return attr;
    },
    strokeWidth: function(){
      return 0.2*this.scale;
    },
    fontSize: function(){
      return (this.scale*this.fontScale)+"px";
    },
    size: function(){
      var w=this.breite;
      var h=this.hoehe;
      var mathW=this.maxX*1-this.minX*1;
      var mathH=this.maxY*1-this.minY*1;
      var ratio=mathW/mathH;
      ratio*=this.ratioXY;
      var scaleX=10;
      var scaleY=scaleX*this.ratioXY;
      var customScale=0.8/80*this.scale+0.2;
      var factorCMREM=2.4;
      if(w==="auto"){
        if(h==="auto"){
          /*beides auto*/

          throw "ab-grafik: You must specify exactly one of 'width' and 'height'";
        }else{
          /*w gleich skalieren*/
          var hn=parseFloat(h);
          var unit=h.match(/[^0-9\.]+/)[0];
          // if(unit==="cm"){
          //   hn*=factorCMREM;
          //   unit="rem";
          // }
          //h=hn*customScale+unit;
          w=hn*ratio;
          w=w+unit;
        }
      }else{
        if(h==="auto"){
          /*h gleich skalieren*/
          var wn=parseFloat(w);
          var unit=w.match(/[^0-9\.]+/)[0];
          // if(unit==="cm"){
          //   wn*=factorCMREM;
          //   unit="rem";
          // }
          //w=wn*customScale+unit;
          h=wn/ratio;
          h=h+unit;
        }else{
          /*beides spezifiziert*/
          var scaleX=10;
          var scaleY=scaleX*this.ratioXY;
        }
      }
      return {
        w: w,
        h: h,
        ratio: ratio,
        scaleX: scaleX,
        scaleY: scaleY
      };
    },
    transformation: function(){
      /*
        a c e
        b d f
        0 0 1
      */
      return "matrix("+(this.size.scaleX)+",0,0,"+(-this.size.scaleY)+","+(-this.minX*this.size.scaleX)+","+(this.maxY*this.size.scaleY)+")";
    },
    viewBox: function(){
      var x=0;
      var y=0;
      var x2=(this.maxX*1-this.minX*1)*this.size.scaleX;
      var y2=(this.maxY*1-this.minY*1)*this.size.scaleY;
      return x+" "+y+" "+x2+" "+y2;
    }
  },
  methods: {
    
  }
}
</script>
