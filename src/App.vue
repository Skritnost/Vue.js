<template>
 <div>
   <top-menu></top-menu>
   <router-view></router-view>
 </div>
</template>

<script>
import {mapState} from 'vuex'
//import TopMenu from './components/TopMenu'
//import TopMenuVue from './components/TopMenu.vue'
export default {
  number: null,
  components:{
    //TopMenu
  },
  computed:{
    ...mapState({
      userStore: state => state.userStore
    })
  },
 created (){
   const userObj = JSON.parse(localStorage.getItem(''))
   this.$store.dispatch('setUserObject', userObj)
  }
}
</script>

<template>
  <div>
    <!--<pre>{{ userStore }}</pre>-->
    <!--<top-menu></top-menu>-->
    <router-view></router-view>

  </div>
</template>
