<template>
<OrdersList :orders="allUserOrders||orders.Orders" :viewOrders="viewOrders"/>
</template>

<script>
import OrdersList from "@/components/OrdersList";
import {mapActions, mapState} from "vuex";
export default {
  name: "OrderView",
  components: {OrdersList},
  props:{
    orders:{},
    viewOrders: {},
  },
  methods:{
    ...mapActions("order", ["GetUserOrders"]),
  },
  computed:{
    ...mapState("order", ["allUserOrders"]),
  },
  created() {
    this.GetUserOrders()
    console.log(this.allUserOrders)
  }
}
</script>

<style scoped>

</style>