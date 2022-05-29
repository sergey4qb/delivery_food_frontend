<template>
  <h3>
    Список поставщиков
  </h3>
  <div class="supplier-content-area">
    <div class="filters-block">
      <div class="filter-select-supplier-type filter-item">
        <p class="item-title">Тип поставщика</p>
        <select v-model="selectedCategory" @change="filterByCategory($event)">
          <option :value="0">All</option>
          <option v-for="category in suppliersCategories" :key="category.id" :value="category.id">{{category.name}}</option>
        </select>
      </div>
    </div>
    <div class="suppliers-main-block">
      <supplier-item v-for="supplier in suppliersView" :key="supplier.id" :supplier = "supplier"/>
    </div>
  </div>

</template>

<script>
import SupplierItem from "@/components/SupplierItem";
export default {
  data(){
    return{
      selectedCategory: 0,
    }
  },
  name: "SuppliersList",
  components: {SupplierItem},
  props:{
    suppliersView: {
      required: true
    },
    suppliersCategories: {
      required: true
    }
  },
  methods:{
    filterByCategory(){
      this.$emit("changeSuppliersCategory", this.selectedCategory)
    },
  },
  beforeCreate() {
  },

}
</script>

<style scoped>
.suppliers-main-block{
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  order: 0;
  flex: 4 1 auto;
  align-self: auto;
}
.filters-block{
  order: 0;
  flex: 1 1 auto;
  align-self: baseline;
  background: #fff;
  padding: 60px;
  border-radius: 25px;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
}
.filter-item{
  border-bottom: 1px solid;
  padding-bottom: 10px;
}
.filter-select-supplier-type{

}
.supplier-content-area{
  margin-top: 20px;
  display: flex;
  flex-direction: row-reverse;
  flex-wrap: wrap;
  justify-content: space-around;
}


</style>