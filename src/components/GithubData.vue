<template>
    <v-row>

        <v-col lg="4" md="4" sm="5" cols="12" style="height: 100vh;">
            <User 
                :dataUser="data"
            />
        </v-col>

        <v-col lg="8" md="8" sm="7" cols="12" style="margin-top: 2rem;" class="d-flex flex-column justify-center px-8">
            <h1 class="white--text" style="font-size: 3.5em;">Repos.</h1>
            <Repositories 
                :dataRepos="data"
            />
        </v-col>

    </v-row>
</template>

<script>
/* eslint-disable */
import User from './User/Main';
import Repositories from './Repositories/Main';

export default {
    name: 'GithubData',
    components: {
        User,
        Repositories
    },
    props: {
        data: {
            type: Object,
            required: true
        }
    }
}
</script>