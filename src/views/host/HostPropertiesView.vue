<template>
  <div class="space-y-8">
    <div class="flex items-center justify-between">
      <h1 class="text-3xl font-bold text-blue-petrole">Mes Biens Immobiliers</h1>
      <router-link to="/host/properties/new" class="btn-primary flex items-center gap-2">
        <PlusIcon :size="20" />
        Ajouter un bien
      </router-link>
    </div>

    <div v-if="properties.length === 0" class="text-center py-16 bg-white rounded-3xl border border-slate-100">
      <div class="bg-blue-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 text-blue-petrole">
        <HomeIcon :size="40" />
      </div>
      <h3 class="text-xl font-bold text-blue-petrole mb-2">Aucun bien publié</h3>
      <p class="text-gris-ardoise mb-6 max-w-md mx-auto">Vous n'avez pas encore ajouté de logement. Commencez dès maintenant pour recevoir des demandes.</p>
      <router-link to="/host/properties/new" class="btn-primary inline-flex items-center gap-2">
        <PlusIcon :size="20" />
        Publier ma première annonce
      </router-link>
    </div>

    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div v-for="property in properties" :key="property.id" class="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden group hover:shadow-md transition-all">
        <div class="aspect-[4/3] bg-slate-100 relative">
          <img v-if="property.images && property.images.length" :src="property.images[0]" class="w-full h-full object-cover">
          <div v-else class="w-full h-full flex items-center justify-center text-gris-ardoise">
            <ImageIcon :size="40" opacity="0.5" />
          </div>
          <div class="absolute top-3 right-3 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-sm font-bold text-blue-petrole">
            {{ formatPrice(property.price) }} FCFA
          </div>
        </div>
        
        <div class="p-5">
          <div class="flex justify-between items-start mb-2">
            <h3 class="font-bold text-blue-petrole text-lg line-clamp-1">{{ property.name }}</h3>
          </div>
          <p class="text-gris-ardoise text-sm mb-4 line-clamp-2">{{ property.description }}</p>
          
          <div class="flex items-center gap-2 text-sm text-gris-ardoise mb-4">
             <MapPinIcon :size="16" />
             <span>{{ property.district || 'Non spécifié' }}</span>
          </div>

          <div class="flex gap-2 pt-4 border-t border-slate-50">
            <button class="flex-1 py-2 text-blue-petrole font-medium hover:bg-slate-50 rounded-lg transition-colors flex justify-center items-center gap-2">
              <EditIcon :size="16" /> Modifier
            </button>
             <button @click="deleteProperty(property.id)" class="flex-1 py-2 text-red-500 font-medium hover:bg-red-50 rounded-lg transition-colors flex justify-center items-center gap-2">
              <TrashIcon :size="16" /> Supprimer
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useHostStore } from '@/stores/host'
import { PlusIcon, HomeIcon, Image as ImageIcon, MapPinIcon, Edit as EditIcon, Trash as TrashIcon } from 'lucide-vue-next'

const hostStore = useHostStore()
const properties = computed(() => hostStore.properties)

const formatPrice = (price) => {
  return new Intl.NumberFormat('fr-CM').format(price)
}

const deleteProperty = (id) => {
  if(confirm('Êtes-vous sûr de vouloir supprimer ce bien ?')) {
    hostStore.deleteProperty(id)
  }
}
</script>
