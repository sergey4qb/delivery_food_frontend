import store from "@/store";
import {HTTP} from "@/http-common";

const state = {
    urlAllSuppliers: "GetAllSuppliersCategories/",
    urlSuppliersByCategoryID: "",
    suppliersCategories: [],
    errors: [],
    loaded: false
}


const mutations = {
    setCategories(state, suppliersCategories) {
        state.suppliersCategories = suppliersCategories
    },
    setCategoryUrl(state, urlSuppliersByCategoryID) {
        let url = `GetSuppliersByCategoryID/${urlSuppliersByCategoryID}`
        state.urlSuppliersByCategoryID = url
    },
    setErrors(state, errors) {
        state.errors.push(errors)
    },
    setLoaded(state, loaded) {
        state.loaded = loaded
    },

}

const actions = {
    fetchSuppliersCategories(context) {
        context.commit("setLoaded", false)
        HTTP.get(context.getters.getPostUrl).then(res => {
            context.commit("setCategories", res.data.supplier_categories)
        }).catch(err => {
            context.commit("setErrors", [err])
        }).finally(() => {
            context.commit("setLoaded", true)
        })
    },
    fetchSuppliersByCategory(context, url) {

        context.commit("setLoaded", false)
        context.commit("setCategoryUrl", url)
        store.dispatch("suppliers/fetchSuppliers", context.getters.getSuppliersByCategoryUrl).catch(err => {
            context.commit("setErrors", [err])
        }).finally(() => {
            context.commit("setLoaded", true)
        })

    },
    showSuppliers(context) {
        return context.getters.getSuppliersCategories
    }
}

const getters = {
    getPostUrl: state => state.urlAllSuppliers,
    getSuppliersCategories: state => state.suppliersCategories,
    getSuppliersByCategoryUrl: state => state.urlSuppliersByCategoryID,
}

export default {
    name: "supplier_categories",
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}