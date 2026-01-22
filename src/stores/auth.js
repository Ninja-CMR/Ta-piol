import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: JSON.parse(localStorage.getItem('auth_user')) || null,
        token: localStorage.getItem('auth_token') || null,
        // role peut être 'student' ou 'host'
        currentRole: localStorage.getItem('auth_current_role') || 'student'
    }),
    getters: {
        isAuthenticated: (state) => !!state.user,
        isHost: (state) => state.user?.role === 'host',
    },
    actions: {
        async login(credentials) {
            console.log('Login attempt:', credentials)
            this.user = {
                name: 'John Doe',
                email: credentials.email,
                phone: '690123456',
                city: 'Douala',
                school: 'IUT Douala',
                role: 'student' // par défaut
            }
            this.token = 'mock-jwt-token'
            this.saveToStorage()
        },
        async register(data) {
            console.log('Register attempt:', data)
            this.user = {
                ...data,
                role: 'student'
            }
            this.token = 'mock-jwt-token'
            this.saveToStorage()
        },

        async becomeHost(hostData) {
            // Mise à jour du profil utilisateur avec le rôle host
            this.user = {
                ...this.user,
                role: 'host',
                hostDetails: hostData
            }
            this.currentRole = 'host'
            this.saveToStorage()
        },
        switchRole(role) {
            if (this.user?.role === 'host' || role === 'student') {
                this.currentRole = role
                localStorage.setItem('auth_current_role', role)
            }
        },
        updateProfile(updatedData) {
            this.user = { ...this.user, ...updatedData }
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
            localStorage.setItem('auth_current_role', this.currentRole)
        }
    }
})