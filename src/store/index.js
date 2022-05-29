import { createStore } from 'vuex'
import suppliers from "@/store/modules/suppliers";
import supplier_categories from "@/store/modules/supplier_categories";
import products from "@/store/modules/products";
import product_types from "@/store/modules/product_types";
import user from "@/store/modules/user";
import basket from "@/store/modules/basket";
import order from "@/store/modules/order";


export default createStore({
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    suppliers,
    supplier_categories,
    products,
    product_types,
    user,
    basket,
    order
  }
})
