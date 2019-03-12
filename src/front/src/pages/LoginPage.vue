<template>
  <div>
    <FormLogin v-if="isLogin()" :data="user"/>
    <FormLoginOut v-else :data="user"/>
  </div>
</template>

<script>
import FormLogin from '../components/FormLogin';
import FormLoginOut from '../components/FormLoginOut';

export default {
  name: 'Login',
  components: {
    FormLogin,
    FormLoginOut,
  },
  computed: {
    user() {
      return this.$store.state.login;
    },
  },
  methods:{
      isLogin(){
        const user = localStorage.getItem('UserName');
        const FirstLogin = localStorage.getItem('FirstLogin');
        localStorage.removeItem('FirstLogin');
        if (FirstLogin){
          this.$router.push('Welcome');
        }
        if(user){
          console.log(user);
          return false
        }
        return true
      },
  }
};
</script>
