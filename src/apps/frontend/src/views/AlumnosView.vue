<template>
  <div class="p-6">
    <div class="flex items-center justify-between mb-6">
      <h1 class="text-2xl font-bold text-surface-900 dark:text-surface-0">Alumnos</h1>
      <Button label="Nuevo Alumno" icon="pi pi-plus" @click="abrirDialog()" />
    </div>

    <DataTable :value="items" :loading="loading" :paginator="true" :rows="limit" :totalRecords="total" lazy @page="onPage">
      <Column field="id" header="ID" sortable />
      <Column field="nombre" header="Nombre" sortable />
      <Column field="apellidos" header="Apellidos" sortable />
      <Column field="dni" header="DNI" />
      <Column field="email" header="Email" />
      <Column field="grado.titulo" header="Grado" />
      <Column header="Acciones">
        <template #body="{ data }">
          <Button icon="pi pi-pencil" class="p-button-text" @click="abrirDialog(data)" />
          <Button icon="pi pi-trash" class="p-button-text p-button-danger" @click="eliminar(data)" />
        </template>
      </Column>
    </DataTable>

    <Dialog v-model:visible="dialogVisible" :header="editando ? 'Editar Alumno' : 'Nuevo Alumno'" modal>
      <form @submit.prevent="guardar">
        <div class="field"><label>Nombre</label><InputText v-model="form.nombre" class="w-full" required /></div>
        <div class="field"><label>Apellidos</label><InputText v-model="form.apellidos" class="w-full" required /></div>
        <div class="field"><label>DNI</label><InputText v-model="form.dni" class="w-full" required /></div>
        <div class="field"><label>Email</label><InputText v-model="form.email" type="email" class="w-full" required /></div>
        <div class="field"><label>Grado</label><Select v-model="form.gradoId" :options="grados" optionLabel="titulo" optionValue="id" class="w-full" /></div>
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
import InputText from 'primevue/inputtext';
import Select from 'primevue/select';

const items = ref<any[]>([]);
const grados = ref<any[]>([]);
const loading = ref(false);
const total = ref(0);
const page = ref(1);
const limit = 10;

const dialogVisible = ref(false);
const editando = ref(false);
const editandoId = ref<number | null>(null);
const form = ref({ nombre: '', apellidos: '', dni: '', email: '', gradoId: null });

onMounted(() => { cargar(); cargarGrados(); });

async function cargar() {
  loading.value = true;
  try {
    const { data: res } = await api.get('/alumnos', { params: { page: page.value, limit } });
    items.value = res.data;
    total.value = res.total;
  } finally {
    loading.value = false;
  }
}

async function cargarGrados() {
  const { data: res } = await api.get('/grados', { params: { limit: 200 } });
  grados.value = res.data;
}

function onPage(event: any) {
  page.value = event.page + 1;
  cargar();
}

function abrirDialog(data?: any) {
  if (data) {
    editando.value = true;
    editandoId.value = data.id;
    form.value = { nombre: data.nombre, apellidos: data.apellidos, dni: data.dni, email: data.email, gradoId: data.gradoId };
  } else {
    editando.value = false;
    editandoId.value = null;
    form.value = { nombre: '', apellidos: '', dni: '', email: '', gradoId: null };
  }
  dialogVisible.value = true;
}

async function guardar() {
  if (editando.value) {
    await api.patch(`/alumnos/${editandoId.value}`, form.value);
  } else {
    await api.post('/alumnos', form.value);
  }
  dialogVisible.value = false;
  editando.value = false;
  editandoId.value = null;
  form.value = { nombre: '', apellidos: '', dni: '', email: '', gradoId: null };
  page.value = 1;
  cargar();
}

async function eliminar(data: any) {
  await api.delete(`/alumnos/${data.id}`);
  cargar();
}
</script>

<style scoped>
.field { margin-bottom: 1rem; }
.field label { display: block; margin-bottom: 0.5rem; }
</style>
