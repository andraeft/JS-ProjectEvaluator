<template>
  <div id="app">
    <div v-if="isLogged"> Hello, {{ user.username }} </div>
    <div id="nav">
      <div  v-if="isLogged === true && user.type == 'STUDENT' ">
        <router-link to="/">My projects</router-link> |
        <router-link to="/eval">Evaluations</router-link> |
        <router-link to="/add-project">Create a project</router-link> |
      </div>
      <div  v-if="isLogged === true && user.type == 'PROF' ">
        <router-link to="/">All projects</router-link>
      </div>
      <router-link to="/login">Login</router-link> |
      <router-link to="/register">Register</router-link>
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
