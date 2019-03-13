<template>
  <div class="container" >
    <div class="elevation-1">
      <div class="v-table__overflow">
        <table class=" v-datatable v-table theme--light" >
          <thead>
                <tr>
                  <v-layout column>
                      <td class="layout px-0s table-controls " disabled>
                        <v-flex xs13>
                          Пользователь
                        </v-flex>
                        <v-flex xs13>
                          Права
                        </v-flex>
                        <v-flex xs13>
                          Действия
                        </v-flex>
                      </td>
                 </v-layout>
                </tr>
          </thead>
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
           update:false,
      }
  },
  components: {
  },
  methods:{
  },
  computed: {
  },
  mounted(){
    this.$store.dispatch('users');
  },
}

//============================================================
</script>
<style>

</style>
