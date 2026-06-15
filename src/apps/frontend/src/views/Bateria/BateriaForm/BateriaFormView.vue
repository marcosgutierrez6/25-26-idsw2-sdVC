<template>
  <div class="bg-surface-0 dark:bg-surface-950 p-6">
    <div class="flex items-center justify-between mb-6">
      <h1 class="text-2xl font-bold text-surface-900 dark:text-surface-0">
        {{ bateria?.id ? 'Editar Batería' : 'Nueva Batería' }}
      </h1>
      <Button label="Volver" icon="pi pi-arrow-left" severity="secondary" @click="volver" />
    </div>

    <form @submit.prevent="guardar" class="space-y-6">
      <!-- Datos básicos -->
      <div class="grid grid-cols-2 gap-6">
        <div class="field">
          <label for="nombre">Nombre de la Batería</label>
          <InputText id="nombre" v-model="form.nombre" class="w-full" required />
        </div>

        <div class="field">
          <label for="asignatura">Asignatura</label>
          <Select
            id="asignatura"
            v-model="form.asignaturaId"
            :options="asignaturas"
            optionLabel="titulo"
            optionValue="id"
            class="w-full"
            required
            :disabled="!!bateria?.id"
            @change="cargarPreguntas"
          />
        </div>
      </div>

      <hr class="border-t border-surface-300 dark:border-surface-700" />

      <!-- Selector de preguntas -->
      <div v-if="form.asignaturaId">
        <h2 class="text-lg font-semibold mb-4">Seleccionar Preguntas</h2>

        <!-- Barra de búsqueda -->
        <div class="mb-4">
          <InputText v-model="searchText" placeholder="Buscar preguntas..." class="w-full p-input-icon-left" style="padding-left: 2.5rem;" />
          <i class="pi pi-search" style="position: absolute; left: 0.75rem; top: 0.5rem; color: var(--text-color-secondary);" />
        </div>

        <!-- DataTable con preguntas -->
        <DataTable
          :value="preguntasFiltradas"
          :loading="loadingPreguntas"
          scrollable
          scroll-height="400px"
          class="p-datatable-sm"
        >
          <Column type="checkbox" :selectable-all="true" style="width: 3rem">
            <template #header>
              <Checkbox v-model="todosSeleccionados" :binary="true" @change="toggleTodos" />
            </template>
            <template #body="{ data }">
              <Checkbox
                v-model="preguntasSeleccionadas"
                :input-value="data.id"
                :binary="false"
              />
            </template>
          </Column>
          <Column field="id" header="ID" style="width: 60px" />
          <Column field="enunciado" header="Enunciado" style="width: 300px" />
          <Column field="tema" header="Tema" style="width: 100px" />
          <Column field="dificultad" header="Dificultad" style="width: 80px">
            <template #body="{ data }">
              <Tag :value="data.dificultad" :severity="getDificultadSeverity(data.dificultad)" />
            </template>
          </Column>
        </DataTable>

        <p class="text-sm text-surface-600 dark:text-surface-400 mt-2">
          {{ preguntasSeleccionadas.length }} de {{ preguntas.length }} preguntas seleccionadas
        </p>
      </div>

      <!-- Botones -->
      <div class="flex gap-2 mt-6">
        <Button type="submit" :label="bateria?.id ? 'Actualizar' : 'Crear'" icon="pi pi-check" />
        <Button label="Cancelar" severity="secondary" @click="volver" type="button" />
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import api from '../../../api/axios';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import Select from 'primevue/select';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Checkbox from 'primevue/checkbox';
import Tag from 'primevue/tag';

const route = useRoute();
const router = useRouter();

const bateriaId = computed(() => route.params.id ? Number(route.params.id) : null);

const form = ref({ nombre: '', asignaturaId: null as number | null });
const bateria = ref<any>(null);
const asignaturas = ref<any[]>([]);
const preguntas = ref<any[]>([]);
const preguntasSeleccionadas = ref<number[]>([]);
const todosSeleccionados = ref(false);
const searchText = ref('');
const loadingPreguntas = ref(false);

const preguntasFiltradas = computed(() =>
  preguntas.value.filter(p =>
    p.enunciado.toLowerCase().includes(searchText.value.toLowerCase()) ||
    p.tema.toLowerCase().includes(searchText.value.toLowerCase())
  )
);

onMounted(async () => {
  await cargarAsignaturas();
  if (bateriaId.value) {
    const { data } = await api.get(`/bateria/${bateriaId.value}`);
    bateria.value = data;
    form.value = {
      nombre: data.nombre,
      asignaturaId: data.asignaturaId,
    };
    preguntasSeleccionadas.value = data.preguntas?.map((p: any) => p.preguntaId) || [];
    await cargarPreguntas();
  }
});

async function cargarAsignaturas() {
  const { data } = await api.get('/asignaturas', { params: { limit: 100 } });
  asignaturas.value = data.data;
}

async function cargarPreguntas() {
  if (!form.value.asignaturaId) return;
  loadingPreguntas.value = true;
  try {
    const { data } = await api.get('/preguntas');
    preguntas.value = Array.isArray(data) ? data : data.data || [];
  } catch (error) {
    console.error('Error cargando preguntas:', error);
    preguntas.value = [];
  } finally {
    loadingPreguntas.value = false;
  }
}

function toggleTodos() {
  if (todosSeleccionados.value) {
    preguntasSeleccionadas.value = preguntas.value.map(p => p.id);
  } else {
    preguntasSeleccionadas.value = [];
  }
}

function getDificultadSeverity(dificultad: string) {
  const map: { [key: string]: string } = { BAJA: 'success', MEDIA: 'warning', ALTA: 'danger' };
  return map[dificultad] || 'info';
}

async function guardar() {
  try {
    if (bateriaId.value) {
      await api.patch(`/bateria/${bateriaId.value}`, {
        nombre: form.value.nombre,
        preguntas: preguntasSeleccionadas.value,
      });
    } else {
      await api.post('/bateria', {
        nombre: form.value.nombre,
        asignaturaId: form.value.asignaturaId,
        preguntas: preguntasSeleccionadas.value,
      });
    }
    router.push('/bateria');
  } catch (error) {
    console.error('Error al guardar batería:', error);
  }
}

function volver() {
  router.push('/bateria');
}
</script>

<style scoped>
.field { margin-bottom: 1rem; }
.field label { display: block; margin-bottom: 0.5rem; font-weight: 500; }
</style>
