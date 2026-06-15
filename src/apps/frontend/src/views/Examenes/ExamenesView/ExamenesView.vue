<template>
  <div class="p-6">
    <div class="flex items-center justify-between mb-6">
      <h1 class="text-2xl font-bold text-surface-900 dark:text-surface-0">Exámenes</h1>
      <Button label="Generar Exámenes" icon="pi pi-cog" @click="tabIndex = 1" />
    </div>

    <TabView v-model:activeIndex="tabIndex">
      <TabPanel header="Listado" value="listado">
        <DataTable :value="items" :loading="loading" :paginator="true" :rows="limit" :totalRecords="total" lazy @page="onPage">
          <Column field="id" header="ID" sortable />
          <Column field="evaluacion" header="Evaluación" />
          <Column field="estado" header="Estado" />
          <Column field="asignatura.titulo" header="Asignatura" />
          <Column header="Preguntas">
            <template #body="{ data }">{{ data._count?.preguntas }}</template>
          </Column>
          <Column header="Alumnos">
            <template #body="{ data }">{{ data._count?.alumnos }}</template>
          </Column>
          <Column header="Acciones">
            <template #body="{ data }">
              <Button icon="pi pi-eye" class="p-button-text" @click="verExamen(data)" />
              <Button icon="pi pi-send" class="p-button-text" label="Asignar" @click="asignarExamen(data)" v-if="data.estado === 'GENERADO'" />
              <Button icon="pi pi-check-circle" class="p-button-text" label="Resultados" @click="verResultados(data)" v-if="data.estado === 'CORREGIDO'" />
            </template>
          </Column>
        </DataTable>
      </TabPanel>

      <TabPanel header="Generar" value="generar">
        <Card>
          <template #title>Generar Exámenes</template>
          <template #content>
            <form @submit.prevent="generarExamenes">
              <div class="field"><label>Asignatura</label><Select v-model="genForm.asignaturaId" :options="asignaturas" optionLabel="titulo" optionValue="id" class="w-full" required @change="cargarBaterias" placeholder="Seleccionar asignatura" /></div>
              <div class="field"><label>Batería de Preguntas</label><Select v-model="bateriaSeleccionada" :options="baterias" optionLabel="nombre" optionValue="id" class="w-full" :disabled="!genForm.asignaturaId" placeholder="Seleccionar batería" /></div>
              <div class="field"><label>Temas (separados por coma, opcional)</label><InputText v-model="temasText" placeholder="Ej: Tema 1, Tema 2, Tema 3" class="w-full" /></div>
              <div class="field"><label>Evaluación</label><Select v-model="genForm.evaluacion" :options="evaluaciones" class="w-full" required /></div>
              <div class="field"><label>Número de exámenes</label><InputNumber v-model="genForm.numeroExamenes" class="w-full" :min="1" required /></div>
              <div class="field"><label>Preguntas por examen</label><InputNumber v-model="genForm.numeroPreguntas" class="w-full" :min="1" required /></div>
              <div class="field"><label>Proporción Fácil (%)</label><InputNumber v-model="genForm.proporcionFacil" class="w-full" :min="0" :max="100" /></div>
              <div class="field"><label>Proporción Media (%)</label><InputNumber v-model="genForm.proporcionMedia" class="w-full" :min="0" :max="100" /></div>
              <div class="field"><label>Proporción Difícil (%)</label><InputNumber v-model="genForm.proporcionDificil" class="w-full" :min="0" :max="100" /></div>
              <Button type="submit" label="Generar" class="w-full" :loading="generando" />
            </form>
          </template>
        </Card>
      </TabPanel>

      <TabPanel header="Resultados" value="resultados" v-if="resultadosExamen">
        <DataTable :value="resultadosExamen">
          <Column field="alumno.nombre" header="Nombre" />
          <Column field="alumno.apellidos" header="Apellidos" />
          <Column header="Nota">
            <template #body="{ data }">{{ data.nota != null ? data.nota.toFixed(1) : 'Pendiente' }}</template>
          </Column>
        </DataTable>
      </TabPanel>
    </TabView>

    <Dialog v-model:visible="asignarDialog" header="Asignar Examen" modal>
      <div class="field"><label>Seleccionar Alumnos</label>
        <Select v-model="alumnosSeleccionados" :options="alumnos" optionLabel="nombre" optionValue="id" multiple class="w-full" />
      </div>
      <Button label="Asignar" @click="confirmarAsignacion" class="w-full mt-2" />
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
import TabView from 'primevue/tabview';
import TabPanel from 'primevue/tabpanel';
import Card from 'primevue/card';
import Select from 'primevue/select';
import InputNumber from 'primevue/inputnumber';
import InputText from 'primevue/inputtext';

const items = ref<any[]>([]);
const asignaturas = ref<any[]>([]);
const baterias = ref<any[]>([]);
const alumnos = ref<any[]>([]);
const loading = ref(false);
const total = ref(0);
const page = ref(1);
const limit = 10;
const generando = ref(false);
const tabIndex = ref(0);

const genForm = ref({
  asignaturaId: null, bateriaIds: [], temas: [], evaluacion: 'PARCIAL_1', numeroExamenes: 1, numeroPreguntas: 10,
  proporcionFacil: 40, proporcionMedia: 40, proporcionDificil: 20,
});
const bateriaSeleccionada = ref<number | null>(null);
const temasText = ref('');
const evaluaciones = ref(['PARCIAL_1', 'PARCIAL_2', 'PARCIAL_3', 'EXAMEN_FINAL', 'EXAMEN_EXTRAORDINARIO']);

const asignarDialog = ref(false);
const asignarExamenId = ref<number | null>(null);
const alumnosSeleccionados = ref<number[]>([]);
const resultadosExamen = ref<any[] | null>(null);

onMounted(() => { cargar(); cargarAsignaturas(); cargarAlumnos(); });

async function cargar() {
  loading.value = true;
  try {
    const { data } = await api.get('/examenes', { params: { page: page.value, limit } });
    items.value = data.data;
    total.value = data.total;
  } finally {
    loading.value = false;
  }
}

async function cargarAsignaturas() {
  const { data } = await api.get('/asignaturas', { params: { limit: 100 } });
  asignaturas.value = data.data;
}

async function cargarBaterias() {
  if (!genForm.value.asignaturaId) {
    baterias.value = [];
    bateriaSeleccionada.value = null;
    return;
  }
  try {
    const response = await api.get(`/bateria/asignatura/${genForm.value.asignaturaId}`);
    baterias.value = Array.isArray(response.data) ? response.data : (response.data.data || []);
    bateriaSeleccionada.value = null;
  } catch (error) {
    baterias.value = [];
    bateriaSeleccionada.value = null;
  }
}

async function cargarAlumnos() {
  const { data } = await api.get('/alumnos', { params: { limit: 100 } });
  alumnos.value = data.data;
}

function onPage(event: any) {
  page.value = event.page + 1;
  cargar();
}

async function generarExamenes() {
  if (!bateriaSeleccionada.value) {
    alert('Debes seleccionar una batería de preguntas');
    return;
  }

  generando.value = true;
  try {
    genForm.value.temas = temasText.value.split(',').map(t => t.trim()).filter(t => t);
    genForm.value.bateriaIds = [bateriaSeleccionada.value];
    await api.post('/examenes/generar', genForm.value);
    cargar();
    tabIndex.value = 0;
  } catch (error: any) {
    console.error('Error generando exámenes:', error.response?.data || error.message);
    alert('Error al generar exámenes: ' + (error.response?.data?.message || error.message));
  } finally {
    generando.value = false;
  }
}

function asignarExamen(data: any) {
  asignarExamenId.value = data.id;
  asignarDialog.value = true;
}

async function confirmarAsignacion() {
  await api.post('/examenes/asignar', { examenId: asignarExamenId.value, alumnoIds: alumnosSeleccionados.value });
  asignarDialog.value = false;
  cargar();
}

async function verExamen(data: any) {
  const { data: examen } = await api.get(`/examenes/${data.id}`);
  resultadosExamen.value = examen.alumnos;
  tabIndex.value = 2;
}

async function verResultados(data: any) {
  const { data: res } = await api.get(`/examenes/${data.id}/resultados`);
  resultadosExamen.value = res;
  tabIndex.value = 2;
}
</script>

<style scoped>
.field { margin-bottom: 1rem; }
.field label { display: block; margin-bottom: 0.5rem; }
</style>
