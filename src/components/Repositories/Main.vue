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

        <!-- Repository commits -->
        <v-navigation-drawer
        v-model="isSidebarOpen"
        fixed
        temporary
        right
        width="auto"
        id="commitsSidebar"
        >   

            <!-- Commits timeline -->
            <v-timeline
            dense
            dark
            >

                <v-timeline-item
                class="mb-4"
                color="purple"
                icon-color="red"
                small
                v-for="(commit, index) in commits"
                :key="index"
                >

                    <v-list three-line outlined flat>

                        <v-list-item :selectable="true" link :href="commit.url" target="_blank">
                            <v-list-item-avatar size="50">
                                <v-img :src="commit.committer.avatarUrl"></v-img>
                            </v-list-item-avatar>

                            <v-list-item-content class="mt-n2 white--text" style="max-width: 300px;">
                                <v-list-item-title class="textNextline">Commited by {{commit.committer.name}} at {{commit.committedDate}}</v-list-item-title>
                                <v-list-item-title class="textNextline mt-3">{{commit.message}}</v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>

                    </v-list>

                </v-timeline-item>

            </v-timeline>

        </v-navigation-drawer>

        <div v-if="$apollo.queries.repository.loading">
            <Loading />
        </div>

    </v-row>
</template>

<script>
/* eslint-disable */
import Loading from '../Loading';
import Repository from './Repository';
import repoSchemaGQL from '../../graphql/Repo.gql';

export default {
    name: 'Repositories',
    components: {
        Repository,
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
            isSidebarOpen: false,
            currentUser: null,
            currentRepoName: null,
            commits: null
        }
    },
    created() {
        this.currentUser = this.$route.params.userName;
    },
    watch: {
        commits() {
            this.isSidebarOpen = true;
        }
    },
    apollo: {
        repository: {
            query: repoSchemaGQL,
            variables() {
                return {
                    githubUsername: this.currentUser,
                    githubReponame: this.currentRepoName
                }
            },
            skip() {
                return !this.currentRepoName;
            },
            result(result) {
                this.commits = result.data.repository.refs.nodes[0].target.history.nodes;
		    }
        },
    },
    methods: {
        open(repoName) {
            this.currentRepoName = repoName;
            this.$apollo.queries.repository.refetch({ githubUsername: this.currentUser, githubReponame: this.currentRepoName });
        }
    }
}
</script>

<style scoped>
    #cardRepo {
        background-color: rgb(20, 19, 19);
    }
    .textNextline {
        word-wrap: break-word; 
        white-space: normal;
    }
    #commitsSidebar {
        background-color: rgb(10, 10, 10);
        background-color: rgb(20, 19, 19);
        /* border-left: 5px solid black; */
    }
</style>