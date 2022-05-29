<template>
<ProductsView :supplierID = "$route.params.supplierID"/>
</template>

<script>
import ProductsView from "@/views/ProductsView";
export default {
  name: "SupplierPage",
  components: {ProductsView}
}
</script>

<style scoped>

</style>