<template>
  <div class="px-3 py-10 md:px-10">
    <div class="w-full sm:w-1/2 lg:w-1/3 mx-auto">
      <TodoSpinner v-if="loading" />
      <template v-else>
        <TodoFormAdd 
          @showOrHideMessage="openAlertMessage" 
        />
        <TodoItems 
          v-if="$store.state.todos.length" 
          @showOrHideMessage="openAlertMessage"
        />
        <TodoEmpty v-else />
      </template>

      <AlertMessage 
        v-if="showMessage"
        @closeAlertMessage="showMessage = false"
      >
        <span class="text-gray-900 text-base">{{ message }}</span>
      </AlertMessage>
    </div>
  </div>
</template>

<script>
  import TodoSpinner from "./components/TodoSpinner.vue";
  import TodoFormAdd from "./components/TodoFormAdd.vue";
  import TodoItems from "./components/TodoItems.vue";
  import TodoEmpty from "./components/TodoEmpty.vue";
  import AlertMessage from '@/components/AlertMessage.vue';

  export default {
    name: 'App',
    components: {
      TodoSpinner,
      TodoFormAdd,
      TodoItems,
      TodoEmpty,
      AlertMessage
    },
    data() {
      return {
        todos: [],
        loading: false,
        message: '',
        showMessage: false
      }
    },
    methods: {
      openAlertMessage(message) {
        console.log('DEBUG 3', message);
        this.message = message
        this.showMessage = true
      }
    },
    created() {
      // Carregando o compoente loading
      this.loading = true
      
      this.message = 'Hello World!'
      
      // Recuperando todos os dados antes de criar a aplicação.
      this.$store.dispatch('getAllTodos').finally(() => {
        // Fechar o componente loading
        this.loading = false
      })
    }
  }
</script>
