<template>
    <div id="app">
        <FormBuilder />
    </div>
</template>

<script>
    require('~/assets/font/iconfont.css');
    import FormBuilder from './views/FormBuilder'
    export default {
        name: 'App',
        components: {
            FormBuilder
        }
    }

</script>

<style>
    html {
        font-size: 100px;
    }

    #app {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        margin-top: .6rem;
        font-size: .12rem;
    }

</style>
