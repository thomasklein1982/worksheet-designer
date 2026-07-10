<template>
  <slot name="titel"><h1>{{ titel }}</h1></slot>
  <slot></slot>
</template>

<script>
export default {
  shadowRoot: false,
  components: {

  },
  props: {
    titel: String
  },
  data(){
    return {
      aufgabenCount: 0
    }
  }
}
</script>
