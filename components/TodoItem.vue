<template>
  <div class="item-box">
    <v-layout row fill-height align-center justify-space-between class="layout-box">
      <div class="text-truncate">
        <v-layout row align-baseline>
          <div class="mr-1">
            <v-icon v-if="isTag('#important')" color="red">notification_important</v-icon>
            <v-icon v-if="isTag('#later')" color="green">watch_later</v-icon>
          </div>
          <h6 class="title font-weight-light blue-grey-darken-1--text">{{todoItem.text}}</h6>
        </v-layout>
      </div>
      <div>
        <v-speed-dial
          v-model="fab"
          direction="left"
          transition="slide-y-reverse-transition"
          :open-on-hover="true"
        >
          <template v-slot:activator>
            <v-btn v-model="fab" color="primary" class="ma-0" small depressed fab>
              <v-icon>more_vert</v-icon>
              <v-icon>close</v-icon>
            </v-btn>
          </template>
          <v-btn fab dark small color="green" @click="$emit('update', todoItem)">
            <v-icon>edit</v-icon>
          </v-btn>
          <v-btn
            fab
            dark
            small
            color="red"
            @click="$emit('delete', todoItem.id)"
            :loading="deleteLoading"
          >
            <v-icon>delete</v-icon>
          </v-btn>
        </v-speed-dial>
      </div>
    </v-layout>
  </div>
</template>

<script>
export default {
  props: {
    todoItem: { type: Object, required: true },
    deleteLoading: { type: Boolean, required: true }
  },

  data: () => ({
    fab: false
  }),

  methods: {
    isTag(tag) {
      return this.todoItem.text.split(' ').includes(tag)
    }
  }
}
</script>

<style scoped>
.item-box {
  height: 60px;
}

.layout-box {
  overflow: hidden;
}
</style>
