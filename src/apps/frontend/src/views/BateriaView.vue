<template>
  <div class="p-6">
    <div class="flex items-center justify-between mb-6">
      <h1 class="text-2xl font-bold text-surface-900 dark:text-surface-0">Batería de Preguntas</h1>
      <Button label="Nueva Batería" icon="pi pi-plus" @click="dialogVisible = true" />
    </div>

    <DataTable :value="items" :loading="loading" :paginator="true" :rows="limit" :totalRecords="total" lazy @page="onPage">
      <Column field="id" header="ID" sortable />
      <Column field="asignatura.titulo" header="Asignatura" sortable />
      <Column header="Preguntas">
        <template #body="{ data }">{{ data._count?.preguntas ?? data.preguntas?.length ?? 0 }}</template>
      </Column>
      <Column field="activo" header="Activo">
        <template #body="{ data }">
          <i :class="data.activo ? 'pi pi-check text-green-400' : 'pi pi-times text-red-400'" />
        </template>
      </Column>
      <Column header="Acciones">
        <template #body="{ data }">
          <Button icon="pi pi-pencil" class="p-button-text" @click="abrirDialog(data)" />
          <Button icon="pi pi-trash" class="p-button-text p-button-danger" @click="eliminar(data)" />
        </template>
      </Column>
    </DataTable>

    <Dialog v-model:visible="dialogVisible" :header="editando ? 'Editar Batería' : 'Nueva Batería'" modal>
      <form @submit.prevent="guardar">
        <div class="field"><label>Asignatura</label><Select v-model="form.asignaturaId" :options="asignaturas" optionLabel="titulo" optionValue="id" class="w-full" required /></div>
        <Button type="submit" :label="editando ? 'Actualizar' : 'Crear'" class="w-full" />
      </form>
    </Dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import api from '../api/axios';
import Button from 'primevue/button';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Dialog from 'primevue/dialog';
import Select from 'primevue/select';

const items = ref<any[]>([]);
const asignaturas = ref<any[]>([]);
const loading = ref(false);
const total = ref(0);
const page = ref(1);
const limit = 10;

const dialogVisible = ref(false);
const editando = ref(false);
const editandoId = ref<number | null>(null);
const form = ref({ asignaturaId: null });

onMounted(() => { cargar(); cargarAsignaturas(); });

async function cargar() {
  loading.value = true;
  try {
    const { data: res } = await api.get('/bateria', { params: { page: page.value, limit } });
    items.value = res.data ?? res;
    total.value = res.total ?? items.value.length;
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
    form.value = { asignaturaId: data.asignaturaId };
  } else {
    editando.value = false;
    editandoId.value = null;
    form.value = { asignaturaId: null };
  }
  dialogVisible.value = true;
}

async function guardar() {
  if (editando.value) {
    await api.patch(`/bateria/${editandoId.value}`, form.value);
  } else {
    await api.post('/bateria', form.value);
  }
  dialogVisible.value = false;
  editando.value = false;
  editandoId.value = null;
  form.value = { asignaturaId: null };
  page.value = 1;
  cargar();
}

async function eliminar(data: any) {
  await api.delete(`/bateria/${data.id}`);
  cargar();
}
</script>

<style scoped>
.field { margin-bottom: 1rem; }
.field label { display: block; margin-bottom: 0.5rem; }
</style>
