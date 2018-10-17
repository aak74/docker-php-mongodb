<template>
  <div>
    <v-container>
      <h2>Проекты</h2>
      <!-- <areal-modal :value='value' :max-width="750" @click='closeModal'>
      <span>ArealModal</span>
      </areal-modal> -->
      <v-layout row align-end>
        <v-flex xs6>
          <v-dialog
            v-model="addProjectDialog"
            width="500"
          >
            <v-btn
              slot="activator"
              color="green lighten-2"
              dark
            >
              Add project
            </v-btn>
            <v-card>
              <v-card-title
                class="headline grey lighten-2"
                primary-title
              >
                Add new project
              </v-card-title>
              <v-card-text>
                <v-form v-model="formValid">
                  <v-text-field
                    v-model="name"
                    label="Name"
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
                  @click="addProjectDialog = false"
                >
                  Cancel
                </v-btn>
                <v-btn
                  color="green"
                  flat
                  @click="addProject"
                  :disabled="!formValid"
                >
                  Add
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
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
import ArealButton from '../components/elements/ArealButton';

export default {
  name: 'Projects',
  data() {
    return {
      addProjectDialog: false,
      formValid: false,
      name: '',
      nameRules: [
        v => !!v || 'Name is required',
      ],
      url: '',
      urlRules: [
        v => !!v || 'Url is required',
      ],
    };
  },
  components: {
    DataTable,
    ArealButton,
  },
  methods: {
    sendRequest() {
      console.log('sendRequest');
      this.$store.dispatch('loadProjects');
    },
    addProject() {
      console.log('project added');
      this.$store.dispatch('addProject', { name: this.name, url: this.url });
      this.addProjectDialog = false;
    },
    editItem(item) {
      console.log('Data editItem', item);
    },
    deleteItem(item) {
      console.log('Data deleteItem', item._id);
      const id = item._id;
      this.$store.dispatch('deleteProject', id);
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
};
</script>

<style>

</style>
