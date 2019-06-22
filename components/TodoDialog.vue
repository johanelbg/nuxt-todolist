<template>
  <v-dialog v-model="dialog" max-width="400">
    <v-card>
      <v-form v-model="isValid">
        <v-card-title class="headline">{{isNew}}</v-card-title>
        <v-card-text>
          <v-textarea label="Todo" outline v-model="todo.text" :rules="[rules.required]"/>
        </v-card-text>
        <v-card-actions>
          <v-spacer/>
          <v-btn
            color="primary"
            depressed
            round
            :disabled="!isValid"
            :loading="saveLoading"
            @click="$emit('save')"
          >Save</v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    dialogProps: { type: Boolean, required: true },
    todoProps: { type: Object, required: true },
    saveLoading: { type: Boolean, required: true }
  },

  data: () => ({
    isValid: false,
    rules: {
      required: value => !!value || 'Required.'
    }
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
      }
    },
    todo: {
      get() {
        return this.todoProps
      },
      set(val) {
        this.$emit('update:todoProps', { ...val })
      }
    }
  }
}
</script>

<style>
</style>
