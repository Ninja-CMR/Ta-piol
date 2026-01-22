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
    },
    {
        path: '/host',
        component: () => import('../layouts/DefaultLayout.vue'), // Réutilisation du Layout principal
        children: [
            {
                path: 'become',
                name: 'BecomeHost',
                component: () => import('../views/host/BecomeHostView.vue')
            },
            {
                path: 'dashboard',
                name: 'HostDashboard',
                component: () => import('../views/host/HostDashboardView.vue'),
                meta: { requiresHost: true }
            },
            {
                path: 'properties',
                name: 'HostProperties',
                component: () => import('../views/host/HostPropertiesView.vue'),
                meta: { requiresHost: true }
            },
            {
                path: 'properties/new',
                name: 'HostPropertyNew',
                component: () => import('../views/host/HostPropertyFormView.vue'),
                meta: { requiresHost: true }
            },
            {
                path: 'appointments',
                name: 'HostAppointments',
                component: () => import('../views/host/HostAppointmentsView.vue'),
                meta: { requiresHost: true }
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
    } else if (to.meta.requiresHost && !auth.isHost) {
        // Si l'accès requiert le rôle host mais l'user ne l'est pas
        next('/host/become')
    } else {
        next()
    }
})

export default router
