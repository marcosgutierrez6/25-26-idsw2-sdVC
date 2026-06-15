<template>
  <div class="p-6">
    <div class="flex items-center justify-between mb-6">
      <h1 class="text-2xl font-bold text-surface-900 dark:text-surface-0">Exportar Configuración</h1>
      <Button label="Volver" icon="pi pi-arrow-left" severity="secondary" @click="router.push('/dashboard')" />
    </div>

    <Card class="max-w-lg">
      <template #content>
        <div class="space-y-4">
          <p class="text-surface-600 dark:text-surface-400">Selecciona qué datos quieres exportar:</p>

          <div class="space-y-3">
            <div class="flex items-center gap-3">
              <Checkbox v-model="seleccion.grados" :binary="true" />
              <label class="cursor-pointer">Grados</label>
            </div>
            <div class="flex items-center gap-3">
              <Checkbox v-model="seleccion.asignaturas" :binary="true" />
              <label class="cursor-pointer">Asignaturas</label>
            </div>
            <div class="flex items-center gap-3">
              <Checkbox v-model="seleccion.alumnos" :binary="true" />
              <label class="cursor-pointer">Alumnos</label>
            </div>
            <div class="flex items-center gap-3">
              <Checkbox v-model="seleccion.preguntas" :binary="true" />
              <label class="cursor-pointer">Preguntas</label>
            </div>
            <div class="flex items-center gap-3">
              <Checkbox :model-value="todosSeleccionados" @update:model-value="toggleTodos" :binary="true" />
              <label class="cursor-pointer font-semibold">Seleccionar todo</label>
            </div>
          </div>

          <Divider />

          <Button
            label="Exportar Datos"
            icon="pi pi-download"
            class="w-full"
            @click="exportar"
            :loading="loading"
            :disabled="seleccion.length === 0"
          />
        </div>
      </template>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import api from '../../../api/axios';
import Button from 'primevue/button';
import Card from 'primevue/card';
import Checkbox from 'primevue/checkbox';
import Divider from 'primevue/divider';

const router = useRouter();

const seleccion = ref({ grados: false, asignaturas: false, alumnos: false, preguntas: false });
const loading = ref(false);

const todosSeleccionados = computed({
  get: () => Object.values(seleccion.value).every(v => v),
  set: (value) => {
    Object.keys(seleccion.value).forEach(key => {
      seleccion.value[key as keyof typeof seleccion.value] = value;
    });
  }
});

function toggleTodos(value: boolean) {
  Object.keys(seleccion.value).forEach(key => {
    seleccion.value[key as keyof typeof seleccion.value] = value;
  });
}

async function exportar() {
  loading.value = true;
  try {
    const { data } = await api.get('/configuracion/exportar');

    const dataToExport: any = {};
    if (seleccion.value.grados) dataToExport.grados = data.grados;
    if (seleccion.value.asignaturas) dataToExport.asignaturas = data.asignaturas;
    if (seleccion.value.alumnos) dataToExport.alumnos = data.alumnos;
    if (seleccion.value.preguntas) dataToExport.preguntas = data.preguntas;

    const json = JSON.stringify(dataToExport, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `configuracion-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Error exportando:', error);
  } finally {
    loading.value = false;
  }
}
</script>
