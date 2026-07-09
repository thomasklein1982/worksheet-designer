<template>
  <div>
    <button @click="$root.createAB">Neu</button>
    <button @click="$root.openAB">Öffnen</button>
    <button @click="$emit('save')">Speichern</button>
    <button @click="$emit('rename')">Umbenennen</button>
    <button @click="$emit('print')">Drucken</button>
    <button @click="$emit('assets')">Assets</button>
    <button @click="$root.settings">Einstellungen</button>
  </div>
</template>

<script>
export default{
  components: {

  },
  methods: {
    
  }
}
</script>