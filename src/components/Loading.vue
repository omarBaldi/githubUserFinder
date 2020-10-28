<template>
    <v-progress-circular
        :size="140"
        :width="4"
        color="white"
        indeterminate
        id="loadingBar"
    ></v-progress-circular>
</template>

<script>
export default {
    name: 'Loading'
}
</script>

<style scoped>
    #loadingBar {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
</style>