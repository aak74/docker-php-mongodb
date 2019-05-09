<template>
  <v-layout row align-end>
    <v-dialog v-model="dialog" persistent max-width="400">
      <template v-slot:activator="{ on }">
        <v-btn color="green" dark v-on="on">Добавить</v-btn>
      </template>
      <project-form
        @emit="emit"
      />
    </v-dialog>
    <v-btn
      color="blue lighten-2"
      @click="refresh"
      dark
    >
      Обновить
    </v-btn>
  </v-layout>
</template>

<script>
import ProjectForm from './ProjectForm.vue';

export default {
  name: 'ProjectsActions',
  components: {
    ProjectForm,
  },
  data() {
    return {
      dialog: false,
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
  methods: {
    emit(event) {
      this.dialog = false;
      this.$emit(event);
    },

    refresh() {
      this.$emit('refresh');
    },
  },
};
</script>
