<template>
  <div class="bg-gray-300 rounded-sm">
    <div class="flex items-center px-4 py-3 border-b border-gray-400 last:border-b-0">
      <div class="flex items-center justify-center mr-2 ">
        <button 
          :class="{
            'text-green-600': isCompleted,
            'text-gray-400': !isCompleted
          }"
          @click="prepareStateUpdate"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
          </svg>
        </button>
      </div>

      <div class="w-full">
        <input
          type="text"
          placeholder="Digite a sua tarefa"
          class="bg-gray-300 placeholder-gray-500 text-gray-700 font-light focus:outline-none block w-full appearance-none leading-normal mr-3"
          v-model="title"
          @keyup.enter="prepareTitleUpdate"
        />
      </div>

      <div class="ml-auto flex items-center justify-center">
        <button 
          class="focus:outline-none"
          @click="prepareDeleteRecord"
        >
          <svg
            class="ml-3 h-4 w-4 text-gray-500"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path 
              d="M19 7L18.1327 19.1425C18.0579 20.1891 17.187 21 16.1378 21H7.86224C6.81296 21 5.94208 20.1891 5.86732 19.1425L5 7M10 11V17M14 11V17M15 7V4C15 3.44772 14.5523 3 14 3H10C9.44772 3 9 3.44772 9 4V7M4 7H20"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'TodoItem',
    props: {
      todo: {
        type: Object,
        required: () => ({})
      }
    },
    emits: ['showOrHideMessage'],
    data() {
      return {
        title: this.todo.title,
        isCompleted: this.todo.completed,
        actionMessage: ''
      }
    },
    methods: {
      // Preparar a atualização da tarefa
      prepareTitleUpdate() {
        if (this.checkTitle()) {
          this.actionMessage = 'Tarefa atualizada com sucesso!'
          this.updateTodo()
        }
      },

      // Atualiza o status da tarefa e chama o método para atualizar o registro
      prepareStateUpdate() {
        if (this.checkTitle()) {
          this.isCompleted = !this.isCompleted
          this.actionMessage = 'Estado da tarefa foi atualizado com sucesso!'
          this.updateTodo()
        }
      },
      
      //
      prepareDeleteRecord() {
        this.actionMessage = 'Tarefa removida com sucesso!'
        console.log('DEBUG 1', this.actionMessage);
        this.deleteTodo()
      },

      // Verifica se o input está vazio
      checkTitle() {
        return (!this.title) ? false : true
      },

      // Atualizando a tarefa
      updateTodo() {      
        // Dispara a requisição para atualizar a tarefa
        this.$store.dispatch('updateTodo', {
          id: this.todo.id,
          data: {
            title: this.title,
            completed: this.isCompleted
          }
        }).finally(() => {
          this.$emit('showOrHideMessage', this.actionMessage)
        })
      },

      // Deletando a tarefa
      deleteTodo() {      
        this.$store.dispatch('deleteTodo', this.todo.id).finally(() => {
          console.log('DEBUG 2', this.actionMessage);
          this.$emit('showOrHideMessage', this.actionMessage)
        })
      }
    }
  }
</script>