<template>
<div>
    <div>
        <h1> {{ project.title }} </h1>
        <p> {{project.deliverables}} </p>
        <p> video url: {{project.videoUrl}} </p>
        <p> project link: {{project.projectLink}} </p>
        <p> expires on: {{project.dueDate}} </p>
    </div>
    <div>
         <button @click="generateJury()"> Generate jury </button>
    </div>
</div>
</template>
<script>
import { getProjectById, generateJury } from '../services/dataService'
export default {
    name: "ProjectPage",
    data(){
        return {
            id: this.$route.params.id,
            project: {}
        }
    },
    methods: {
        getProjectById(id) {
            console.log(id);
            getProjectById(id).then(response => {
                console.log(response);
                this.project = response;
            })
        },

        generateJury(){
            generateJury(this.project.userId).then(response => {
                console.log(response)
            })
        }
    },
    beforeMount(){
        console.log("beforeMount: " + this.$route.params.id);
        this.getProjectById(this.$route.params.id);
    }

}
</script>