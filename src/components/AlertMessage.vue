<template>
  <div class="absolute top-10 right-10 bg-green-400 py-2 px-4 border-r-2 border-gray-900 shadow-md">
    <slot />
  <button 
    class="ml-4 text-2xl cursor-pointer"
    @click="$emit('closeAlertMessage', false)"
  >&times;</button>
  </div>
</template>

<script>
  export default {
    name: 'AlertMessage',
    emits: ['closeAlertMessage']
  }
</script>