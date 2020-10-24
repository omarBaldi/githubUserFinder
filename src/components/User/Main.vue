<template>
    <v-card flat class="d-flex flex-column align-center justify-center white--text" color="transparent" id="cardUserInfo">

        <v-avatar
            tile
            class="ml-n10 mb-4"
            :size="200"
            id="imageUser"
            >
            <v-img :src="dataUser.avatarUrl"></v-img>
        </v-avatar>

        <v-card-text class="white--text">
            <v-list-item-title class="headline">{{dataUser.name}}</v-list-item-title>
            <v-list-item-subtitle>@{{dataUser.login}}</v-list-item-subtitle>
        </v-card-text>

        <v-card-text class="white--text">
            <v-list-item-subtitle v-for="number in 4" :key="number" class="mb-2">
            <div v-if="number === 1">
                <v-icon color="white" size="25" class="mr-2">mdi-link-variant</v-icon>
                <span class="subheading mr-2">{{dataUser.url}}</span>
            </div>
            <div v-else-if="number === 2">
                <v-icon color="white" size="25" class="mr-2">mdi-map-marker</v-icon>
                <span class="subheading mr-2">{{dataUser.location}}</span>
            </div>
            <div v-else-if="number === 3">
                <v-icon color="white" size="25" class="mr-2">mdi-email-outline</v-icon>
                <span class="subheading mr-2">{{dataUser.email}}</span>
            </div>
            <div v-else>
                <v-icon color="white" size="25" class="mr-2">mdi-account-tie</v-icon>
                <span class="subheading mr-2">
                Available for hire: 
                <span v-html="dataUser.isHireable ? 'Yes' : 'No'"></span></span>
            </div>
            </v-list-item-subtitle>
        </v-card-text>
            
    </v-card>
</template>

<script>
/* eslint-disable */

export default {
    name: 'User',
    props: {
        dataUser: {
            type: Object,
            required: true
        }
    }
}
</script>

<style>
    #imageUser {
        border: 1px solid grey;
    }
    #cardUserInfo {
        position: fixed;
        padding-left: 3rem;
        height: 100%;
        min-height: 700px;
    }
</style>