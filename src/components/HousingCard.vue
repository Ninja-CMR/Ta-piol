<template>
  <div class="card group cursor-pointer transition-all hover:shadow-md h-full flex flex-col">
    <div class="relative aspect-[4/3] overflow-hidden">
      <img 
        :src="item.image" 
        :alt="item.title" 
        class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
      >
      <div class="absolute top-3 right-3 bg-blue-petrole text-white px-3 py-1 rounded-lg text-sm font-bold shadow-sm">
        {{ item.price.toLocaleString() }} FCFA
      </div>
      <button 
        @click.stop="toggleFavorite"
        class="absolute top-3 left-3 w-8 h-8 rounded-full flex items-center justify-center transition-all bg-white/80 backdrop-blur-sm hover:bg-white shadow-sm"
        :class="item.isFavorite ? 'text-orange-corail' : 'text-slate-400'"
      >
        <HeartIcon :size="18" :fill="item.isFavorite ? 'currentColor' : 'none'" />
      </button>
    </div>

    <div class="p-4 flex flex-col flex-1">
      <div class="flex items-center gap-1 text-xs font-semibold text-gris-ardoise uppercase tracking-wider mb-2">
        <MapPinIcon :size="12" />
        {{ item.neighborhood }}, {{ item.city }}
      </div>
      
      <h3 class="font-bold text-blue-petrole text-lg mb-2 line-clamp-1 group-hover:text-orange-corail transition-colors">
        {{ item.title }}
      </h3>

      <div class="flex items-center gap-3 text-sm text-slate-500 mb-4">
        <span class="flex items-center gap-1"><ClockIcon :size="14" /> {{ item.distance }}</span>
      </div>

      <div class="flex flex-wrap gap-2 mb-4">
        <span 
          v-for="amenity in item.amenities.slice(0, 2)" 
          :key="amenity"
          class="px-2 py-1 bg-slate-50 text-slate-600 rounded-md text-[10px] uppercase font-bold border border-slate-100"
        >
          {{ amenity }}
        </span>
      </div>

      <div class="mt-auto flex items-center justify-between pt-4 border-t border-slate-50">
        <router-link 
          :to="`/chambre/${item.id}`"
          class="text-sm font-bold text-blue-petrole hover:text-orange-corail transition-colors flex items-center gap-1"
        >
          Voir les détails
          <ChevronRightIcon :size="16" />
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Heart as HeartIcon, MapPin as MapPinIcon, Clock as ClockIcon, ChevronRight as ChevronRightIcon } from 'lucide-vue-next'
import { useHousingStore } from '@/stores/housing'

const props = defineProps(['item'])
const housing = useHousingStore()

const toggleFavorite = () => {
  housing.toggleFavorite(props.item.id)
}
</script>
