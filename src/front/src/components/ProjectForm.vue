<template>
  <uni-form
    title="Добавление нового проекта"
    :data="currentProject"
    :schema="projectScheme"
    :buttons="buttons"
    @emit="emit"
  />
</template>

<script>
import UniForm from './UniForm.vue';

export default {
  name: 'ProjectForm',
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
          title: 'Добавить',
        },
      ],
    };
  },

  computed: {
    currentProject() {
      return this.$store.state.project.current;
    },

    projectScheme() {
      return this.$store.state.project.schema;
    },
  },

  methods: {
    emit(event) {
      this.$emit('emit', event);
    },
  },
};
</script>
