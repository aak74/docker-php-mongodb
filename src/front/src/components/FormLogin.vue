<template>
    <div class="container">
      <div class="v-card__text ">
        <div class="layout row align-end justify-center" >
          <div class="flex xs6 " >
            <div class="v-input v-text-field v-input--is-label-active v-input--is-dirty theme--light input_manager">
              <div class="v-input__control">
                <div class="v-input__slot">
                  <input class="v-text-field__slot " v-model="user.login" />
                </div>
              </div>
            </div>
            <div class="v-input v-text-field v-input--is-label-active v-input--is-dirty theme--light input_manager">
              <div class="v-input__control" >
                <div class="v-input__slot">
                  <input class="v-text-field__slot" v-model="user.password" type="password"/>
                </div>
              </div>
            </div>
             <div class="justify-center v-dialog__container">
                  <button @click="register" class="mb15 v-btn theme--dark green lighten-2"> Регистрация   </button>
                  <button @click="signIn" class="mb15 v-btn theme--dark green lighten-2"> Войти </button>
                  <button @click="auth" class="mb15 v-btn theme--dark green lighten-2"> Проверка</button>
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
          answer:localStorage.getItem('token'),

      }
  },
  components: {

  },
  watch:{
    data(){
      this.answer=localStorage.getItem('token');
    }
  },
  methods:{
      signIn(){
      this.$store.dispatch('signIn', this.user);

      },
      auth(){
      this.$store.dispatch('auth', this.user);

      },
      register(){
          let packet=[localStorage.getItem('token'),]
          this.$store.dispatch('register', this.user);
      }
  },
};
</script>
<style>
.input_manager{
 width: 50%;

}
</style>
