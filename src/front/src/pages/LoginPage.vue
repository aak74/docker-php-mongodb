<template>
  <div>
    <FormLogin v-if="isLogin" :data="user"/>
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
    isLogin() {
      return true;
    },
  },
};
</script>
