<template>
  <uni-form
    :title="title"
    :fields="fields"
    :buttons="buttons"
    @emit="emit"
    @change="change"
  />
</template>

<script>
import UniForm from './UniForm.vue';

export default {
  name: 'ProjectForm',
  props: [
    'title',
  ],
  components: {
    UniForm,
  },
  data() {
    return {
      buttons: [
        {
          emit: 'close',
          color: '',
          title: 'Отмена',
        },
        {
          emit: 'save',
          color: 'success',
          title: 'Сохранить',
        },
      ],
    };
  },

  computed: {
    fields() {
      return this.$store.state.current.fields;
    },
  },

  methods: {
    emit(event) {
      console.log('ProjectForm.emit', event);

      this.$emit('emit', event);
    },

    change(event) {
      this.$emit('change', event);
    },
  },
};
</script>
