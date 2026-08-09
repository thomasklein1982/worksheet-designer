<template>
  <div>
    <button @click="$emit('new-ab')">Neu</button>
    <button @click="$root.openAB">Öffnen</button>
    <button @click="$emit('save')" :disabled="!isABOpen">Speichern</button>
    <button @click="close()" :disabled="!isABOpen">Schließen</button>
    <button @click="$emit('rename')" :disabled="!isABOpen">Umbenennen</button>
    <button @click="$emit('print')" :disabled="!isABOpen">Drucken</button>
    <button @click="$emit('export')" :disabled="!isABOpen">Exportieren</button>
    <button @click="$emit('assets')" :disabled="!isABOpen">Assets</button>
    <button @click="$root.settings">Einstellungen</button>
    {{ $root.version }}
  </div>
</template>

<script>
export default{
  components: {

  },
  props: {
    abs: Array
  },
  computed: {
    isABOpen(){
      return this.abs.length>0;
    }
  },
  methods: {
    close(){
      let a=confirm("Willst du das Arbeitsblatt wirklich schließen? Alle Änderungen gehen verloren.");
      if(!a) return;
      this.$emit("close");
    }
  }
}
</script>