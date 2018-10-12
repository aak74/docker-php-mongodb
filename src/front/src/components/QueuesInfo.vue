<template>
<div>
  <data-table
    :headers="headers"
    :items="items"
    hide-actions
    :loading="false"
  />
</div>
</template>

<script>
import DataTable from './admin/DataTable';

export default {
  name: 'QueuesInfo',
  components: {
    DataTable,
  },
  props: ['info'],
  data() {
    return {
      items: [],
    };
  },
  watch: {
    info() {
      this.updateItems();
    },
  },
  computed: {
    headers() {
      const headers = [{ text: '', value: 'leftName', sortable: false }];
      this.$store.state.queuesAvailable.forEach(item => {
        headers.push({ text: item, value: item, sortable: false });
      });
      return headers;
    },
  },
  methods: {
    updateItems() {
      const msg = { leftName: 'В очереди:' };
      const notConfirmed = { leftName: 'Не подтверждено:' };
      this.info.forEach(({ name, messages, stats }) => {
        if (this.$store.state.queuesAvailable.indexOf(name) === -1) {
          return true;
        }
        msg[name] = messages;
        notConfirmed[name] = (stats && stats.deliver_no_ack)
          ? stats.deliver_no_ack
          : 0;
        return true;
      });
      this.items = [msg, notConfirmed];
    },
  },
};
</script>
