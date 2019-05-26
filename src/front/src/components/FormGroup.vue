<template>
  <v-card>
    <v-card-title>{{ field.label }}</v-card-title>
    <v-card-text>
      <component
        v-for="_field in field.fields"
        :key="_field.model"
        :is="'form-' + _field.type"
        :field="_field"
        @change="change"
      />
    </v-card-text>
  </v-card>
</template>

<script>
import FormButton from './FormButton.vue';
import FormInput from './FormInput.vue';
import FormCheckbox from './FormCheckbox.vue';

export default {
  name: 'FormGroup',
  props: [
    'field',
  ],
  components: {
    FormButton,
    FormInput,
    FormCheckbox,
  },

  methods: {
    change(field) {
      console.log('FormGroup.change', field, this.$props.field.model);
      // this.$emit('change', { fieldName: field.model, value: field.value })
      this.$emit('change', Object.assign({ parent: this.$props.field.model }, field));
    },
  },
};
</script>
