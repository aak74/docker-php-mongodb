<template>
    <div class="container">
      <div class="v-card__text ">
        <div class="layout row align-end justify-center" >
          <div class="flex xs6 " >
            <div class="v-input v-text-field v-input--is-label-active v-input--is-dirty theme--light input_manager">
              <div class="v-input__slot">
                <p>Учетная запись {{user.login}} </br> в данный момент заблокирована</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>
<script>
export default {
  name: 'WelcomePage',
  data(){
      return{
          user:{
              login:localStorage.getItem('UserName'),
          },
      }
  },
};
</script>
<style>
.input_manager{
 width: 50%;

}
</style>
