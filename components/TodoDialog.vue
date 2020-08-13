<template>
  <v-dialog v-model="dialog" max-width="400" ref="todo-dialog-box">
    <v-card>
      <v-form v-model="isValid">
        <v-card-title class="headline">{{ isNew }}</v-card-title>
        <v-card-text>
          <v-textarea
            ref="todo-dialog-input"
            label="Todo"
            outline
            v-model="todo.text"
            :rules="[rules.required]"
          />
          <v-chip
            ref="chip-important"
            color="red"
            text-color="white"
            @click.native="handleTag('#important')"
          >
            <v-avatar> <v-icon>notification_important</v-icon> </v-avatar
            >Important
          </v-chip>
          <v-chip
            color="green"
            text-color="white"
            @click.native="handleTag('#later')"
            ref="chip-later"
          >
            <v-avatar> <v-icon>watch_later</v-icon> </v-avatar>Later
          </v-chip>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn
            ref="save-button"
            color="primary"
            depressed
            round
            :disabled="!isValid"
            :loading="saveLoading"
            @click.native="$emit('save')"
            >Save</v-btn
          >
        </v-card-actions>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    dialogProps: { type: Boolean, required: true, default: false },
    todoProps: { type: Object, required: true },
    saveLoading: { type: Boolean, required: true, default: false },
  },

  data: () => ({
    isValid: false,
    rules: {
      required: value => !!value || 'Required.',
    },
  }),

  computed: {
    isNew() {
      return this.todoProps.id ? 'Edit Task' : 'New Task'
    },
    dialog: {
      get() {
        return this.dialogProps
      },
      set(dialog) {
        this.$emit('update:dialogProps', dialog)
      },
    },
    todo: {
      get() {
        return this.todoProps
      },
      set(val) {
        this.$emit('update:todoProps', { ...val })
      },
    },
  },

  methods: {
    handleTag(tag) {
      this.todo.text.split(' ').includes(tag)
        ? (this.todo.text = this.todo.text.replace(tag, ''))
        : (this.todo.text = `${this.todo.text} ${tag}`)
    },
  },
}
</script>

<style></style>
