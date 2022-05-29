<template>
  <product-list
      :products="products"
      :product_types="productTypes"
      @changeType="choice"
      @fetchIngr="test"
      :ingredients = "currenting"
  />
</template>

<script>
import {mapActions, mapMutations, mapState} from "vuex";
import ProductList from "@/components/ProductList";

export default {
  name: "ProductsView",
  components: {ProductList},
data(){
    return{
      currenting: [],
    }
},
  props:{
    supplierID: {},
  },
  methods: {
    ...mapActions("products", ["fetchProducts", "fetchSupplierProducts", "fetchIngredients", "showIngredients"]),
    ...mapActions("product_types", ["fetchProductTypes", "fetchProductsByType"]),
    ...mapMutations("product_types", ["setTypeUrl"]),
    choice(e) {
      console.log(e, "event")
      if (e === 0) {
        this.fetchProducts()
      } else {
        this.fetchProductsByType(e)
      }
    },
    test(e) {
      console.log(e)
      this.showIngredients(e).then(res=>{
        if (res){
          this.currenting = this.currentProductIngredients
          // console.log()
        }
      })
    },
  },
  beforeCreate() {

  },
  computed: {
    ...mapState("products", ["products", "errors", "productsIngredients", "currentProductIngredients"]),
    ...mapState("product_types", ["productTypes", "errors"])
  },

  created() {
    if (this.supplierID){
      console.log(this.supplierID, "supplierID")
      this.fetchSupplierProducts(this.supplierID)
    }else {
      this.fetchProducts()
    }
    this.fetchProductTypes()
  },

}
</script>

<style scoped>

</style>