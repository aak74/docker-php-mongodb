<template>
  <div>
    <h2>Список настроек</h2>
    <v-container>
      <v-layout row align-end>
        <v-flex xs6>
          <areal-button title="Refresh" @click="sendRequest" />
        </v-flex>
      </v-layout>
    </v-container>
    <data-table
      :headers="headers"
      :items="items"
      :loading="false"
      v-if="isShow"
      :transforms="transforms"
      :hide-actions="true"
    />
  </div>
</template>

<script>
import DataTable from '../components/admin/DataTable';
import ArealButton from '../components/elements/ArealButton';

export default {
  name: 'Settings',
  components: {
    DataTable,
    ArealButton,
  },
  methods: {
    sendRequest() {
      console.log('sendRequest');
      this.$store.dispatch('loadSettings');
    },
  },
  computed: {
    controls() {
      return false;
      // return this.$store.state.admin.ui.defaultControls;
    },
    isShow() {
      return this.headers && this.headers.length;
    },
    items() {
      return this.$store.getters.settingsItems;
    },
    totalItems() {
      return this.$store.state.socket.settings.total;
    },
    headers() {
      return this.$store.state.settingsHeaders;
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
