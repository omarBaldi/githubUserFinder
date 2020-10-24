<template>
    <v-card-text class="pa-0 ma-0">
        <v-list-item-title class="headline">{{data.search.edges[0].node.name}}</v-list-item-title>
        <v-list-item-subtitle>@{{data.search.edges[0].node.login}}</v-list-item-subtitle>
    </v-card-text>
</template>

<script>
export default {
    name: 'UsernameGitHub'
}
</script>