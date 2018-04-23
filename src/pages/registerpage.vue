<script>
import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import "vue-material-design-icons/styles.css"
import Avatar from 'vue-avatar'
import AddrGoog from './autocomplete.vue'
import MapGoog from './mapGog'
import { required, minLength, between, sameAs, email, alpha, alphaNum } from 'vuelidate/lib/validators'

Vue.use(Vuetify)

export default {
   name: 'firstReg',
  components: {
    Avatar,
    AddrGoog,
    MapGoog
  },
  data(){
    return {
      form:1,
      step:1,
      valid3: true,
      validtext:false,
      fullname: "",
      repassword: "",
      LocalStore: {},
      registration:{
        firstname:"",
        lastname: "",
        email:"",
        password: ""
      },
    }
  },
  validations: {
    registration:{
      firstname:{
        required,
        alpha
      },
      lastname:{
        required,
        alpha
      },
      email:{
        required,
        email
      },
      password:{
        required,
        minLength: minLength(6),
        alphaNum,
      }
    },
    //repassword:{
      //sameAsPassword: sameAs('registration.password')
    //}
  },
  computed:{
  },
  beforeCreate: function(){
    if(sessionStorage.getItem('UserInSystem'))
     this.$router.push({name: 'home'})
  },
  methods:{
    submit() {
      if (!this.valid3)
      {
      this.validtext=false
      this.number = localStorage.length;
      this.form = 2
      this.fullname = ", " + this.registration.firstname + " " + this.registration.lastname
      window.localStorage.setItem(this.number, JSON.stringify(this.registration))
      window.sessionStorage.setItem('UserInSystem',this.number)
      }
      else this.validtext=true
    },
    gohome(){
      this.$router.push({name: 'home'})
    },
      valid1(){
        if(!this.$v.registration.firstname.$invalid && !this.$v.registration.lastname.$invalid)
        this.step = 2
     },
     valid2(){
        if(!this.$v.registration.email.$invalid && !this.$v.registration.password.$invalid && this.registration.password===this.repassword)
        this.step = 3
     },
     checking([bool,addr]) {
         //if(ld === true){
           this.valid3 = bool
           Object.assign(this.registration,addr)
           this.LocalStore = { longitude: addr.longitude, latitude: addr.latitude}
           console.log(JSON.stringify(this.registration))
         //}
         //else return
       //}
     }
     /*address(addr){
       Object.assign(registration,addr)
     }*/
  }
}
</script>
<!------ Include the above in your HEAD tag ---------->

<template>
<div id="firstReg">
 
  <v-app>
  
    <v-content v-show="form == 1">

                <v-container>
          <v-stepper v-model="step" vertical>
            <v-stepper-header>
              <v-stepper-step step="1" :complete="step > 1">Your Name</v-stepper-step>
              <v-divider></v-divider>
              <v-stepper-step step="2" :complete="step > 2">Your Email and Password</v-stepper-step>
              <v-divider></v-divider>
              <v-stepper-step step="3" :complete="step > 3">Your Address</v-stepper-step>
            </v-stepper-header>
            <v-stepper-items>
              <v-stepper-content step="1">
                 <avatar username="User Name"></avatar>  
                 <div><v-text-field label="FirstName" v-model="registration.firstname"></v-text-field>
                 <span class="warning1" v-if="!$v.registration.firstname.required">FirstName is required</span>
                 <span class="warning1" v-if="!$v.registration.firstname.alpha">FirstName is invalid</span></div>
                 <div><v-text-field label="LastName" v-model="registration.lastname"></v-text-field>
                 <span class="warning1" v-if="!$v.registration.lastname.required">LastName is required</span>
                 <span class="warning1" v-if="!$v.registration.lastname.alpha">LastName is invalid</span></div>               
                <v-btn color="primary" @click.native="valid1">Continue</v-btn>
              </v-stepper-content>
              <v-stepper-content step="2">
                  
                  <div><v-text-field label="Email" v-model="registration.email"></v-text-field>
                  <span class="warning1" v-if="!$v.registration.email.required">Email is required</span>
                  <span class="warning1" v-if="!$v.registration.email.email">Email is invalid</span></div>
                  <div><v-text-field label="Password" v-model="registration.password" required></v-text-field>
                  <span class="warning1" v-if="!$v.registration.password.required">Password is required</span>
                  <span class="warning1" v-if="!$v.registration.password.alphaNum">Password is invalid</span>
                  <span class="warning1" v-if="!$v.registration.password.minLength">Password has at least {{$v.registration.password.$params.minLength.min}} letters.</span></div>
                  <div><v-text-field label="Repeat password" v-model="repassword"></v-text-field>
                  <span class="warning1" v-if="!(registration.password===repassword)">Repassword doesn't match</span></div>
                <v-btn flat @click.native="step = 1">Previous</v-btn>
                <v-btn color="primary" @click.native="valid2">Continue</v-btn>
                
              </v-stepper-content>
               <v-stepper-content step="3">
                 <div><addr-goog @checking="checking"></addr-goog>
                 <span class="warning1" v-if="validtext">Address is required</span></div>
                 <v-btn flat @click.native="step = 2">Previous</v-btn>
                 <v-btn color="primary" @click.prevent="submit">Save</v-btn>
                 </v-stepper-content>
            </v-stepper-items>
          </v-stepper>         
              
        </v-container>    

    </v-content>
     <v-content v-show="form == 2">
<v-card width ="40%">
<v-card-title>Hello <b>{{fullname}}</b>!! </v-card-title>
<map-goog :latitude="LocalStore.latitude" :longitude="LocalStore.longitude"></map-goog>
<v-btn color="primary" @click.prevent="gohome">Go Home</v-btn>
</v-card>
     </v-content>

  </v-app>

  <br/><br/>Debug: {{registration}} Local: {{LocalStore}}

</div>
</template>

<style scoped>
.card {
  margin: auto;
}
/*body {
  text-align: center;
}*/
span.warning1 {
  margin-left: 0px;
  color: red;
}
</style>
