<template>
<v-navigation-drawer
  width="250"
  class="blue-grey darken-4"
  dark
  persistent
  :mini-variant="miniMenu"
  v-model="drawer"
  fixed
  app
>
  <sidebar-toggler :mini="miniMenu" />
  <v-divider></v-divider>
  <extra-menu-item :mini="miniMenu" :item="extraMenuItem" v-if="extraMenuItem"/>
  <v-divider></v-divider>
  <menu-items
    :items="menuItems"
    :mini="miniMenu"
  />
</v-navigation-drawer>
</template>

<script>
import MenuItems from './MenuItems.vue';
import ExtraMenuItem from './ExtraMenuItem.vue';
import SidebarToggler from './SidebarToggler.vue';

export default {
  name: 'Sidebar',
  components: {
    MenuItems,
    ExtraMenuItem,
    SidebarToggler,
  },
  // mixins: [status],
  computed: {
    status() {
      return this.$store.state.admin.status;
    },
    extraMenuItem() {
      return this.$store.state['admin/extraMenuItem'];
    },
    menuItems() {
      return this.$store.getters['admin/leftMenu'];
    },
    miniMenu() {
      return this.status.miniMenu;
    },
  },
  data() {
    return {
      drawer: true,
      fixed: false,
      tabs: null,
    };
  },

};
</script>

<style>
.bottom-menu {
  position: absolute;
  width: 100%;
  bottom: 0;
}
/* .searching {
  overflow: hidden;
  width: 208px;
  padding-left: 8px;
  transition: $primary-transition;
} */
.searching--closed {
  padding-left: 0;
  width: 0;
}
.searching > * {
  right: 8px;
}
.searching--closed > * {
  display: none;
}
/* .hidden-searching {
  @media $display-breakpoints.sm-and-down {
    display: none !important;
  }
} */
.list-border-bottom {
  border-bottom: 1px solid rgba(255, 255, 255, .12);
}

.subheader {
  text-transform: uppercase;
}
</style>
