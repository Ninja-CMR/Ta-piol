<template>
  <div class="space-y-8">
    <h1 class="text-3xl font-bold text-blue-petrole">Gestion des Rendez-vous</h1>

    <div class="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
      <div v-if="appointments.length === 0" class="p-12 text-center text-gris-ardoise">
        <div class="bg-slate-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-400">
            <CalendarIcon :size="32"/>
        </div>
        <p>Aucune demande de rendez-vous pour le moment.</p>
      </div>
      
      <div v-else class="divide-y divide-slate-50">
        <div v-for="appt in appointments" :key="appt.id" class="p-6 hover:bg-slate-50 transition-colors">
          <div class="flex flex-col md:flex-row justify-between md:items-center gap-4">
            
            <div class="flex items-start gap-4">
                <div class="w-12 h-12 bg-blue-petrole/10 text-blue-petrole rounded-full flex items-center justify-center font-bold text-lg">
                    {{ appt.userName?.charAt(0) || 'U' }}
                </div>
                <div>
                    <h3 class="font-bold text-blue-petrole">{{ appt.userName || 'Utilisateur inconnu' }}</h3>
                    <p class="text-sm text-gris-ardoise">Souhaite visiter <span class="font-medium text-blue-petrole">{{ appt.propertyName }}</span></p>
                    <div class="flex items-center gap-2 mt-2 text-sm text-gris-ardoise">
                        <CalendarIcon :size="14"/>
                        <!-- Simulation date -->
                        <span>{{ new Date(appt.date).toLocaleDateString() }} à {{ appt.time }}</span>
                    </div>
                </div>
            </div>

            <div class="flex items-center gap-3" v-if="appt.status === 'pending'">
              <button @click="updateStatus(appt.id, 'rejected')" class="px-4 py-2 text-sm font-bold text-red-500 bg-red-50 rounded-lg hover:bg-red-100 transition-colors">
                Refuser
              </button>
              <button @click="updateStatus(appt.id, 'confirmed')" class="px-4 py-2 text-sm font-bold text-green-600 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
                Accepter
              </button>
            </div>
             <div v-else>
                <span v-if="appt.status === 'confirmed'" class="px-3 py-1 bg-green-100 text-green-700 text-sm font-bold rounded-full">Confirmé</span>
                <span v-if="appt.status === 'rejected'" class="px-3 py-1 bg-red-100 text-red-700 text-sm font-bold rounded-full">Refusé</span>
            </div>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useHostStore } from '@/stores/host'
import { CalendarIcon } from 'lucide-vue-next'

const hostStore = useHostStore()
const appointments = computed(() => hostStore.appointments)

const updateStatus = (id, status) => {
    hostStore.respondToAppointment(id, status)
}
</script>
