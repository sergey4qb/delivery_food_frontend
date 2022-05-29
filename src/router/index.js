import {createRouter, createWebHistory} from 'vue-router'
// import PostView from "@/views/PostView";
// import LoginView from "@/views/LoginView";
import SuppliersView from "@/views/SuppliersView";
import ProductsView from "@/views/ProductsView";
import BasketView from "@/views/BasketView";
import SupplierPage from "@/components/SupplierPage";
import UserProfile from "@/views/UserProfile";

const routes = [
    {
        path: '/',
        redirect: '/suppliers'
    },
    {
        path: '/suppliers',
        name: 'suppliers',
        component: SuppliersView
    },
    {
        path: '/products',
        name: 'menu',
        component: ProductsView
    },
    {
        path: '/basket',
        name: 'basket',
        component: BasketView
    },
    {
        path: '/supplier/:supplierID',
        name: 'supplierPage',
        component: SupplierPage
    },
    {
        path: '/profile',
        name: 'profile',
        component: UserProfile
    },

    // {
    //   path: '/login',
    //   name: 'home',
    //   component: LoginView
    // },
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router
