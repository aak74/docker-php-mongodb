<template>
  <div>
    <v-container>
      <h2>Проекты</h2>
      <v-layout row align-end>
        <v-flex xs6>
          <v-dialog
            v-model="showDialog"
            width="500"
          >
            <v-btn
              slot="activator"
              color="green lighten-2"
              @click="addItem"
              class="mb15"
              dark
            >
              Добавить
            </v-btn>
            <v-card>
              <v-card-title
                class="headline grey lighten-2"
                primary-title
              >
                {{ modalTitle }}
              </v-card-title>
              <v-card-text>
                <v-form v-model="formValid">
                  <v-text-field
                    v-model="name"
                    label="Название"
                    :rules="nameRules"
                    :disabled="disableInput"
                    required
                  ></v-text-field>
                  <v-text-field
                    v-model="url"
                    label="URL"
                    :rules="urlRules"
                    :disabled="disableInput"
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
                  @click="confirmModalAction"
                  :disabled="!formValid"
                >
                  {{ modalSubmitButton }}
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-btn
            color="blue lighten-2"
            @click="sendRequest"
            class="mb15"
            dark
          >
            Обновить
          </v-btn>
          <v-btn
            color="red lighten-2"
            @click="sendBackup"
            class="mb15"
            dark
          >
            Бэкап
          </v-btn>
        </v-flex>
      </v-layout>
      <data-table
      :headers="headers"
      :items="items"
      :loading="false"
      v-if="isShow"
      :transforms="transforms"
      :hide-actions="false"
      :controls="controls"
      @editItem="editItem"
      @deleteItem="deleteItem"
      />
    </v-container>
  </div>
</template>

<script>
/* eslint no-underscore-dangle: ["error",{"allow":["_id"]}] */

import DataTable from '../components/admin/DataTable';

export default {
  name: 'Projects',
  data() {
    return {
      showDialog: false,
      formValid: false,
      id: '',
      name: '',
      nameRules: [
        v => !!v || 'Название обязательно',
      ],
      url: '',
      urlRules: [
        v => !!v || 'URL адрес обязятелен',
      ],
      disableInput: false,
      modalTitle: 'Добавить новый проект',
      modalSubmitButton: 'Добавить',
      modalAction: '',
    };
  },
  components: {
    DataTable,
  },
  methods: {
    sendRequest() {
      this.$store.dispatch('loadProjects');
    },
    addItem() {
      this.modalTitle = 'Добавить новый проект';
      this.modalSubmitButton = 'Добавить';
      this.modalAction = 'Add';
      this.name = '';
      this.url = '';
      this.disableInput = false;
      this.showDialog = true;
    },
    editItem(item) {
      this.modalTitle = 'Редактировать проект';
      this.modalSubmitButton = 'Сохранить';
      this.modalAction = 'Edit';
      this.id = item._id;
      this.name = item.name;
      this.url = item.url;
      this.disableInput = false;
      this.showDialog = true;
    },
    deleteItem(item) {
      this.modalTitle = 'Удалить проект';
      this.modalSubmitButton = 'Удалить';
      this.modalAction = 'Delete';
      this.id = item._id;
      this.name = item.name;
      this.url = item.url;
      this.disableInput = true;
      this.showDialog = true;
    },
    confirmModalAction() {
      const action = this.modalAction;
      switch (action) {
        default:
          break;
        case 'Add':
          this.addProject();
          break;
        case 'Edit':
          this.saveProject();
          break;
        case 'Delete':
          this.deleteProject();
          break;
      }
    },
    addProject() {
      console.log('Проект добавлен', this.name, this.url);
      this.$store.dispatch('addProject', { name: this.name, url: this.url });
      this.showDialog = false;
      this.sendRequest();
    },
    deleteProject() {
      console.log('Проект удалён', this.name, this.url, this.id);
      this.$store.dispatch('deleteProject', this.id);
      this.showDialog = false;
      this.sendRequest();
    },
    saveProject() {
      console.log('Проект сохранен', this.id, this.name, this.url);
      this.$store.dispatch('saveProject', { name: this.name, url: this.url, id: this.id });
      this.showDialog = false;
      this.sendRequest();
    },
    sendBackup() {
      console.log('Запрос на создание бэкапа добавлен в очередь');
      this.$store.dispatch('backupProjects');
    },
  },
  computed: {
    controls() {
      return this.$store.state.ui.defaultControls;
    },
    isShow() {
      return true;
    },
    items() {
      return this.$store.getters.projects;
    },
    totalItems() {
      return this.$store.getters.projects;
    },
    headers() {
      return [{ text: 'Название', value: 'name' }, { text: 'URL', value: 'url', sortable: false }];
    },
    /**
     * преобразует значение по ключу заголовка (headers)
     * @example headerKey: function(value) { return transform (value); }
     */
    transforms() {
      return {
        updateAt(value) {
          return value.toString();
        },
      };
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
        this.confirmModalAction();
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
