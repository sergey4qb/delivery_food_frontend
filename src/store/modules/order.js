import {HTTP} from "@/http-common";
import store from "@/store";

const state = {
    urlAddOrder: "AddToOrder",
    urlLastOrderInfo: "GetOrderInfoByOrderID",
    urlAllUserOrders: "GetUserOrdersByUserID",
    errors: [],
    loaded: false,
    lastOrder: [],
    allUserOrders: []
}


const mutations = {

    setErrors(state, errors) {
        state.errors.push(errors)
    },
    setLoaded(state, loaded) {
        state.loaded = loaded
    },
    setLastOrder(state, order) {
        state.lastOrder = order
    },
    setAllUserOrders(state, orders) {
        state.allUserOrders = orders
    }

}

const actions = {

    AddOrder(context, data) {
        return new Promise(resolve => {
            store.dispatch("user/getUser").then(user => {
                let reqData = data.products.map(i => {
                    let user_id = user.id
                    let recipient = data.contactData.recipient
                    let address = data.contactData.address
                    let contactNumber = data.contactData.contactNumber
                    return {
                        "user_id": user_id,
                        "recipient": recipient,
                        "address": address,
                        "contact_mobile": contactNumber,
                        "product_id": i.id,
                        "amount": i.current_amount,
                        "price": i.price
                    }
                })


                let url = context.getters.getAddOrderUrl
                store.dispatch("user/getUserAccessToken").then(access_token => {
                    HTTP.post(url, reqData, {headers: {"Authorization": `Bearer ${access_token}`}}).then(res => {
                        if (res.status === 200) {
                            resolve(true)
                            console.log(res.data)
                            localStorage.removeItem("productID")
                            store.dispatch("order/GetLastOrderInfo", res.data)
                        }
                    }).catch(e => {
                        context.commit("setErrors", e)
                    })
                })
                // let user_access
                // return new Promise((resolve) => {
            })
        })

        // })
        // console.log(reqData)


    },

    GetLastOrderInfo(context, orderIDsArr) {
        let url = context.getters.getLastOrderInfoUrl
        store.dispatch("user/getUserAccessToken").then(access_token => {
            HTTP.post(url, {"id": orderIDsArr}, {headers: {"Authorization": `Bearer ${access_token}`}}).then(res => {
                context.commit("setLastOrder", res.data)
                console.log(res)
            })
        })
    },


// fetchSuppliersCategories(context) {
//         context.commit("setLoaded", false)
//         HTTP.get(context.getters.getPostUrl).then(res => {
//             context.commit("setCategories", res.data.supplier_categories)
//         }).catch(err => {
//             context.commit("setErrors", [err])
//         }).finally(() => {
//             context.commit("setLoaded", true)
//         })
//     },
//     fetchSuppliersByCategory(context, url) {
//
//         context.commit("setLoaded", false)
//         context.commit("setCategoryUrl", url)
//         store.dispatch("suppliers/fetchSuppliers", context.getters.getSuppliersByCategoryUrl).catch(err => {
//             context.commit("setErrors", [err])
//         }).finally(() => {
//             context.commit("setLoaded", true)
//         })
//
//     },
//     showSuppliers(context) {
//         return context.getters.getSuppliersCategories
//     }

}
    const getters = {
        getAddOrderUrl: state => state.urlAddOrder,
        getLastOrderInfoUrl: state => state.urlLastOrderInfo,
        getSuppliersCategories: state => state.suppliersCategories,
        getSuppliersByCategoryUrl: state => state.urlSuppliersByCategoryID,
        getLastOrder: state => state.lastOrder,
        getUrlAllUserOrders: state => state.urlAllUserOrders,
    }

    export default {
        name: "order",
        namespaced: true,
        state,
        mutations,
        actions,
        getters
    }