import { defineStore } from 'pinia'

export const useHostStore = defineStore('host', {
    state: () => ({
        properties: JSON.parse(localStorage.getItem('host_properties')) || [],
        appointments: JSON.parse(localStorage.getItem('host_appointments')) || [],
    }),
    getters: {
        getPropertyById: (state) => (id) => state.properties.find(p => p.id === id),
        getPendingAppointments: (state) => state.appointments.filter(a => a.status === 'pending'),
    },
    actions: {
        addProperty(propertyData) {
            const newProperty = {
                id: Date.now().toString(),
                ...propertyData,
                createdAt: new Date().toISOString(),
                status: 'published'
            }
            this.properties.push(newProperty)
            this.saveToStorage()
            return newProperty
        },
        updateProperty(id, updates) {
            const index = this.properties.findIndex(p => p.id === id)
            if (index !== -1) {
                this.properties[index] = { ...this.properties[index], ...updates }
                this.saveToStorage()
            }
        },
        deleteProperty(id) {
            this.properties = this.properties.filter(p => p.id !== id)
            this.saveToStorage()
        },
        respondToAppointment(appointmentId, status) {
            const index = this.appointments.findIndex(a => a.id === appointmentId)
            if (index !== -1) {
                this.appointments[index].status = status
                this.saveToStorage()
            }
        },
        // Simulation réception demande rdv
        addAppointmentRequest(request) {
            this.appointments.unshift({
                id: 'appt-' + Date.now(),
                status: 'pending',
                createdAt: new Date().toISOString(),
                ...request
            })
            this.saveToStorage()
        },
        saveToStorage() {
            localStorage.setItem('host_properties', JSON.stringify(this.properties))
            localStorage.setItem('host_appointments', JSON.stringify(this.appointments))
        }
    }
})
