import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/auth',
    name: 'Auth',
    component: () => import('../views/Auth/index.vue'),
  },
  {
    path: '/account',
    name: 'Account',
    redirect: '/account/new',
    component: () => import('../views/Account/index.vue'),
    children: [
      {
        path: '/account/list',
        name: 'AccountList',
        component: () => import('../views/Account/List.vue'),
      },
      {
        path: '/account/new',
        name: 'AccountNew',
        component: () => import('../views/Account/New.vue'),
      },
    ],
  },
  {
    path: '/payment',
    name: 'Payment',
    redirect: '/payment/new',
    component: () => import('../views/Payment/index.vue'),
    children: [
      {
        path: '/payment/list',
        name: 'PaymentList',
        component: () => import('../views/Payment/List.vue'),
      },
      {
        path: '/payment/new',
        name: 'PaymentNew',
        component: () => import('../views/Payment/New.vue'),
      },
    ],
  },
  {
    path: '*',
    redirect: '/payment',
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
