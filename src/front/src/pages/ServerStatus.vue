<template>
  <v-container fluid grid-list-md>
    <h2>Состояние серверов</h2>
    <v-btn
      color="info"
      class="white--text mb15"
      @click="updateServersStatus"
    >
      Обновить
      <v-icon right dark>refresh</v-icon>
    </v-btn>
    <v-data-iterator
      :items="items"
      content-tag="v-layout"
      hide-actions
      row
      wrap
    >
      <v-flex
        slot="item"
        slot-scope="props"
        xs12
        sm6
        md4
        lg3
      >
        <v-card>
          <v-card-title class="grey lighten-2"><h4>{{ props.item.name }}</h4></v-card-title>
          <v-divider></v-divider>
          <v-list dense>
            <v-list-tile>
              <v-list-tile-content>URL:</v-list-tile-content>
              <v-list-tile-content class="align-end">{{ props.item.url }}</v-list-tile-content>
            </v-list-tile>
            <v-list-tile>
              <v-list-tile-content>Статус:</v-list-tile-content>
              <v-list-tile-content class="align-end">
                <span :class="statusCircle(props.item.status.code)">
                {{ props.item.status.code }} {{ props.item.status.text }}
                </span>
              </v-list-tile-content>
            </v-list-tile>
          </v-list>
        </v-card>
      </v-flex>
    </v-data-iterator>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
    };
  },
  methods: {
    sendRequest() {
      this.$store.dispatch('loadProjects');
    },
    updateServersStatus() {
      this.$store.dispatch('getServersStatus');
      this.$store.dispatch('loadProjects');
    },
    statusCircle(code) {
      if (code === 200) {
        return 'status-circle green-circle';
      }
      return 'status-circle red-circle';
    },
  },
  computed: {
    items() {
      return this.$store.getters.projects;
    },
    totalItems() {
      return this.$store.getters.projects;
    },
    headers() {
      return [{ text: 'Название', value: 'name' }, { text: 'URL', value: 'url', sortable: false }];
    },
  },
  created() {
    this.sendRequest();
  },
};
</script>

<style>
.mb15 {
  margin-bottom: 15px;
}
.status-circle::before {
  content: '';
  display: inline-block;
  width: 10px;
  height: 10px;
  -moz-border-radius: 5px;
  -webkit-border-radius: 5px;
  border-radius: 5px;
}
.green-circle::before {
  background-color: lightseagreen;
}
.red-circle::before {
  background-color: crimson;
}
</style>
