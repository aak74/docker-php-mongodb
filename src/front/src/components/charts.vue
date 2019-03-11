<script>
import { Line } from 'vue-chartjs'

export default {
extends: Line,
props: {
  chartData: {
    type: Array,
  }
},
name:'charts',

 data(){
      return{
           dataChartsTime:[],
           dataChartsPing:[],
           status:true
      }
  },
  watch: {
      chartData() {
        const currectData=this.fillData;
        if (this.status === true){
          console.log('обновил')
          this.renderChart(currectData, this.fillOptions);
          this.status = false;
        }
      }
  },
computed: {
  fillData () {
      const EnterDate = this.chartData;
      console.log(EnterDate) ;
      let i=0;
      let y=0;//кол во удаленных
      EnterDate.forEach(item => {
          if (this.dataChartsTime[i]!== item.lastUpdate){
            if(this.dataChartsTime[i]!== undefined){
              this.dataChartsTime.shift();
            }
            this.dataChartsTime.push(new Date(item.lastUpdate));
          }
          if (this.dataChartsPing[i+y]!== item.ping){
            if(this.dataChartsPing[i-y]!== undefined){
              this.dataChartsPing.shift();
              y++;
              this.status=true;
            }
            this.dataChartsPing.push(item.ping);
          }
          i++
      });
      const datacollection = {
      labels: this.dataChartsTime,
      datasets: [
        {
          label: 'Ping',
          backgroundColor: "rgba(255,99,132,0.2)",
          borderColor: "rgba(255,99,132,1)",
          data: this.dataChartsPing,
          fill: false,
        }
      ]
    }
    return datacollection;
  },
  fillOptions () {
    const GOptions= {
    //showLines: true, // disable for all datasets'
    animation: false,
    scales:
    {
        xAxes: [{
            display: false
        }],
        yAxes: [{
            display: false,

        }]
    }
    }
    return GOptions
  },
},

}
</script>
<style>
canvas{
  height: 200px;
}
</style>
