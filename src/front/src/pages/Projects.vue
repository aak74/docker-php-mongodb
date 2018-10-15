<template>
<div>
  <h2>Проекты</h2>
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
  name: 'Projects',
  components: {
    DataTable,
    ArealButton,
  },
  methods: {
    sendRequest() {
      console.log('sendRequest');
      this.$store.dispatch('loadProjects');
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
