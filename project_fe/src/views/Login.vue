<template>
<div>
    <h1> Login </h1>
    <form>
        <input type="text" name="username" v-model="username" placeholder="username"/>
        <input type="password" name="password" v-model="password" placeholder="password"/>
        <input  type="button" @click='checkUser()' value="Login"/>
    </form>
</div>
</template>


<script>
import { checkUser } from '../services/dataService'
export default {
    name: 'Register',
    data() {
        return {
            username: '',
            password: ''
        }
    },
    methods: {
      checkUser() {
          const user = {
              username: this.username,
              password: this.password,
          }
          checkUser(user).then(response => {
            console.log(response);
            if(response && response.id){
                sessionStorage.setItem("user", JSON.stringify(response));
                window.location.href = "/";
            }
        });
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