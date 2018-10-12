<template>
  <div>
    <v-alert
      :value="true"
      :type="alertType"
      icon="query_builder"
    >
      Время последнего обновления: {{ lastUpdate }}
    </v-alert>
    <v-container fluid grid-list-md>
      <v-data-iterator
        v-if="services.length"
        :items="services"
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
          <service
            :name="removePrefix(props.item.name)"
            :isFailed="props.item.isFailed"
            :params="props.item"
          />
        </v-flex>
      </v-data-iterator>
      <areal-button title="Refresh" @click="refresh" />
    </v-container>
  </div>
</template>

<script>

import Service from '../components/Service';
import ArealButton from '../components/elements/ArealButton';

export default {
  name: 'Services',
  components: {
    Service,
    ArealButton,
  },
  data() {
    return {
      alertType: 'warning',
    };
  },
  watch: {
    $route: {
      handler: 'refresh',
      immediate: true,
    },
  },
  computed: {
    services() {
      return this.$store.state.appStatus.docker.services;
    },
    systemInfo() {
      return this.$store.state.appStatus.system;
    },
    lastUpdate() {
      this.updateAlertType();
      return new Date(this.updateTime).toLocaleTimeString();
    },
  },
  methods: {
    refresh() {
      this.$store.dispatch('loadStatus');
    },
    updateAlertType() {
      this.alertType = this.updateTime < (Date.now() - this.maxResponseTime) ? 'warning' : 'info';
    },
    // remove pgk prefix
    removePrefix(name) {
      return (name.indexOf('pgk-') !== -1) ? name.substr(4) : name;
    },
  },
  created() {
    this.timerId = setInterval(() => {
      this.refresh();
    }, 5000);
  },
  destroyed() {
    clearInterval(this.timerId);
  },
};
</script>
