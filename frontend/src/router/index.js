import { createRouter, createWebHistory } from 'vue-router'

import MainPage from '@/components/pages/MainPage.vue'
import BikePage from '@/components/pages/BikePage.vue'
import BikesPage from '@/components/pages/BikesPage.vue'
import ShoppingCartPage from '@/components/pages/ShoppingCartPage.vue'
import MakeAnOrderPage from '@/components/pages/MakeAnOrderPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/type/:type',
      name: 'type',
      component: BikesPage
    },
    {
      path: '/brand/:brand',
      name: 'brand',
      component: BikesPage
    },
    {
      path: '/type/:type/brand/:brand',
      name: 'type-brand',
      component: BikesPage
    },
    {
      path: '/',
      name: 'home',
      component: MainPage
    },
    {
      path: '/type/:type/id/:id',
      name: 'bike-page',
      component: BikePage
    },
    {
      path: '/shopping-cart',
      name: 'shopping-cart',
      component: ShoppingCartPage
    },
    {
      path: '/make-an-order',
      name: 'make-an-order',
      component: MakeAnOrderPage
    }
  ]
})

export default router
