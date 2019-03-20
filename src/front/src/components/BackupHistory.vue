<template>
    <div class="container">
      <p>История бэкапов</p>
      <span v-for="backup in history">{{LocaleDate(backup)}}</br></span>
    </div>
</template>
<script>
export default {
  name: 'BackupHistory',
  props: {
    history: {
      type: Object
    },
  },
  data(){
      return{
        connect_error_count: 0,
      }
  },
  methods:{
    LocaleDate(date){
      const DateBackup = Date.parse(date.backupTime);
      const Time = new Date(DateBackup);
      return Time.toString()
    },
  }
};
</script>
<style>
</style>
