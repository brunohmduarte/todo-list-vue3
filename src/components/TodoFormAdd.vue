<template>
  <form 
    @submit.stop.prevent="addTodo"
    class="flex items-center px-4 bg-gray-900 h-15 rounded-sm border-l-2 border-green-400 mb-3"
  >
    <input
      v-model="title"
      placeholder="Adicione um novo item ..."
      type="text"
      class="bg-gray-900 placeholder-gray-500 text-gray-500 font-light focus:outline-none block w-full appearance-none leading-normal py-3 pr-3"
    />

    <button class="text-green-400 text-xs font-semibold focus:outline-none" type="submit">ADICIONAR</button>
  </form>
</template>

<script>
  export default {
    name: 'TodoFormAdd',
    emits: ['showOrHideMessage'],
    data() {
      return {
        title: ''
      }
    },
    methods: {
      addTodo() {
        // Validando o input
        if (!this.title) {
          return
        }

        // Preparando os dados
        const data = {
          title: this.title,
          completed: false
        }

        // Adicionando uma nova tarefa
        this.$store.dispatch('addTodo', data).finally(() => {
            // Limpar o input
            this.title = ''
            
            // Emite uma ação para o componente pai para mostrar uma mensagem
            this.$emit('showOrHideMessage', 'Tarefa adicionada com sucesso!')            
        })        
      }
    }
  }
</script>