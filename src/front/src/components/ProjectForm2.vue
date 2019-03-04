<template>
  <div class="panel-body">
    <vue-form-generator :schema="schema" :model="model" :options="formOptions"></vue-form-generator>
  </div>
</template>

<script>
import Vue from 'vue'
import VueFormGenerator from 'vue-form-generator'
// import 'vue-form-generator/dist/vfg.css'

Vue.use(VueFormGenerator)

export default {
  data () {
    return {
      model: {
        id: 1,
        name: 'google.com',
        url: 'google.com',
        password: 'J0hnD03!x4',
        isActive: true
      },
      schema: {
        fields: [
          {
            type: 'input',
            inputType: 'text',
            label: 'ID',
            model: 'id',
            readonly: true,
            disabled: true
          },
          {
            type: 'input',
            inputType: 'text',
            label: 'Name',
            model: 'name',
            placeholder: 'Your name',
            featured: true,
            required: true
          },
          {
            type: 'input',
            inputType: 'text',
            label: 'Url',
            model: 'url',
            placeholder: 'Your name',
            featured: true,
            required: true
          },
                    {
            type: 'input',
            inputType: 'text',
            label: 'text',
            model: 'text',
            placeholder: 'Your text',
            required: false
          },
          {
            type: 'input',
            inputType: 'password',
            label: 'Password',
            model: 'password',
            min: 6,
            required: true,
            hint: 'Minimum 6 characters',
            validator: VueFormGenerator.validators.string
          },
          {
            type: 'checkbox',
            label: 'isActive',
            model: 'isActive',
            default: true
          }
        ]
      },
      formOptions: {
        validateAfterLoad: true,
        validateAfterChanged: true,
        validateAsync: true
      }
    }
  }
}
</script>

<style lang="sass">
.form-group
  display: table

  label
    display: table-cell
    width: 80px

  div
    display: table-cell

</style>
