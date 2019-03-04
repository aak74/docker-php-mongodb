<template>
  <div>
    <FormLogin :data="user"/>
  </div>
</template>

<script>
import FormLogin from '../components/FormLogin';

export default {
  name: 'Login',
  components: {
    FormLogin,
  },
  computed: {
    user() {
      return this.$store.state.login;
    },
  }
};
</script>