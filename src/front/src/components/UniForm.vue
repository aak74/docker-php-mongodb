<template>
  <v-card>
    <v-card-title class="headline">{{ title }}</v-card-title>
    <v-card-text>
      <component
        v-for="field in fields"
        :key="field.model"
        :is="'form-' + field.attrs.type"
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

export default {
  props: [
    'data',
    'schema',
    'title',
    'buttons',
  ],
  components: {
    FormButton,
    FormInput,
    FormCheckbox,
  },
  data() {
    return {
      current: {},
    };
  },
  computed: {
    fields() {
      return this.schema.reduce((carry, item) => {
        // console.log(item);
        carry.push({
          value: this.data[item.model],
          attrs: Object.assign({}, item),
        });
        return carry;
      }, []);
    },
  },

  methods: {
    emit(name) {
      this.$emit('emit', { name, data: this.current });
    },

    change(field) {
      this.current[field.attrs.model] = field.value;
      console.log('change', field, this.current);
    },
  },
};
</script>
