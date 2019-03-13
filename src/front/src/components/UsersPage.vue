<template>
  <div class="container" >
    <div class="elevation-1">
      <div class="v-table__overflow">
        <table class=" v-datatable v-table theme--light" >
          <thead>
            <tr>
              <v-layout column>
                  <th class="layout px-0s table-controls " disabled>

                    <v-flex xs6>
                      <v-icon class="search">search</v-icon>
                      <input v-model="userName" placeholder="Пользователь"/>
                    </v-flex>
                    <v-flex xs6>
                      <p class="head">
                      Права
                      </p>
                    </v-flex>
                    <v-flex >
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
                    <v-flex xs6>
                      Права
                    </v-flex>
                    <v-flex>
                      <v-btn v-on:click="deleteUser(user._id)" flat icon color="red lighten-2">
                        <v-icon>delete_sweep</v-icon>
                      </v-btn>
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
