<template>
  <div class="container">
    <h3>История бэкапов</h3>
    <div v-for="backup in history">{{ LocaleDate(backup) }}</div>
  </div>
</template>
<script>
export default {
  name: 'BackupHistory',
  props: {
    history: {
      type: Object,
    },
  },
  data() {
    return {
      connect_error_count: 0,
    };
  },
  methods: {
    LocaleDate(date) {
      const DateBackup = Date.parse(date.backupTime);
      const Time = new Date(DateBackup);
      return Time.toString();
    },
  },
};
</script>
