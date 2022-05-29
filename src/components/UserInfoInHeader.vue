<template>
  <div v-if="user.loggedIn">
<!--    <p>Hello, {{user.name}}</p>-->
<!--    <div @click = "logout"> LOGOUT </div>-->
    <ul class="user-info">
      <li @click = "showMenu = !showMenu">{{user.name}}</li>
<!--      <li v-if="showMenu" :class="{'show-menu': showMenu}" @click = "$router.push('profile');this.showMenu=false" >PROFILE</li>-->
      <li v-if="showMenu" :class="{'show-menu': showMenu}" @click = "logout" >LOGOUT</li>
    </ul>
  </div>
  <div v-else>
    <p>  <LoginModal/> </p>
  </div>
  <div :class="{'basket-header-info':true, 'basketLoggedIn':user.loggedIn}">
    <a  @click="$router.push('basket')" class="basket-link">
      <img src="../assets/basket_logo.png" class="basket-img" alt="">
    </a>
    <div v-if="basketCounter" class="basket-counter">
      {{basketCounter}}
    </div>
  </div>
</template>

<script>
import LoginModal from "@/components/LoginModal";
import {mapActions, mapState} from "vuex";

export default {
  name: "UserInfoInHeader",
  data(){
    return{
      showMenu: false
    }
  },
  components:{
    LoginModal
  },
  props:{
    user: Object,
  },
  methods:{
    ...mapActions("user", ["logout"]),
    ...mapActions("basket", ["showBasketCounter", "UpdateBasketCounter"])
  },
  mounted() {
    this.UpdateBasketCounter()

  },
  computed:{
    ...mapState("basket", ["basketCounter"])
  }
}
</script>

<style scoped>
.basket-link{
}
.basket-counter{
  font-size: 25px;
  position: absolute;
  top: 15px;
  left: 30px;
  background: #2ec4b6;
  /*padding: 8px;*/
  color: #fff;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.basket-header-info{
  position: relative;
}
.basket-header-info.basketLoggedIn{
}
/*.basket-link::after {*/
/*  font-size: 20px;*/
/*  position: absolute;*/
/*  top: 18px;*/
/*  background: #4eb5ab;*/
/*  padding: 6px;*/
/*  border-radius: 50%;*/
/*  color: #fff;*/
/*}*/
ul li {
  cursor: pointer;
  list-style: none;
  margin: 0;
  text-align: left;
  font-weight: bold;
  color: #038D9F;
  padding: 10px 15px;
}
ul li:hover{
  background: #038D9F;
  color: #fff;
}
.show-menu{
  padding-top: 10px;
}
.basket-header-info, .user-info{
  float: left;
}
.basket-header-info img{
  width: 28px;
  height: 35px;
  margin-top: 18px;
  opacity: 0.7;
}
.basket-header-info img:hover{
  opacity: 1;
  cursor: pointer;
}
</style>