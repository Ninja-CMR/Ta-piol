<template>
  <div class="max-w-4xl mx-auto">
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-blue-petrole mb-2">Ajouter un nouveau bien</h1>
      <p class="text-gris-ardoise">Remplissez les détails de votre logement pour attirer des étudiants.</p>
    </div>

    <form @submit.prevent="submitProperty" class="bg-white rounded-3xl border border-slate-100 shadow-sm p-8 space-y-8">
      
      <!-- Type et Prix -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label class="block text-sm font-bold text-blue-petrole mb-2">Type de logement</label>
          <select v-model="form.type" class="input-field" required>
            <option value="chambre">Chambre simple</option>
            <option value="studio">Studio moderne</option>
            <option value="appartement">Appartement</option>
          </select>
        </div>
        <div>
          <label class="block text-sm font-bold text-blue-petrole mb-2">Prix mensuel (FCFA)</label>
          <input v-model.number="form.price" type="number" class="input-field" placeholder="Ex: 25000" required>
        </div>
      </div>

      <!-- Informations de base -->
      <div>
        <label class="block text-sm font-bold text-blue-petrole mb-2">Titre de l'annonce</label>
        <input v-model="form.name" type="text" class="input-field" placeholder="Ex: Studio climatisé près de l'université" required>
      </div>

      <div>
        <label class="block text-sm font-bold text-blue-petrole mb-2">Description complète</label>
        <textarea v-model="form.description" rows="4" class="input-field" placeholder="Décrivez les atouts de votre logement..." required></textarea>
      </div>

      <!-- Localisation -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label class="block text-sm font-bold text-blue-petrole mb-2">Quartier</label>
          <input v-model="form.district" type="text" class="input-field" placeholder="Ex: Bonamoussadi" required>
        </div>
        <div>
          <label class="block text-sm font-bold text-blue-petrole mb-2">Ville</label>
          <select v-model="form.city" class="input-field" required>
            <option value="Douala">Douala</option>
            <option value="Yaoundé">Yaoundé</option>
            <option value="Dschang">Dschang</option>
          </select>
        </div>
      </div>

      <!-- Images (Simulation par URL pour l'instant) -->
      <div>
        <label class="block text-sm font-bold text-blue-petrole mb-2">Image de couverture (URL)</label>
        <div class="flex gap-4">
             <input v-model="imageUrlInput" type="url" class="input-field flex-1" placeholder="https://example.com/image.jpg">
             <button type="button" @click="addImage" class="btn-primary px-6">Ajouter</button>
        </div>
        
        <!-- Preview -->
        <div v-if="form.images.length" class="mt-4 grid grid-cols-4 gap-4">
            <div v-for="(img, index) in form.images" :key="index" class="relative aspect-square rounded-xl overflow-hidden group">
                <img :src="img" class="w-full h-full object-cover">
                <button type="button" @click="removeImage(index)" class="absolute inset-0 bg-black/40 hidden group-hover:flex items-center justify-center text-white">
                    <TrashIcon :size="20"/>
                </button>
            </div>
        </div>
      </div>

      <div class="pt-6 border-t border-slate-50 flex justify-end gap-4">
        <button type="button" @click="$router.back()" class="px-6 py-3 font-bold text-gris-ardoise hover:bg-slate-50 rounded-xl transition-colors">
            Annuler
        </button>
        <button type="submit" class="btn-primary px-8">
            Publier l'annonce
        </button>
      </div>

    </form>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useHostStore } from '@/stores/host'
import { Trash as TrashIcon } from 'lucide-vue-next'

const router = useRouter()
const hostStore = useHostStore()
const imageUrlInput = ref('')

const form = reactive({
  type: 'chambre',
  name: '',
  price: '',
  description: '',
  district: '',
  city: 'Douala',
  images: []
})

const addImage = () => {
    if(imageUrlInput.value) {
        form.images.push(imageUrlInput.value)
        imageUrlInput.value = ''
    }
}

const removeImage = (index) => {
    form.images.splice(index, 1)
}

const submitProperty = async () => {
  // Si pas d'image, on en met une par défaut pour la démo
  if(form.images.length === 0) {
      form.images.push('https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80')
  }
  
  await hostStore.addProperty(form)
  router.push('/host/properties')
}
</script>
