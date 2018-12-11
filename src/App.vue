<template>
  <div id="app">
    <div id="nav">
      <router-link to="/"></router-link>
    </div>
    <router-view/>
  </div>
</template>

<script>

export default {
  name: 'app',
  components: {
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

body{
	margin: 0;
}
</style>




<!-- <template>
	<router-view></router-view>
</template>

<script>
	
	export default {
		created() {
			this.$router.push('/index');
		}
	}
</script>

<style>
	
</style>
 -->