import { createStore } from "vuex";
import axios from "axios";

const Store = createStore({
  state: {
      todos: [],
  },

  // Altera o estado das state
  mutations: {
      storeTodos(state, todos) {
        state.todos = todos;
      },
      storeNewTodo(state, payload) {
        const index = state.todos.findIndex((todo) => todo.id === payload.id)
        if (index >= 0) {
          state.todos.splice(index, 1, payload)
        } else {
          state.todos.unshift(payload);
        }        
      },
      deleteTodo(state, id) {
        const index = state.todos.findIndex((todo) => todo.id === id)
        if (index >= 0) {
          state.todos.splice(index, 1)
        }
      }
  },

  /**
   * Este bloco é responsável por realizar as requisições HTTP para a API
   * e atualizar o state através das mutations.
   */
  actions: {
    // Recupera a lista de todos as To Do's à fazer e atualiara o state
    getAllTodos({ commit }) {
      return axios.get('http://localhost:3000/todos').then((response) => {
        commit('storeTodos', response.data)
      })
    },

    // Adiciona uma nova tarefa e atuliza o state
    addTodo({ commit }, data) {
      return axios.post('http://localhost:3000/todos', data).then((response) => {
        // Atualiazando o state
        commit('storeNewTodo', response.data)
      })
    },

    // Editando uma tarefa e ataulizando o state
    updateTodo({ commit }, { id, data }) {
      return axios.put(`http://localhost:3000/todos/${id}`, data).then((response) => {        
        commit('storeNewTodo', response.data)
      })
    },

    // Deletando uma tarefa
    deleteTodo({ commit }, id) {
      return axios.delete(`http://localhost:3000/todos/${id}`).then(() => {
        commit('deleteTodo', id)
      })
    }
  },
  modules: {},
});

export default Store;