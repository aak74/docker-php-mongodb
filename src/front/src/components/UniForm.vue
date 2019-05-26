<template>
  <v-card>
    <v-card-title class="headline">{{ title }}</v-card-title>
    <v-card-text>
      <component
        v-for="field in fields"
        :key="field.model"
        :is="'form-' + field.type"
        :field="field"
        @change="change"
      />
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <form-button
        v-for="button in buttons"
        :key="button.emit"
        :button="button"
        @click="emit($event)"
      />
    </v-card-actions>
  </v-card>
</template>

<script>
import FormButton from './FormButton.vue';
import FormInput from './FormInput.vue';
import FormCheckbox from './FormCheckbox.vue';
import FormGroup from './FormGroup.vue';

export default {
  name: 'UniForm',
  props: [
    'title',
    'fields',
    'buttons',
  ],
  components: {
    FormButton,
    FormInput,
    FormCheckbox,
    FormGroup,
  },
  data() {
    return {
      current: {},
    };
  },
  methods: {
    emit(name) {
      console.log('UniForm.emit', name);
      this.$emit('emit', { name, data: this.current });
    },

    change(field) {
      console.log('UniForm.change', field);

      if (field.parent) {
        if (!this.current[field.parent]) {
          this.current[field.parent] = {};
        }
        this.current[field.parent][field.model] = field.value;
      } else {
        this.current[field.model] = field.value;
      }
      console.log('UniForm.change 2', field, this.current);
      this.emit('change');
    },
  },
};
</script>
