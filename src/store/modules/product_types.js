import store from "@/store";
import {HTTP} from "@/http-common";

const state = {
    urlAllProducts: "GetAllProductsTypes/",
    urlProductsByTypeID: "",
    productTypes: [],
    errors: [],
    loaded: false
}


const mutations = {
    setTypes(state, productTypes) {
        state.productTypes = productTypes
    },
    setTypeUrl(state, urlProductsByTypeID) {
        let url = `GetAllProductsByTypeID/${urlProductsByTypeID}`
        state.urlProductsByTypeID = url
    },
    setErrors(state, errors) {
        state.errors.push(errors)
    },
    setLoaded(state, loaded) {
        state.loaded = loaded
    },

}

const actions = {
    fetchProductTypes(context) {
        context.commit("setLoaded", false)
        HTTP.get(context.getters.getAllProductsUrl).then(res => {
            console.log(res.data.products_types)
            context.commit("setTypes", res.data.products_types)
        }).catch(err => {
            context.commit("setErrors", [err])
        }).finally(() => {
            context.commit("setLoaded", true)
        })
    },
    fetchProductsByType(context, url) {

        context.commit("setLoaded", false)
        context.commit("setTypeUrl", url)
        store.dispatch("products/fetchProducts", context.getters.getProductTypesByUrl).catch(err => {
            context.commit("setErrors", [err])
        }).finally(() => {
            context.commit("setLoaded", true)
        })

    },
    showProductTypes(context) {
        return context.getters.getProductTypes
    }
}

const getters = {
    getAllProductsUrl: state => state.urlAllProducts,
    getProductTypes: state => state.productTypes,
    getProductTypesByUrl: state => state.urlProductsByTypeID,
}

export default {
    name: "product_types",
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}
