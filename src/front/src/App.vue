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
import Sidebar from './components/admin/Sidebar';
import io from 'socket.io-client';


const socket = io.connect("http://localhost")


export default {
  name: 'App',
  components: {
    Sidebar,
    io,
  },
  data(){
    return{

    }
  },
  methods:{
  },
  mounted() {
      socket.emit('autorized', {user:localStorage.getItem('UserName')});
      const vm = this;
      socket.on('message', function(msg){
        vm.$notify({
          group: 'foo',
          title: 'Message',
          text: msg.msg,
          enter: {opacity: [1, 0]},
          leave: {opacity: [0, 1]}
        });
      });
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
