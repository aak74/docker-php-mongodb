<template>
  <div>
    <v-container>
      <h2>Проекты</h2>
      <v-layout row align-end>
        <v-btn
          color="green"
          @click="add"
          dark
        >
          Добавить
        </v-btn>
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
      <v-dialog v-model="dialog.show" persistent max-width="400">
        <project-form
          :title="dialog.title"
          @emit="emit"
          @change="change"
        />
      </v-dialog>
    </v-container>
  </div>
</template>

<script>
/* eslint-disable no-underscore-dangle */
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
      dialog: {
        title: null,
        show: false,
      },
      showDeleteDialog: false,
      id: null,
    };
  },

  methods: {
    refresh() {
      this.$store.dispatch('getProjects');
    },

    add() {
      this.dialog.title = 'Добавление проекта';
      this.dialog.show = true;
    },

    edit(item) {
      console.log('Projects edit', item);
      this.$store.dispatch('getProject', item._id)
        .then(() => {
          console.log('Projects getProject then');
          this.dialog.title = 'Редактирование проекта';
          this.dialog.show = true;
          this.fields = this.$store.state.current.fields;
        })
        .catch(err => {
          console.log({ err });
        });
    },

    deleteItem(item) {
      // console.log('deleteItem', item);
      this.id = item._id;
      this.showDeleteDialog = true;
    },

    deleteProject() {
      this.showDeleteDialog = false;
      this.$store.dispatch('deleteProject', this.id);
    },

    backup() {
    },

    save(data) {
      // debugger;
      const fullData = Object.assign({}, this.$store.state.current.data, data);
      this.$store.dispatch('saveProject', fullData);
    },

    backupProject() {
      this.$store.dispatch('backupProject', this.id);
    },

    emit(event) {
      console.log('Projects emit', event);
      if (event.name === 'save') {
        this.save(event.data);
      }
      if ((event.name === 'save') || (event.name === 'close')) {
        this.dialog.show = false;
        this.$store.commit('CLEAR_CURRENT');
      }
    },

    change(event) {
      console.log('Projects.change', event);
    },
  },

  computed: {
    controls() {
      return this.$store.state.admin.ui.defaultControls;
    },
    items() {
      return this.$store.state.projects;
    },
    headers() {
      return [{ text: 'Название', value: 'name' }, { text: 'URL', value: 'url', sortable: false }];
    },
  },
  created() {
    this.refresh();
  },
};
</script>
