<template>
  <!-- Overlay for mobile -->
  <div 
    v-if="ui.isSidebarOpen" 
    class="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
    @click="ui.closeSidebar"
  ></div>

  <aside 
    class="fixed inset-y-0 left-0 w-64 bg-white border-r border-slate-100 z-50 transform transition-transform duration-300 lg:translate-x-0 lg:static lg:inset-auto"
    :class="ui.isSidebarOpen ? 'translate-x-0' : '-translate-x-full'"
  >
    <div class="h-full flex flex-col p-6">
      <div class="flex items-center gap-2 mb-10">
        <div class="w-8 h-8 bg-blue-petrole rounded-lg flex items-center justify-center text-white font-bold text-lg">T</div>
        <span class="text-2xl font-bold text-blue-petrole">Ta Piol</span>
      </div>

      <nav class="flex-1 space-y-2">
        <router-link 
          v-for="item in navItems" 
          :key="item.to"
          :to="item.to"
          @click="ui.closeSidebar"
          class="flex items-center gap-3 px-4 py-3 rounded-xl transition-colors font-medium"
          :class="$route.path === item.to ? 'bg-blue-petrole text-white' : 'text-gris-ardoise hover:bg-slate-50 hover:text-blue-petrole'"
        >
          <component :is="item.icon" :size="20" />
          {{ item.label }}
        </router-link>
      </nav>

      <div class="mt-auto space-y-4">
        <button 
          class="w-full bg-orange-corail/10 text-orange-corail px-4 py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-orange-corail hover:text-white transition-all shadow-sm"
        >
          <span>✨ Devenir Bailleur</span>
        </button>

        <button 
          @click="handleLogout"
          class="flex items-center gap-3 px-4 py-3 rounded-xl w-full text-gris-ardoise hover:bg-red-50 hover:text-red-500 transition-colors font-medium"
        >
          <LogOutIcon :size="20" />
          Déconnexion
        </button>
      </div>
    </div>
  </aside>
</template>

<script setup>
import { 
  Home as HomeIcon, 
  Heart as HeartIcon, 
  Calendar as CalendarIcon, 
  User as UserIcon, 
  LogOut as LogOutIcon 
} from 'lucide-vue-next'
import { useUiStore } from '@/stores/ui'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'

const ui = useUiStore()
const auth = useAuthStore()
const router = useRouter()

const navItems = [
  { to: '/', label: 'Explorer', icon: HomeIcon },
  { to: '/favorites', label: 'Mes Favoris', icon: HeartIcon },
  { to: '/appointments', label: 'Mes Rendez-vous', icon: CalendarIcon },
  { to: '/profile', label: 'Mon Profil', icon: UserIcon },
]

const handleLogout = () => {
  auth.logout()
  router.push('/login')
}
</script>
