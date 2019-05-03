<template>
<div id="app">
  <notifications group="global" :max="10" />
  <v-app>
    <sidebar />
    <v-content>
      <transition name="fade" mode="out-in">
        <router-view />
      </transition>
      <notifications group="foo" />
    </v-content>
  </v-app>
</div>
</template>

<script>
import Sidebar from './components/admin/Sidebar.vue';

export default {
  name: 'App',
  components: {
    Sidebar,
  },
};
</script>

<style scoped>
.bottom-menu {
  position: absolute;
  width: 100%;
  bottom: 0;
}
.list-border-bottom {
  border-bottom: 1px solid rgba(255, 255, 255, .12);
}
</style>
