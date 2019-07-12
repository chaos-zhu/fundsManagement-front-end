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
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, rgb(10, 164, 199), rgb(25, 213, 253));
  background-color: #f8f8f8;
}
#app {
  height: 100%;
  width: 100%;
  overflow: hidden;
}
</style>
