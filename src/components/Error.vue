<template>
    <div>
        <v-icon large color="white" class="mb-2">{{errorMessage.icon}}</v-icon>
        <h1 class="white--text"> {{errorMessage.message}}</h1>
    </div>
</template>

<script>
export default {
    name: 'Error',
    props: {
        errorMessage: {
            type: Object,
            required: true
        }
    }
}
</script>