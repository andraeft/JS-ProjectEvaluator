<template>
<div>
    <div>
        <h1> {{ project.title }} </h1>
        <i v-if="project.userId == currentUser.id"> you created this project </i>
        <p> {{project.deliverables}} </p>
        <p> video url: {{project.videoUrl}} </p>
        <p> project link: {{project.projectLink}} </p>
        <p> expires on: {{project.dueDate}} </p>
    </div>
    <div v-if="project.userId == currentUser.id">
        <div v-if="hasJury==false">
         <button @click="generateJury()"> Generate jury </button>
         <button @click="stopEvaluation()"> Stop evaluation </button>
        </div>
        <div v-if="hasJury==true">
            <h2> Members of the jury have been assigned </h2>
            <!-- <ul>
                <li v-for="member in jury" :key="member.id">
                    {{ member.username }}
                </li>
            </ul> -->
        </div>
    </div>
    <div v-if="userRole=='EVAL'">
        <br>
        <br>
        <i> You are a jury to this project. </i>
        <form v-if="project.finalGrade == -1">
            <label for="grade"> Your grade to this project </label>
            <input type="number" v-model="projectGrade" name="grade" />
            <input type="button" @click="submitGrade()" value="submit"/>
        </form>
    </div>
</div>
</template>
<script>
import { getProjectById, generateJury, getJury, isLoggedIn, getProjectRole, submitGrade, getGrade, stopEvaluation } from '../services/dataService'
export default {
    name: "ProjectPage",
    data(){
        return {
            id: this.$route.params.id,
            project: {},
            hasJury: false,
            currentUser: {},
            userRole: '',
            projectGrade: ''
        }
    },
    methods: {
        getProjectById(id) {
            console.log(id);
            getProjectById(id).then(response => {
                console.log(response);
                this.project = response;
                this.checkForJury();
                this.currentUser = isLoggedIn();
                if (this.currentUser) {
                    console.log('user ' + JSON.stringify(this.currentUser))
                    this.getProjectRole(this.currentUser.id, response.id);
                }
            })
        },

        generateJury(){
            generateJury(this.project.userId, this.project.id).then(response => {
                console.log(response)
            })
        },

        checkForJury(){
            getJury(this.project.id).then( response =>{
                if (response && response.length > 0) {
                    this.jury = response;
                    this.hasJury = true;
                }
            });
        },

        getProjectRole(userId, projectId){
            getProjectRole(userId, projectId).then( response => {
                if (response) {
                    console.log(response);
                    this.userRole = response.role;
                    if (this.userRole == "EVAL"){
                        getGrade(this.currentUser.id, this.project.id).then(grade => {
                            if (grade){
                                this.projectGrade = grade.grade;
                            }
                        });
                    }
                }
            })
        },

        submitGrade(){
            const payload = {
                grade: this.projectGrade,
                userId: this.currentUser.id,
                projectId: this.project.id
            }
            submitGrade(payload);
        },

        stopEvaluation(){
            stopEvaluation(this.project.id);
        }


    },
    beforeMount(){
        console.log("beforeMount: " + this.$route.params.id);
        this.getProjectById(this.$route.params.id);
    }

}
</script>
<style scoped lang="scss">
form{
    display: flex;
    flex-direction: column;
    width: 30%;
    margin: auto;
    margin-top: 10px;

    * {
        margin: 5px;
    }
}
</style>