<template>
  <v-card
    :color="color"
  >
    <v-card-title class='subheading font-weight-bold'>
      {{ name }}
    </v-card-title>
    <v-divider></v-divider>
    <v-list dense>
      <v-list-tile :class="item.className" v-for="(item, index) in list" :key="index">
        <v-list-tile-content>{{ item.name }}:</v-list-tile-content>
        <v-list-tile-content class="align-end">{{ item.value }}</v-list-tile-content>
      </v-list-tile>
    </v-list>
  </v-card>
</template>

<script>
const visibleParams = ['state', 'ip', 'status'];

const getClassName = text => {
  if (text.includes('unhealthy')) {
    return 'red darken-1';
  }
  if (text.includes('second')) {
    return 'red darken-1';
  }
  if (text.includes('minute')) {
    return 'yellow darken-1';
  }
  if (text.includes('an hour')) {
    return 'yellow lighten-3';
  }
  return '';
};

export default {
  name: 'Service',
  props: ['name', 'isFailed', 'params'],
  computed: {
    list() {
      return Object.entries(this.$props.params).reduce((carry, item) => {
        if (!visibleParams.includes(item[0])) {
          return carry;
        }
        let className = '';
        if (item[0] === 'status') {
          className = getClassName(item[1]);
        }
        carry.push({ name: item[0], value: item[1], className });
        return carry;
      }, []);
    },
    color() {
      return this.$props.isFailed
        ? 'red darken-1'
        : 'green darken-1';
    },
  },
};
</script>
