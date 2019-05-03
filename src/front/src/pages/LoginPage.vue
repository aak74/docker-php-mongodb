<template>
  <div>
    <FormLogin v-if="!isLogin()" :data="user"/>
    <FormLoginOut v-else :data="user"/>
  </div>
</template>

<script>
import FormLogin from '../components/FormLogin.vue';
import FormLoginOut from '../components/FormLoginOut.vue';

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
    isLoginIn() {
      if (localStorage.getItem('isLogin') === 'true') {
        return true;
      }
      return false;
    },
  },
  methods: {
    isLogin() {
      const user = localStorage.getItem('UserName');
      const FirstLogin = localStorage.getItem('FirstLogin');
      // const isLogin = localStorage.getItem('isLogin');
      localStorage.removeItem('FirstLogin');
      if (FirstLogin) {
        this.$router.push('Welcome');
      }
      if (!this.isLoginIn) {
        console.log(user);
        return false;
      }
      return true;
    },
  },
};
</script>
