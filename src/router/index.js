import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/login'
import Layout from '../views/layout'

Vue.use(VueRouter)

const routes = [
  { path: '/', component: Layout, children: [{ path: '', name: 'home', component: () => import('@/views/home') }, { path: '/qa', name: 'qa', component: () => import('@/views/qa') }, { path: '/video', name: 'video', component: () => import('@/views/video') }, { path: '/my', name: 'my', component: () => import('@/views/my') }] },
  { path: '/login', name: 'login', component: Login },
  { path: '/search', name: 'login', component: () => import('@/views/search') },
  { path: '/article/:articleId', name: 'article', component: () => import('@/views/article') }
]

const router = new VueRouter({
  routes
})

export default router
