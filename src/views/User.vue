<template>
  <v-container fluid fill-height>

    <ApolloQuery
      :query="require('../graphql/User.gql')"
      :variables="{ githubUsername: currentUser }"
    >
    
      <template v-slot="{ result: { error, data }, isLoading }">

          <div v-if="isLoading == 1" class="white--text">
          loading...
        </div>

        <div v-else-if="error" class="white--text">
          Error occured! Try it again later!
        </div>

        <div v-else-if="data" class="white--text">
          {{data}}
        </div>

        <div v-else class="white--text">
          User not found!
        </div>

      </template>

    </ApolloQuery>

  </v-container>
</template>

<script>
/* eslint-disable */
import userSchemaGQL from '../graphql/User.gql';

export default {
  name: 'User',
  data() {
    return {
      currentUser: null
    }
  },
  created() {
    this.currentUser = this.$route.params.userName;
  }
}
</script>

<style scoped>
  .fullWidthDiv {
    width: 100vw;
    text-align: center;
  }
</style>