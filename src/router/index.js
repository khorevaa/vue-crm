import Vue from 'vue'
import Router from 'vue-router'
import ErrorPage from '@/components/404'

import Orders from '@/components/Orders'
import Order from '@/components/Order'
import About from '@/components/About'
import Customers from '@/components/Customers'
import Customer from '@/components/Customer'

import Login from '@/components/Login'
import ChangePassword from '@/components/ChangePassword'

Vue.use(Router)

import auth from '@/utils/auth'

function requireAuth (to, from, next) {
  if (!auth.loggedIn()) {
    next({
      path: '/login',
      query: { redirect: to.fullPath }
    })
  } else {
    next()
  }
}

export default new Router({
  base: __dirname,
  mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    { path: '/404', component: ErrorPage, name: 'ErrorPage' },
    { path: '/about', component: About, name: 'About', beforeEnter: requireAuth },
    { path: '/orders', component: Orders, name: 'Orders', beforeEnter: requireAuth },
    { path: '/neworder', component: Order, name: 'NewOrder', beforeEnter: requireAuth },
    { path: '/order/:id', component: Order, name: 'Order', beforeEnter: requireAuth },
    { path: '/customers', component: Customers, name: 'Customers', beforeEnter: requireAuth },
    { path: '/newcustomer', component: Customer, name: 'NewCustomer', beforeEnter: requireAuth },
    { path: '/customer/:id', component: Customer, name: 'Customer', beforeEnter: requireAuth },
    { path: '/login', component: Login, name: 'Login' },
    { path: '/changePassword', component: ChangePassword, name: 'ChangePassword' },
    { path: '/logout',
      beforeEnter (to, from, next) {
        auth.logout()
        next('/login')
      }
    },
    { path: '*', redirect: '/orders' }
  ]
})