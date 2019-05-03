<template>
  <div class="container">
    <p>Добро пожаловать {{user.login}}. <br/> Сейчас вы будете перенаправлены</p>
  </div>
</template>
<script>
export default {
  name: 'WelcomePage',
  data() {
    return {
      user: {
        login: localStorage.getItem('UserName'),
      },
    };
  },
  beforeCreate() {
    setTimeout(() => { document.location.pathname = '/projects'; }, 800);
  },
};
</script>
