<template>
  <div style="position: absolute; right: 0; top: 0; background-color: white; border: 1pt solid black;z-index: 2;" v-show="show">
    <h1>Hilfe</h1>
    <h2>Einfügen</h2>
    <template v-for="(ins,i) in insertions">
      <button @click="insert(ins.text)">{{ ins.label }}</button>
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
        {label: "Backslash", text: "\\"},
        {label: "Bruch", text: "\\frac{}{}"},
        {label: "abc", text: '<abc spalten="2">\n<box></box>\n<box></box>\n</abc>'},
        {label: "formel", text: '<formel></formel>'}
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
    insert(text){
      this.$emit("insert",text);
    }
  }
}
</script>