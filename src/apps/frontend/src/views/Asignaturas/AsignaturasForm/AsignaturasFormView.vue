<template>
  <div class="bg-surface-0 dark:bg-surface-950 p-6">
    <div class="flex items-center justify-between mb-6">
      <h1 class="text-2xl font-bold text-surface-900 dark:text-surface-0">
        {{ asignatura?.id ? 'Editar Asignatura' : 'Nueva Asignatura' }}
      </h1>
      <Button label="Volver" icon="pi pi-arrow-left" severity="secondary" @click="router.push('/asignaturas')" />
    </div>

    <TabPills :tabs="tabs" v-model="active" class="mb-6" />

    <div v-if="active === 0">
      <form @submit.prevent="guardar" class="max-w-md">
        <div class="field"><label>Título</label><InputText v-model="form.titulo" class="w-full" required /></div>
        <div class="field"><label>Código</label><InputText v-model="form.codigo" class="w-full" required /></div>
        <div class="field"><label>Curso Académico</label><InputText v-model="form.cursoAcademico" class="w-full" required /></div>
        <div class="field"><label>Grado</label><Select v-model="form.gradoId" :options="grados" optionLabel="titulo" optionValue="id" class="w-full" /></div>
        <div class="flex gap-2 mt-4">
          <Button type="submit" :label="asignatura?.id ? 'Actualizar' : 'Crear'" icon="pi pi-check" />
          <Button label="Cancelar" severity="secondary" @click="router.push('/asignaturas')" />
        </div>
      </form>
    </div>

    <div v-if="active === 1">
      <div class="flex items-center justify-between mb-4">
        <h2 class="text-xl font-semibold text-surface-900 dark:text-surface-0">Preguntas</h2>
        <Button label="Nueva Pregunta" icon="pi pi-plus" size="small" @click="irANuevaPregunta()" />
      </div>
      <DataTable :value="preguntas" :loading="loadingPre" :paginator="true" :rows="10" :totalRecords="totalPre" lazy @page="onPagePre">
        <Column field="id" header="ID" sortable />
        <Column field="enunciado" header="Enunciado" />
        <Column field="tema" header="Tema" />
        <Column field="dificultad" header="Dificultad" />
        <Column header="Respuestas">
          <template #body="{ data }">
            <span v-for="r in data.respuestas" :key="r.id" class="respuesta-badge" :class="{ correcta: r.esCorrecta }">{{ r.opcion }}</span>
          </template>
        </Column>
        <Column header="Acciones">
          <template #body="{ data }">
            <Button icon="pi pi-pencil" class="p-button-text" @click="router.push(`/preguntas/${data.id}/editar`)" />
          </template>
        </Column>
      </DataTable>
    </div>

    <div v-if="active === 2">
      <DataTable :value="examenes" :loading="loadingEx" :paginator="true" :rows="10" :totalRecords="totalEx" lazy @page="onPageEx">
        <Column field="id" header="ID" sortable />
        <Column field="evaluacion" header="Evaluación" />
        <Column field="estado" header="Estado" />
        <Column header="Preguntas"><template #body="{ data }">{{ data._count?.preguntas }}</template></Column>
        <Column header="Alumnos"><template #body="{ data }">{{ data._count?.alumnos }}</template></Column>
      </DataTable>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import api from '../../../api/axios';
import TabPills from '../../../components/TabPills.vue';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import Select from 'primevue/select';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import { usePreguntasFormStore } from '../../../stores/preguntasForm';

const route = useRoute();
const router = useRouter();
const preguntasFormStore = usePreguntasFormStore();

const asignaturaId = computed(() => route.params.id ? Number(route.params.id) : null);

const form = ref({ titulo: '', codigo: '', cursoAcademico: '', gradoId: null });
const asignatura = ref<any>(null);
const grados = ref<any[]>([]);

const preguntas = ref<any[]>([]);
const totalPre = ref(0);
const loadingPre = ref(false);
const pagePre = ref(1);

const examenes = ref<any[]>([]);
const totalEx = ref(0);
const loadingEx = ref(false);
const pageEx = ref(1);

const active = ref(0);

const tabs = computed(() => [
  { label: 'Configuración general', icon: 'pi pi-cog' },
  { label: 'Preguntas contextuales', icon: 'pi pi-question-circle', disabled: !asignaturaId.value },
  { label: 'Exámenes', icon: 'pi pi-file', disabled: !asignaturaId.value },
]);

onMounted(async () => {
  const { data: res } = await api.get('/grados', { params: { limit: 100 } });
  grados.value = res.data;

  if (asignaturaId.value) {
    const { data } = await api.get(`/asignaturas/${asignaturaId.value}`);
    asignatura.value = data;
    form.value = { titulo: data.titulo, codigo: data.codigo, cursoAcademico: data.cursoAcademico, gradoId: data.gradoId };
    cargarPreguntas();
    cargarExamenes();
  }
});

async function cargarPreguntas() {
  if (!asignaturaId.value) return;
  loadingPre.value = true;
  try {
    const { data: baterias } = await api.get('/bateria');
    const bateria = (Array.isArray(baterias) ? baterias : baterias.data || []).find((b: any) => b.asignaturaId === asignaturaId.value);
    if (bateria) {
      const { data: res } = await api.get('/preguntas', { params: { page: pagePre.value, limit: 10, bateriaId: bateria.id } });
      preguntas.value = res.data;
      totalPre.value = res.total;
    }
  } finally {
    loadingPre.value = false;
  }
}

function onPagePre(event: any) {
  pagePre.value = event.page + 1;
  cargarPreguntas();
}

async function cargarExamenes() {
  if (!asignaturaId.value) return;
  loadingEx.value = true;
  try {
    const { data: res } = await api.get('/examenes', { params: { page: pageEx.value, limit: 10, asignaturaId: asignaturaId.value } });
    examenes.value = res.data;
    totalEx.value = res.total;
  } finally {
    loadingEx.value = false;
  }
}

function onPageEx(event: any) {
  pageEx.value = event.page + 1;
  cargarExamenes();
}

async function guardar() {
  if (!form.value.gradoId) return;
  if (asignaturaId.value) {
    await api.patch(`/asignaturas/${asignaturaId.value}`, form.value);
  } else {
    await api.post('/asignaturas', form.value);
  }
  router.push('/asignaturas');
}

function irANuevaPregunta() {
  if (asignatura.value?.id) {
    preguntasFormStore.setAsignaturaId(asignatura.value.id);
    router.push('/preguntas/nuevo');
  }
}
</script>

<style scoped>
.field { margin-bottom: 1rem; }
.field label { display: block; margin-bottom: 0.5rem; }
.respuesta-badge { background: #e0e0e0; padding: 2px 6px; border-radius: 4px; margin-right: 4px; }
.respuesta-badge.correcta { background: #c8e6c9; }
</style>
