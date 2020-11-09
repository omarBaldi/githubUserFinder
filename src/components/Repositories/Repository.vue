<template>
    <v-card
        flat
        dark
        id="cardRepo"
        class="mx-auto mb-5 mr-1 ml-1"
        :hover="true"
        height="auto"
        min-height="190"
        @mouseover="isHover = true"
        @mouseleave="isHover = false"
        :class="{ 'hoverRepoCard': isHover }"
    >
        <div class="px-1 py-1">

            <v-card-title>
                <h3 class="font-weight-bold">{{repository.name}}</h3>
            </v-card-title>

            <v-card-text class="font-weight-normal" v-if="repository.description">
                <span v-html="repository.description.length > 100 ? repository.description.slice(0, 100).concat('...') : repository.description"></span>
            </v-card-text>

            <v-card-text class="font-weight-normal" v-else>
                <span v-html="' - '"></span>
            </v-card-text>


            <v-card-actions class="mt-n5 mb-3" id="repoOptions" :class="showRepoOptions ? 'absoluteNo' : 'absoluteYes' ">
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
               
                <v-btn
                icon
                @click="showRepoOptions = !showRepoOptions"
                class="mr-3"
                >
                    <v-icon>{{ showRepoOptions ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
                </v-btn>

            </v-card-actions>

             <v-expand-transition>
                <div v-show="showRepoOptions">
                    <v-divider></v-divider>

                   <v-card flat color="transparent">
                        <v-list-item-group
                            multiple
                        >
                            <v-list-item 
                            :href="repository.url"
                            target="_blank"
                            >
                                <v-list-item-title>Go to</v-list-item-title>
                            </v-list-item>

                            <v-divider></v-divider>

                            <v-list-item>
                                <v-list-item-title>Show Repository info</v-list-item-title>
                            </v-list-item>

                            <v-divider></v-divider>

                            <v-list-item 
                            @click="showCommits(repository.name)"
                            >
                                <v-list-item-title>Repo commits</v-list-item-title>
                            </v-list-item>

                        </v-list-item-group>
                   </v-card>
                </div>
            </v-expand-transition>

        </div>
    </v-card>
</template>

<script>
/* eslint-disable */
export default {
    name: 'Repository',
    props: {
        repository: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            showRepoOptions: false,
            isHover: false
        }
    },
    methods: {
        showCommits(currentRepoName) {
            this.$emit('openSideMenu', currentRepoName);
        }
    }
}
</script>

<style scoped lang="scss">
    #cardRepo {
        transition: all .5s ease-out;
        #repoOptions {
            width: 100%;
            display: flex;
            justify-content: space-between;
        }
    }

    /* Dynamic classes */
    .hoverRepoCard {
        transform: scale(1.1);
        border: 1px solid rgb(42, 41, 41);
    }
    /* .absoluteYes {
        position: absolute; 
        bottom: 0; 
        left: 0;
    }
    .absoluteNo {
        position: relative; 
    } */
</style>