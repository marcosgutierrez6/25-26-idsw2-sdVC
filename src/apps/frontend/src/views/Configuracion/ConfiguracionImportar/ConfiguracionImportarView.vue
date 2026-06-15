<template>
  <div class="p-6">
    <div class="flex items-center justify-between mb-6">
      <h1 class="text-2xl font-bold text-surface-900 dark:text-surface-0">Importar Configuración</h1>
      <Button label="Volver" icon="pi pi-arrow-left" severity="secondary" @click="router.push('/dashboard')" />
    </div>

    <Card class="max-w-lg">
      <template #content>
        <div class="space-y-6">
          <p class="text-surface-600 dark:text-surface-400">Sube un archivo de configuración para importar datos:</p>

          <div class="border-2 border-dashed border-surface-300 dark:border-surface-700 rounded-lg p-8 text-center cursor-pointer hover:bg-surface-50 dark:hover:bg-surface-900 transition"
               @click="fileInput?.click()"
               @dragover.prevent="dragover = true"
               @dragleave.prevent="dragover = false"
               @drop.prevent="handleDrop"
               :class="{ 'bg-blue-50 dark:bg-blue-900/20 border-blue-400': dragover }">
            <input
              ref="fileInput"
              type="file"
              accept=".json"
              style="display: none"
              @change="handleFileSelect"
            />
            <i class="pi pi-cloud-upload text-4xl text-primary mb-3 block"></i>
            <p class="font-semibold mb-1">{{ archivo?.name || 'Arrastra un archivo aquí o haz clic' }}</p>
            <p class="text-sm text-surface-500">Solo archivos JSON</p>
          </div>

          <Divider v-if="archivo" />

          <div v-if="archivo" class="space-y-3">
            <p class="text-sm text-surface-600 dark:text-surface-400">
              <strong>Archivo seleccionado:</strong> {{ archivo.name }} ({{ formatSize(archivo.size) }})
            </p>
            <div class="flex gap-2">
              <Button
                label="Importar"
                icon="pi pi-upload"
                class="flex-1"
                @click="importar"
                :loading="loading"
              />
              <Button
                label="Cancelar"
                severity="secondary"
                icon="pi pi-times"
                class="flex-1"
                @click="cancelar"
              />
            </div>
          </div>

          <div v-else>
            <Button
              label="Seleccionar archivo"
              icon="pi pi-folder-open"
              class="w-full"
              @click="fileInput?.click()"
            />
          </div>
        </div>
      </template>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import api from '../../../api/axios';
import Button from 'primevue/button';
import Card from 'primevue/card';
import Divider from 'primevue/divider';

const router = useRouter();

const fileInput = ref<HTMLInputElement | null>(null);
const archivo = ref<File | null>(null);
const dragover = ref(false);
const loading = ref(false);

function handleFileSelect(event: Event) {
  const target = event.target as HTMLInputElement;
  if (target.files?.[0]) {
    archivo.value = target.files[0];
  }
}

function handleDrop(event: DragEvent) {
  dragover.value = false;
  if (event.dataTransfer?.files?.[0]) {
    archivo.value = event.dataTransfer.files[0];
    if (fileInput.value) {
      const dt = new DataTransfer();
      dt.items.add(event.dataTransfer.files[0]);
      fileInput.value.files = dt.files;
    }
  }
}

function formatSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
}

async function importar() {
  if (!archivo.value) return;

  loading.value = true;
  try {
    const text = await archivo.value.text();
    const data = JSON.parse(text);

    await api.post('/configuracion/importar', data);
    router.push('/dashboard');
  } catch (error) {
    console.error('Error importando:', error);
    alert('Error al importar. Verifica que el archivo sea válido.');
  } finally {
    loading.value = false;
  }
}

function cancelar() {
  archivo.value = null;
  if (fileInput.value) {
    fileInput.value.value = '';
  }
}
</script>
