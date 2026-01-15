<template>
  <div v-if="housing.currentHousing" class="max-w-4xl mx-auto space-y-8 pb-32">
    <!-- Header with Back -->
    <div class="flex items-center justify-between mb-4">
      <button @click="$router.back()" class="flex items-center gap-2 text-blue-petrole font-bold hover:text-orange-corail transition-colors">
        <ArrowLeftIcon :size="20" />
        Retour
      </button>
      <button 
        @click="housing.toggleFavorite(housing.currentHousing.id)"
        class="flex items-center gap-2 px-4 py-2 bg-white rounded-xl border border-slate-100 shadow-sm font-bold text-blue-petrole"
      >
        <HeartIcon 
          :size="20" 
          :class="housing.currentHousing.isFavorite ? 'text-orange-corail' : 'text-slate-400'"
          :fill="housing.currentHousing.isFavorite ? 'currentColor' : 'none'"
        />
        {{ housing.currentHousing.isFavorite ? 'Favori' : 'Ajouter aux favoris' }}
      </button>
    </div>

    <!-- Image Gallery Mockup -->
    <div class="relative rounded-3xl overflow-hidden aspect-[16/9] md:aspect-[21/9] shadow-lg group">
      <img :src="housing.currentHousing.image" class="w-full h-full object-cover">
      <div class="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
      <div class="absolute bottom-6 left-6 text-white">
        <div class="flex items-center gap-1 text-sm font-bold uppercase tracking-widest opacity-90 mb-2">
          <MapPinIcon :size="14" />
          {{ housing.currentHousing.neighborhood }}, {{ housing.currentHousing.city }}
        </div>
        <h1 class="text-3xl md:text-4xl font-bold">{{ housing.currentHousing.title }}</h1>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <!-- Main Content -->
      <div class="lg:col-span-2 space-y-8">
        <section class="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
          <div class="flex items-center justify-between mb-6">
            <h2 class="text-2xl font-bold text-blue-petrole">Description</h2>
            <div class="text-2xl font-bold text-orange-corail">{{ housing.currentHousing.price.toLocaleString() }} FCFA <span class="text-sm font-medium text-gris-ardoise">/mois</span></div>
          </div>
          <p class="text-gris-ardoise leading-relaxed">
            {{ housing.currentHousing.description }}
          </p>
          <div class="mt-6 flex items-center gap-4 text-blue-petrole font-medium">
            <ClockIcon :size="20" />
            <span>Situé à seulement {{ housing.currentHousing.distance }}</span>
          </div>
        </section>

        <section class="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
          <h2 class="text-xl font-bold text-blue-petrole mb-6">Conformités & Commodités</h2>
          <div class="grid grid-cols-2 gap-4">
            <div 
              v-for="amenity in housing.currentHousing.amenities" 
              :key="amenity"
              class="flex items-center gap-3 text-gris-ardoise"
            >
              <div class="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                <CheckIcon :size="14" />
              </div>
              <span class="font-medium">{{ amenity }}</span>
            </div>
          </div>
        </section>

        <!-- Map Mockup -->
        <section class="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
          <h2 class="text-xl font-bold text-blue-petrole mb-6">Localisation</h2>
          <div class="w-full h-64 bg-slate-100 rounded-xl relative overflow-hidden">
             <!-- Static Map Placeholder -->
             <img src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=800&q=80" class="w-full h-full object-cover grayscale opacity-50">
             <div class="absolute inset-0 flex items-center justify-center">
                <div class="w-12 h-12 bg-blue-petrole rounded-full flex items-center justify-center text-white shadow-lg animate-bounce">
                  <MapPinIcon :size="24" />
                </div>
             </div>
             <div class="absolute bottom-4 left-4 bg-white/90 backdrop-blur-md px-4 py-2 rounded-lg text-xs font-bold text-blue-petrole">
                {{ housing.currentHousing.city }} - {{ housing.currentHousing.neighborhood }}
             </div>
          </div>
        </section>
      </div>

      <!-- Sidebar / Info actions (Desktop) -->
      <div class="space-y-6">
        <div class="bg-blue-petrole text-white p-6 rounded-2xl shadow-xl shadow-blue-petrole/10 h-fit">
          <h3 class="text-xl font-bold mb-4">Intéressé ?</h3>
          <p class="text-blue-100 text-sm mb-6">Le bailleur est généralement disponible entre 9h et 18h pour les visites.</p>
          
          <div class="space-y-4">
            <button class="w-full btn-primary py-4 flex items-center justify-center gap-3 bg-white text-blue-petrole hover:bg-orange-corail hover:text-white border-none shadow-none">
              <PhoneIcon :size="20" />
              Appeler le Bailleur
            </button>
            <router-link 
              :to="`/rendez-vous/${housing.currentHousing.id}`"
              class="w-full btn-primary py-4 flex items-center justify-center gap-3"
            >
              <CalendarIcon :size="20" />
              Demander une Visite
            </router-link>
          </div>
        </div>
      </div>
    </div>

    <!-- Floating Mobile CTA -->
    <div class="fixed bottom-0 left-0 right-0 p-4 bg-white/80 backdrop-blur-lg border-t border-slate-100 flex gap-4 lg:hidden z-30 shadow-[0_-10px_30px_rgba(0,0,0,0.05)]">
      <button class="flex-1 btn-primary py-4 flex items-center justify-center gap-2">
        <PhoneIcon :size="20" />
        Appeler
      </button>
      <router-link 
        :to="`/rendez-vous/${housing.currentHousing.id}`"
        class="flex-1 btn-secondary py-4 flex items-center justify-center gap-2"
      >
        <CalendarIcon :size="20" />
        Visiter
      </router-link>
    </div>
  </div>
  <div v-else class="flex flex-col items-center justify-center py-20">
    <Loader2Icon class="animate-spin text-blue-petrole mb-4" :size="40" />
    <p class="text-gris-ardoise font-bold">Chargement du logement...</p>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { 
  ArrowLeft as ArrowLeftIcon, 
  Heart as HeartIcon, 
  MapPin as MapPinIcon, 
  Clock as ClockIcon, 
  Check as CheckIcon,
  Phone as PhoneIcon,
  Calendar as CalendarIcon,
  Loader2 as Loader2Icon
} from 'lucide-vue-next'
import { useHousingStore } from '@/stores/housing'

const route = useRoute()
const housing = useHousingStore()

onMounted(() => {
  housing.fetchHousingById(route.params.id)
})
</script>
