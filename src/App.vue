<template>
  <div id="app">
    <xz-container></xz-container> 
  </div>
</template>

<script>

  import XzContainer from './components/xzContainer/XzContainer'

  export default {
    name: 'App',
    components: {
      XzContainer,

    },
  }
</script>

<style scoped>
  body{
    margin: 0;
  } 
</style>
