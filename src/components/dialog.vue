<template>
  <div class="dialog-backdrop" :style="backdropStyle">
    <div class="dialog">
      <div class="flex-1 flex-container-column" style="overflow: hidden">
        <slot name="header"></slot>
        <div class="flex-1" style="overflow: auto">
          <slot name="content"></slot>
        </div>
      </div>
      <div style="text-align: right">
        <slot name="controls"></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default{
  components: {

  },
  computed: {
    backdropStyle(){
      return {
        display: this.show? '':'none'
      };
    }
  },
  data(){
    return {
      show: false
    };
  },
  methods: {
    open(){
      this.show=true;
    },
    close(){
      this.show=false;
    }
  }
}
</script>