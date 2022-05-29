import store from "@/store";
import {HTTP} from "@/http-common";

const state = {
    urlAddToBasket: "http://localhost:8080/AddToBasket",
    errors: [],
    loaded: false,
    currentUserID: 0,
    currentProductID: 0,
    basketCounter: 0,
    products: [],
    totalPrice: 0,
    amountEachProducts: {},
    uniqueProductsView: []
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
    setCurrentUserID(state, userID) {
        state.currentUserID = userID
    },
    setCurrentProductID(state, userID) {
        state.currentUserID = userID
    },
    setLocalStorageProducts(state, product) {
        state.products.push(product)
    },
    setBasketCounter(state, count) {
        state.basketCounter = count
    },
    setProducts(state, products) {
        state.products = products
    },
    setTotalPrice(state, price) {
        state.totalPrice = price
    },
    calcProducts(state, amount) {
        state.amountEachProducts = amount
    },
    setUniqueProductsView(state, unique) {
        state.uniqueProductsView = unique
    }
}

const actions = {

    AddToLocalStorage(context, productID) {
        let products = []
        if (localStorage.getItem("productID") != null) {
            let productsLS = localStorage.getItem("productID")
            let products = JSON.parse(productsLS)
            products.push(productID)
            localStorage.setItem("productID", JSON.stringify(products))
        } else {
            products.push(productID)
            localStorage.setItem("productID", JSON.stringify(products))
        }
        store.dispatch("basket/UpdateBasketCounter")
    },
    RemoveFromLocalStorage(context, productID) {
        if (localStorage.getItem("productID") !== null) {
            let localStorageLength = JSON.parse(localStorage.getItem("productID")).length
            if (localStorageLength !== 0) {
                console.log(localStorageLength)
                let productsLS = localStorage.getItem("productID")
                let products = JSON.parse(productsLS)

                // eslint-disable-next-line no-inner-declarations
                function removeOne(value, array) {
                    array.some(function (_value, index, _array) {
                        if (_value == value) {
                            _array.splice(index, 1);
                            return true;
                        }
                    }, array);
                    return array

                }

                let filteredArray = removeOne(productID, products)
                localStorage.setItem("productID", JSON.stringify(filteredArray))
                store.dispatch("basket/UpdateBasketCounter")
                store.dispatch("basket/requestProducts").catch(e => console.log(e))
            }
            if (localStorageLength === 1) {
                window.location.reload()
            }
        }
    },

    requestProducts(context) {
        let products = localStorage.getItem("productID")
        HTTP.post("GetProductsInBasket", {
            "product_ids": JSON.parse(products)
        }).then(resolve => {
            let data = resolve.data.menu
            context.commit("setProducts", data)
            store.dispatch("basket/UpdateTotalPrice").catch(e => console.log(e))
            store.dispatch("basket/CalcProductAmount").catch(e => console.log(e))
        })
    },

    UpdateBasketCounter(context) {
        if (localStorage.getItem("productID") != null) {
            let products = JSON.parse(localStorage.getItem("productID"))
            context.commit("setBasketCounter", products.length)
        }
    },
    UpdateTotalPrice(context) {
        if (localStorage.getItem("productID") !== null) {
            let localStorageLength = JSON.parse(localStorage.getItem("productID")).length
            if (localStorage.getItem("productID") != null && localStorageLength) {
                let currentProducts = context.getters.getProducts
                let price = 0
                let totalPrice = currentProducts.reduce((price, current)=> {
                    let tempPrice = current.price
                    tempPrice = tempPrice*100
                    return price + tempPrice
                }, price)
                context.commit("setTotalPrice", totalPrice/100)
            }
        }

    },
    CalcProductAmount(context) {
        if (localStorage.getItem("productID") !== null) {
            let localStorageLength = JSON.parse(localStorage.getItem("productID")).length

            if (localStorageLength > 0) {
                let currentProducts = context.getters.getProducts
                let amount = {};
                currentProducts.forEach((item) => {
                    let id = item.id
                    amount[id] = (amount[id] || 0) + 1;
                    // if (arr.length-1 !== index && id === arr[(index+1)].id){
                    //     arr.splice(index, 1)
                    // }

                });
                let uniqueProducts = new Map();
                let unique = currentProducts.filter(el => {
                    const val = uniqueProducts.get(el.name);
                    if (val) {
                        if (el.id < val) {
                            uniqueProducts.delete(el.name);
                            uniqueProducts.set(el.name, el.id);
                            return true;
                        } else {
                            return false;
                        }
                    }
                    uniqueProducts.set(el.name, el.id);
                    return true;
                });

                context.commit("calcProducts", amount)
                context.commit("setUniqueProductsView", unique)
                let am = context.getters.getProductsAmount
                for (let k in am) {
                    unique.forEach(item => {
                        console.log(item.id, Number(k))
                        if (item.id === Number(k)) {
                            item["current_amount"] = am[k]
                        }
                    })
                    console.log(k, am[k])
                }
                console.log(unique)

                // let newArray = currentProducts.filter(function (elem, pos) {
                //     return currentProducts.indexOf(elem.id) == pos.id;
                // });
                // console.log(newArray);
            }
        }
    },

    // showOrderForm(context) {
    //     let LSuserLoggedIn = localStorage.getItem("userLoggedIn")
    //     if (LSuserLoggedIn !== null) {
    //         JSON.parse(LSuserLoggedIn)
    //     }
    // },


    IncreaseBasketCounter(context, count) {
        context.commit("setIncreaseBasketCounter", count)
    },
    DecreaseBasketCounter(context, count) {
        context.commit("setDecreaseBasketCounter", count)
    },
    //     context.commit("setLoaded", false)
    //     console.log(userID, "userID")
    //     let pid = productID
    //     let uid = 3
    //     axios.get(`http://localhost:8080/AddToBasket/${pid}/${uid}`).then(res => {
    //         context.commit("setSuppliers", res.data.suppliers)
    //         console.log(state.suppliers)
    //     }).catch(err => {
    //         context.commit("setErrors", [err])
    //     }).finally(()=>{
    //         context.commit("setLoaded", true)
    //     })
    // },
    showBasketCounter(context) {
        return context.getters.getBasketCounter
    },

}

const getters = {
    getPostUrl: state => state.url,
    getBasketCounter: state => state.basketCounter,
    getProducts: state => state.products,
    getProductsAmount: state => state.amountEachProducts,
    getUniqueProducts: state => state.uniqueProductsView,
}

export default {
    name: "suppliers",
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}