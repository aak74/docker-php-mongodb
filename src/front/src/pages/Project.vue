<template>
  <div>
    <v-container>
      <h2>Проект</h2>
      <h3>Название</h3>
      <span>{{ this.project.name }}</span>
      <h3>URL</h3>
      <span>{{ this.project.url }}</span>
    </v-container>
  </div>
</template>

<script>
/* eslint no-underscore-dangle: ["error",{"allow":["_id"]}] */

export default {
  name: 'Project',
  data() {
    return {
      projectId: this.$route.params.id,
    };
  },
  methods: {
    sendRequest() {
      this.$store.dispatch('openProject', this.projectId);
    },
  },
  computed: {
    project() {
      return this.$store.getters.currentProject;
    },
  },
  created() {
    this.sendRequest();
  },
};
</script>
