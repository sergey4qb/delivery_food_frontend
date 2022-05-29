<template>

  <div class="products">
    <div class="product">
      <div class="product-media-block-left">
        <div class="product-image">
          <img v-if="image.isExist" :src="image.noImage" alt="">
          <img v-else :src="product.image" alt="image">
        </div>
      </div>
      <div class="product-info-right-block">
        <div class="product-name--menu-block">
          <p class="item-title">{{ product.name }}</p>
        </div>
        <div class="product-type-block badge-type">
          <div>{{ product.type }}</div>
        </div>
        <div class="product-description-block">
          <p class="product-description">
            {{ product.description }}
          </p>
        </div>


        <div class="product-price-block">
          <p class="product-price">Price {{ product.price }}</p>
        </div>
        <div class="ingredients-button"
             @click="$emit('fetchIngr', this.product.id); active.isActive= !active.isActive; active.product_id = this.product.id"
             :class="{'active':active.isActive}">
          <p v-if="active.isActive">{{ active.text.hide }}</p>
          <p v-else>{{ active.text.show }}</p>
        </div>
        <div class="product-ingredients-block"  v-if="currentIngr.productID === product.id &&active.isActive">
          <ul class="product-ingredients-list" >
            <li class="product-ingredients-item" id="ingredients" v-for="ingredient in currentIngr.ingredients"
                :key="currentIngr.ingredients.indexOf(ingredient)"> {{ ingredient }}
            </li>
          </ul>
        </div>
        <div class="basket-buttons">
          <div class="add-to-basket-button" @click="AddToLocalStorage(product.id)">Add to basket</div>
          <div class="remove-from-basket-button" @click="RemoveFromLocalStorage(product.id)">Remove</div>
        </div>
        <!--      <div @click = "requestProducts">req</div>-->
      </div>

    </div>
  </div>


  <div></div>
</template>

<script>
import {mapActions, mapState} from "vuex";
import axios from "axios";

export default {
  name: "ProductItem",
  data() {
    return {
      ingredientsSelector: "ingredients",
      active: {
        product_id: 0,
        isActive: false,
        text: {
          show: "Show ingredients",
          hide: "Hide ingredients"
        }
      },
      image: {
        isExist: true,
        noImage: require('../assets/No_image_available.png') // не работает, только хардкодом в img src
      },
    }
  },
  props: {
    product: {
      required: true
    },
    currentIngr: {},
  },
  methods: {
    AddProductToBasket() {
      this.AddToBasket({"productID": this.product.id, "userID": this.user.id}).then(res => {
        if (res.status === 200) {
          this.IncreaseBasketCounter(1)
        }
      })
    },
    RemoveProductFromBasket() {
      this.AddToBasket({"productID": this.product.id, "userID": this.user.id}).then(res => {
        if (res.status === 200) {
          this.DecreaseBasketCounter(1)
        }
      })
    },

    ...mapActions("basket", ["RemoveFromLocalStorage", "AddToLocalStorage", "requestProducts", "DeleteFromBasket"]),
    ...mapActions("products", ["fetchIngredients", "showIngredients"]),

  },
  computed: {
    ...mapState("user", ["user"]),
    ...mapState("products", ["productsIngredients", "currentProductIngredients"]),
  },
  mounted() {
  },
  beforeCreate() {
    axios.get(this.product.image).catch(err => {
      if (err){
        this.image.isExist = false
      }
    })
  }
}
</script>

<style scoped>
img {
  max-width: 200px;
  display: block;
  max-height: 134px;
}

.product {
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  padding: 1%;
  min-height: 450px;
  position: relative;
}

.products {
  order: 0;
  flex: 1 1 auto;
  align-self: flex-start;
  width: 23%;
  max-width: 25%;
  padding-left: 3%;
  padding-top: 1%;
}

.product-image {
  display: flex;
  justify-content: center;
  min-height: 134px;
}

.add-to-basket-button, .remove-from-basket-button {
  font-weight: bold;
  color: #fff;
  padding: 10px 15px;
  text-decoration: none;
  cursor: pointer;
  background: #038D9FE0;
}

.add-to-basket-button:hover, .remove-from-basket-button:hover {
  color: #fff;
  background: #038D9F;
}

.product-ingredients-block {
  position: relative;
}

.product-ingredients-list {
  list-style: none;
  padding: 0;
  margin: 0;
  /*background: #cec;*/
  background: #058596;
  position: absolute;
  line-height: 1.5;
  bottom: -44px;
  right: -50px;
  opacity: 0.85;
  border-radius: 30px;
}

.product-ingredients-item {
  padding: 15px;
  color: #fff;
  font-weight: bold;
}

.ingredients-button{
  cursor: pointer;
  position: absolute;
  width: 100%;
  bottom: 66px;
}

.ingredients-button p {
  padding: 10px 15px;
  background: #058596;
  color: #fff;
  font-weight: bold;
  border-radius: 19px;
}
.basket-buttons{
  position: absolute;
  bottom: 0;
  width: 100%;
}
</style>



