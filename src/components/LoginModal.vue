<template>
  <div id="login-main">
    <a href="#login" @click.prevent="open('login', $event)">Login</a>

  </div>
  <div class="user-modal-container" :class="{ 'active': active }" id="login-modal" @click.prevent="close">
    <div class="user-modal">
      <ul class="form-switcher">
        <li @click.prevent="flip('register', $event)"><a href="" id="register-form">Register</a>

        </li>
        <li  @click.prevent="flip('login', $event) "><a href="" id="login-form">Login</a>

        </li>
      </ul>
      <div class="form-register" :class="{ 'active': active == 'register' }" id="form-register">
        <div class="error-message" v-text="registerError"></div>

        <input
            type="email"
            name="email"
            placeholder="Enter email"
            v-model="formRegister.email"
            @keyup.enter="submit('register', $event)"
        />
        <input
            type="text"
            name="name"
            placeholder="Enter name"
            v-model="formRegister.name"
            @keyup.enter="submit('register', $event)"
        />
        <input
            type="text"
            name="surname"
            placeholder="Enter surname"
            v-model="formRegister.surname"
            @keyup.enter="submit('register', $event)"
        />
        <input
            type="text"
            name="gender"
            placeholder="Enter gender"
            v-model="formRegister.gender"
            @keyup.enter="submit('register', $event)"
        />
        <input
            type="text"
            name="address"
            placeholder="Enter address"
            v-model="formRegister.address"
            @keyup.enter="submit('register', $event)"
        />

        <input
            type="tel"
            name="phoneNumber"
            placeholder="Enter phoneNumber"
            v-model.number="formRegister.phoneNumber"
            @keyup.enter="submit('register', $event)"
        />
        <input
            type="text"
            name="birthday"
            placeholder="Enter birthday"
            v-model.number="formRegister.birthday"
            @keyup.enter="submit('register', $event)"
        />
        <input
            type="password"
            name="password"
            placeholder="Enter password"
            v-model="formRegister.password"
            @keyup.enter="submit('register', $event)"
        />
        <input type="submit"  @click="submit('register', $event)"
               v-model="registerSubmit" id="registerSubmit">
        <div class="links"><a href="" @click="flip('login', $event)">Already have an account?</a></div>
      </div>
      <div class="form-login" :class="{ 'active': active == 'login' }" id="form-login">
        <input
            v-model="formLogin.email"
            name="user"
            type="text"
            placeholder="Enter email"
            @keyup.enter="submit('login', $event)"
        />
        <input
            v-model="formLogin.password"
            name="password"
            type="password"
            placeholder="Enter password"
            @keyup.enter="submit('login', $event)"
        />
        <div class="error-message">
          <div v-if="loginErrors.length !==0">
            <div v-for="error in loginErrors" :key="error.id">
              {{error.response.data}}
            </div>
          </div>
        </div>



        <input type="submit"  @click="submit('login', $event)"
               v-model="loginSubmit" id="loginSubmit">

      </div>
    </div>
  </div>

</template>

<script>
import {mapActions, mapState} from "vuex";
import { } from 'vue';
export default {
  name: "LoginModal",
  data() {
    return {
      active: null,
      submitted: null,
      modalEl: "login-modal",
      registerSubmit: "Register",
      loginSubmit: "Login",



      //  --------------------------------------FORM------------------------------------


      formRegister: {
        name: '',
        surname: '',
        email: '',
        phoneNumber: '',
        gender: '',
        birthday: '',
        address: '',
        password: ''
      },
      formLogin: {
        email: '',
        password: '',
      },


      //  --------------------------------------FORM------------------------------------


    }
  },
  methods: {
    ...mapActions("user", ["login", "register", "getLoginErrors", "getUserLoggedIn"]),

    open: function (which) {
      this.active = which;
    },
    close: function (e) {
      if (e.target.id === this.modalEl) {
        this.active = null;
      }
    },
    flip: function (which) {
      if (which !== this.active) {
        this.active = which;
      }
    },
    submit: function (which) {
      this.submitted = which

      switch (which) {
        case 'register':
          this.register(this.formRegister).then(status=>{
            if (status === 200){
              this.active = null
            }
          })
          break;
        case 'login':
          this.login(this.formLogin).then(status=>{
            if (status === 200){
              this.active = null
            }
          })
          break;
      }
    },
  },
  created() {

  },
  computed:{
    ...mapState("user", ["loginErrors", "loaded", "userLoggedIn"]),
  },
}
</script>

<style scoped>
#login-main a{
  font-weight: bold;
  color: #038D9F;
  padding: 10px 15px;
  text-decoration: none;
}
#login-main a:hover{
  color: #fff;
  background: #038D9F;
}
.user-modal-container * {
  box-sizing: border-box;
}

.user-modal-container {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  opacity: 0;
  visibility: hidden;
  cursor: pointer;
  overflow-y: auto;
  z-index: 3;
  font-family: 'Lato', 'Helvetica Neue', 'Helvetica', 'Arial', 'sans-serif';
  font-size: 14px;
  background-color: rgba(17, 17, 17, .9);
  -webkit-transition: all 0.25s linear;
  -moz-transition: all 0.25s linear;
  -o-transition: all 0.25s linear;
  -ms-transition: all 0.25s linear;
  transition: all 0.25s linear;
}

.user-modal-container.active {
  opacity: 1;
  visibility: visible;
}

.user-modal-container .user-modal {
  position: relative;
  margin: 50px auto;
  width: 90%;
  max-width: 500px;
  background-color: #f6f6f6;
  cursor: initial;
}

.user-modal-container .form-login,
.user-modal-container .form-register,
.user-modal-container .form-password {
  padding: 75px 25px 25px;
  display: none;
}

.user-modal-container .form-login.active,
.user-modal-container .form-register.active,
.user-modal-container .form-password.active {
  display: block;
}

.user-modal-container ul.form-switcher {
  margin: 0;
  padding: 0;
}

.user-modal-container ul.form-switcher li {
  list-style: none;
  display: inline-block;
  width: 50%;
  float: left;
  margin: 0;
}

.user-modal-container ul.form-switcher li a {
  width: 100%;
  display: block;
  height: 50px;
  line-height: 50px;
  color: #666666;
  background-color: #dddddd;
  text-align: center;
}

.user-modal-container ul.form-switcher li a.active {
  color: #000000;
  background-color: #f6f6f6;
}

.user-modal-container input {
  width: 100%;
  padding: 10px;
  font-size: 16px;
  margin-bottom: 10px;
  border: 1px solid #eeeeee;
}

.user-modal-container input[type="submit"] {
  color: #fff;
  border: 0;
  margin-bottom: 0;
  background-color: #038D9F;
  cursor: pointer;
  font-weight: bold;
  font-size: 16px;
}

.user-modal-container input[type="submit"]:hover {
  background-color: #017f8f;
}

.user-modal-container input[type="submit"]:active {
  background-color: #379d6b;
}

.user-modal-container .links {
  text-align: center;
  padding-top: 25px;
}

.user-modal-container .links a {
  color: #3fb67b;
}

.user-modal-container input[type="submit"].disabled {
  background-color: #98d6b7;
}
.error-message {
  color: #ff1717;
  font-size: 15px;
}
</style>