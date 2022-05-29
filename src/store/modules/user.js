import store from "@/store";
import {HTTP} from "@/http-common";

const state = {
    urlLogin: "login",
    urlRegister: "register",
    urlRefresh: "refresh",
    urlProfile: "profile",
    urlLogout: "logout",
    urlUserInfo: "GetUserInfo",
    urlUserOrders:"GetUserOrdersByUserID",
    userLoggedIn: false,
    user: {},
    userinfo: {},
    userAccessToken: '',
    errors: [],
    loginErrors: [],
    loaded: false,
    status: 0,
}


const mutations = {
    setUserAccessToken(state, access_token) {
        state.userAccessToken = access_token
    },
    setUserLoggedIn(state, login) {
        state.userLoggedIn = login
    },
    setLoaded(state, loaded) {
        state.loaded = loaded
    },
    setUser(state, user) {
        state.user = user
    },
    setExportUserLoggedIn(state, loggedIn) {
        state.user.loggedIn = loggedIn
    },
    setErrors(state, errors) {
        state.errors.push(errors)
    },
    setLoginErrors(state, errors) {
        state.loginErrors.push(errors)
    },
    setUserInfo(state, user) {
        state.userinfo = user
    }
}

const actions = {

    login(context, data) {
        return new Promise((resolve) => {
            let loginData = JSON.stringify(data)
            HTTP.post(context.getters.getLoginUrl, loginData, {withCredentials: true}).then(response => {
                context.commit("setUserAccessToken", response.data.access_token)
                if (context.getters.getUserAccessToken.length !== 0) {
                    context.commit("setUserLoggedIn", true)
                    localStorage.setItem("userLoggedIn", true)
                    store.dispatch("user/profile").catch(err => context.commit("setErrors", err))
                    resolve(response.status)
                }
                // console.log(context.getters.getUserAccessToken)
                // console.log(context.getters.getUserLoggedIn)
            }).catch(e => {
                context.commit("setLoginErrors", e)
            }).finally(() => {
                context.commit("setLoaded", true)
            })
        })
    },
    register(context, data) {
        return new Promise((resolve) => {
            let registerData = JSON.stringify(data)
            HTTP.post(context.getters.getRegisterUrl, registerData, {withCredentials: true}).then(response => {
                console.log(response, "user_register")
                context.commit("setUserAccessToken", response.data.access_token)
                if (response.data.access_token.length !== 0) {
                    context.commit("setUserLoggedIn", true)
                    context.commit("setLoaded", true)
                    localStorage.setItem("userLoggedIn", true)
                    store.dispatch("user/profile").catch(err => context.commit("setErrors", err))
                    resolve(response.status)
                }
                console.log(context.getters.getUserAccessToken)
                console.log(context.getters.getUserLoggedIn)
            }).catch(e => {
                context.commit("setErrors", e)
            })
        })

    },
    refresh(context) {
        HTTP.post(context.getters.getRefreshUrl, {}, {withCredentials: true}).then(response => {
            context.commit("setUserAccessToken", response.data.access_token)
            if (response.data.access_token.length !== 0) {
                context.commit("setUserLoggedIn", true)
                context.commit("setLoaded", true)
                store.dispatch("user/profile").catch(err => context.commit("setErrors", err))
            }
            console.log(context.getters.getUserAccessToken)
        }).catch(err => {
                context.commit("setErrors", err)
                if (err.response.status === 401) {
                    context.commit("setUserLoggedIn", false)
                    localStorage.setItem("userLoggedIn", false)
                }
            }
        )
    },
    profile(context) {
        HTTP.get(context.getters.getProfileUrl, {
            withCredentials: true,
            headers: {"Authorization": `Bearer ${context.getters.getUserAccessToken}`}
        }).then(res => {
            console.log(context.getters.getUserLoggedIn, "PROFILE")
            context.commit("setUser", res.data)
            context.commit("setExportUserLoggedIn", context.getters.getUserLoggedIn)
            store.dispatch("user/getUserInfo")
        })
    },
    logout(context) {
        HTTP.post(context.getters.getLogoutUrl, {}, {withCredentials: true}).then(() => {
            localStorage.setItem("userLoggedIn", false)
            window.location.reload()
        })
    },
    getUserInfo(context) {
        HTTP.post(context.getters.getUrlUserInfo, {"id": context.getters.getUser.id}, {
            headers: {
                "Authorization": `Bearer ${context.getters.getUserAccessToken}`
            }
        }).then(res => {
            context.commit("setUserInfo", res.data)
        }).catch(e => context.commit("setErrors", e))
    },
    getUserOrders(context){
        HTTP.post(context.getters.getUrlUserOrders, {"id": context.getters.getUser.id}, {
            headers: {
                "Authorization": `Bearer ${context.getters.getUserAccessToken}`
            }
        }).then(res => {
            context.commit("setUserInfo", res.data)
        }).catch(e => context.commit("setErrors", e))
    },
    getUserLoggedIn(context) {
        return  context.getters.getUserLoggedIn
    },

    getLoginErrors(context) {
        return context.getters.getLoginErrors
    },
    getUser(context) {
        return context.getters.getUser
    },
    getUserAccessToken(context) {
        return context.getters.getUserAccessToken
    }
}

const getters = {
    getLoginUrl: state => state.urlLogin,
    getRegisterUrl: state => state.urlRegister,
    getRefreshUrl: state => state.urlRefresh,
    getProfileUrl: state => state.urlProfile,
    getLogoutUrl: state => state.urlLogout,
    getUserLoggedIn: state => state.userLoggedIn,
    getUser: state => state.user,
    getUrlUserInfo: state => state.urlUserInfo,
    getUrlUserOrders: state=> state.urlUserOrders,
    getUserAccessToken: state => state.userAccessToken,
    getErrors: state => state.errors,
    getLoginErrors: state => state.loginErrors,
    getLoaded: state => state.loaded
}

export default {
    name: "user",
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}