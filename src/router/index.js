import { createRouter, createWebHistory } from 'vue-router'
import { useAuth } from '../composables/useAuth.js'

const HomePage = () => import('../pages/HomePage.vue')
const FilmPage = () => import('../pages/FilmPage.vue')
const SportsPage = () => import('../pages/SportsPage.vue')
const EbooksPage = () => import('../pages/EbooksPage.vue')
const ReaderPage = () => import('../pages/ReaderPage.vue')
const PlayerPage = () => import('../pages/PlayerPage.vue')
const LoginPage = () => import('../pages/LoginPage.vue')
const RegisterPage = () => import('../pages/RegisterPage.vue')

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage,
    },
    {
      path: '/films',
      name: 'films',
      component: FilmPage,
    },
    {
      path: '/sports',
      name: 'sports',
      component: SportsPage,
    },
    {
      path: '/ebooks',
      name: 'ebooks',
      component: EbooksPage,
    },
    {
      path: '/read/:id',
      name: 'reader',
      component: ReaderPage,
      meta: { requiresAuth: true },
    },
    {
      path: '/watch/:id',
      name: 'player',
      component: PlayerPage,
      meta: { requiresAuth: true },
    },
    {
      path: '/login',
      name: 'login',
      component: LoginPage,
      meta: { guestOnly: true },
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterPage,
      meta: { guestOnly: true },
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }

    if (to.hash) {
      return { el: to.hash, behavior: 'smooth' }
    }

    return { top: 0 }
  },
})

router.beforeEach((to) => {
  const { isAuthenticated } = useAuth()
  if (to.meta?.requiresAuth && !isAuthenticated.value) {
    return { name: 'login', query: { redirect: to.fullPath } }
  }
  if (to.meta?.guestOnly && isAuthenticated.value) {
    return { name: 'home' }
  }
  return true
})

export default router
