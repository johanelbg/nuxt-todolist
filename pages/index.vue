<template>
  <v-layout column justify-center align-center full-width fill-height>
    <v-card class="card-box pa-3">
      <v-layout column>
        <UpperCard/>
      </v-layout>
      <v-divider class="mt-3"/>
    </v-card>
  </v-layout>
</template>

<script>
export default {
  components: {
    UpperCard: () => import('@/components/UpperCard')
  }
}
</script>

<style scoped>
.card-box {
  width: 100%;
  max-width: 800px;
}
</style>

