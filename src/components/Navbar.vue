<template>
  <nav class="bg-white border-b border-slate-100 px-4 py-3 flex items-center justify-between sticky top-0 z-40">
    <div class="flex items-center gap-4">
      <button @click="ui.toggleSidebar" class="p-2 lg:hidden text-blue-petrole">
        <MenuIcon :size="24" />
      </button>
      <router-link to="/" class="flex items-center gap-2">
        <div class="w-8 h-8 bg-blue-petrole rounded-lg flex items-center justify-center text-white font-bold">T</div>
        <span class="text-xl font-bold text-blue-petrole hidden sm:block">Ta Piol</span>
      </router-link>
    </div>

    <div class="flex-1 max-w-xl mx-8 hidden md:block">
      <div class="relative">
        <SearchIcon class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" :size="20" />
        <input 
          type="text" 
          placeholder="Rechercher par quartier ou école..." 
          class="input-field pl-10 h-10 py-0"
          v-model="housing.filters.search"
        >
      </div>
    </div>

    <div class="flex items-center gap-4">
      <router-link to="/profile" class="flex items-center gap-2 text-blue-petrole font-medium">
        <UserIcon :size="20" />
        <span class="hidden sm:block">{{ auth.user?.name || 'Profil' }}</span>
      </router-link>
    </div>
  </nav>
</template>

<script setup>
import { Menu as MenuIcon, Search as SearchIcon, User as UserIcon } from 'lucide-vue-next'
import { useUiStore } from '@/stores/ui'
import { useAuthStore } from '@/stores/auth'
import { useHousingStore } from '@/stores/housing'

const ui = useUiStore()
const auth = useAuthStore()
const housing = useHousingStore()
</script>
