<template>
  <div class="space-y-8 max-w-4xl mx-auto">
    <h1 class="text-3xl font-bold text-blue-petrole">Mes Rendez-vous</h1>

    <div v-if="housing.appointments.length > 0" class="space-y-4">
      <div 
        v-for="appointment in housing.appointments" 
        :key="appointment.id"
        class="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6"
      >
        <div class="flex items-center gap-4">
          <div class="w-12 h-12 bg-blue-petrole/5 rounded-xl flex items-center justify-center text-blue-petrole">
            <CalendarIcon :size="24" />
          </div>
          <div>
            <h3 class="font-bold text-blue-petrole">{{ appointment.housingTitle }}</h3>
            <p class="text-sm text-gris-ardoise">{{ appointment.date }} à {{ appointment.slot }}</p>
          </div>
        </div>

        <div class="flex items-center gap-4">
          <div 
            class="px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider"
            :class="{
              'bg-blue-petrole/10 text-blue-petrole': appointment.status === 'En attente',
              'bg-green-100 text-green-600': appointment.status === 'Confirmé',
              'bg-slate-100 text-slate-400': appointment.status === 'Terminé'
            }"
          >
            {{ appointment.status }}
          </div>
          <router-link :to="`/chambre/${appointment.housingId}`" class="text-sm font-bold text-orange-corail hover:underline">
            Voir le logement
          </router-link>
        </div>
      </div>
    </div>

    <div v-else class="flex flex-col items-center justify-center py-20 text-center bg-white rounded-3xl border border-slate-100 shadow-sm">
      <div class="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center text-slate-300 mb-6">
        <CalendarIcon :size="40" />
      </div>
      <h2 class="text-xl font-bold text-blue-petrole mb-2">Aucun rendez-vous planifié</h2>
      <p class="text-gris-ardoise max-w-xs mx-auto mb-8">Demandez une visite depuis la page d'un logement pour planifier un rendez-vous.</p>
      <router-link to="/" class="btn-primary">
        Trouver un logement
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { Calendar as CalendarIcon } from 'lucide-vue-next'
import { useHousingStore } from '@/stores/housing'

const housing = useHousingStore()
</script>
