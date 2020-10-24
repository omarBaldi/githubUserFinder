<template>
    <v-row style="margin-top: 1.5rem;">
        <v-col 
        lg="6" 
        md="6" 
        sm="12" 
        cols="12" 
        v-for="(repository, index) in dataRepos.repositories.nodes" 
        :key="index"
        >

        <Repository 
            :repository="repository"
        />
        </v-col>
    </v-row>
</template>

<script>
/* eslint-disable */
import Repository from './Repository';

export default {
    name: 'Repositories',
    components: {
        Repository
    },
    props: {
        dataRepos: {
            type: Object,
            required: true
        }
    }
}
</script>

<style scoped>
    #cardRepo {
        background-color: rgb(20, 19, 19);
     }
</style>