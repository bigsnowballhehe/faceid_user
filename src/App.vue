<template>
    <div id="app">
        <faceContent></faceContent>
    </div>
</template>

<script>
import faceContent from './components/faceContent'

export default {
    name: 'App',
    components: {
        faceContent,
    },
}
</script> 

<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
}
</style>
