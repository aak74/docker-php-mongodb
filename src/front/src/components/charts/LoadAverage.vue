<template>
<div>
  <line-chart
    id="load-average"
    :data="normalizeData"
    xkey="created"
    :ykeys="['one', 'five', 'fifteen']"
    :labels="['1 мин', '5 мин', '15 мин']"
    :line-colors="['#008000', '#ffa500', '#ff0000']"
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
  name: 'LoadAverageChart',
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
        one: system.load.avgload[0],
        five: system.load.avgload[1],
        fifteen: system.load.avgload[2],
      }));
    },
  },
};
</script>
