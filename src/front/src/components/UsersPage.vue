<template>
  <div class="container" >
    <div class="elevation-1">
      <div class="v-table__overflow">
        <table class=" v-datatable v-table theme--light" >
          <thead>
            <tr>
              <v-layout column>
                  <th class="layout px-0s table-controls " disabled>

                    <v-flex xs4>
                      <v-icon class="search">search</v-icon>
                      <input v-model="userName" placeholder="Пользователь"/>
                    </v-flex>
                    <v-flex xs4>
                      <p class="head">
                      Права
                      </p>
                    </v-flex>
                    <v-flex xs4>
                      <p class="head">
                      Действия
                      </p>
                    </v-flex>
                  </th>
              </v-layout>
                </tr>
          </thead>
          <tbody>
            <tr v-for="user in users">
              <v-layout v-show="isSearhing(user.login)" align-center justify-center row fill-height>
                  <td class="layout px-0s table-controls " disabled>
                    <v-flex xs4>
                      {{user.login}}
                    </v-flex>
                    <v-flex xs4>
                      <v-layout row justify-center>
                      {{user.blocked}}
                      </v-layout>
                    </v-flex>
                    <v-flex  xs4>
                      <v-layout row justify-center>
                        <v-btn title="Удалить" v-on:click="deleteUser(user._id)" flat icon color="blue lighten-2">
                          <v-icon>delete_sweep</v-icon>
                        </v-btn>
                        <v-btn title="Разблокировать" v-if="user.blocked"  v-on:click="unblock(user._id)" flat icon color="red lighten-2">
                          <v-icon>lock</v-icon>
                        </v-btn>
                        <v-btn title="Заблокировать" v-else v-on:click="block(user._id)" flat icon color="green lighten-2">
                          <v-icon>lock_open</v-icon>
                        </v-btn>
                      </v-layout>
                    </v-flex>
                  </td>
              </v-layout>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UsersPage',
  data(){
      return{
           userName:'',
           update:false,
      }
  },
  components: {
  },
  methods:{
    deleteUser(id){
      this.$store.dispatch('userDelete',id);
      this.$store.dispatch('users');
    },
    block(id){
      this.$store.dispatch('block',id);
      this.$store.dispatch('users');
    },
    unblock(id){
      this.$store.dispatch('unblock',id);
      this.$store.dispatch('users');
    },
    isSearhing(UserNameString){
      const ad =this.userName;
      if ((UserNameString.search(ad))!=(-1)){
        return true
      }
      return false
    },
  },
  computed: {
    users(){
      return this.$store.state.users;
    }
  },
  mounted(){
    this.$store.dispatch('users');
  },
}

//============================================================
</script>
<style>
.head{
  margin-top:15px;
}
.search{
  margin-top:8px;
}
</style>
