<template>
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
</template>

<script>
export default {
    name: 'Repository',
    props: {
        repository: {
            type: Object,
            required: true
        }
    }
}
</script>