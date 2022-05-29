<template>
    <div class="basket-product-image">
      <img :src="product.image" alt="">
    </div>
    <div class="basket-product-name">
      <p>{{ product.name }}</p>
    </div>
    <div class="basket-product-price">
      <p>{{ product.price }} </p>
    </div>
  <div class="basket-product-amount">
    <p> {{product.current_amount }} </p>
  </div>

</template>

<script>
export default {
  name: "ProductsInBasketItem",
  props:{
    product:{

    }
  },
}
</script>

<style scoped>
.basket-products-container{
  display: flex;
  justify-content: center;
}

.basket-products-item{
  display: flex;
  flex-direction: row;
}
.basket-product-image img{
  width: 80px;
  height: 80px;
  order: 0;
  /*flex: 1 1 auto;*/
  align-self: center;
  float: left;
}
.basket-product-image {
  /*min-width: 100px;*/
  order: 0;
  /*flex: 1 1 auto;*/
  align-self: center;
  float: left;
}
.basket-product-name{
  font-size: 22px;
  order: 0;
  /*flex: 2 1 auto;*/
  align-self: auto;
  float: left;
  /*width: 15%;*/
  min-width: 700px;
}
.basket-product-price{
  /*width: 15%;*/
  order: 0;
  flex: 0 1 auto;
  align-self: auto;
}
.basket-product-amount{
  position: absolute;
  left: 300px;
  background: #2ec4b6;
  padding: 8px;
  color: #fff;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 25px;
}
</style>