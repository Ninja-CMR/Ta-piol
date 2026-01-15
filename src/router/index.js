import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const routes = [
    {
        path: '/login',
        name: 'Auth',
        component: () => import('../views/AuthView.vue'),
        meta: { layout: 'AuthLayout', guest: true }
    },
    {
        path: '/',
        component: () => import('../layouts/DefaultLayout.vue'),
        children: [
            {
                path: '',
                name: 'Home',
                component: () => import('../views/HomeView.vue')
            },
            {
                path: 'chambre/:id',
                name: 'HousingDetail',
                component: () => import('../views/HousingDetailView.vue')
            },
            {
                path: 'rendez-vous/:id',
                name: 'Booking',
                component: () => import('../views/BookingView.vue')
            },
            {
                path: 'profile',
                name: 'Profile',
                component: () => import('../views/ProfileView.vue')
            },
            {
                path: 'favorites',
                name: 'Favorites',
                component: () => import('../views/FavoritesView.vue')
            },
            {
                path: 'appointments',
                name: 'Appointments',
                component: () => import('../views/AppointmentsView.vue')
            }
        ],
        meta: { requiresAuth: true }
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to, from, next) => {
    const auth = useAuthStore()
    if (to.meta.requiresAuth && !auth.isAuthenticated) {
        next('/login')
    } else if (to.meta.guest && auth.isAuthenticated) {
        next('/')
    } else {
        next()
    }
})

export default router
