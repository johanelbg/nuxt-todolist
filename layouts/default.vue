<template>
  <v-app>
    <v-content>
      <v-container fluid class="main-bg">
        <nuxt/>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
export default {
  data() {
    return {}
  }
}
</script>

<style scoped>
.main-bg {
  height: 100vh;
  background: #de6161;
  background: -webkit-linear-gradient(to bottom, #2657eb, #de6161);
  background: linear-gradient(to bottom, #2657eb, #de6161);
}
</style>

