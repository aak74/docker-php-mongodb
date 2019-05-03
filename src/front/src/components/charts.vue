<script>
import { Line } from 'vue-chartjs';

export default {
  name: 'charts',
  extends: Line,
  props: {
    chartData: {
      type: Array,
    },
  },

  data() {
    return {
      dataChartsTime: [],
      dataChartsPing: [],
      status: true,
    };
  },

  watch: {
    chartData() {
      const currectData = this.fillData;
      if (this.status === true) {
        this.renderChart(currectData, this.fillOptions);
        this.status = false;
      }
    },
  },
  computed: {
    fillOptions() {
      return {
        animation: false,
        scales: {
          xAxes: [{
            display: false,
          }],
          yAxes: [{
            display: false,
          }],
        },
      };
    },
  },
  methods: {
    fillData() {
      const EnterDate = this.chartData;
      let i = 0;
      let y = 0; // кол во удаленных
      EnterDate.forEach(item => {
        if (this.dataChartsTime[i] !== item.lastUpdate) {
          if (this.dataChartsTime[i] !== undefined) {
            this.dataChartsTime.shift();
          }
          this.dataChartsTime.push(new Date(item.lastUpdate));
        }
        if (this.dataChartsPing[i + y] !== item.ping) {
          if (this.dataChartsPing[i - y] !== undefined) {
            this.dataChartsPing.shift();
            y += 1;
            this.status = true;
          }
          this.dataChartsPing.push(item.ping);
        }
        i += 1;
      });

      const datacollection = {
        labels: this.dataChartsTime,
        datasets: [{
          label: 'Ping',
          backgroundColor: 'rgba(255,99,132,0.2)',
          borderColor: 'rgba(255,99,132,1)',
          data: this.dataChartsPing,
          fill: false,
        }],
      };
      return datacollection;
    },
  },
};
</script>
<style>
canvas{
  height: 200px;
}
</style>
