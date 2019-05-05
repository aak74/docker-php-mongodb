<template>
  <v-card elevation=0>
    <v-card-text>
      {{ login }}, Вы хотите выйти из аккаунта?</h2>
    </v-card-text>
    <v-card-actions>
      <v-btn
        color="success"
        @click="logout"
      >
        Выйти
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>

export default {
  name: 'Logout',
  computed: {
    login() {
      return this.$store.state.admin.login;
    }
  },
  methods: {
    logout() {
      this.$store.commit('admin/LOGOUT');
    }
  },
};
</script>
