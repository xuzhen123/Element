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

<style>
  @import "assets/css/common.css";
</style>
