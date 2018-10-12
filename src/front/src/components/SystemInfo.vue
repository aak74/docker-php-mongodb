<template>
<div>
  <v-card flat>
    <v-layout>
      <v-flex xs3>
        <v-card class="card-main">
          <v-card-title>
            <v-icon class="card-icon" x-large color="blue darken-1">access_time</v-icon>
            <div class="card-right-block">
              <div class="card-name">Uptime</div>
              <div class="card-info">{{ uptime }}</div>
            </div>
          </v-card-title>
        </v-card>
      </v-flex>
      <v-flex xs3>
        <v-card class="card-main">
          <v-card-title>
            <v-icon class="card-icon" x-large color="yellow darken-4">bar_chart</v-icon>
            <div class="card-right-block">
              <div class="card-name">Load</div>
              <div class="card-info">
                Current load: {{ currentLoad }}%
                <v-spacer />
                Load average: {{ avgLoad }}
              </div>
            </div>
          </v-card-title>
        </v-card>
      </v-flex>
      <v-flex xs3>
        <v-card class="card-main">
          <v-card-title>
            <v-icon class="card-icon" x-large color="green darken-2">memory</v-icon>
            <div class="card-right-block">
              <div class="card-name">Memory</div>
              <div class="card-info">
                Total: {{ getMegabytes(info.memory.total) }} MB
                <v-spacer />
                Free: {{ getMegabytes(info.memory.free) }} MB
                <v-spacer />
                Used: {{ (info.memory.used/info.memory.total*100).toFixed(2) }}%
              </div>
            </div>
          </v-card-title>
        </v-card>
      </v-flex>
      <v-flex xs3>
        <v-card class="card-main">
          <v-card-title>
            <v-icon class="card-icon" x-large color="red darken-1">storage</v-icon>
            <div class="card-right-block">
              <div class="card-name">Disk</div>
              <div class="card-info">
                Total: {{ info.disk.size }}
                <v-spacer />
                Free: {{ info.disk.free }}
                <v-spacer />
                Used: {{ info.disk.use }}
                <!-- <div v-for="(value, key, index) in info.disk" :key="index">
                  {{ value.fs }}: {{ getDiskValue(value) }}
                </div> -->
              </div>
            </div>
          </v-card-title>
        </v-card>
      </v-flex>
    </v-layout>
  </v-card>
</div>
</template>

<script>
import Moment from 'moment';

export default {
  name: 'SystemInfo',
  props: ['info'],
  computed: {
    uptime() {
      if (this.info.load.uptime <= 0) {
        return 'Server is down';
      }
      return Moment(Date.now() - (this.info.load.uptime * 1000)).toNow();
    },
    currentLoad() {
      return this.info.load.currentload.toFixed(2);
    },
    avgLoad() {
      return `${this.info.load.avgload[0].toFixed(2)}/${this.info.load.avgload[1].toFixed(2)}/${this.info.load.avgload[2].toFixed(2)}`;
    },
  },
  methods: {
    getDiskValue(value) {
      const { size, used, use } = value;
      return `${used}/${size}, ${use}`;
    },
    getMegabytes(bytes, fixed = 0) {
      return (bytes / 1024 / 1024).toFixed(fixed);
    },
  },
};
</script>

<style>
.card-main {
  height: 100%;
}

.card-icon {
  position: absolute;
  top: 12px;
}

.card-name {
  font-size: 16pt;
}

.card-info {
  margin-top: 10px;
  font-size: 11pt;
  word-break: normal;
}

.card-right-block {
  margin-left: auto;
  margin-right: 0;
  text-align: right;
}
</style>

