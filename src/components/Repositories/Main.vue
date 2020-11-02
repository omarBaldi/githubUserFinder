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
                @openSideMenu="open"
            />
        </v-col>

        <Commits 
            :currentRepoName="currentRepoName"
            @loadingFinished="isLoading = !isLoading"
        />
       
        <div v-if="isLoading">
            <Loading />
        </div>

    </v-row>
</template>

<script>
/* eslint-disable */
import Loading from '../Loading';
import Repository from './Repository';
import Commits from './Commits';

export default {
    name: 'Repositories',
    components: {
        Repository,
        Commits,
        Loading
    },
    props: {
        dataRepos: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            isLoading: false,
            currentRepoName: null
        }
    },
    methods: {
        open(repoName) {
            this.isLoading = !this.isLoading;
            this.currentRepoName = null;
            this.currentRepoName = repoName;
        }
    }
}
</script>

<style scoped>
    #cardRepo {
        background-color: rgb(20, 19, 19);
    }
</style>