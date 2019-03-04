<template>
  <div>
    <uni-form :data="currentProject" :schema="projectScheme" />
  </div>
</template>

<script>
import UniForm from '../components/UniForm';

export default {
  name: 'Project',
  components: {
    UniForm,
  },
  beforeRouteEnter (to, from, next) {
    console.log(to);
    next(vm => {
      vm.fetchData(to.params.id);
    });
  },
  methods: {
    fetchData(id) {
      console.log('fetchData', id);
      this.$store.dispatch('getProject', id);
    },
  },
  computed: {
    currentProject() {
      return this.$store.state.project.current;
    },

    projectScheme() {
      return this.$store.state.project.schema;
    },
  }
};
</script>
