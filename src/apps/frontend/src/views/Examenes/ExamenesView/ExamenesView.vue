<template>
  <div class="p-6">
    <div class="flex items-center justify-between mb-6">
      <h1 class="text-2xl font-bold text-surface-900 dark:text-surface-0">Exámenes</h1>
      <div class="flex gap-2">
        <Button v-if="examenesSeleccionados.size > 0" label="Asignar seleccionados" icon="pi pi-check" @click="abrirAsignacionBulk" severity="success" />
        <Button label="Generar Exámenes" icon="pi pi-cog" @click="tabIndex = 1" />
      </div>
    </div>

    <TabView v-model:activeIndex="tabIndex">
      <TabPanel header="Listado" value="listado">
        <div v-if="Object.keys(examenesPorLote).length === 0" class="text-center py-8 text-surface-500">
          No hay exámenes generados
        </div>
        <div v-for="(lote, fecha) in examenesPorLote" :key="fecha" class="mb-6 border rounded-lg p-4 bg-surface-50 dark:bg-surface-900">
          <div class="flex items-center justify-between mb-4 cursor-pointer" @click="toggleLote(fecha)">
            <div class="flex items-center gap-3">
              <i :class="lotesExpandidos[fecha] ? 'pi pi-chevron-down' : 'pi pi-chevron-right'"></i>
              <strong>{{ formatearFecha(fecha) }}</strong>
              <span class="text-sm text-surface-500">({{ lote.length }} exámenes)</span>
            </div>
            <Checkbox v-model="seleccionarTodoLote[fecha]" :binary="true" @change="toggleTodoLote(fecha, lote)" />
          </div>

          <div v-if="lotesExpandidos[fecha]" class="mt-4">
            <DataTable :value="lote" :paginator="false" class="p-datatable-sm">
              <Column header="" :style="{ width: '50px' }">
                <template #body="{ data }">
                  <Checkbox :model-value="examenesSeleccionados.has(data.id)" :binary="true" @change="toggleExamen(data.id)" />
                </template>
              </Column>
              <Column field="id" header="ID" />
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
                  <Button icon="pi pi-check-circle" class="p-button-text" label="Resultados" @click="verResultados(data)" v-if="data.estado === 'CORREGIDO'" />
                </template>
              </Column>
            </DataTable>
          </div>
        </div>
      </TabPanel>

      <TabPanel header="Generar" value="generar">
        <Card>
          <template #title>Generar Exámenes</template>
          <template #content>
            <form @submit.prevent="generarExamenes">
              <div class="field"><label>Asignatura</label><Select v-model="genForm.asignaturaId" :options="asignaturas" optionLabel="titulo" optionValue="id" class="w-full" required @change="cargarBaterias" placeholder="Seleccionar asignatura" /></div>
              <div class="field"><label>Batería de Preguntas</label><Select v-model="bateriaSeleccionada" :options="baterias" optionLabel="nombre" optionValue="id" class="w-full" :disabled="!genForm.asignaturaId" placeholder="Seleccionar batería" /></div>
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
        <DataTable :value="resultadosExamen" :paginator="true" :rows="10">
          <Column field="alumno.nombre" header="Nombre" />
          <Column field="alumno.apellidos" header="Apellidos" />
          <Column header="Nota">
            <template #body="{ data }">{{ data.nota != null ? data.nota.toFixed(1) : 'Pendiente' }}</template>
          </Column>
          <Column header="PDF Examen">
            <template #body="{ data }">
              <div class="flex items-center gap-2">
                <Button v-if="data.pdfUrl" icon="pi pi-download" class="p-button-text p-button-sm" @click="descargarPdf(data.pdfUrl)" />
                <FileUpload
                  :customUpload="true"
                  @uploader="cargarPdf($event, data.alumnoId, data.examenId)"
                  accept="application/pdf"
                  :show-upload-button="false"
                  :show-cancel-button="false"
                  :auto="true"
                  class="flex-1"
                />
              </div>
            </template>
          </Column>
        </DataTable>
      </TabPanel>
    </TabView>

    <Dialog v-model:visible="asignarDialog" header="Asignar Exámenes en Bulk" modal :style="{ width: '500px' }">
      <div class="field"><label>Alumnos ({{ alumnosSeleccionados.length }} seleccionados)</label>
        <MultiSelect
          v-model="alumnosSeleccionados"
          :options="alumnos"
          optionLabel="nombre"
          optionValue="id"
          class="w-full"
          placeholder="Seleccionar alumnos..."
          :max-selected-labels="3"
          :show-toggle-all="true"
        />
      </div>
      <div class="field text-sm text-surface-600 mt-4">
        Asignando {{ examenesSeleccionados.size }} exámenes a {{ alumnosSeleccionados.length }} alumnos
      </div>
      <Button label="Confirmar Asignación" @click="confirmarAsignacionBulk" class="w-full mt-4" severity="success" />
      <Button label="Cancelar" @click="asignarDialog = false" class="w-full mt-2" severity="secondary" />
    </Dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
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
import Checkbox from 'primevue/checkbox';
import MultiSelect from 'primevue/multiselect';
import FileUpload from 'primevue/fileupload';

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
const evaluaciones = ref(['PARCIAL_1', 'PARCIAL_2', 'PARCIAL_3', 'EXAMEN_FINAL', 'EXAMEN_EXTRAORDINARIO']);

const asignarDialog = ref(false);
const asignarExamenId = ref<number | null>(null);
const alumnosSeleccionados = ref<number[]>([]);
const resultadosExamen = ref<any[] | null>(null);

const examenesSeleccionados = ref(new Set<number>());
const lotesExpandidos = ref<Record<string, boolean>>({});
const seleccionarTodoLote = ref<Record<string, boolean>>({});

const examenesPorLote = computed(() => {
  const agrupado: Record<string, any[]> = {};
  items.value.forEach((examen) => {
    const fecha = new Date(examen.createdAt).toISOString().split('T')[0];
    if (!agrupado[fecha]) agrupado[fecha] = [];
    agrupado[fecha].push(examen);
  });
  return agrupado;
});

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

function toggleExamen(id: number) {
  if (examenesSeleccionados.value.has(id)) {
    examenesSeleccionados.value.delete(id);
  } else {
    examenesSeleccionados.value.add(id);
  }
}

function toggleLote(fecha: string) {
  lotesExpandidos.value[fecha] = !lotesExpandidos.value[fecha];
}

function toggleTodoLote(fecha: string, lote: any[]) {
  if (seleccionarTodoLote.value[fecha]) {
    lote.forEach((e) => examenesSeleccionados.value.add(e.id));
  } else {
    lote.forEach((e) => examenesSeleccionados.value.delete(e.id));
  }
}

function formatearFecha(fecha: string): string {
  return new Date(fecha + 'T12:00:00Z').toLocaleDateString('es-ES', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

function abrirAsignacionBulk() {
  alumnosSeleccionados.value = [];
  asignarDialog.value = true;
}

async function confirmarAsignacionBulk() {
  if (examenesSeleccionados.value.size === 0 || alumnosSeleccionados.value.length === 0) {
    alert('Debes seleccionar al menos un examen y un alumno');
    return;
  }

  try {
    await api.post('/examenes/asignar-bulk', {
      examenIds: Array.from(examenesSeleccionados.value),
      alumnoIds: alumnosSeleccionados.value,
    });
    examenesSeleccionados.value.clear();
    asignarDialog.value = false;
    cargar();
  } catch (error: any) {
    alert('Error al asignar exámenes: ' + (error.response?.data?.message || error.message));
  }
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

async function cargarPdf(event: any, alumnoId: number, examenId: number) {
  const file = event.files[0];
  if (!file) return;

  const formData = new FormData();
  formData.append('pdf', file);

  try {
    await api.post(`/examenes/${examenId}/alumno/${alumnoId}/pdf`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    cargar();
    verResultados({ id: examenId });
  } catch (error: any) {
    alert('Error al cargar PDF: ' + (error.response?.data?.message || error.message));
  }
}

function descargarPdf(pdfUrl: string) {
  window.open(pdfUrl, '_blank');
}
</script>

<style scoped>
.field { margin-bottom: 1rem; }
.field label { display: block; margin-bottom: 0.5rem; }
</style>
