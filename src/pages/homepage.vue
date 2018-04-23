<script>
import MapGoog from './mapGog'
export default {
   components: {
    MapGoog
  },
  data(){
    return{
      fullname:"",
      latitude:'',
      longitude:'',
      thisUser:''
    }
  },
  methods: {
    handleLogout(){
sessionStorage.removeItem('UserInSystem')
window.location.reload()
    }
  },
  beforeCreate: function(){
    if(!sessionStorage.getItem('UserInSystem'))
     this.$router.push({name: 'author'})
  },
  mounted: function(){
    this.thisUser = sessionStorage.getItem('UserInSystem')
    console.log(this.thisUser)
    var object1 = JSON.parse(localStorage.getItem(this.thisUser))
    this.fullname = object1.firstname + " " + object1.lastname
    this.latitude = object1.latitude
    this.longitude = object1.longitude
  }
}
</script>

<template>
  <div class="wrapper" id="home-wrapper">
      <span class="text">Welcome Home <b>{{fullname}}</b>!!</span>
      <map-goog <map-goog :latitude="latitude" :longitude="longitude">></map-goog>
      <div><button class="button" type="submit" v-on:click="handleLogout">Logout</button></div>
  </div>
</template>

<style scoped>
.text {
font-size: 50px;
}
.button {
    background-color: #4CAF50; /* Green */
    border: none;
    color: white;
    padding: 15px 32px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
}
</style>
