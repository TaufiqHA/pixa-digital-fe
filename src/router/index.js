import { createRouter, createWebHistory } from 'vue-router'

const HomePage = () => import('../pages/HomePage.vue')
const FilmPage = () => import('../pages/FilmPage.vue')
const SportsPage = () => import('../pages/SportsPage.vue')
const EbooksPage = () => import('../pages/EbooksPage.vue')
const ReaderPage = () => import('../pages/ReaderPage.vue')
const PlayerPage = () => import('../pages/PlayerPage.vue')

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
    },
    {
      path: '/watch/:id',
      name: 'player',
      component: PlayerPage,
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

export default router
