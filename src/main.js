import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import components from './components/UI'
import "normalize.css"
import "./style.css"
import UserInfoInHeader from "@/components/UserInfoInHeader";

const app = createApp(App)

app.component("UserInfoInHeader", UserInfoInHeader)



for (let componentsKey in components) {
    app.component(componentsKey.name, components)
}

app.use(store).use(router).mount('#app')
