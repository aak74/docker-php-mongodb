<template>
    <div class="container">
      <div class="v-card__text ">
        <div class="layout row align-end justify-center" >
          <div class="flex xs6 " >
            <div class="v-input v-text-field v-input--is-label-active v-input--is-dirty theme--light input_manager">
              <div class="v-input__slot">
                <p>{{user.login}} вы действительно хотите выйти с данного профиля?</p>
              </div>
            </div>
            <div class="justify-center v-input v-text-field v-input--is-label-active v-input--is-dirty theme--light input_manager">
              <div class="v-dialog__container">
                    <button @click="signOut" class="mb15 v-btn theme--dark red lighten-2"> Выход </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>
<script>
import FormLogin from '../components/FormLogin';

export default {
  name: 'Login',
   props: {
    data: {
      type: Object
    },

  },
  data(){
      return{
          user:{
              login:localStorage.getItem('UserName'),
          },
      }
  },
  methods:{
      signOut(){
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('UserName');
        localStorage.setItem('isLogin',false);
        document.location.pathname = '/login'
      },
  },
};
</script>
<style>
.input_manager{
 width: 50%;

}
</style>
