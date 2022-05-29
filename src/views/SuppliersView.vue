<template>
<suppliers-list
    :suppliersView="suppliers"
    :suppliersCategories = "suppliersCategories"
    @changeSuppliersCategory = "choice"

/>
</template>

<script>
// import axios from "axios";
import SuppliersList from "@/components/SuppliersList";
import {mapActions, mapState, mapMutations}  from "vuex";

export default {
  name: "SuppliersView",
  components:{
    SuppliersList
  },
  supplierID:{

  },
  data(){
    return{
       // suppliers:[],
    }
  },
  methods:{
    ...mapActions("suppliers", ["fetchSuppliers"]),
    ...mapActions("supplier_categories", ["fetchSuppliersCategories", "fetchSuppliersByCategory"]),
    ...mapMutations("supplier_categories",["setCategoryUrl"]),
    choice(e){
      if (e === 0){
        this.fetchSuppliers()
      } else {
        this.fetchSuppliersByCategory(e)
      }
    }
  },
  beforeCreate() {

  },
  computed:{
    ...mapState("suppliers", ["suppliers","errors"]),
    ...mapState("supplier_categories", ["suppliersCategories","errors"])
  },
  mounted() {
    // this.setCategoryUrl("12")
    this.fetchSuppliers()
    this.fetchSuppliersCategories()
  }
}
</script>

<style scoped>

</style>