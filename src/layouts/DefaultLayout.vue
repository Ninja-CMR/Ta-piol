<template>
  <div class="min-h-screen flex flex-col lg:flex-row bg-blanc-casse">
    <Sidebar />
    <div class="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
      <Navbar />
      <main class="flex-1 overflow-y-auto p-4 md:p-8">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script setup>
import Navbar from '@/components/Navbar.vue'
import Sidebar from '@/components/Sidebar.vue'
</script>
