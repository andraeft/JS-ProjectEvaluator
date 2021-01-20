<template>
<div>
    <h1> Create a project </h1>
    <p> You'll be assigned as the project creator. </p>
    <form>
        <input type="text" name="title" v-model="title" placeholder="title"/>
        <textarea name="deliverables" v-model="deliverables" placeholder="deliverables"/>
        <input type="text" name="videoUrl" v-model="videoUrl" placeholder="video url"/>
        <input type="text" name="projectLink" v-model="projectLink" placeholder="project link"/>
        <input type="date" name="dueDate" v-model="dueDate" placeholder="due date"/>
        <input type="button" @click='createProject()' value="Create project"/>
    </form>
</div>
</template>

<script>

import { createProject } from '../services/dataService'

export default {
  name: 'AddProject',
  data() {
    return {
      title: '',
      deliverables: '',
      videoUrl: '',
      projectLink: '',
      dueDate: ''
    }
  },
  methods: {
      createProject() {
          console.log(this.title)
          const payload = {
              title: this.title,
              deliverables: this.deliverables,
              videoUrl: this.videoUrl,
              projectLink: this.projectLink,
              dueDate: this.dueDate,
              finalGrade: -1
          }
          createProject(payload).then(response => {
            console.log(response);
            alert('Project successfully added!');
            window.location.href = '/';
        });
      },
      clearForm() {
        //   this.title = "";
        //   this.deliverables = "";
        //   this.videoUrl = "";
      }
  }
}
</script>

<style lang="scss">
form{
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 400px;
    margin: auto;

    * {
        margin: 5px;
    }
}
</style>