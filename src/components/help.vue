<template>
  <div style="position: absolute; right: 0; top: 0; background-color: white; border: 1pt solid black;z-index: 2;" v-show="show">
    <h1>Hilfe</h1>
    <h2>Einfügen</h2>
    <template v-for="(ins,i) in insertions">
      <button @click="toClipboard(ins.text)" v-html="ins.label"></button>
    </template>
    
  </div>
</template>

<script>
export default {
  components: {

  },
  data(){
    return {
      show: false,
      insertions: [
        {label: "\\", text: "\\"},
        {label: "Bruch", text: "\\frac{1}{2}"},
        {label: "abc", text: '<abc spalten="2">\n  <box></box>\n  <box></box>\n</abc>'},
        {label: "formel", text: '<formel></formel>'},
        {label: "&pm;", text: '\\pm'}
      ]
    }
  },
  methods: {
    open(){
      this.show=true;
    },
    toggle(){
      this.show=!this.show;
    },
    toClipboard(text){
      navigator.clipboard.writeText(text);
    },
    insert(text){
      this.$emit("insert",text);
    }
  }
}
</script>