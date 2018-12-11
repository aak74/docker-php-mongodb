<template>
  <div>
    <v-container>
      <v-dialog
        v-model="showDialog"
        width="500"
      >
        <v-btn
          slot="activator"
          color="orange lighten-1"
          @click="openDialog"
          class="mb15"
          dark
        >
          Редактировать
        </v-btn>
        <v-card>
          <v-card-title
            class="headline grey lighten-2"
            primary-title
          >
            Редактировать проект
          </v-card-title>
          <v-card-text>
            <v-form v-model="formValid">
              <v-text-field
                v-model="name"
                label="Название"
                :rules="nameRules"
                required
              ></v-text-field>
              <v-text-field
                v-model="url"
                label="URL"
                :rules="urlRules"
                required
              ></v-text-field>
            </v-form>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="red"
              flat
              @click="showDialog = false"
            >
              Отмена
            </v-btn>
            <v-btn
              color="green"
              flat
              @click="saveProject"
              :disabled="!formValid"
            >
              Сохранить
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-btn
        class="mb15"
        color="indigo lighten-1"
        @click="backupProject"
        dark
      >
        Сделать бэкап
      </v-btn>
      <v-card>
        <v-card-title
          class="headline grey lighten-2"
          primary-title
        >
         Проект
        </v-card-title>
        <v-card-text>
          <h3>Название</h3>
          <span>{{ this.project.name }}</span>
          <h3>URL</h3>
          <span>{{ this.project.url }}</span>
        </v-card-text>
      </v-card>
    </v-container>
  </div>
</template>

<script>
/* eslint no-underscore-dangle: ["error",{"allow":["_id"]}] */

export default {
  name: 'Project',
  data() {
    return {
      id: this.$route.params.id,
      formValid: false,
      showDialog: false,
      name: '',
      nameRules: [
        v => !!v || 'Название обязательно',
      ],
      url: '',
      urlRules: [
        v => !!v || 'URL адрес обязятелен',
      ],
    };
  },
  methods: {
    sendRequest() {
      this.$store.dispatch('openProject', this.id);
    },
    openDialog() {
      this.showDialog = true;
      this.name = this.project.name;
      this.url = this.project.url;
    },
    backupProject() {
      console.log('Запрос на создание бэкапа добавлен в очередь');
      this.$store.dispatch('backupProject', this.id);
      // this.showDialog = false;
    },
    saveProject() {
      console.log('Проект сохранен', this.id, this.name, this.url);
      this.$store.dispatch('saveProject', { name: this.name, url: this.url });
      this.showDialog = false;
      this.sendRequest();
    },
  },
  computed: {
    project() {
      return this.$store.getters.currentProject;
    },
  },
  created() {
    this.sendRequest();
  },
  mounted() {
    document.addEventListener('keydown', e => {
      if (this.showDialog === true && e.keyCode === 27) {
        this.showDialog = false;
      } else if (this.showDialog === true && this.formValid === true && e.keyCode === 13) {
        this.saveProject();
      }
    });
  },
};
</script>

<style>
.mb15 {
  margin-bottom: 15px;
}
</style>
