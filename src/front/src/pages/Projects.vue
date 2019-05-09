<template>
  <div>
    <v-container>
      <h2>Проекты</h2>
      <projects-actions
        @add="add"
        @refresh="refresh"
      />
      <data-table
        :headers="headers"
        :items="items"
        :loading="false"
        v-if="isShow"
        :transforms="transforms"
        :hide-actions="false"
        :controls="controls"
        @click="clickItem"
        @editItem="editItem"
        @deleteItem="deleteItem"
        @backupItem="backupItem"
      />
    </v-container>
  </div>
</template>

<script>
/* eslint no-underscore-dangle: ["error",{"allow":["_id"]}] */

import ProjectsActions from '../components/ProjectsActions.vue';
import DataTable from '../components/admin/DataTable.vue';

export default {
  name: 'Projects',
  components: {
    DataTable,
    ProjectsActions,
  },

  methods: {
    refresh() {
      this.$store.dispatch('getProjects');
    },
    loadProject() {
      this.$store.dispatch('getProject', this.id);
      this.data = this.$store.state.project.current;
    },
    clickItem(item) {
      this.id = item._id;
      this.name = item.name;
      this.url = item.url;
      this.text = item.text;
      this.disableInput = false;
      this.showPassword = false;
      document.location.href = `/projects/${item._id}`;
    },
    add() {
      this.modalTitle = 'Добавить новый проект';
      this.modalSubmitButton = 'Добавить';
      this.modalAction = 'Add';
      this.name = '';
      this.url = '';
      this.text = '';
      this.password = '';
      this.host = '';
      this.user = '';
      this.port = '';
      this.passwordSSH = '';
      this.path = '';
      this.showRules = true;
      this.disableInput = false;
      this.showDialog = true;
      this.showPassword = true;
    },
    editItem(item) {
      this.modalTitle = 'Редактировать проект';
      this.modalSubmitButton = 'Сохранить';
      this.modalAction = 'Edit';
      this.id = item._id;
      this.name = item.name;
      this.url = item.url;
      this.text = item.text;
      this.password = item.password;
      this.host = item.host;
      this.user = item.user;
      this.port = item.port;
      this.passwordSSH = item.passwordSSH;
      this.path = item.path;
      this.disableInput = false;
      this.showDialog = true;
      this.showPassword = true;
    },
    deleteItem(item) {
      this.modalTitle = 'Удалить проект';
      this.modalSubmitButton = 'Удалить';
      this.modalAction = 'Delete';
      this.id = item._id;
      this.name = item.name;
      this.url = item.url;
      this.text = item.text;
      this.password = '';
      this.disableInput = true;
      this.showDialog = true;
      this.showPassword = true;
    },
    backupItem(item) {
      this.modalTitle = 'Подвердите действие';
      this.modalSubmitButton = 'OK';
      this.modalAction = 'Backup';
      this.id = item._id;
      this.password = item.password;
      this.disableInput = true;
      this.showDialog = false;
      this.backupProject();
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
        case 'Backup':
          this.backupProject();
          break;
        case 'Info':
          this.InfoProject();
          break;
      }
    },
    addProject() {
      console.log('Проект добавлен', this.name, this.url);
      this.$store.dispatch('addProject', {
        name: this.name,
        url: this.url,
        text: this.text,
        password: this.password,
        host: this.host,
        user: this.user,
        port: this.port,
        passwordSSH: this.passwordSSH,
        path: this.path,
      });
      this.showDialog = false;
      this.refresh();
    },

    deleteProject() {
      // console.log('Проект удалён', this.name, this.url, this.id, this.password);
      this.$store.dispatch('deleteProject', this.id);
      this.showDialog = false;
      this.refresh();
    },

    saveProject() {
      console.log('Проект сохранен');
      this.$store.dispatch('saveProject', {
        id: this.id,
        name: this.name,
        url: this.url,
        text: this.text,
        password: this.password,
        host: this.host,
        user: this.user,
        port: this.port,
        passwordSSH: this.passwordSSH,
        path: this.path,
      });
      this.showDialog = false;
      this.refresh();
    },

    backupProject() {
      console.log('Запрос на создание бэкапа добавлен в очередь');
      this.$store.dispatch('backupProject', this.id, this.password);
      this.showDialog = false;
    },

    InfoProject() {
      /*
      setTimeout(() => {
        clearInterval(this.autoupdate);
        alert('стоп');
      }, 0);
      this.showDialog = false;
      */
    },
  },
  computed: {
    history() {
      return this.data.history || [];
    },
    dataCollection() {
      /*
      if (this.update === false) {
        this.update = true;
        console.log('включил автообновление');
        this.autoupdate = setInterval(this.loadProject, 2000);
      }
      */
      return this.history || [];
    },
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
    this.refresh();
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
.checkbox {
  display: block;
  position: relative;
  padding-left: 35px;
  margin-bottom: 12px;
  cursor: pointer;
  font-size: 22px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

/* Hide the browser's default checkbox */
.checkbox input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}

/* Create a custom checkbox */
.checkmark {
  position: absolute;
  top: 0;
  left: 0;
  height: 25px;
  width: 25px;
  background-color: #eee;
}

/* On mouse-over, add a grey background color */
.checkbox:hover input ~ .checkmark {
  background-color: #ccc;
}

/* When the checkbox is checked, add a blue background */
.checkbox input:checked ~ .checkmark {
  background-color: #2196F3;
}

/* Create the checkmark/indicator (hidden when not checked) */
.checkmark:after {
  content: "";
  position: absolute;
  display: none;
}

/* Show the checkmark when checked */
.checkbox input:checked ~ .checkmark:after {
  display: block;
}

/* Style the checkmark/indicator */
.checkbox .checkmark:after {
  left: 9px;
  top: 5px;
  width: 5px;
  height: 10px;
  border: solid white;
  border-width: 0 3px 3px 0;
  -webkit-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  transform: rotate(45deg);
}
.mb15 {
  margin-bottom: 15px;
}
</style>
