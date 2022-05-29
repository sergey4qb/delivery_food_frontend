<template>
<!--  <div class="login-block">-->
<!--    <form @submit.prevent="doLogin" class="form-login">-->
<!--       <input-->
<!--            id="input-1"-->
<!--            v-model="formLogin.email"-->
<!--            type="text"-->
<!--            placeholder="Enter email"-->
<!--            class = "input_login"-->
<!--        />-->
<!--        <input-->
<!--            id="input-2"-->
<!--            v-model="formLogin.password"-->
<!--            placeholder="Enter password"-->
<!--            class = "input_login"-->
<!--        />-->
<!--      <button type="submit" variant="primary" class="form-login-submit">Войти</button>-->
<!--    </form>-->
<!--  </div>-->

<!--  <div class="login-block">-->
<!--    <form @submit.prevent="doRegister" class="form-login">-->
<!--      <input-->
<!--          id="register-1"-->
<!--          v-model="formRegister.email"-->
<!--          type="text"-->
<!--          placeholder="Enter email"-->
<!--          class = "input_login"-->
<!--      />-->
<!--      <input-->
<!--          id="register-2"-->
<!--          v-model="formRegister.name"-->
<!--          placeholder="Enter name"-->
<!--          class = "input_login"-->
<!--      />-->
<!--      <input-->
<!--          id="register-3"-->
<!--          v-model="formRegister.surname"-->
<!--          placeholder="Enter surname"-->
<!--          class = "input_login"-->
<!--      />-->
<!--      <input-->
<!--          id="register-4"-->
<!--          v-model="formRegister.gender"-->
<!--          placeholder="Enter gender"-->
<!--          class = "input_login"-->
<!--      />-->
<!--      <input-->
<!--          id="register-5"-->
<!--          v-model="formRegister.address"-->
<!--          placeholder="Enter address"-->
<!--          class = "input_login"-->
<!--      />-->
<!--      <input-->
<!--          id="register-6"-->
<!--          v-model.number="formRegister.phoneNumber"-->
<!--          placeholder="Enter phone"-->
<!--          class = "input_login"-->
<!--      />-->
<!--      <input-->
<!--          id="register-7"-->
<!--          v-model.number="formRegister.birthday"-->
<!--          placeholder="Enter birthday"-->
<!--          class = "input_login"-->
<!--      />-->
<!--      <input-->
<!--          id="register-8"-->
<!--          v-model="formRegister.password"-->
<!--          placeholder="Enter password"-->
<!--          class = "input_login"-->
<!--      />-->
<!--      <button type="submit" variant="primary" class="form-login-submit">Регистрация</button>-->
<!--    </form>-->
<!--  </div>-->
<!--  <div>-->

<!--  </div>-->
<!--  <LoginModal/>-->
  <p></p>
</template>

<script>
import axios from "axios"
import {mapActions, mapState} from "vuex";
export default {
  name: "LoginForm",
  components: {},
  data() {
    return {
      formLogin: {
        email: '',
        password: '',
      },
      formRegister:{
        name: '',
        surname: '',
        email: '',
        phoneNumber: '',
        gender: '',
        birthday: '',
        address: '',
        password: ''
      },

      errors:[]
    }
  },
  methods: {
    doLogin(){
      this.login(this.formLogin)
    },
    doRegister(){
      this.register(this.formRegister)

    },
    ...mapActions("user", ["login", "register", "refresh", "profile", "logout"]),
    // onLogin(event) {
    //   event.preventDefault()
    //   const loginData = JSON.stringify(this.formLogin);
    //   const url = "http://localhost:8080/login"
    //   let getPosts = async () => {
    //     let response = await axios.post(url, loginData, {withCredentials: true})
    //     // this.posts = response.data
    //     if (response.data.access_token.length != 0){
    //       localStorage.setItem("UserLoggedIn", true)
    //     }
    //     localStorage.setItem("access_token", response.data.access_token)
    //     console.log(response.data.access_token)
    //     console.log(loginData)
    //   }
    //   getPosts().catch(err=> this.errors.push(err))
    // },

    onRegister(event) {
      event.preventDefault()
      const loginData = JSON.stringify(this.formRegister);
      console.log(loginData)

      const url = "http://localhost:8080/register"
      let getPosts = async () => {
        let response = await axios.post(url, loginData)
        console.log(response.status)
      }
      getPosts().catch(err=> this.errors.push(err))
    },

    // async refresh(){
    //   const url = "http://localhost:8080/refresh"
    //   await axios.post(url, {}, {withCredentials: true}).catch(err=> this.errors.push(err))
    // }


    // onReset(event) {
    //   event.preventDefault()
    //   // Reset our form values
    //   this.form.email = ''
    //   this.form.name = ''
    //   this.form.food = null
    //   this.form.checked = []
    //   // Trick to reset/clear native browser form validation state
    //   this.show = false
    //   this.$nextTick(() => {
    //     this.show = true
    //   })
    // }
  },
  computed:{
    ...mapState("user", ["urlProfile",""]),
  }
}
</script>
<style scoped>

.form-login{
  display: flex;
  flex-direction: column;
  align-items: center;
}
.input_login {
  padding: 10px;
  margin: 5px;
  font-size: 16px;
}
.form-login-submit {
  padding: 10px 34px;
  font-size: 15px;
  background: none;
  border: 1px solid #cec;
  box-shadow: none;
}
.form-login-submit:hover {
  background: #cec;
  color: #fff;
  cursor: pointer;
}
</style>