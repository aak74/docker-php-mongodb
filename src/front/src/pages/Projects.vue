<template>
  <div>
    <v-container>
      <h2>Проекты</h2>
      <v-layout row align-end>
        <v-flex xs6>
          <v-dialog
            v-model="ProjectDialog"
            width="500"
          >
            <v-btn
              slot="activator"
              color="green lighten-2"
              @click="addItem"
              class="mb15"
              dark
            >
              Add project
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
                    label="Name"
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
                  @click="ProjectDialog = false"
                >
                  Cancel
                </v-btn>
                <v-btn
                  color="green"
                  flat
                  @click="confirmModalAction"
                  :disabled="!formValid"
                >
                  {{ modalAction }}
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
            Refresh
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
      ProjectDialog: false,
      formValid: false,
      id: '',
      name: '',
      nameRules: [
        v => !!v || 'Name is required',
      ],
      url: '',
      urlRules: [
        v => !!v || 'Url is required',
      ],
      disableInput: false,
      modalTitle: 'Add new project',
      modalAction: '',
    };
  },
  components: {
    DataTable,
  },
  methods: {
    sendRequest() {
      console.log('sendRequest');
      this.$store.dispatch('loadProjects');
    },
    addItem() {
      this.modalTitle = 'Add new project';
      this.modalAction = 'Add';
      this.name = '';
      this.url = '';
      this.disableInput = false;
      this.ProjectDialog = true;
    },
    editItem(item) {
      console.log('Data editItem', item);
      this.modalTitle = 'Edit project';
      this.modalAction = 'Edit';
      this.id = item._id;
      this.name = item.name;
      this.url = item.url;
      this.disableInput = false;
      this.ProjectDialog = true;
    },
    deleteItem(item) {
      this.modalAction = 'Delete';
      this.modalTitle = 'Delete project';
      this.id = item._id;
      this.name = item.name;
      this.url = item.url;
      this.disableInput = true;
      this.ProjectDialog = true;
    },
    confirmModalAction() {
      console.log('confirm modal action', this.modalAction);
      const action = this.modalAction;
      switch (action) {
        default:
          break;
        case 'Add':
          this.addProject();
          break;
        case 'Edit':
          this.editProject();
          break;
        case 'Delete':
          this.deleteProject();
          break;
      }
    },
    addProject() {
      console.log('Project added', this.name, this.url);
      this.$store.dispatch('addProject', { name: this.name, url: this.url });
      this.ProjectDialog = false;
      this.sendRequest();
    },
    deleteProject() {
      console.log('Project deleted', this.name, this.url, this.id);
      this.$store.dispatch('deleteProject', this.id);
      this.ProjectDialog = false;
      this.sendRequest();
    },
    editProject() {
      console.log('Project edited', this.id, this.name, this.url);
      this.$store.dispatch('editProject', { name: this.name, url: this.url, _id: this.id });
      this.ProjectDialog = false;
      this.sendRequest();
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
      return [{ text: 'Name', value: 'name' }, { text: 'URL', value: 'url', sortable: false }];
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
      if (this.ProjectDialog === true && e.keyCode === 27) {
        this.ProjectDialog = false;
      } else if (this.ProjectDialog === true && this.formValid === true && e.keyCode === 13) {
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
