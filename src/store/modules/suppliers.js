import {HTTP} from "@/http-common";

const state = {
    url: "GetAllSuppliers",
    suppliers: [],
    errors: [],
    loaded: false
}


const mutations = {
    setSuppliers(state, supplier) {
        state.suppliers = supplier
    },
    setErrors(state, errors) {
        state.errors.push(errors)
    },
    setLoaded(state, loaded) {
        state.loaded = loaded
    },

}

const actions = {

    fetchSuppliers(context, url = state.url) {
        context.commit("setLoaded", false)
        HTTP.get(url).then(res => {
            context.commit("setSuppliers", res.data.suppliers)
            console.log(state.suppliers)
        }).catch(err => {
            context.commit("setErrors", [err])
        }).finally(() => {
            context.commit("setLoaded", true)
        })
    },
    showSuppliers(context) {
        return context.getters.getSuppliers
    }
}

const getters = {
    getPostUrl: state => state.url,
    getSuppliers: state => state.suppliers,

}

export default {
    name: "suppliers",
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}