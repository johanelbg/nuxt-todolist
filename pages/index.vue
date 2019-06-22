<template>
  <v-layout column justify-center align-center full-width fill-height>
    <v-progress-circular indeterminate :size="70" color="white" v-if="getLoading"/>
    <v-card class="card-box pa-3" v-else>
      <v-layout column>
        <UpperCard/>
      </v-layout>
      <div>
        <v-layout row wrap align-center>
          <v-divider class="my-3"/>
          <v-btn @click="todoDialog = true" color="accent" depressed fab>
            <v-icon>add</v-icon>
          </v-btn>
        </v-layout>
      </div>
      <div v-if="!todosLength">
        <h5 class="headline font-weight-light grey--text">Start by adding a task</h5>
      </div>
      <div v-else class="todos-box">
        <v-layout column>
          <TodoItem
            v-for="todo in todos"
            :key="todo.id"
            :todoItem="todo"
            :deleteLoading="deleteLoading"
            @delete="handleDelete"
            @update="handleUpdate"
          />
        </v-layout>
      </div>
    </v-card>
    <TodoDialog
      :dialogProps.sync="todoDialog"
      :todoProps.sync="todo"
      :saveLoading="saveLoading"
      @save="handleSave"
    />
  </v-layout>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'

const initialState = () => ({
  text: '',
  id: ''
})

export default {
  components: {
    UpperCard: () => import('@/components/UpperCard'),
    TodoDialog: () => import('@/components/TodoDialog'),
    TodoItem: () => import('@/components/TodoItem')
  },

  data: () => ({
    todo: initialState(),
    getLoading: false,
    todoDialog: false,
    saveLoading: false,
    deleteLoading: false
  }),

  created() {
    this.handleGetTodos()
  },

  computed: {
    ...mapState('todos', ['todos']),
    ...mapGetters('todos', ['todosLength'])
  },

  methods: {
    ...mapActions('todos', [
      'getAllTodos',
      'postTodo',
      'deleteTodo',
      'putTodo'
    ]),
    async handleSave() {
      try {
        this.saveLoading = true
        this.todo.id
          ? await this.putTodo(this.todo)
          : await this.postTodo(this.todo)
      } finally {
        this.saveLoading = false
        this.todoDialog = false
        this.todo = initialState()
      }
    },

    async handleDelete(id) {
      try {
        this.deleteLoading = true
        await this.deleteTodo(id)
      } finally {
        this.deleteLoading = false
      }
    },

    async handleGetTodos() {
      try {
        this.getLoading = true
        await this.getAllTodos()
      } finally {
        this.getLoading = false
      }
    },

    handleUpdate(todo) {
      this.todo = { ...todo }
      this.todoDialog = true
    }
  }
}
</script>

<style scoped>
.card-box {
  width: 100%;
  max-width: 800px;
}

.todos-box {
  max-height: 60vh;
  overflow-y: auto;
}
</style>

