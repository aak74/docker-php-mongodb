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
        />
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

    loadProject() {
      this.$store.dispatch('getProject', this.id);
      this.data = this.$store.state.project.current;
    },

    add() {
      this.dialog.title = 'Добавление проекта';
      this.dialog.show = true;
    },

    edit(item) {
      console.log('Projects edit', item);
      // eslint-disable-next-line no-underscore-dangle
      this.$store.dispatch('getProject', item._id)
        .then(response => {
          console.log({ response });
          this.dialog.title = 'Редактирование проекта';
          this.dialog.show = true;
        })
        .catch(err => {
          console.log({ err });
        });


      // todo Загрузить проект перед открытием
    },

    deleteItem(item) {
      console.log('deleteItem', item);
      // eslint-disable-next-line no-underscore-dangle
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
      this.$store.dispatch('saveProject', data);
    },

    backupProject() {
      this.$store.dispatch('backupProject', this.id);
    },

    emit(event) {
      console.log('actions emit', event);
      this.dialog.show = false;
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
