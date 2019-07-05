<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang='scss'>
html,
body{
  background: linear-gradient(90deg, rgb(10, 164, 199), rgb(25, 213, 253));
  overflow: hidden;
}
#app {
  height: 100%;
  width: 100%;
}
</style>
