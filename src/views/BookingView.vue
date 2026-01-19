<template>
  <div v-if="housing.currentHousing" class="max-w-xl mx-auto space-y-8">
    <div class="flex items-center gap-4 mb-4">
      <button @click="$router.back()" class="p-2 hover:bg-slate-100 rounded-full transition-colors">
        <ArrowLeftIcon :size="24" class="text-blue-petrole" />
      </button>
      <div>
        <h1 class="text-2xl font-bold text-blue-petrole">Demander un rendez-vous</h1>
        <p class="text-gris-ardoise">Pour {{ housing.currentHousing.title }}</p>
      </div>
    </div>

    <div class="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm space-y-8">
      <!-- Date Selector -->
      <div>
        <label class="block text-sm font-bold text-blue-petrole mb-4">Choisir une date</label>
        <div class="grid grid-cols-4 gap-2">
          <button 
            v-for="date in nextDays" 
            :key="date.toISOString()"
            @click="form.date = date"
            class="flex flex-col items-center p-3 rounded-2xl border transition-all"
            :class="form.date?.toDateString() === date.toDateString() 
              ? 'bg-blue-petrole text-white border-blue-petrole shadow-md shadow-blue-petrole/20' 
              : 'bg-slate-50 border-transparent text-gris-ardoise hover:border-blue-petrole/30'"
          >
            <span class="text-[10px] uppercase font-bold opacity-70">{{ date.toLocaleDateString('fr-FR', { weekday: 'short' }) }}</span>
            <span class="text-lg font-bold">{{ date.getDate() }}</span>
          </button>
        </div>
      </div>

      <!-- Time Selector -->
      <div>
        <label class="block text-sm font-bold text-blue-petrole mb-4">Créneau horaire</label>
        <div class="grid grid-cols-2 gap-3">
          <button 
            v-for="slot in timeSlots" 
            :key="slot"
            @click="form.slot = slot"
            class="py-3 rounded-xl border font-bold transition-all text-sm"
            :class="form.slot === slot 
              ? 'bg-blue-petrole text-white border-blue-petrole shadow-md shadow-blue-petrole/20' 
              : 'bg-slate-50 border-transparent text-gris-ardoise hover:border-blue-petrole/30'"
          >
            {{ slot }}
          </button>
        </div>
      </div>

      <!-- Message -->
      <div>
        <label class="block text-sm font-bold text-blue-petrole mb-2">Message pour le bailleur (facultatif)</label>
        <textarea 
          v-model="form.message"
          rows="4" 
          class="input-field resize-none"
          placeholder="Ex: Je souhaiterais savoir si le logement est disponible immédiatement..."
        ></textarea>
      </div>

      <button 
        @click="submitRequest"
        :disabled="!form.date || !form.slot"
        class="w-full btn-primary py-4 disabled:opacity-50 disabled:cursor-not-allowed shadow-xl shadow-orange-corail/20"
      >
        Envoyer la demande
      </button>
    </div>
  </div>
  <div v-if="showSuccessModal" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-blue-petrole/40 backdrop-blur-sm">
  <div class="bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl transform transition-all text-center">
    <div class="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6 text-4xl">
      <CheckIcon />
    </div>
    <h3 class="text-2xl font-bold text-blue-petrole mb-2">Demande envoyée !</h3>
    <p class="text-gris-ardoise mb-8">
      Votre rendez-vous pour <strong>{{ housing.currentHousing?.title }}</strong> a bien été enregistré.
    </p>
    <button 
      @click="confirmAndRedirect"
      class="w-full btn-primary py-3 shadow-lg shadow-orange-corail/30"
    >
      Voir mes rendez-vous
    </button>
  </div>
</div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ArrowLeft as ArrowLeftIcon } from 'lucide-vue-next'
import { useHousingStore } from '@/stores/housing'
import { CheckIcon } from 'lucide-vue-next'
const route = useRoute()
const router = useRouter()
const housing = useHousingStore()

onMounted(() => {
  housing.fetchHousingById(route.params.id)
})

const form = reactive({
  date: null,
  slot: null,
  message: ''
})

const timeSlots = ['09:00 - 10:00', '10:00 - 11:00', '14:00 - 15:00', '15:00 - 16:00', '16:00 - 17:00']

const nextDays = computed(() => {
  const days = []
  for (let i = 1; i <= 8; i++) {
    const d = new Date()
    d.setDate(d.getDate() + i)
    days.push(d)
  }
  return days
})
const showSuccessModal = ref(false)

const submitRequest = () => {
  housing.addAppointment({
    housingId: housing.currentHousing.id,
    housingTitle: housing.currentHousing.title,
    date: form.date.toLocaleDateString('fr-FR'),
    slot: form.slot,
    message: form.message
  })
  showSuccessModal.value = true
}
const confirmAndRedirect = () => {
  showSuccessModal.value = false
  router.push('/appointments')
}
</script>
