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
  computed:{
    isAdmin(){
      if(localStorage.getItem('UserName')==='admin'){
        return true
      }
      return false
    },
  },
  props: ['items', 'mini'],
};
</script>
