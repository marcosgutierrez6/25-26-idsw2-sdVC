<template>
  <div class="p-6">
    <div class="flex items-center justify-between mb-6">
      <h1 class="text-2xl font-bold text-surface-900 dark:text-surface-0">Preguntas Contextuales</h1>
      <Button label="Nueva Pregunta" icon="pi pi-plus" @click="irACrear()" />
    </div>

    <DataTable :value="items" :loading="loading" :paginator="true" :rows="limit" :totalRecords="total" lazy @page="onPage">
      <Column field="id" header="ID" sortable style="width: 80px" />
      <Column field="enunciado" header="Enunciado" />
      <Column field="tema" header="Tema" sortable />
      <Column field="dificultad" header="Dificultad" sortable style="width: 120px" />
      <Column field="bateria.asignatura.titulo" header="Asignatura" sortable />
      <Column header="Contexto" style="width: 100px">
        <template #body="{ data }">
          <Tag v-if="data.contextoPreguntas" value="Sí" severity="success" />
          <Tag v-else value="No" severity="info" />
        </template>
      </Column>
      <Column header="Acciones" style="width: 120px">
        <template #body="{ data }">
          <Button icon="pi pi-pencil" class="p-button-text" @click="irAEditar(data.id)" />
          <Button icon="pi pi-trash" class="p-button-text p-button-danger" @click="eliminar(data)" />
        </template>
      </Column>
    </DataTable>

    <Dialog v-model:visible="dialogVisible" header="Detalles de Pregunta Contextual" modal style="width: 800px">
      <div v-if="preguntaSeleccionada" class="space-y-4">
        <div>
          <h3 class="font-semibold mb-2">Enunciado</h3>
          <p class="text-surface-700 dark:text-surface-300">{{ preguntaSeleccionada.enunciado }}</p>
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div>
            <h4 class="font-semibold mb-1">Tema</h4>
            <p class="text-surface-700 dark:text-surface-300">{{ preguntaSeleccionada.tema }}</p>
          </div>
          <div>
            <h4 class="font-semibold mb-1">Dificultad</h4>
            <Tag :value="preguntaSeleccionada.dificultad" :severity="getDificultadSeverity(preguntaSeleccionada.dificultad)" />
          </div>
        </div>

        <div v-if="preguntaSeleccionada.contextoPreguntas">
          <h3 class="font-semibold mb-2">Contexto</h3>
          <p class="text-surface-700 dark:text-surface-300 whitespace-pre-wrap">{{ preguntaSeleccionada.contextoPreguntas.contexto }}</p>
        </div>

        <div v-if="preguntaSeleccionada.contextoPreguntas?.recursos">
          <h3 class="font-semibold mb-2">Recursos/Materiales</h3>
          <p class="text-surface-700 dark:text-surface-300 whitespace-pre-wrap">{{ preguntaSeleccionada.contextoPreguntas.recursos }}</p>
        </div>

        <div v-if="preguntaSeleccionada.contextoPreguntas?.tiempoEstimado">
          <h3 class="font-semibold mb-2">Tiempo Estimado</h3>
          <p class="text-surface-700 dark:text-surface-300">{{ preguntaSeleccionada.contextoPreguntas.tiempoEstimado }} minutos</p>
        </div>

        <div>
          <h3 class="font-semibold mb-2">Respuestas</h3>
          <div class="space-y-2">
            <div v-for="(r, i) in preguntaSeleccionada.respuestas" :key="i" class="p-3 bg-surface-100 dark:bg-surface-800 rounded">
              <div class="flex items-start gap-2">
                <Tag v-if="r.esCorrecta" value="✓" severity="success" />
                <Tag v-else value="✗" severity="danger" />
                <span class="flex-1 text-surface-900 dark:text-surface-0">{{ r.opcion }}</span>
              </div>
              <p v-if="r.explicacion" class="text-sm text-surface-600 dark:text-surface-400 mt-2">{{ r.explicacion }}</p>
            </div>
          </div>
        </div>
      </div>
    </Dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import api from '../../../api/axios';
import Button from 'primevue/button';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Dialog from 'primevue/dialog';
import Tag from 'primevue/tag';
import { useRouter } from 'vue-router';

const router = useRouter();

const items = ref<any[]>([]);
const loading = ref(false);
const total = ref(0);
const page = ref(1);
const limit = 10;

const dialogVisible = ref(false);
const preguntaSeleccionada = ref<any>(null);

onMounted(() => cargar());

async function cargar() {
  loading.value = true;
  try {
    const { data } = await api.get('/preguntas', {
      params: {
        page: page.value,
        limit,
        esContextual: true,
      },
    });
    items.value = data.data;
    total.value = data.total;
  } finally {
    loading.value = false;
  }
}

function onPage(event: any) {
  page.value = event.page + 1;
  cargar();
}

function irACrear() {
  router.push('/preguntas-contextuales/nueva');
}

function irAEditar(id: number) {
  router.push(`/preguntas-contextuales/${id}/editar`);
}

async function verDetalles(pregunta: any) {
  const { data } = await api.get(`/preguntas/${pregunta.id}`);
  preguntaSeleccionada.value = data;
  dialogVisible.value = true;
}

async function eliminar(pregunta: any) {
  if (confirm(`¿Está seguro que desea eliminar la pregunta "${pregunta.enunciado.substring(0, 50)}..."?`)) {
    try {
      await api.delete(`/preguntas/${pregunta.id}`);
      cargar();
    } catch (error) {
      console.error('Error al eliminar:', error);
    }
  }
}

function getDificultadSeverity(dificultad: string) {
  const map: { [key: string]: string } = {
    BAJA: 'success',
    MEDIA: 'warning',
    ALTA: 'danger',
  };
  return map[dificultad] || 'info';
}
</script>

<style scoped>
</style>
