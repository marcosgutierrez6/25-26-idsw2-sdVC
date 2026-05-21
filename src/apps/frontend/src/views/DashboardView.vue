<template>
  <div>
    <h1>Dashboard</h1>
    <div class="grid">
      <Card v-for="item in stats" :key="item.label">
        <template #title>{{ item.label }}</template>
        <template #content>
          <span class="text-4xl font-bold">{{ item.count }}</span>
        </template>
      </Card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import Card from 'primevue/card';
import api from '../api/axios';

interface StatItem {
  label: string;
  count: number;
}

const stats = ref<StatItem[]>([]);

onMounted(async () => {
  try {
    const [grados, asignaturas, alumnos, preguntas, examenes] = await Promise.all([
      api.get('/grados'),
      api.get('/asignaturas'),
      api.get('/alumnos'),
      api.get('/preguntas'),
      api.get('/examenes'),
    ]);
    stats.value = [
      { label: 'Grados', count: grados.data.length },
      { label: 'Asignaturas', count: asignaturas.data.length },
      { label: 'Alumnos', count: alumnos.data.length },
      { label: 'Preguntas', count: preguntas.data.length },
      { label: 'Exámenes', count: examenes.data.length },
    ];
  } catch {
    stats.value = [];
  }
});
</script>

<style scoped>
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
  margin-top: 1rem;
}
</style>
