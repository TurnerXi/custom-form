<template>
    <div id="app">
        <router-view />
    </div>
</template>

<script>
    require('~/assets/font/iconfont.css');
    export default {
        name: 'App',
    }

</script>

<style>
    html,
    body {
        margin: 0;
        padding: 0;
    }

    html {
        font-size: 100px;
    }

    #app {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        font-size: .12rem;
    }

</style>
