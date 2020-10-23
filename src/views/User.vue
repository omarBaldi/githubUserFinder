<template>
  <v-container fluid fill-height>

    <ApolloQuery
      :query="require('../graphql/User.gql')"
      :variables="{ githubUsername: currentUser }"
    >
    
      <template v-slot="{ result: { error, data }, isLoading }">

        <div v-if="isLoading == 1" class="fullWidthDiv">
          <v-progress-circular
            :size="140"
            :width="4"
            color="white"
            indeterminate
          ></v-progress-circular>
        </div>

        <div v-else-if="error" class="fullWidthDiv">
          <v-icon large color="white" class="mb-2">mdi-alert</v-icon>
          <h1 class="white--text">Error occured! Try it again later!</h1>
        </div>

        <div v-else-if="data" class="white--text">
          <v-container fluid fill-height class="ma-0 pa-0">
            <v-row>

              <!-- User Info -->
              <v-col lg="4" md="4" sm="5" cols="12">
                <v-card flat class="d-flex align-center justify-center white--text" color="transparent" id="cardUserInfo">
                  <div>

                    <v-avatar
                      tile
                      class="mb-4"
                      :size="200"
                      id="imageUser"
                    >
                      <v-img :src="data.search.edges[0].node.avatarUrl"></v-img>
                    </v-avatar>

                    <v-card-text class="pa-0 ma-0">
                      <v-list-item-title class="headline">{{data.search.edges[0].node.name}}</v-list-item-title>
                      <v-list-item-subtitle>@{{data.search.edges[0].node.login}}</v-list-item-subtitle>
                    </v-card-text>

                    <v-card-text class="pa-0 ma-0 mt-6">
                      <v-list-item-subtitle v-for="number in 4" :key="number" class="mb-2">
                        <div v-if="number === 1">
                          <v-icon color="white" size="25" class="mr-2">mdi-link-variant</v-icon>
                          <span class="subheading mr-2">{{data.search.edges[0].node.url}}</span>
                        </div>
                        <div v-else-if="number === 2">
                          <v-icon color="white" size="25" class="mr-2">mdi-map-marker</v-icon>
                          <span class="subheading mr-2">{{data.search.edges[0].node.location}}</span>
                        </div>
                        <div v-else-if="number === 3">
                          <v-icon color="white" size="25" class="mr-2">mdi-email-outline</v-icon>
                          <span class="subheading mr-2">{{data.search.edges[0].node.email}}</span>
                        </div>
                        <div v-else>
                          <v-icon color="white" size="25" class="mr-2">mdi-account-tie</v-icon>
                          <span class="subheading mr-2">
                            Available for hire: 
                            <span v-html="data.search.edges[0].node.isHireable ? 'Yes' : 'No'"></span></span>
                        </div>
                      </v-list-item-subtitle>
                    </v-card-text>
                      
                  </div>
                </v-card>
              </v-col>

              <!-- Repositories -->
              <v-col lg="8" md="8" sm="7" cols="12" style="margin-top: 2rem;" class="d-flex flex-column justify-center px-8">

                <v-row>
                  <h1 class="white--text" style="font-size: 3.5em;">Repos.</h1>
                </v-row>

                <v-row style="margin-top: 1.5rem;">
                  <v-col lg="6" md="6" sm="12" cols="12" v-for="(repository, index) in data.search.edges[0].node.repositories.nodes" :key="index">
                    <v-card
                      flat
                      dark
                      id="cardRepo"
                      class="mx-auto mb-5 mr-1 ml-1"
                      :hover="true"
                      max-height="170"
                      min-height="170"
                    >
                      <div class="py-3">

                        <v-card-title>
                          <h3 class="font-weight-bold">{{repository.name}}</h3>
                        </v-card-title>

                        <v-card-text class="font-weight-normal">
                          <span v-html="repository.description ? repository.description.slice(0, 45).concat('...') : ' - '"></span>
                        </v-card-text>

                        <v-card-actions class="mt-n5 mb-3">
                          <v-list-item>
                            <v-row
                              justify="start"
                            >
                              <v-icon small class="mr-1">mdi-xml</v-icon>
                              <span class="mr-6" v-html="repository.primaryLanguage ? repository.primaryLanguage.name : ' - '"></span>

                              <v-icon small class="mr-1">mdi-star</v-icon>
                              <span class="mr-6">{{repository.stargazers.totalCount}}</span>

                              <v-icon small class="mr-1">mdi-source-branch</v-icon>
                              <span class="">{{repository.forks.totalCount}}</span>

                            </v-row>
                          </v-list-item>
                        </v-card-actions>

                      </div>
                    </v-card>
                  </v-col>
                </v-row>

              </v-col>

            </v-row>
          </v-container>
        </div>

        <div v-else class="fullWidthDiv">
          <v-icon large color="white" class="mb-2">mdi-alert</v-icon>
          <h1 class="white--text">User not found!</h1>
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
  #cardRepo {
    background-color: rgb(20, 19, 19);
  }
  .wrapper {
    max-width: 1400px;
    background-color: rgb(10, 10, 10);
  }
  #imageUser {
    border: 1px solid grey;
  }
  .fullWidthDiv {
    width: 100vw;
    text-align: center;
  }
  #cardUserInfo {
    position: fixed;
    border: 10px solid white;
    padding-left: 3rem;
    height: 100vh;
    min-height: 700px;
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