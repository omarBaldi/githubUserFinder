<template>
  <v-container fluid fill-height>

    <ApolloQuery
      :query="require('../graphql/User.gql')"
      :variables="{ githubUsername: currentUser }"
    >
    
      <template v-slot="{ result: { error, data }, isLoading }">

        <div v-if="isLoading == 1" class="fullWidthDiv">
          <Loading />
        </div>

        <div v-else-if="error" class="fullWidthDiv">
          <Error 
            :errorMessage="{ icon: 'mdi-alert', message: 'Error occured! Try it again later!'}"
          />
        </div>

        <div v-else-if="data.search.edges[0]" class="white--text">
          <v-container fluid fill-height class="ma-0 pa-0">

              <GithubData 
                :data="data.search.edges[0].node"
              />

          </v-container>
        </div>

        <div v-else class="fullWidthDiv">
          <Error 
            :errorMessage="{ icon: 'mdi-alert', message: 'User not found!'}"
          />
        </div>

      </template>

    </ApolloQuery>

  </v-container>
</template>

<script>
/* eslint-disable */
import userSchemaGQL from '../graphql/User.gql';
import Loading from '../components/Loading';
import Error from '../components/Error';
import GithubData from '../components/GithubData';

export default {
  name: 'User',
  components: {
    Loading,
    Error,
    GithubData
  },
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

<style>
  .wrapper {
    max-width: 1400px;
    background-color: rgb(10, 10, 10);
  }
  .fullWidthDiv {
    width: 100vw;
    text-align: center;
  }
  /* Responsive Design */
  @media screen and (max-width: 599px) {
    #cardUserInfo {
      position: relative;
      border: 10px solid white;
      padding-left: 0;
      height: auto;
    }
  }
</style>