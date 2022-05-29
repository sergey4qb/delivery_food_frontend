<template>
  <h3>
    Товары
  </h3>
  <div class="product-content-area">
    <div class="filters-block">
      <div class="filter-select-supplier-type filter-item">
        <p class="item-title">Тип продукта</p>
        <select v-model="selectedType" @change="filterByType($event)">
          <option :value="0">All</option>
          <option v-for="product_type in product_types" :key="product_type.id" :value="product_type.id">
            {{ product_type.name }}
          </option>
        </select>
      </div>
    </div>
    <div class="product-main-block">
      <product-item v-for="product in products"
                    :key="product.id"
                    :product="product"
                    :currentIngr="ingredients"
                    @fetchIngr="$emit('fetchIngr', $event)"/>
    </div>
  </div>
</template>
<script>
import ProductItem from "@/components/ProductItem";

export default {
  name: "ProductList",
  components: {ProductItem},
  data() {
    return {
      selectedType: 0,
    }
  },
  props: {
    products: {
      required: true
    },
    product_types: {
      required: true
    },
    ingredients:{},
  },
  methods: {
    filterByType() {
      this.$emit("changeType", this.selectedType)
    },

  },
  computed: {},
  beforeMount() {

  }
}
</script>

<style scoped>
.product-main-block {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  display: flex;
  align-items: center;
  order: 0;
  flex: 4 1 auto;
  align-self: auto;
  width: 60%;
}

.product-content-area {
  margin-top: 20px;
  display: flex;
  flex-direction: row-reverse;
  flex-wrap: wrap;
  justify-content: space-around;
}

.filters-block {
  order: 0;
  flex: 1 1 auto;
  align-self: baseline;
  background: #fff;
  padding: 60px;
  border-radius: 25px;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  width: 20%;
}

.filters-block, .product-main-block {
  order: 0;
  flex: 0 1 auto;
}
</style>