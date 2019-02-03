<template>
  <div>
    <component
      v-for="field in fields"
      :is="'form-' + field.attrs.type"
      :field="field"
    />
    <form-buttons :buttons="buttons" />
  </div>
</template>

<script>
import FormButtons from './FormButtons'
import FormInput from './FormInput'
import FormCheckbox from './FormCheckbox'

export default {
  props: [
    'data',
    'schema'
  ],
  components: {
    FormButtons,
    FormInput,
    FormCheckbox,
  },
  computed: {
    fields() {
      return this.schema.fields.reduce((carry, item) => {
        console.log(item);

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
</script>
