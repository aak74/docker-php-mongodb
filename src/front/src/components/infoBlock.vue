<template>
  <div class="container" >
    <div v-show="progress">
     <v-progress-linear  :indeterminate="true"></v-progress-linear>
    </div>
    <div v-show="!progress" class="elevation-1">
      <div class="v-table__overflow">
        <div v-if="data" style="height:auto;">
          <v-progress-linear v-if="!dataCollection"  :indeterminate="true"></v-progress-linear>
          <chart v-else  :chart-data="dataCollection" :height="100"></chart>
        </div>
        <table class="v-datatable v-table theme--light" >
          <tbody>
            <tr v-for="field in fields">
              <td class="layout px-0s table-controls" disabled><p>{{field.attrs.label}}:<span>{{field.value}}</span></p></td>
            </tr>
            <tr>
              <BackupHistory :history="BackupHistory"/>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

  </div>

</template>

<script>
import BackupHistory from './BackupHistory'
import chart from './charts'


export default {
  props: {
    data: {
      type: Object
    },
    schema: {
      type: Object
    },

  },
  data(){
      return{
           update:false,
           project:this.projectData,
      }
  },
  components: {
    chart,
    BackupHistory,
  },
  methods:{
      fetchData(){
        if (this.projectId){
          this.$store.dispatch('getProject', this.projectId);
        }
      },
  },
  computed: {
    lenght(){
      return this.data.history[3]
    },
    progress(){
      if(!this.lenght){
        return true
      }
      return false
    },
    BackupHistory(){
      return this.data.backup
    },
    projectData(){
       return this.data
    },
    projectId(){
      return this.$route.params.id;
    },
    history(){
      if(this.data){
      return this.data.history || []
      }
    },
    dataCollection(){
      if(this.data){
        if (this.update === false){
          this.update = true;
          setInterval(this.fetchData, 2000);
        }
        return this.history || []
      }
    },
    fields() {
      if (this.update){
        return this.schema.fields.reduce((carry, item) => {
          carry.push({
            value: this.data[item.model],
            attrs: Object.assign({}, item),
          });
          return carry;
        }, []);
    }
    },
    buttons() {
      return [
        {
          color: 'success',
          title: 'Update',
          // disabled: true,
        }
      ];
    },
  }
}

//============================================================
</script>
<style>
p{
  font-style: italic;
  font-weight: bold;
  font-size: 16px;
}
span{
  font-style: normal;
  font-weight: normal;
  font-size: 15px;
  margin-left: 13px;
}
</style>
