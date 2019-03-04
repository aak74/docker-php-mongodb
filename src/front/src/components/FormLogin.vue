<template>
  <div  class="info_block">  
    <div  class="info_card"> 
        <div class="text_tag_div">        
            <input v-model="user.login" class="text_tag_p text_edit"/>   
        </div>  
        <div  class="text_edit">
            <input v-model="user.password" type="password" class="text_tag_p text_edit"/> 
        </div>
        <div  class="login">
            <button @click="register" class="btn"> Регистрация   </button>
            <button @click="signIn" class="btn"> Войти </button>
            <button @click="auth" class="btn"> Проверка</button>
            <p>{{answer}}</p>
        </div>
    </div> 
  </div>
  
</template>
<script>
import FormLogin from '../components/FormLogin';

export default {
  name: 'Login',
   props: {
    data: {
      type: Object
    },
    
  },
  data(){
      return{
          user:{
              login:'',
              password:'',
          },
          answer:localStorage.getItem('token'),
          
      }
  },
  components: {
   
  },
  watch:{
    data(){
      this.answer=localStorage.getItem('token');
    }
  },
  methods:{
      signIn(){
      this.$store.dispatch('signIn', this.user);  
          
      },
      auth(){
      this.$store.dispatch('auth', this.user);  
          
      },
      register(){
          let packet=[localStorage.getItem('token'),]
          this.$store.dispatch('register', this.user);   
      }
  },
};
</script>
<style>
.info_block{
  text-align: center;
  align-items:center; 
  width:100%;
}
.info_card{
  display: inline-block;
  padding:1%;
  margin-top:50px;
  left:-10%;
  background:rgba(153, 255, 153,0.5);
  background: linear-gradient(to right bottom,rgba(0, 204, 68,0.6) 15%, rgba(153, 255, 153,0.8) 80%, rgba(153, 255, 153,0.35) 90%);
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  border-radius: 10px;
}
.text_tag_div{
 margin-top:0px;
 padding-top:1%;
}
.text_edit{
  background: rgba(255,255,255,0.9);
  border-radius:5px;
  border:1px ridge rgba(0, 0, 0, 0.2);
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.1), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}
.text_tag_p{
  font-size: 26px;
}
.login{ 
  justify-content: center;
  font-size: 27px;
}
.btn {
font-size: 27px;
color: #494949 !important;
text-transform: lowercase;
background: rgba(255,255,255,0);
padding: 3px;
padding-top: 0;
padding-bottom: 0;
border: 2px solid rgba(0, 0, 0, 0.2)!important;
border-radius: 6px;
}

.btn:hover {
color: #494949 !important;
border-radius: 50px;
border-color: rgba(255,255,255,1) !important;
transition: all 0.3s ease 0s;
}
.text_tag_textarea{
  margin-top: 3%;
  width:100%;
  font-size: 20px;
  resize: none;
  outline:none;
}
.info_date{
  text-align:center;
}
textarea::-webkit-scrollbar {
    width: 0%;
}
::-webkit-calendar-picker-indicator {
  color: transparent;
  opacity: 1;
  background: url(//www.gravatar.com/avatar/cbfaff96665b7567defe1b34a883db8b?s=16&d=identicon&r=PG) no-repeat center;
  background-size: contain;
}
@keyframes coloring {
  from{
    background-color:rgba(255,255,255,1);
  }
  to{
      background-color:rgba(206, 9, 9, 1);
      border:1px solid rgb(1, 100, 1);
  }
}
</style>