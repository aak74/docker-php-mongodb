<template>
  <v-layout row align-end>
    <v-flex xs6>
      <v-btn
        slot="activator"
        color="green lighten-2"
        @click="emit('add')"
        class="mb15"
        dark
      >
        Добавить
      </v-btn>
      <v-btn
        color="blue lighten-2"
        @click="emit('refresh')"
        class="mb15"
        dark
      >
        Обновить
      </v-btn>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  name: 'ProjectsActions',
  data() {
    return {
      data: Object,
      autoupdate: '',
      update: true,
      SSH: false,
      showDialog: false,
      formValid: false,
      showPassword: true,
      id: '',
      name: '',
      nameRules: [
        v => !!v || 'Название обязательно',
      ],
      url: '',
      urlRules: [
        v => !!v || 'URL адрес обязателен',
      ],
      text: '',
      password: '',
      passwordRules: [
        v => !!v || 'Пароль обязателен',
      ],
      host: '',
      user: '',
      port: '',
      passwordSSH: '',
      path: '',
      disableInput: false,
      modalTitle: 'Добавить новый проект',
      modalSubmitButton: 'Добавить',
      modalAction: '',
    };
  },

};
</script>
