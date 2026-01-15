<template>
  <div class="w-full max-w-md bg-white rounded-3xl shadow-xl shadow-blue-petrole/5 p-8 border border-white">
    <div class="flex flex-col items-center mb-10">
      <div class="w-16 h-16 bg-blue-petrole rounded-2xl flex items-center justify-center text-white text-3xl font-bold mb-4 shadow-lg shadow-blue-petrole/20">T</div>
      <h1 class="text-3xl font-bold text-blue-petrole">Ta Piol</h1>
      <p class="text-gris-ardoise mt-2">Trouve ton chez-toi étudiant au Cameroun</p>
    </div>

    <!-- Tabs -->
    <div class="flex p-1 bg-slate-50 rounded-2xl mb-8">
      <button 
        @click="mode = 'login'"
        class="flex-1 py-3 rounded-xl font-bold transition-all"
        :class="mode === 'login' ? 'bg-white text-blue-petrole shadow-sm' : 'text-gris-ardoise hover:text-blue-petrole'"
      >
        Connexion
      </button>
      <button 
        @click="mode = 'register'"
        class="flex-1 py-3 rounded-xl font-bold transition-all"
        :class="mode === 'register' ? 'bg-white text-blue-petrole shadow-sm' : 'text-gris-ardoise hover:text-blue-petrole'"
      >
        Inscription
      </button>
    </div>

    <!-- Forms -->
    <form @submit.prevent="handleSubmit" class="space-y-5">
      <div v-if="mode === 'register'" class="space-y-5">
        <div>
          <label class="block text-sm font-bold text-blue-petrole mb-2 ml-1">Nom Complet</label>
          <input type="text" v-model="form.name" class="input-field" placeholder="Ex: Jean Dieudonné" required>
        </div>
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-bold text-blue-petrole mb-2 ml-1">Ville</label>
            <select v-model="form.city" class="input-field">
              <option value="Douala">Douala</option>
              <option value="Yaoundé">Yaoundé</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-bold text-blue-petrole mb-2 ml-1">Téléphone</label>
            <input type="tel" v-model="form.phone" class="input-field" placeholder="6..." required>
          </div>
        </div>
        <div>
          <label class="block text-sm font-bold text-blue-petrole mb-2 ml-1">Université / École</label>
          <input type="text" v-model="form.school" class="input-field" placeholder="Ex: IUT de Douala" required>
        </div>
      </div>

      <div>
        <label class="block text-sm font-bold text-blue-petrole mb-2 ml-1">Email</label>
        <div class="relative">
          <MailIcon class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" :size="18" />
          <input type="email" v-model="form.email" class="input-field pl-12" placeholder="etudiant@domaine.com" required>
        </div>
      </div>

      <div>
        <label class="block text-sm font-bold text-blue-petrole mb-2 ml-1">Mot de passe</label>
        <div class="relative">
          <LockIcon class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" :size="18" />
          <input type="password" v-model="form.password" class="input-field pl-12" placeholder="••••••••" required>
        </div>
        <div v-if="mode === 'login'" class="text-right mt-2">
          <a href="#" class="text-xs font-bold text-orange-corail hover:underline">Mot de passe oublié ?</a>
        </div>
      </div>

      <div v-if="mode === 'register'">
        <label class="block text-sm font-bold text-blue-petrole mb-2 ml-1">Confirmer le mot de passe</label>
        <div class="relative">
          <LockIcon class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" :size="18" />
          <input type="password" v-model="form.confirmPassword" class="input-field pl-12" placeholder="••••••••" required>
        </div>
      </div>

      <button type="submit" class="w-full btn-primary py-4 text-lg mt-4 shadow-lg shadow-orange-corail/20">
        {{ mode === 'login' ? 'Se connecter' : 'Créer mon compte' }}
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { Mail as MailIcon, Lock as LockIcon } from 'lucide-vue-next'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'

const mode = ref('login')
const auth = useAuthStore()
const router = useRouter()

const form = reactive({
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
  phone: '',
  city: 'Douala',
  school: ''
})

const handleSubmit = async () => {
  if (mode.value === 'login') {
    await auth.login({ email: form.email, password: form.password })
  } else {
    if (form.password !== form.confirmPassword) {
      alert('Les mots de passe ne correspondent pas')
      return
    }
    await auth.register({ ...form })
  }
  router.push('/')
}
</script>
