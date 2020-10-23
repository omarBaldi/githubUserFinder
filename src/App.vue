<template>
  <v-app>
    <v-main>
      <v-container fluid fill-height class="ma-0 pa-0">
        <router-view></router-view>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {

    }
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Poppins&display=swap');
  #app {
    font-family: 'Poppins', sans-serif;
    background-color: rgb(10, 10, 10);
  }
</style>
