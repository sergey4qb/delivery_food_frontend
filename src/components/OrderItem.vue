<template>
  <td class="order-row order-item-recipient">{{ order.recipient }}</td>
  <td class="order-row order-item-products">{{ order.products }}</td>
  <td class="order-row order-item-price">{{ order.price }}</td>
  <td class="order-row order-item-amount">{{ order.amount }}</td>
  <td class="order-row order-item-address">{{ order.address }}</td>
  <td class="order-row order-item-contact_mobile">{{ order.contact_mobile }}</td>
  <td class="order-row order-item-status">{{ order.status }}</td>
</template>

<script>
export default {
  name: "OrderItem",
  props: {
    order: {}
  }
}
</script>

<style scoped>
.order-row{
  padding-left: 20px;
  padding-left: 20px;
  width: 170px;
  font-style: italic;
  font-size: 18px;
  border-bottom: 1px solid #038d9f;
  padding-top: 20px;
}
</style>