<template >
  <div id="header">
  <nav class="navigation">
<!--    <router-link to="/">Home</router-link> |-->
    <router-link to="/suppliers">Suppliers</router-link> |
    <router-link to="/products">Menu</router-link> |
<!--    <router-link to="/basket">Basket</router-link> |-->
<!--    <router-link to="/login">Login</router-link>-->
  </nav>
    <div class="login-section">
  <UserInfoInHeader class = "loginInfo"
      :user="user"
  />
    </div>
  <router-view/>
  </div>



</template>

<style>
#header{
  position: relative;
}
.navigation{
  box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;
}
nav.navigation a {
  font-weight: bold;
  color: #000;
  font-size: 16px;
}
.login-section{
  position: absolute;
  right: 84px;
  top: 6px;
  display: flex;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 36px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #038D9F;
}
</style>
<script>
import {mapActions, mapState} from "vuex";

  export default {
    components: {


    },

    methods:{
      ...mapActions("user", ["refresh", "profile"])
    },
    beforeCreate() {
    },
    computed:{
      ...mapState("user", ["user"]),
    },
    mounted() {
      let localStorageLoggedInFlagAvailable = localStorage.getItem("userLoggedIn")
      if (localStorageLoggedInFlagAvailable){
        if(JSON.parse(localStorage.getItem("userLoggedIn"))){
          this.refresh()
        }
      }

    }
  }
</script>