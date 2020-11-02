<template>
    <v-navigation-drawer
        v-model="isSidebarOpen"
        fixed
        temporary
        right
        width="auto"
        id="commitsSidebar"
        v-if="currentData"
        >   

            <v-timeline
            dense
            dark
            >

                <!-- Select branch button -->
                <v-row class="justify-end">
                    <v-col cols="7" class="mr-5 mt-n3">
                        <v-select
                        prepend-icon="mdi-source-branch"
                        dark
                        solo
                        :items="branchesSelectButton"
                        :label="branchesSelectButton[0]"
                        @change="changeBranchData($event)"
                        ></v-select>
                    </v-col>
                </v-row>

                <!-- Timeline commits -->
                <v-timeline-item
                class="mb-4"
                color="purple"
                icon-color="red"
                small
                v-for="(commit, index) in currentData.commits"
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
</template>

<script>
/* eslint-disable */
import repoSchemaGQL from '../../graphql/Repo.gql';

export default {
    name: 'Commits',
    props: {
        currentRepoName: {
            type: String,
            /* required: true */
        }
    },
    data() {
        return {
            isSidebarOpen: false,
            currentUser: null,
            commits: null,
            currentData: null,
            branchesSelectButton: null
        }
    },
    created() {
        this.currentUser = this.$route.params.userName;
    },
    watch: {
        commits() {
            this.$emit('loadingFinished');
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

                //Create array of objects with the branch name and its commits
                const branchesCommits = result.data.repository.refs.nodes;
                const branchData = branchesCommits.map(branch => {
                    return {
                        branchName: branch.name,
                        commits: branch.target.history.nodes
                    }
                });
                
                //Store array
                this.commits = branchData;

                this.currentData = this.commits[0];

                //Retrieve all the branches for the repository and create select button
                this.branchesSelectButton = branchData.map(x => x.branchName);
		    }
        },
    },
    methods: {
        changeBranchData(selectedBranchName) {
            const findDataBranch = this.commits.find(x => x.branchName === selectedBranchName);
            this.currentData = findDataBranch;
        }
    }
}
</script>

<style scoped>
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