<template>
  <div class="max-w-2xl mx-auto space-y-8">
    <h1 class="text-3xl font-bold text-blue-petrole">Mon Profil</h1>

    <div class="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm space-y-8">
      <div class="flex items-center gap-6">
        <div class="w-24 h-24 bg-orange-corail/10 rounded-full flex items-center justify-center text-orange-corail text-3xl font-bold">
          {{ auth.user?.name?.charAt(0) || 'U' }}
        </div>
        <div>
          <h2 class="text-xl font-bold text-blue-petrole">{{ auth.user?.name }}</h2>
          <p class="text-gris-ardoise">{{ auth.user?.email }}</p>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label class="block text-sm font-bold text-blue-petrole mb-2">Nom Complet</label>
          <input type="text" v-model="form.name" class="input-field">
        </div>
        <div>
          <label class="block text-sm font-bold text-blue-petrole mb-2">Email</label>
          <input type="email" v-model="form.email" class="input-field">
        </div>
        <div>
          <label class="block text-sm font-bold text-blue-petrole mb-2">Téléphone</label>
          <input type="tel" v-model="form.phone" class="input-field">
        </div>
        <div>
          <label class="block text-sm font-bold text-blue-petrole mb-2">Ville</label>
          <select v-model="form.city" class="input-field">
            <option value="Douala">Douala</option>
            <option value="Yaoundé">Yaoundé</option>
          </select>
        </div>
        <div class="md:col-span-2">
          <label class="block text-sm font-bold text-blue-petrole mb-2">Université / École</label>
          <input type="text" v-model="form.school" class="input-field">
        </div>
      </div>

      <div class="pt-6 border-t border-slate-50">
        <button @click="saveProfile" class="btn-primary w-full md:w-auto px-12 shadow-lg shadow-orange-corail/20">
          Enregistrer les modifications
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import { useAuthStore } from '@/stores/auth'

const auth = useAuthStore()

const form = reactive({
  name: auth.user?.name || '',
  email: auth.user?.email || '',
  phone: auth.user?.phone || '',
  city: auth.user?.city || 'Douala',
  school: auth.user?.school || ''
})

const saveProfile = () => {
  auth.user = { ...auth.user, ...form }
  alert('Profil mis à jour avec succès !')
}
</script>
