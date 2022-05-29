<template>
  <div class="basket-products-container">
    <div class="basket-products-item" v-for="product in products" :key="product.id">
      <ProductsInBasketItem :product="product"/>
      <div class="delete-icon" @click="$emit('removeProductBasketPage', product.id)">
        <img src="../assets/delete_icon.png" alt="">
      </div>
    </div>
  </div>
  <!--  showOrderForm-->
  <div class="order-block">
    <a class="order-button" @click="$emit('showOrderForm', this.userLoggedIn); requireLogin()">ORDER</a>
    <span v-if="!userLoggedIn">Login or register for make order</span>
    <p class="total-price">{{ totalPrice }} $</p>
  </div>
</template>
<script>
import ProductsInBasketItem from "@/components/ProductsInBasketItem";
import {mapActions, mapState} from "vuex";

export default {
  name: "ProductsInBasketList",
  components: {
    ProductsInBasketItem
  },

  props: {
    products: {},
    test: {},
    totalPrice: {},

  },
  methods: {
    ...mapActions("basket", ["UpdateTotalPrice"]),
    requireLogin() {
      let elem = document.querySelector(".order-block")
      if (!this.userLoggedIn) {
        elem.classList.add("login-error")
      }
    },
  },
  computed: {
    ...mapState("user", ["userLoggedIn"]),
  },
  created() {
    // this.UpdateTotalPrice()
    // this.CalcProductAmount()
  }
}
</script>

<style scoped>
.basket-products-container {
  box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;
}

.order-block {
  padding-top: 30px;
  position: relative;
}

.basket-products-item {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  position: relative;
}

.total-price {
  font-weight: bold;
  font-size: 20px;
  display: inline;
  position: absolute;
  right: 490px;
  top: 0;
}

.order-button {
  font-weight: bold;
  color: #038D9F;
  padding: 10px 15px;
  text-decoration: none;
  cursor: pointer;
}

.order-button:hover {
  color: #fff;
  background: #038D9F;
}

.delete-icon {
  position: absolute;
  right: 420px;
  opacity: 0.5;
  cursor: pointer;
}

.delete-icon:hover {
  opacity: 1;
}

.order-block span {
  display: none;
}

.login-error span {
  display: block;
  padding-top: 15px;
  color: #c91616;
  text-decoration: underline;
}
</style>