<template>
  <div id="app">
     <myHeader v-if="isRouterAlive"></myHeader>
    <router-view name='main'  v-if="isRouterAlive"></router-view>
  </div>
</template>

<script>
import myHeader from './components/myHeader'
export default {
  name: 'App',
  components:{
    myHeader
  },
  provide () {
    return {
      reload: this.reload
    }
  },
  data () {
    return {
      isRouterAlive: true
    }
  },
  methods: {
    reload () {
      this.isRouterAlive = false
      this.$nextTick(function () {
        this.isRouterAlive = true
      })
    }
  }
}
</script>

<style>
*{
  margin: 0px;
  padding: 0px;
}
li{
	list-style-type: none;
}
a{
	text-decoration: none;
  color: rgb(16, 71, 133)
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
