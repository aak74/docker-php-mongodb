<template>
  <div  class="info_block">
   <div  class="info_card">
          <div class="text_tag_div" v-for="field in fields" >
            <p v-if="field.attrs.inputType!=='textarea'" class="text_tag_p text_edit">{{field.value}} </p>
          </div>
          <div  class="" style="width:600px; height:200px;">
            <chart  :chart-data="dataCollection" :width="600" :height="200"></chart>
          </div>
        <textarea disabled rows="6" class="text_tag_textarea text_edit"
        v-for="field in fields"
        v-if="field.attrs.inputType==='textarea'"
          >{{field.value}}
      </textarea>
    </div>
  </div>

</template>

<script>
import FormButtons from './FormButtons'
import FormInput from './FormInput'
import FormCheckbox from './FormCheckbox'
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
        this.$store.dispatch('getProject', this.projectId);
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
.info_block{
  text-align: center;
  align-items:center;
  width:100%;
}
.info_card{
  display: inline-block;
  padding:1%;
  margin-top:50px;
  left:-10%;
  background:rgba(153, 255, 153,0.5);
  background: linear-gradient(to right bottom,rgba(0, 204, 68,0.6) 15%, rgba(153, 255, 153,0.8) 80%, rgba(153, 255, 153,0.35) 90%);
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  border-radius: 10px;
}
.text_tag_div{
 margin-top:0px;
 padding-top:1%;
}
.text_edit{
  background: rgba(255,255,255,0.9);
  border-radius:5px;
  border:1px ridge rgba(0, 0, 0, 0.2);
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.1), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}
.text_tag_p{
  font-size: 26px;
}
.text_tag_textarea{
  margin-top: 3%;
  width:100%;
  font-size: 20px;
  resize: none;
  outline:none;
}
.info_date{
  text-align:center;
}
textarea::-webkit-scrollbar {
    width: 0%;
}
::-webkit-calendar-picker-indicator {
  color: transparent;
  opacity: 1;
  background: url(//www.gravatar.com/avatar/cbfaff96665b7567defe1b34a883db8b?s=16&d=identicon&r=PG) no-repeat center;
  background-size: contain;
}
</style>
