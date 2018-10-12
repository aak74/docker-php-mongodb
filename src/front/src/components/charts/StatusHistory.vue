<template>
<div>
  <line-chart
    id="total-history"
    :data="normalizeData"
    xkey="created"
    :ykeys="['running', 'paused', 'stopped']"
    :labels="['Running', 'Paused', 'Stopped']"
    :line-colors="['#008000', '#ffa500', '#ff0000']"
    :grid="true"
    :resize="true"
  />
</div>
</template>

<script >
import jQuery from 'jquery'; // eslint-disable-line
import Raphael from 'raphael/raphael'; // eslint-disable-line
global.Raphael = Raphael;
import { LineChart } from 'vue-morris'; // eslint-disable-line

export default {
  name: 'StatusHistoryChart',
  components: {
    LineChart,
  },
  props: ['data', 'xsize'],
  computed: {
    sliced() {
      return this.data.slice(0, this.xsize || 20);
    },
    normalizeData() {
      return this.sliced.map(({ created, docker }) => ({
        created,
        running: docker.ContainersRunning,
        stopped: docker.ContainersStopped,
        paused: docker.ContainersPaused,
      }));
    },

  },
};
</script>
