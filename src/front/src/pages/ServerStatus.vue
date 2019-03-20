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
              <v-list-tile-content class="align-end">
                <a :href="getUrl(props.item.url)" target="_blank">{{ props.item.url }}</a>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile>
              <v-list-tile-content>Status:</v-list-tile-content>
              <v-list-tile-content class="align-end">
                <span :class="statusCircle(props.item.status.statusText)">
                {{ props.item.status.statusText }} {{ props.item.status.text }}
                </span>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile>
              <v-list-tile-content>Response time:</v-list-tile-content>
              <v-list-tile-content class="align-end">
                <span>
                {{ props.item.status.ping }} ms
                </span>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile>
              <v-list-tile-content>Last update:</v-list-tile-content>
              <v-list-tile-content class="align-end">
                <span>
                {{ props.item.status.lastUpdate }}
                </span>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile>
              <v-list-tile-content>Content length:</v-list-tile-content>
              <v-list-tile-content class="align-end">
                <span>
                {{ props.item.status.contentLength }}
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
    getUrl(url) {
      if (url.substr(0, 4) === 'http') {
        return url;
      }
      return `http://${url}`;
    },
    updateServersStatus() {
      this.$store.dispatch('loadProjects');
      this.timerId = setTimeout(() => {
        this.updateServersStatus();
      }, 5000);
    },
    statusCircle(code) {
     // const divider = Math.floor(code / 100);
      switch (code) {
        default:
          return 'status-circle red-circle';
        case 'online':
          return 'status-circle green-circle';
      }
    },
  },
  computed: {
    items() {
      const ProjectsData = this.$store.getters.projects
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
    this.updateServersStatus();
  },
  beforeDestroy() {
    clearTimeout(this.timerId);
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
.orange-circle::before {
  background-color: darkorange;
}
</style>
