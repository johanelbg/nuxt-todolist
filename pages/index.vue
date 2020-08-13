<template>
  <v-layout
    column
    justify-center
    align-center
    full-width
    fill-height
    ref="index-box"
  >
    <v-progress-circular
      indeterminate
      :size="70"
      color="white"
      v-if="getLoading"
    />
    <v-card class="card-box pa-3" v-else>
      <v-layout column>
        <UpperCard :todos-length="todosLength" />
      </v-layout>
      <div>
        <v-layout row wrap align-center>
          <v-divider class="my-3" />
          <v-btn
            @click.native="todoDialog = true"
            color="accent"
            depressed
            fab
            ref="open-dialog-button"
          >
            <v-icon>add</v-icon>
          </v-btn>
        </v-layout>
      </div>
      <div v-if="!todosLength">
        <h5 class="headline font-weight-light grey--text">
          Start by adding a task
        </h5>
      </div>
      <div v-else class="todos-box">
        <v-layout column>
          <transition-group name="fade">
            <TodoItem
              ref="todo-item"
              v-for="todo in todos"
              :key="todo.id"
              :todoItem="todo"
              :deleteLoading="deleteLoading"
              @delete="handleDelete"
              @update="handleUpdate"
            />
          </transition-group>
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
import UpperCard from '@/components/UpperCard'
import TodoDialog from '@/components/TodoDialog'
import TodoItem from '@/components/TodoItem'

const initialState = () => ({
  text: '',
  id: '',
})

export default {
  components: {
    UpperCard,
    TodoDialog,
    TodoItem,
  },

  data: () => ({
    todo: initialState(),
    getLoading: false,
    todoDialog: false,
    saveLoading: false,
    deleteLoading: false,
  }),

  async created() {
    await this.handleGetTodos()
  },

  computed: {
    ...mapState('todos', ['todos']),
    ...mapGetters('todos', ['todosLength']),
  },

  methods: {
    ...mapActions('todos', [
      'getAllTodos',
      'postTodo',
      'deleteTodo',
      'putTodo',
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
    },
  },
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

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
