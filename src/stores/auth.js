import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: JSON.parse(localStorage.getItem('auth_user')) || null,
        token: localStorage.getItem('auth_token') || null,
    }),
    getters: {
        isAuthenticated: (state) => !!state.user,
    },
    actions: {
        async login(credentials) {
            // Mock login
            console.log('Login attempt:', credentials)
            this.user = {
                name: 'John Doe',
                email: credentials.email,
                phone: '690123456',
                city: 'Douala',
                school: 'IUT Douala',
            }
            this.token = 'mock-jwt-token'
            this.saveToStorage()
        },
        async register(data) {
            // Mock register
            console.log('Register attempt:', data)
            this.user = { ...data }
            this.token = 'mock-jwt-token'
            this.saveToStorage()
        },
        logout() {
            this.user = null
            this.token = null
            localStorage.removeItem('auth_user')
            localStorage.removeItem('auth_token')
        },
        saveToStorage() {
            localStorage.setItem('auth_user', JSON.stringify(this.user))
            localStorage.setItem('auth_token', this.token)
        }
    }
})
