<template>
  <div class="item-box">
    <v-layout row wrap fill-height align-center justify-space-between>
      <div class="text-truncate">
        <h6 class="title grey--text font-weight-light">{{todoItem.text}}</h6>
      </div>
    </v-layout>
  </div>
</template>

<script>
export default {
  props: {
    todoItem: { type: Object, required: true }
  }
}
</script>

<style scoped>
.item-box {
  height: 40px;
}
</style>
