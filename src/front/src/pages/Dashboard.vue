<template>
  <div>
    <h2>Добро пожаловать {{ login }}</h2>
  </div>
</template>

<script>
export default {
  name: 'Dashboard',
  data() {
    return {
      login: this.$store.state.admin.login,
    };
  },
};
</script>
