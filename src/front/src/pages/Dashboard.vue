<template>
<div>
  <v-container fluid grid-list-md>
    <system-info :info="systemInfo" />
    <v-layout id="system">
      <v-flex xs4>
        <v-card>
          <v-card-title>
            Current load
          </v-card-title>
          <current-load :xsize="chartSize.currentLoad" :data="totalHistory" />
        </v-card>
      </v-flex>
      <v-flex xs4>
        <v-card>
          <v-card-title>
            Load average chart (
              <span class="green--text">1</span>,&nbsp;
              <span class="orange--text">5</span>,&nbsp;
              <span class="red--text">15</span>&nbsp;min)
          </v-card-title>
          <load-average :xsize="chartSize.loadAverage" :data="totalHistory" />
        </v-card>
      </v-flex>
      <v-flex xs4>
        <v-card>
          <v-card-title>
            Memory usage
          </v-card-title>
          <memory-usage :xsize="chartSize.memoryUsage" :data="totalHistory" />
        </v-card>
      </v-flex>
    </v-layout>
    <v-layout id="status">
      <v-flex xs3>
        <v-card>
          <v-list dense>
            <v-list-tile>
              <v-list-tile-content><h3>Сервисы</h3></v-list-tile-content>
            </v-list-tile>
            <v-layout row>
              <v-flex xs7>
                <v-list-tile v-for="(item, index) in statusInfo" :key="index">
                  <v-list-tile-content>{{ item.name }}</v-list-tile-content>
                  <v-list-tile-content class="align-end">{{ item.value }}</v-list-tile-content>
                </v-list-tile>
              </v-flex>
              <v-flex xs5>
                <v-layout row wrap>
                  <v-flex class='services-containers' xs12>
                    <span>{{ containersRunning }}</span>
                  </v-flex>
                  <v-flex class='services-containers' xs12>
                    <span>{{ containersStopped }}</span>
                  </v-flex>
                </v-layout>
              </v-flex>
            </v-layout>
          </v-list>
        </v-card>
      </v-flex>
      <v-flex xs9>
        <v-card>
          <status-history :xsize="chartSize.status" :data="totalHistory" />
        </v-card>
      </v-flex>
    </v-layout>
    <v-layout>
      <v-flex xs3>
        <v-card>
          <v-list dense>
            <v-list-tile>
              <v-list-tile-content><h3>История</h3></v-list-tile-content>
            </v-list-tile>
            <v-list-tile v-for="(item, index) in historyStats" :key="index">
              <v-list-tile-content>{{ item.name }}</v-list-tile-content>
              <v-list-tile-content class="align-end">{{ item.value }}</v-list-tile-content>
            </v-list-tile>
          </v-list>
        </v-card>
      </v-flex>
      <v-flex xs9>
        <queues-info :info="queuesInfo" />
      </v-flex>
    </v-layout>
  </v-container>
</div>
</template>

<script>
import SystemInfo from '../components/SystemInfo';
import QueuesInfo from '../components/QueuesInfo';
import StatusHistory from '../components/charts/StatusHistory';
import LoadAverage from '../components/charts/LoadAverage';
import CurrentLoad from '../components/charts/CurrentLoad';
import MemoryUsage from '../components/charts/MemoryUsage';

export default {
  name: 'Dashboard',
  components: {
    SystemInfo,
    QueuesInfo,
    StatusHistory,
    LoadAverage,
    CurrentLoad,
    MemoryUsage,
  },
  watch: {
    $route: {
      handler: 'refresh',
      immediate: true,
    },
  },
  computed: {
    systemInfo() {
      return this.$store.state.appStatus.system;
    },
    queuesInfo() {
      return this.$store.state.appStatus.queues;
    },
    containersRunning() {
      return this.$store.state.appStatus.docker.info.ContainersRunning;
    },
    containersStopped() {
      return this.$store.state.appStatus.docker.info.ContainersStopped;
    },
    statusInfo() {
      const status = this.$store.state.appStatus.docker.info;
      return [
        { name: 'Всего', value: status.Containers },
        { name: 'Работают', value: status.ContainersRunning },
        { name: 'На паузе', value: status.ContainersPaused },
        { name: 'Остановлено', value: status.ContainersStopped },
      ];
    },
    totalHistory() {
      return this.$store.state.history.total;
    },
    chartSize() {
      return this.$store.state.chartSize;
    },
    historyStats() {
      const stats = this.$store.state.historyStats;
      return [
        { name: '15 мин', value: `OK: ${stats[0].ok}, Error: ${stats[0].error}` },
        { name: '1 час', value: `OK: ${stats[1].ok}, Error: ${stats[1].error}` },
        { name: '1 день', value: `OK: ${stats[2].ok}, Error: ${stats[2].error}` },
      ];
    },
  },
  methods: {
    refresh() {
      this.$store.dispatch('loadStatus');
      this.$store.dispatch('loadStatusHistory');
      this.$store.dispatch('loadHistoryStats');
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

<style>
#status {
  margin-bottom: 10px;
}

#status, #total-history {
  height: 213px;
}

#status.v-card {
  height: 233px;
}

#load-average, #load-chart, #memory-chart {
  height: 150px;
}

#load-average .morris-hover, #status .morris-hover,
#load-chart .morris-hover, #memory-chart .morris-hover {
  display: none !important;
}

.services-containers {
  margin-top: 5px;
  width: 100%;
  font-size: 40px;
  text-align: center;
  justify-content: center;
  display: flex;
}

.services-containers span {
  position: relative;
  color: #fff;
}

.services-containers:before {
  content: '';
  position: absolute;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: green;
}
.services-containers:nth-child(2):before {
  background-color: red;
}
</style>
