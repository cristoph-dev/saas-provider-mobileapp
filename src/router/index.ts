import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import HomePage from '../views/HomePage.vue'
import LoginPage from '../views/auth/LoginPage.vue';
import MainPage from '../views/pages/MenuPage.vue';
import Tabs from '@/views/pages/Tabs.vue';

const routes: Array<RouteRecordRaw> = [
  { 
    path: '/', 
    redirect: '/home' 
  },

  { 
    path: '/home', 
    name: 'Home', 
    component: HomePage 
  },

  { 
    path: '/login', 
    name: 'Login', 
    component: () => import('../views/auth/LoginPage.vue')
  },
  { 
    path: '/register', 
    name: 'Register', 
    component: () => import('../views/auth/RegisterPage.vue')
  },
  { 
    path: '/recover', 
    name: 'Recover', 
    component: () => import('../views/auth/RecoverPassPage.vue')
  },
  {
    path: '/tabs',
    component: Tabs,
    children: [
      { 
        path: '', 
        redirect: '/tabs/menu' 
      },
      {
        path: 'menu',
        component: () => import('../views//pages/MenuPage.vue'),
      },
      {
        path: 'pedidos',
        component: () => import('../views//pages/PedidosPage.vue'),
      },
      {
        path: 'ventas',
        component: () => import('../views//pages/VentasPage.vue'),
      },
      {
        path: 'profile',
        component: () => import('../views//pages/ProfilePage.vue'),
      },
    ],
  },

  { 
    path: '/menu', 
    redirect: '/tabs/menu' 
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
