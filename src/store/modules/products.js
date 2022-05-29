import store from "@/store";
import Vue from "vue";
import {HTTP} from "@/http-common";

const state = {
    url: "GetAllProducts/",
    supplierProductsUrl: "/GetMenuBySupplierID",
    productsIngredients: [],
    currentProductIngredients:[],
    products: [],
    errors: [],
    loaded: false
}


const mutations = {
    setProducts(state, products) {
        state.products = products
    },
    setErrors(state, errors) {
        state.errors.push(errors)
    },
    setLoaded(state, loaded) {
        state.loaded = loaded
    },
    setProductIngredients(state, payload) {
        state.productsIngredients = payload
    },
    setCurrentProductIngredients(state, ingr) {
        state.currentProductIngredients = ingr
    },
}

const actions = {
    fetchProducts(context, url = state.url) {
        context.commit("setLoaded", false)
        HTTP.get(url).then(res => {
            context.commit("setProducts", res.data.menu)
        }).catch(err => {
            context.commit("setErrors", [err])
        }).finally(() => {
            context.commit("setLoaded", true)
        })
    },
    fetchIngredients(context, payload) {
        return new Promise(resolve => {
            HTTP.get(`/GetIngredientsByProductID/${payload.productID}`).then(res => {
                let productID = res.data.ProductIngredients[0].ProductID
                let ingredients = res.data.ProductIngredients.map(i => i.IngredientName)
                resolve({productID, ingredients})
            })
        })

    },
    fetchSupplierProducts(context, supplierID) {
        context.commit("setLoaded", false)
        console.log(Vue)
        let url = context.getters.getSupplierProductsUrl
        HTTP.post(url, {"supplier_id": JSON.parse(supplierID)
        }).then(res => {
            context.commit("setProducts", res.data.menu)
        }).catch(err => {
            context.commit("setErrors", [err])
        }).finally(() => {
            context.commit("setLoaded", true)
        })
    },
    showProducts(context) {
        return context.getters.getProducts
    },
    showIngredients(context, productID) {
        return new Promise(resolve => {

            store.dispatch("products/fetchIngredients", {productID}).then(res=>{
                console.log(res)
                // let productsIngr = context.getters.getproductsIngredients
                context.commit("setCurrentProductIngredients", res)

                resolve(true)
                // res.forEach(i => {
                //     if (i.productID === productID){
                //         context.commit("setCurrentProductIngredients", i.ingredients)
                //     }
                // })
            }).catch(e=>console.log(e))
        })


    }
}

const getters = {
    getPostUrl: state => state.url,
    getProducts: state => state.products,
    getSupplierProductsUrl: state => state.supplierProductsUrl,
    getproductsIngredients: state => state.productsIngredients,
    getCurrentProductsIngredients: state => state.currentProductIngredients,
}

export default {
    name: "products",
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}