<template>
  <div class="space-y-8">
    <div class="flex items-center justify-between">
      <h1 class="text-3xl font-bold text-blue-petrole">Tableau de Bord Bailleur</h1>
      <router-link to="/host/properties/new" class="btn-primary flex items-center gap-2">
        <PlusIcon :size="20" />
        Ajouter un bien
      </router-link>
    </div>

    <!-- Stats Cards -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div class="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
        <div class="flex items-center gap-4 mb-2">
          <div class="p-3 bg-blue-50 text-blue-petrole rounded-xl">
            <HomeIcon :size="24" />
          </div>
          <span class="text-gris-ardoise font-medium">Mes Biens</span>
        </div>
        <p class="text-3xl font-bold text-blue-petrole">{{ properties.length }}</p>
      </div>
      
      <div class="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
        <div class="flex items-center gap-4 mb-2">
          <div class="p-3 bg-orange-50 text-orange-corail rounded-xl">
            <CalendarIcon :size="24" />
          </div>
          <span class="text-gris-ardoise font-medium">Demandes en attente</span>
        </div>
        <p class="text-3xl font-bold text-blue-petrole">{{ pendingAppointments.length }}</p>
      </div>

       <div class="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
        <div class="flex items-center gap-4 mb-2">
          <div class="p-3 bg-green-50 text-green-600 rounded-xl">
            <CheckCircleIcon :size="24" />
          </div>
          <span class="text-gris-ardoise font-medium">RDV Confirmés</span>
        </div>
        <p class="text-3xl font-bold text-blue-petrole">{{ confirmedAppointmentsCount }}</p>
      </div>
    </div>

    <!-- Recent Activity / Links -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div class="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
        <h3 class="text-xl font-bold text-blue-petrole mb-4">Actions Rapides</h3>
        <div class="space-y-3">
          <router-link to="/host/properties" class="flex items-center justify-between p-4 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors group">
            <span class="font-medium text-blue-petrole">Gérer mes annonces</span>
            <ChevronRightIcon :size="20" class="text-gris-ardoise group-hover:text-blue-petrole transition-colors"/>
          </router-link>
          <router-link to="/host/appointments" class="flex items-center justify-between p-4 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors group">
            <span class="font-medium text-blue-petrole">Voir les rendez-vous</span>
             <ChevronRightIcon :size="20" class="text-gris-ardoise group-hover:text-blue-petrole transition-colors"/>
          </router-link>
        </div>
      </div>

       <div class="bg-blue-petrole p-6 rounded-2xl shadow-lg text-white">
        <h3 class="text-xl font-bold mb-2">Conseil Pro</h3>
        <p class="opacity-90 leading-relaxed">
          Pour maximiser vos demandes de visites, ajoutez au moins 5 photos de haute qualité pour chaque logement et indiquez clairement les équipements disponibles (Wifi, Eau, etc.).
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useHostStore } from '@/stores/host'
import { PlusIcon, HomeIcon, CalendarIcon, CheckCircleIcon, ChevronRightIcon } from 'lucide-vue-next'

const hostStore = useHostStore()
const properties = computed(() => hostStore.properties)
const pendingAppointments = computed(() => hostStore.getPendingAppointments)
const confirmedAppointmentsCount = computed(() => hostStore.appointments.filter(a => a.status === 'confirmed').length)

</script>
