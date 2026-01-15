<template>
  <div class="space-y-8 max-w-7xl mx-auto">
    <div class="flex items-center justify-between">
      <h1 class="text-3xl font-bold text-blue-petrole">Mes Favoris</h1>
      <span class="text-sm font-medium text-gris-ardoise">{{ housing.favoritedHousings.length }} logements enregistrés</span>
    </div>

    <div v-if="housing.favoritedHousings.length > 0" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      <HousingCard 
        v-for="item in housing.favoritedHousings" 
        :key="item.id" 
        :item="item" 
      />
    </div>

    <div v-else class="flex flex-col items-center justify-center py-20 text-center bg-white rounded-3xl border border-slate-100 shadow-sm">
      <div class="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center text-slate-300 mb-6 font-bold text-4xl">❤️</div>
      <h2 class="text-xl font-bold text-blue-petrole mb-2">Aucun favori pour le moment</h2>
      <p class="text-gris-ardoise max-w-xs mx-auto mb-8">Parcourez les offres et cliquez sur le cœur pour les retrouver ici.</p>
      <router-link to="/" class="btn-primary">
        Explorer les offres
      </router-link>
    </div>
  </div>
</template>

<script setup>
import HousingCard from '@/components/HousingCard.vue'
import { useHousingStore } from '@/stores/housing'

const housing = useHousingStore()
</script>
