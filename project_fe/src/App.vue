<template>
  <div id="app">
    <div v-if="isLogged"> Hello, {{ user.username }} </div>
    <div id="nav">
      <router-link to="/">My projects</router-link> |
      <router-link to="/eval">Evaluations</router-link> |
      <!-- <router-link to="/about">About</router-link> | -->
      <router-link to="/login">Login</router-link> |
      <router-link to="/register">Register</router-link>|
      <router-link to="/add-project">Create a project</router-link>
    </div>
    <router-view />
  </div>
</template>

<script>
export default {
  data(){
    return {
      user: {},
      isLogged: false
    }
  },

  methods: {
    checkIfLogged(){
      if (sessionStorage.getItem("user")){
        this.isLogged = true;
        this.user = JSON.parse(sessionStorage.getItem("user"));
      }
    }
  },

  mounted(){
    this.checkIfLogged();
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
