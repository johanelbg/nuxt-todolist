<template>
  <div>
    <v-layout row wrap justify-space-between>
      <div>
        <h4 class="display-1 text-capitalize primary--text">
          <span>{{getDay(date)}}</span>,
          <span class="font-weight-light">{{date.getDate()}}</span>
        </h4>
        <h5 class="headline text-capitalize font-weight-light grey--text">{{getMonth(date)}}</h5>
      </div>
      <h6 class="title grey--text">
        {{todosLength}}
        <span class="font-weight-light">{{taskText}}</span>
      </h6>
    </v-layout>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getDay } from '@/utils/helpers.functions'
import { getMonth } from '@/utils/helpers.functions'

export default {
  data: () => ({
    date: new Date(),
    getDay,
    getMonth
  }),

  computed: {
    ...mapGetters('todos', ['todosLength']),
    taskText() {
      return this.todosLength > 1 ? 'Tasks' : 'Task'
    }
  }
}
</script>

<style>
</style>
