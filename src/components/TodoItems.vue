<template>
  <div class="space-y-2">
    <TodoItem 
      v-for="todo in $store.state.todos" 
        :key="todo.id"
        :todo="todo"
      @showOrHideMessage="$emit('showOrHideMessage', $event)"
    />
  </div>
</template>

<script>
  import TodoItem from '@/components/TodoItem.vue'

  export default {
    name: 'TodoItems',
    components: {
      TodoItem
    },
    emits: ['showOrHideMessage']
  }
</script>