<template>
<div>
    <h1> Register </h1>
    <form>
        <input type="text" name="username" v-model="username" placeholder="username"/>
        <input type="password" name="password" v-model="password" placeholder="password"/>
        <input type="password" name="password2" placeholder="confirm password"/>
        <select name="pets" v-model="type">
            <option value="STUDENT">Student</option>
            <option value="PROF">Professor</option>
        </select>
        <input type="button" @click='addUser()' value="Register"/>
    </form>
</div>
</template>

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

<script>
import { addUser } from '../services/dataService'
export default {
    name: 'Register',
    data() {
        return {
            username: '',
            password: '',
            type: 'STUDENT'
        }
    },
    methods: {
      addUser() {
          const payload = {
              username: this.username,
              password: this.password,
              type: this.type
          }
          addUser(payload).then(response => {
            console.log(response);
            if(response && response.message && response.message == "created"){
                alert("Account created! You can log in now");
            }
        });
          // this.$emit('createProject', payload)
      }
    }
}
</script>