import { createRouter, createWebHistory } from 'vue-router'

// import AppVue from '@/App.vue'
import MainPage from '@/components/pages/MainPage.vue'
// import TypeBikePage from '@/components/pages/TypePage.vue'
import BikePage from '@/components/pages/BikePage.vue'
// import BrandPage from '@/components/pages/BrandPage.vue'
// import BrandTypePage from '@/components/pages/BrandTypePage.vue'
import BikesPage from '@/components/pages/BikesPage.vue'

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
    // {
    //   path: '/type/:type',
    //   name: 'type',
    //   component: TypeBikePage
    // },

    {
      path: '/type/:type/id/:id',
      name: 'bike-page',
      component: BikePage
    }
    // {
    //   path: '/brand/:nameBrand',
    //   name: 'brand',
    //   component: BrandPage
    // },
    // {
    //   path: '/type/:type/brand/:brand',
    //   name: 'type-brand',
    //   component: BrandTypePage
    // }
  ]
})

export default router
