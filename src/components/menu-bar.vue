<template>
  <div>
    <button @click="$root.createAB">Neu</button>
    <button @click="$root.openAB">Öffnen</button>
    <button @click="$emit('save')" :disabled="!isABOpen">Speichern</button>
    <button @click="$emit('rename')" :disabled="!isABOpen">Umbenennen</button>
    <button @click="$emit('print')" :disabled="!isABOpen">Drucken</button>
    <button @click="$emit('assets')" :disabled="!isABOpen">Assets</button>
    <button @click="$root.settings">Einstellungen</button>
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
    
  }
}
</script>