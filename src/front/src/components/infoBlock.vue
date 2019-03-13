<template>
  <div class="container" >
    <div class="elevation-1">
      <div class="v-table__overflow">
        <div  style="height:auto;">
          <chart  :chart-data="dataCollection" :height="100"></chart>
        </div>
        <table class="v-datatable v-table theme--light" >
          <tbody>
            <tr v-for="field in fields">
              <td class="layout px-0s table-controls" disabled><p>{{field.attrs.label}}:<span>{{field.value}}</span></p></td>
            </tr>
            <tr>
              <BackupHistory/>
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
          console.log('Пытаюсь обновить');
        }
      },
  },
  computed: {
    projectId(){
      return this.$route.params.id;
    },
    history(){
      return this.data.history || []
    },
    dataCollection(){
      if (this.update === false){
        console.log('Включаю обновление');
        this.update = true;
        setInterval(this.fetchData, 2000);
      }
      return this.history || []
    },
    fields() {
      return this.schema.fields.reduce((carry, item) => {
        carry.push({
          value: this.data[item.model],
          attrs: Object.assign({}, item),
        });
        return carry;
      }, []);
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
