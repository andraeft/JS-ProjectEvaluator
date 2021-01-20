<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <div class="container">
      <div class="project-card" v-for="project in projects" :key="project.id">
        <h2> {{project.title}} </h2>
        <p> {{ project.deliverables }} </p>
        <a v-bind:href="'/project/'+ project.id"> Go to project page </a>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
  .container{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    flex-wrap: wrap;
    width: 80%;
    margin: auto;

    .project-card{
      width: 43%;
      padding: 10px;
      margin: 5px;
      border: 1px solid #eeeeee;
    }
  }
</style>

<script>
// @ is an alias to /src
import { isLoggedIn, gettAllProjectsByUserId } from '../services/dataService'

export default {
  name: "MyProjects",
  data() {
      return {
          projects: []
      }
  },
  methods: {
    getAllProjects() {
      if (isLoggedIn()){
        const user = isLoggedIn();
        gettAllProjectsByUserId(user.id).then(response => {
          this.projects = response;
        })
      }
      // } else {
      //   getAllProjects().then(response => {
      //     console.log(response)
      //     this.projects = response
      //   })
      // }
    }
  },
  mounted () {
    this.getAllProjects();
  }
};
</script>
