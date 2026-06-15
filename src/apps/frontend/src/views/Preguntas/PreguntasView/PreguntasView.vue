<template>
  <div class="p-6">
    <div class="flex items-center justify-between mb-6">
      <h1 class="text-2xl font-bold text-surface-900 dark:text-surface-0">Preguntas</h1>
      <Button label="Nueva Pregunta" icon="pi pi-plus" @click="abrirDialog()" />
    </div>

    <DataTable :value="items" :loading="loading" :paginator="true" :rows="limit" :totalRecords="total" lazy @page="onPage">
      <Column field="id" header="ID" sortable />
      <Column field="enunciado" header="Enunciado" />
      <Column field="tema" header="Tema" sortable />
      <Column field="dificultad" header="Dificultad" sortable />
      <Column field="estado" header="Estado" />
      <Column header="Respuestas">
        <template #body="{ data }">
          <span v-for="r in data.respuestas" :key="r.id" class="respuesta-badge" :class="{ correcta: r.esCorrecta }">{{ r.opcion }}</span>
        </template>
      </Column>
      <Column header="Acciones">
        <template #body="{ data }">
          <Button icon="pi pi-pencil" class="p-button-text" @click="abrirDialog(data)" />
          <Button icon="pi pi-trash" class="p-button-text p-button-danger" @click="eliminar(data)" />
        </template>
      </Column>
    </DataTable>

    <Dialog v-model:visible="dialogVisible" :header="editando ? 'Editar Pregunta' : 'Nueva Pregunta'" modal style="width: 600px">
      <form @submit.prevent="guardar">
        <div class="field"><label>Asignatura</label>
          <Select v-model="form.asignaturaId" :options="asignaturas" optionLabel="titulo" optionValue="id" class="w-full" />
        </div>
        <div class="field"><label>Enunciado</label><Textarea v-model="form.enunciado" class="w-full" rows="3" required /></div>
        <div class="field"><label>Tema</label><InputText v-model="form.tema" class="w-full" required /></div>
        <div class="field"><label>Dificultad</label>
          <Select v-model="form.dificultad" :options="['BAJA', 'MEDIA', 'ALTA']" class="w-full" />
        </div>
        <div class="field"><h3>Respuestas</h3>
          <div v-for="(r, i) in form.respuestas" :key="i" class="respuesta-row">
            <InputText v-model="r.opcion" placeholder="Opción" class="mr-1" />
            <Checkbox v-model="r.esCorrecta" :binary="true" />
            <label class="ml-1">Correcta</label>
            <Button icon="pi pi-trash" class="p-button-text p-button-danger" @click="form.respuestas.splice(i, 1)" v-if="form.respuestas.length > 2" />
          </div>
          <Button label="Añadir respuesta" icon="pi pi-plus" class="p-button-sm" @click="form.respuestas.push({ opcion: '', esCorrecta: false })" v-if="form.respuestas.length < 5" />
        </div>
        <Button type="submit" :label="editando ? 'Actualizar' : 'Crear'" class="w-full" />
      </form>
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
import InputText from 'primevue/inputtext';
import Textarea from 'primevue/textarea';
import Select from 'primevue/select';
import Checkbox from 'primevue/checkbox';

const items = ref<any[]>([]);
const asignaturas = ref<any[]>([]);
const loading = ref(false);
const total = ref(0);
const page = ref(1);
const limit = 10;

const dialogVisible = ref(false);
const editando = ref(false);
const editandoId = ref<number | null>(null);
const form = ref({ asignaturaId: null, enunciado: '', tema: '', dificultad: 'MEDIA', respuestas: [{ opcion: '', esCorrecta: false }, { opcion: '', esCorrecta: false }] });

onMounted(() => { cargar(); cargarAsignaturas(); });

async function cargar() {
  loading.value = true;
  try {
    const { data: res } = await api.get('/preguntas', { params: { page: page.value, limit } });
    items.value = res.data;
    total.value = res.total;
  } finally {
    loading.value = false;
  }
}

async function cargarAsignaturas() {
  const { data: res } = await api.get('/asignaturas', { params: { limit: 100 } });
  asignaturas.value = res.data;
}

function onPage(event: any) {
  page.value = event.page + 1;
  cargar();
}

function abrirDialog(data?: any) {
  if (data) {
    editando.value = true;
    editandoId.value = data.id;
    form.value = {
      asignaturaId: data.bateria?.asignaturaId || null,
      enunciado: data.enunciado,
      tema: data.tema,
      dificultad: data.dificultad,
      respuestas: data.respuestas.map((r: any) => ({ opcion: r.opcion, esCorrecta: r.esCorrecta })),
    };
  } else {
    editando.value = false;
    editandoId.value = null;
    form.value = { asignaturaId: null, enunciado: '', tema: '', dificultad: 'MEDIA', respuestas: [{ opcion: '', esCorrecta: false }, { opcion: '', esCorrecta: false }] };
  }
  dialogVisible.value = true;
}

async function guardar() {
  if (editando.value) {
    await api.patch(`/preguntas/${editandoId.value}`, { enunciado: form.value.enunciado, tema: form.value.tema, dificultad: form.value.dificultad });
  } else {
    const baterias = await api.get('/bateria');
    let bateria = baterias.data.find((b: any) => b.asignaturaId === form.value.asignaturaId);
    if (!bateria) {
      bateria = (await api.post('/bateria', { asignaturaId: form.value.asignaturaId })).data;
    }
    const { data: pregunta } = await api.post('/preguntas', { enunciado: form.value.enunciado, tema: form.value.tema, dificultad: form.value.dificultad, bateriaId: bateria.id });
    for (const r of form.value.respuestas) {
      if (r.opcion) await api.post('/respuestas', { opcion: r.opcion, esCorrecta: r.esCorrecta, preguntaId: pregunta.id });
    }
  }
  dialogVisible.value = false;
  editando.value = false;
  editandoId.value = null;
  form.value = { asignaturaId: null, enunciado: '', tema: '', dificultad: 'MEDIA', respuestas: [{ opcion: '', esCorrecta: false }, { opcion: '', esCorrecta: false }] };
  page.value = 1;
  cargar();
}

async function eliminar(data: any) {
  await api.delete(`/preguntas/${data.id}`);
  cargar();
}
</script>

<style scoped>
.field { margin-bottom: 1rem; }
.field label { display: block; margin-bottom: 0.5rem; }
.respuesta-badge { background: #e0e0e0; padding: 2px 6px; border-radius: 4px; margin-right: 4px; }
.respuesta-badge.correcta { background: #c8e6c9; }
.respuesta-row { display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.5rem; }
</style>
