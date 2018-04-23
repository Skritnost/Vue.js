<script>
import Vue from 'vue'
//import BootstrapVue from 'bootstrap-vue'
import {mapState} from 'vuex'
import { required, minLength, between, sameAs, email } from 'vuelidate/lib/validators'

//Vue.use(BootstrapVue);
export default {
    computed:{
    ...mapState({
      userStore: state => state.userStore
    })
  },
  name: 'App',
  data(){
    return {
        email: '',
        password: ''
    }
  },
  validations: {
    email: {
      required,
      email
    },
      password: {
      required,
      minLength: minLength(6),
    } 
  },
  beforeCreate: function(){
    if(sessionStorage.getItem('UserInSystem'))
     this.$router.push({name: 'home'})
  },
  methods: {
    formRegistration() {
    this.$router.push('/registration')
    },
    handleLoginFormSubmit(){
      const authUser = {}
      //this.$http.post(loginUrl, postData)
      console.log(this.$v.password.minLength)
        //if (response.status === 200){
        //console.log('Outh token',response)
        //authUser.access_token = response.data.access_token
        //authUser.refresh_token = response.data.access_token
        localStorage.removeItem('loglevel:webpack-dev-server')
      if(localStorage.key(0) && !this.$v.password.$invalid && !this.$v.email.$invalid){
      for(var i = 0; i <= localStorage.length; i++) {
       var localName = localStorage.key(i)
        var object1 = JSON.parse(localStorage.getItem(localName))
       if(object1.email === this.email)
       if(object1.password === this.password){
         sessionStorage.setItem('UserInSystem', localName)
         this.$router.push({name: 'home'})
       }
          else alert('Неверный пароль!')
      }
      }
      else alert('Нет такого логина')
        //this.$http.get(userUrl, {headers: getHeader()})
        //.then(response => {
          //console.log('User object', response)
        //})
        //}
      //})
    }
  }
}
</script>

<template>
   <b-form id="app">
    <div class="wrapper" id="login-wrapper">
      <section class="login">
        <div class="row">
          <div class="col-md-6 col-md-push-3">
            <div class="panel panel-default">
              <div class="panel-heading"><strong>Login</strong></div>
              <div class="panel-body">
                <form v-on:submit.prevent="handleLoginFormSubmit()" >
                  <div class="form-group"  v-bind:class="{ 'form-group--error': $v.password.$error }">
                    <label>Email address</label>
                    <input class="form-control" placeholder="Enter your email address" type="email" v-model="email" @input="$v.email.$touch()">
                    <span class="warning1" v-if="!$v.email.required">Email is required</span>
                  <span class="warning1" v-if="!$v.email.email">Email is invalid</span></div>
                  <div class="form-group"><label>Password</label> <input class="form-control" placeholder="Enter your password"  v-model.trim="password" @input="$v.password.$touch()">
                  <span class="warning1" v-if="!$v.password.required">Password is required</span>
                  <span class="warning1" v-if="!$v.password.minLength">Password has at least {{$v.password.$params.minLength.min}} letters.</span></div>
                  <button class="btn btn-primary">Login</button>
                  </form>
                  <form v-on:submit.prevent="formRegistration()">
                  <button class="btn btn-primary">Registration</button>
                  </form>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </b-form>
</template>

<style scoped src="../assets/css/bootstrap.min.css" >
 /*@import 'bootstrap/dist/css/bootstrap.css';
@import 'bootstrap-vue/dist/bootstrap-vue.css';*/
span .warning1{
  color:red;
}
</style>
