<template>
    <div class="container">
      <div class="v-card__text ">
        <div class="layout row align-end justify-center" >
          <div class="flex xs6 " >
            <div class="v-input v-text-field v-input--is-label-active v-input--is-dirty theme--light input_manager">
              <div class="v-input__control">
                <div class="v-input__slot">
                  <input placeholder="Имя пользователя" class="v-text-field__slot " v-model="user.login" />
                </div>
              </div>
            </div>
            <div class="v-input v-text-field v-input--is-label-active v-input--is-dirty theme--light input_manager">
              <div class="v-input__control" >
                <div class="v-input__slot">
                  <input placeholder="Пароль" class="v-text-field__slot" v-model="user.password" type="password"/>
                </div>
              </div>
            </div>
             <div class="justify-center v-dialog__container">
                  <button @click="register" v-bind:class="{green :fail, red:!fail}" class="mb15 v-btn theme--dark lighten-2"> Регистрация   </button>
                  <button @click="signIn" v-bind:class="{green :fail, red:!fail}" class="mb15 v-btn theme--dark  lighten-2"> Войти </button>
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
              login:'',
              password:'',
          },
          fail:true,
      }
  },
  methods:{
      setTrue(){
      this.fail = true;
      },
      signIn(){
      this.$store.dispatch('signIn', this.user);
      this.fail = false;
      setTimeout(this.setTrue,800);
      },
      auth(){
      this.$store.dispatch('auth', this.user);
      },
      register(){
          let packet=[localStorage.getItem('token'),]
          this.$store.dispatch('register', this.user);
      },
  },
};
</script>
<style>
.input_manager{
 width: 50%;

}
</style>
