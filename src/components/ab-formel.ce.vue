<template>
  <vue-latex :expression="tex" :display-mode="block" :fontsize="14" :macros='{",": (context) => context.future()?.text === " " ? "{\\char`,}" : "\\char`,"}'/>
</template>

<script>
import { VueLatex } from 'vatex';

export default {
  shadowRoot: false,
  components: {
    VueLatex
  },
  props: {
    tex: String,
    block: {
      type: Boolean,
      default: false
    }
  },
  data(){
    return {
      
    };
  },
  mounted(){
    
  }
}
</script>

