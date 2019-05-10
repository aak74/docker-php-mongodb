<template>
  <div>
    <v-container>
      <h2>Проекты</h2>
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
      <data-table
        :headers="headers"
        :items="items"
        :loading="false"
        :transforms="transforms"
        :hide-actions="false"
        :controls="controls"
        @click="edit"
        @editItem="edit"
        @deleteItem="deleteItem"
        @backup="backup"
      />
      <v-dialog
        v-model="showDeleteDialog"
        max-width="300"
      >
        <v-card>
          <v-card-title class="headline">Удалить проект?</v-card-title>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              @click="showDeleteDialog = false"
            >
              Нет
            </v-btn>
            <v-btn
              color="green"
              dark
              @click="deleteProject"
            >
              Да
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-container>
  </div>
</template>

<script>
import ProjectForm from '../components/ProjectForm.vue';
import DataTable from '../components/admin/DataTable.vue';

export default {
  name: 'Projects',
  components: {
    DataTable,
    ProjectForm,
  },

  data() {
    return {
      dialog: false,
      showDeleteDialog: false,
      id: null,
    };
  },

  methods: {
    refresh() {
      this.$store.dispatch('getProjects');
    },

    loadProject() {
      this.$store.dispatch('getProject', this.id);
      this.data = this.$store.state.project.current;
    },

    add() {
      console.log('Projects add');

    },

    edit() {
    },

    deleteItem(item) {
      console.log('deleteItem', item);
      this.id = item._id;
      this.showDeleteDialog = true;
    },

    deleteProject(item) {
      this.showDeleteDialog = false;
      // console.log('deleteItem', item);
      this.$store.dispatch('deleteProject', this.id);
    },

    backup() {
    },

    addProject() {
    },

    save(data) {
      this.$store.dispatch('saveProject', data);
    },

    backup() {
      this.$store.dispatch('backupProject', this.id);
    },

    emit(event) {
      console.log('actions emit', event);
      this.dialog = false;
      if (event.name === 'save') {
        this.save(event.data);
      }
    },
  },

  computed: {
    controls() {
      return this.$store.state.ui.defaultControls;
    },
    items() {
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
