<template>
  <div class="min-h-screen w-screen bg-surface-50 dark:bg-surface-950 flex items-center justify-center p-4">
    <Toast />
    <router-view />
  </div>
</template>

<script setup lang="ts">
import Toast from 'primevue/toast';
</script>
