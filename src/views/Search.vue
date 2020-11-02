<template>
  <v-container fluid class="container__searchUser">

    <v-row :class="flexCenter" class="mb-5">
      <v-icon dark :size="70" class="mb-2">mdi-github</v-icon>
      <h2 class="intro font-weight-light">Find github user</h2>
    </v-row>

    <v-row :class="flexCenter">
      <v-col cols="10" sm="6" md="4" lg="3">
        <v-text-field
            solo
            class="input__searchUser"
            v-model="githubUser"
            @keyup.enter="searchGithubUser"
        ></v-text-field>
      </v-col>
    </v-row>

  </v-container>
</template>

<script>
export default {
  name: "Search",
  data() {
    return {
      githubUser: null,
      flexCenter: 'd-flex flex-column justify-center align-center'
    }
  },
  methods: {
    searchGithubUser() {
      this.$router.push(`/user/${this.githubUser}`);
    }
  }
}
</script>

<style lang="scss">
  .container__searchUser {
    color: white;
    .intro {
      letter-spacing: 2px;
    }
    .v-text-field input {
      text-align: center;
      font-size: 1.2em;
    }
  }
</style>
