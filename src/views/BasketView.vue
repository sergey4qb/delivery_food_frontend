<template>
  <div :class="{'basket-block-hide':this.basketBlockHide}">
  <ProductsInBasketList
      v-if="uniqueProductsView.length > 0"
      :products="uniqueProductsView"
      :totalPrice="totalPrice"
      @removeProductBasketPage="removeProduct"
      @showOrderForm = "showOrderForm"
  />
  <div v-else class="empty-basket">
    <p class="empty-basket-text">Your cart is empty</p>
    <img src="../assets/empty_cart.png" alt="empty-cart">
  </div>
  <div :class="{'form-visible':formVisible, 'make-order-container':true}">
    <MakeOrderView
        :products="uniqueProductsView"
        @hideBasketBlock = "hideBasketBlock"

    />
  </div>
  </div>
</template>

<script>
import ProductsInBasketList from "@/components/ProductsInBasketList";
import {mapActions, mapState} from "vuex";
import MakeOrderView from "@/views/MakeOrderView";

export default {
  name: "BasketView",
  components: {MakeOrderView, ProductsInBasketList},
  data(){
    return{
      formVisible:false,
      basketBlockHide:false
    }
  },
  methods: {
    ...mapActions("basket", ["requestProducts", "RemoveFromLocalStorage", "CalcProductAmount"]),
    ...mapActions("user", ["getUserInfo"]),
    removeProduct(id) {
      this.RemoveFromLocalStorage(id)
      // this.requestProducts()
    },
    showOrderForm(loggedIn) {
      this.formVisible = loggedIn
      if(loggedIn){
        this.getUserInfo()
      }
    },
    hideBasketBlock(e){
      this.basketBlockHide=e
    },
  },
  computed: {
    ...mapState("basket", ["products", "totalPrice", "uniqueProductsView"])

  },
  beforeCreate() {

  },
  beforeMount() {
    this.requestProducts()

  },
  created() {

  }
}
</script>

<style scoped>
.make-order-container {
  padding-top: 15px;
  display: none;
}
.form-visible{
  display: block;
}

.empty-basket{
  color: #49b3a9;
  font-size: 22px;
  text-decoration: underline;
}
.basket-block-hide{
  position: relative;
  top: -742px;
  /*z-index: -1;*/
  transition: 0.5s all;
}
</style>