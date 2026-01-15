<template>
  <div class="space-y-8 max-w-7xl mx-auto">
    <!-- Header Hero -->
    <div class="bg-blue-petrole p-8 md:p-12 rounded-3xl text-white relative overflow-hidden shadow-xl shadow-blue-petrole/10">
      <div class="relative z-10 max-w-2xl">
        <h2 class="text-3xl md:text-4xl font-bold mb-4">Trouve la piol parfaite pour tes études</h2>
        <p class="text-blue-100 text-lg mb-8">Plus de 500 logements vérifiés à Douala et Yaoundé pour les étudiants.</p>
        
        <div class="flex flex-col sm:flex-row gap-4">
          <button 
            @click="housing.setFilter('city', 'Douala')"
            class="px-6 py-3 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-xl font-bold border border-white/20 transition-all flex items-center justify-center gap-2"
            :class="housing.filters.city === 'Douala' ? 'bg-white text-blue-petrole' : ''"
          >
            📍 Douala
          </button>
          <button 
            @click="housing.setFilter('city', 'Yaoundé')"
            class="px-6 py-3 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-xl font-bold border border-white/20 transition-all flex items-center justify-center gap-2"
            :class="housing.filters.city === 'Yaoundé' ? 'bg-white text-blue-petrole' : ''"
          >
            📍 Yaoundé
          </button>
          <button 
            v-if="housing.filters.city"
            @click="housing.setFilter('city', null)"
            class="px-6 py-3 text-sm font-medium hover:underline"
          >
            Voir tout le Cameroun
          </button>
        </div>
      </div>
      
      <!-- Decorative element -->
      <div class="absolute -right-20 -bottom-20 w-80 h-80 bg-orange-corail/20 rounded-full blur-3xl"></div>
    </div>

    <!-- Filters -->
    <section>
      <div class="flex items-center justify-between mb-6">
        <h3 class="text-xl font-bold text-blue-petrole">Parcourir les offres</h3>
        <span class="text-sm font-medium text-gris-ardoise">{{ housing.filteredHousings.length }} résultats trouvés</span>
      </div>
      <FilterBar />
    </section>

    <!-- Listings Grid -->
    <section v-if="housing.filteredHousings.length > 0">
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <HousingCard 
          v-for="item in housing.filteredHousings" 
          :key="item.id" 
          :item="item" 
        />
      </div>
    </section>

    <!-- Empty State -->
    <section v-else class="flex flex-col items-center justify-center py-20 text-center">
      <div class="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center text-slate-400 mb-6">
        <SearchIcon :size="40" />
      </div>
      <h4 class="text-xl font-bold text-blue-petrole mb-2">Aucun logement trouvé</h4>
      <p class="text-gris-ardoise max-w-xs mx-auto">Essayez de modifier vos filtres ou de rechercher dans une autre ville.</p>
      <button 
        @click="resetFilters" 
        class="mt-6 text-orange-corail font-bold hover:underline"
      >
        Réinitialiser tous les filtres
      </button>
    </section>
  </div>
</template>

<script setup>
import { Search as SearchIcon } from 'lucide-vue-next'
import HousingCard from '@/components/HousingCard.vue'
import FilterBar from '@/components/FilterBar.vue'
import { useHousingStore } from '@/stores/housing'

const housing = useHousingStore()

const resetFilters = () => {
  housing.filters = {
    search: '',
    type: 'Toutes les offres',
    maxPrice: null,
    city: null,
  }
}
</script>
