<template>
  <div>
    {{ fragment.name }} 
    <div>
      <button @click="$emit('open')">Öffnen</button>
      <button @click="remove">🗑</button>
      <button @click="rename">✎</button>
    </div>
  </div>
</template>

<script>
export default {
  components: {

  },
  props: {
    fragment: Object
  }
}
</script>