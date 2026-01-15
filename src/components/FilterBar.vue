<template>
  <div class="flex items-center gap-2 overflow-x-auto pb-4 no-scrollbar">
    <button 
      v-for="filter in types" 
      :key="filter"
      @click="setType(filter)"
      class="whitespace-nowrap px-6 py-2 rounded-full font-medium transition-all text-sm border"
      :class="housing.filters.type === filter 
        ? 'bg-blue-petrole text-white border-blue-petrole shadow-md' 
        : 'bg-white text-gris-ardoise border-slate-200 hover:border-blue-petrole hover:text-blue-petrole'"
    >
      {{ filter }}
    </button>
  </div>
</template>

<script setup>
import { useHousingStore } from '@/stores/housing'

const housing = useHousingStore()
const types = ['Toutes les offres', 'Chambre', 'Studio', 'Appartement', 'Moins de 50k']

const setType = (type) => {
  if (type === 'Moins de 50k') {
    housing.setFilter('maxPrice', 50000)
    housing.setFilter('type', 'Toutes les offres')
  } else {
    housing.setFilter('maxPrice', null)
    housing.setFilter('type', type)
  }
}
</script>

<style scoped>
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
