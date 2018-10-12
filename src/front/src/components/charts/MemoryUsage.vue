<template>
<div>
  <line-chart
    id="memory-chart"
    :data="normalizeData"
    xkey="created"
    :ykeys="['used']"
    :labels="['Использовано']"
    :line-colors="['#008000']"
    resize="true"
  />
</div>
</template>

<script >
import jQuery from 'jquery'; // eslint-disable-line
import Raphael from 'raphael/raphael'; // eslint-disable-line
global.Raphael = Raphael;
import { LineChart } from 'vue-morris'; // eslint-disable-line

export default {
  name: 'MemoryUsage',
  components: {
    LineChart,
  },
  props: ['data', 'xsize'],
  computed: {
    sliced() {
      return this.data.slice(0, this.xsize || 20);
    },
    normalizeData() {
      return this.sliced.map(({ created, system }) => ({
        created,
        used: ((system.memory.used / system.memory.total) * 100).toFixed(2),
      }));
    },
  },
};
</script>
