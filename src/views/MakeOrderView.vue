<template>
  <form class="order-form" @submit.prevent="AddOrder({contactData, products}).then(res=>{this.showLastOrderStatus(res)})">
    <span class="auto-fill-form" @click="fillForm">Fill form by my data</span>
    <label> <span class="label-input">Recipient</span>
      <input
          type="text"
          placeholder="Enter recipient name"
          class="input-order"
          v-model="contactData.recipient"
      />
    </label>
    <label> <span class="label-input">Address</span>
      <input
          type="text"
          placeholder="Enter address"
          class="input-order"
          v-model="contactData.address"

      />
    </label>
    <label> <span class="label-input">Contact number</span>
      <input
          type="text"
          placeholder="Enter contact number"
          class="input-order"
          v-model.number="contactData.contactNumber"

      />
    </label>
    <input type="submit" variant="primary" class="" value="Make order">
  </form>
  <OrderView :orders = "lastOrder" :viewOrders = "this.ordersView"/>
</template>

<script>
import {mapActions, mapState} from "vuex";
import OrderView from "@/views/OrderView";

export default {
  name: "MakeOrderView",
  components: {OrderView},

  data() {
    return {
      contactData: {
        "recipient": '',
        "address": '',
        "contactNumber": '',
      },
      ordersView: false,
    }
  },
  props: {
    products: {},
  },
  methods: {
    ...mapActions("order", ["AddOrder", "GetLastOrderInfo"]),
    // ...mapActions("user", ["getUserInfo"]),
    fillForm(){
      this.contactData.recipient = this.userinfo.name + ' ' + this.userinfo.surname
      this.contactData.address = this.userinfo.address
      this.contactData.contactNumber = this.userinfo.phone_number
    },
    showLastOrderStatus(exist){
      if(exist){
        this.$emit("hideBasketBlock", true)
        this.ordersView = true
        console.log(this.lastOrder)
      }
    }
  },
  computed:{
    ...mapState("user", ["userinfo",]),
    ...mapState("order", ["lastOrder",])
  },

  updated() {
  }
}
</script>

<style scoped>
.order-form {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.input-order {
  width: 100%;
  padding: 10px;
  font-size: 16px;
  margin-bottom: 10px;
  border: 1px solid #eeeeee;
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

label {
  display: flex;
  align-items: center;
}

.label-input {
  width: 200px;
}

input[type="submit"] {
  font-weight: bold;
  color: #fff;
  padding: 10px 15px;
  text-decoration: none;
  cursor: pointer;
  border: none;
  background: #038D9F;
  transition: .3s all;
}

input[type="submit"]:hover {
  background: #058596;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 12px 28px 0px, rgba(0, 0, 0, 0.1) 0px 2px 4px 0px, rgba(255, 255, 255, 0.05) 0px 0px 0px 1px inset;
}
.auto-fill-form{
  text-decoration: underline;
  cursor: pointer;
  margin-left: 285px;
}
</style>