<template>
  <div :class="{'orders-container':true, 'show':viewOrders}">

    <table class="orders-table">
      <thead>
      <tr>
        <th>Recipient<br></th>
        <th>Product<br></th>
        <th>Cost<br></th>
        <th>Amount<br></th>
        <th>Address<br></th>
        <th>Contact<br></th>
        <th>Status<br></th>
      </tr>
      </thead>
      <tbody >
      <tr v-for="order in orders" :key="order.id">
        <OrderItem :order="order"></OrderItem>
      </tr>

      </tbody>
    </table>

  </div>
</template>

<script>
import OrderItem from "@/components/OrderItem";

export default {
  name: "OrdersList",
  components: {OrderItem},
  props: {
    orders: {},
    viewOrders: {}
  },
  mounted() {
    console.log(this.viewOrders)
  }
}
</script>

<style scoped>
.order-item{
  display: flex;
  flex-direction: row;
  justify-content: center;
}
.orders-container{
  position: fixed;
  top: 100px;
  left: 250px;
}
.orders-container{
  display: none;
}
.orders-container.show{
  display: block;
}
</style>