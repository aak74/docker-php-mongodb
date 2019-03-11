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
              <td class="layout px-0s table-controls" disabled><p>{{field.attrs.label}}:</p><span>{{field.value}}</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

  </div>

</template>

<script>
import FormButtons from './FormButtons'
import FormInput from './FormInput'
import FormCheckbox from './FormCheckbox'
import ArealButton from './elements/ArealButton'
import ArealInput from './elements/ArealInput'
import ArealModal from './elements/ArealModal'
import ArealSelect from './elements/ArealSelect'

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
    FormButtons,
    FormInput,
    FormCheckbox,
    chart,
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
  font-size: 14px;
}
span{
  margin-left: 10px;
}
</style>
