<template>
  <Dialog ref="dialog">
    <template #header>
      <h1>Neues AB erstellen</h1>
    </template>
    <template #content>
      <select v-model="selectedTemplateIndex">
        <option v-for="(t,i) in templates" :value="i">{{ t.name }}</option>
      </select>
    </template>
    <template #controls>
      <button @click="createAB()">Erstellen</button>
      <button @click="$refs.dialog.close()">Abbrechen</button>
    </template>
  </Dialog>
</template>

<script>
import Dialog from './dialog.vue';
import {templates} from '../data/ab-templates.json';

export default{
  components: {
    Dialog
  },
  data(){
    return {
      selectedTemplateIndex: 0,
      templates
    }
  },
  methods: {
    open(){
      this.selectedTemplateIndex=0;
      this.$refs.dialog.open();
    },
    createAB(){
      this.$emit('create',this.templates[this.selectedTemplateIndex]);
      this.$refs.dialog.close();
    }
  }
}
</script>