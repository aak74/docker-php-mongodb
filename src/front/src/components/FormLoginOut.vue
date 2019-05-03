<template>
  <div class="container">
    <div class="v-input v-text-field v-input--is-label-active v-input--is-dirty theme--light input_manager">
      <div class="v-input__slot">
        <p>{{ user.login }} вы действительно хотите выйти с данного профиля?</p>
      </div>
    </div>
    <div class="justify-center v-input v-text-field v-input--is-label-active v-input--is-dirty theme--light input_manager">
      <div class="v-dialog__container">
        <button @click="logout" class="mb15 v-btn theme--dark red lighten-2"> Выход </button>
      </div>
    </div>
  </div>
</template>
<script>

export default {
  name: 'Logout',
  methods: {
    signOut() {
      this.$ctrl.logout();
    },
  },
};
</script>
