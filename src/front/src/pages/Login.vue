<template>
  <v-flex md4>
    <v-text-field
      v-model="user.login"
      prepend-inner-icon ="perm_identity"
      label="Имя пользователя"
      :rules="requiredRules"
    ></v-text-field>
    <v-text-field
      v-model="user.password"
      prepend-inner-icon ="build"
      label="Пароль"
      type="password"
      :rules="requiredRules"
    ></v-text-field>
    <div>
      <v-btn color="success" @click="login">
        Войти
      </v-btn>
      <v-btn @click="register">
        Регистрация
      </v-btn>
    </div>
  </v-flex>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      user: this.$store.state.admin.user,
      requiredRules: [
        v => !!v || 'Поле обязательно для заполнения',
      ],
      fail: true,
    };
  },

  methods: {
    login() {
      console.log('login');
      this.$store.dispatch('admin/login', this.user);
    },

    register() {
      this.$store.dispatch('register', this.user);
    },
  },
};
</script>
