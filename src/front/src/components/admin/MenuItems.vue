<template>
  <div>
    <v-list
      subheader
      :class="{'list-border-bottom' : mini}"
      v-for="(menu, index) in items"
      :key="index"
    >
      <v-subheader>{{ menu.title }}</v-subheader>
      <template v-for="(item, index) in menu.items">
        <menu-item :mini="mini" :item="item" :key="index"/>
      </template>
      <menu-item v-if="isAdmin" :mini="mini" :item="users" :key="index"/>
    </v-list>
    <v-divider></v-divider>
  </div>
</template>

<script>
import MenuItem from './MenuItem';

export default {
  name: 'MenuItems',
  components: {
    MenuItem,
  },
  data(){
    return{
      users:{
        icon: 'account_box',
        title: 'Пользователи',
        link: '/users',
        description: null,
      },
    }
  },
  created(){
      this.$store.dispatch('isAdmin');
  },
  computed:{
    isAdmin(){
      return this.$store.state.isAdmin
    },
  },
  props: ['items', 'mini'],

};
</script>
