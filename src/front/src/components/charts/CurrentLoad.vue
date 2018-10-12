<template>
<div>
  <line-chart
    id="load-chart"
    :data="normalizeData"
    xkey="created"
    :ykeys="['load']"
    :labels="['Нагрузка']"
    ymax="100"
    ymin="0"
    :line-colors="['#008000']"
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
  name: 'LoadChart',
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
        load: system.load.currentload,
      }));
    },
  },
};
</script>
