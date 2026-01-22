<template>
  <div class="max-w-3xl mx-auto space-y-8">
    <div class="text-center space-y-4">
      <h1 class="text-4xl font-bold text-blue-petrole">Devenir Bailleur</h1>
      <p class="text-gris-ardoise text-lg">Rejoignez notre communauté d'hôtes et commencez à louer vos biens.</p>
    </div>

    <div class="bg-white p-8 rounded-3xl border border-slate-100 shadow-xl">
      <form @submit.prevent="submitForm" class="space-y-6">
        <!-- Informations Personnelles -->
        <div class="space-y-4">
          <h3 class="text-xl font-bold text-blue-petrole border-b pb-2">Informations Personnelles</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label class="block text-sm font-bold text-blue-petrole mb-2">Numéro CNI / Passeport</label>
              <input required v-model="form.idNumber" type="text" class="input-field" placeholder="Ex: 112233445">
            </div>
            <div>
              <label class="block text-sm font-bold text-blue-petrole mb-2">Profession</label>
              <input required v-model="form.job" type="text" class="input-field" placeholder="Ex: Entrepreneur">
            </div>
          </div>
          <div>
            <label class="block text-sm font-bold text-blue-petrole mb-2">Biographie (Présentez-vous rapidement)</label>
            <textarea required v-model="form.bio" rows="3" class="input-field" placeholder="Bonjour, je suis..."></textarea>
          </div>
        </div>

        <!-- Coordonnées de paiement -->
        <div class="space-y-4">
          <h3 class="text-xl font-bold text-blue-petrole border-b pb-2">Paiement</h3>
          <div>
            <label class="block text-sm font-bold text-blue-petrole mb-2">Numéro Mobile Money / Orange Money</label>
            <input required v-model="form.paymentPhone" type="tel" class="input-field" placeholder="6xxxxxxxx">
          </div>
        </div>

        <div class="pt-6">
          <button type="submit" class="btn-primary w-full py-4 text-lg shadow-lg shadow-orange-corail/20">
            Valider et devenir Hôte
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const auth = useAuthStore()

const form = reactive({
  idNumber: '',
  job: '',
  bio: '',
  paymentPhone: ''
})

const submitForm = async () => {
  try {
    await auth.becomeHost(form)
    router.push('/host/dashboard')
  } catch (error) {
    console.error('Erreur lors du passage en mode hôte', error)
  }
}
</script>
