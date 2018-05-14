<script>
export default {
  data(){ return{
    AuthUser: false,
  }
  },
  beforeCreate:function(){
    if(sessionStorage.getItem(UserInSystem))
    return AuthUser = true;
  }
}
</script>

<template>
  
</template>
<style>

</style>
