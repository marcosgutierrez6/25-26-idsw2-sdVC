<template>
  <div>
    <Toolbar class="mb-3">
      <template #start><h1 class="m-0">Asignaturas</h1></template>
      <template #end>
        <Button label="Nueva Asignatura" icon="pi pi-plus" @click="abrirDialog()" />
      </template>
    </Toolbar>

    <DataTable :value="asignaturas" :loading="loading">
      <Column field="id" header="ID" sortable />
      <Column field="titulo" header="Título" sortable />
      <Column field="codigo" header="Código" />
      <Column field="cursoAcademico" header="Curso" />
      <Column field="grado.titulo" header="Grado" />
      <Column field="profesor.nombre" header="Profesor">
        <template #body="{ data }">{{ data.profesor ? `${data.profesor.nombre} ${data.profesor.apellidos}` : '-' }}</template>
      </Column>
      <Column header="Acciones">
        <template #body="{ data }">
          <Button icon="pi pi-pencil" class="p-button-text" @click="abrirDialog(data)" />
          <Button icon="pi pi-trash" class="p-button-text p-button-danger" @click="eliminar(data)" />
        </template>
      </Column>
    </DataTable>

    <Dialog v-model:visible="dialogVisible" :header="editando ? 'Editar Asignatura' : 'Nueva Asignatura'" modal>
      <form @submit.prevent="guardar">
        <div class="field">
          <label for="titulo">Título</label>
          <InputText id="titulo" v-model="form.titulo" class="w-full" required />
        </div>
        <div class="field">
          <label for="codigo">Código</label>
          <InputText id="codigo" v-model="form.codigo" class="w-full" required />
        </div>
        <div class="field">
          <label for="curso">Curso Académico</label>
          <InputText id="curso" v-model="form.cursoAcademico" class="w-full" required />
        </div>
        <div class="field">
          <label for="grado">Grado</label>
          <Select id="grado" v-model="form.gradoId" :options="grados" optionLabel="titulo" optionValue="id" class="w-full" />
        </div>
        <Button type="submit" :label="editando ? 'Actualizar' : 'Crear'" class="w-full" />
      </form>
    </Dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import api from '../api/axios';
import Toolbar from 'primevue/toolbar';
import Button from 'primevue/button';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Dialog from 'primevue/dialog';
import InputText from 'primevue/inputtext';
import Select from 'primevue/select';

const asignaturas = ref<any[]>([]);
const grados = ref<any[]>([]);
const loading = ref(false);
const dialogVisible = ref(false);
const editando = ref(false);
const editandoId = ref<number | null>(null);
const form = ref({ titulo: '', codigo: '', cursoAcademico: '', gradoId: null });

onMounted(() => { cargar(); cargarGrados(); });

async function cargar() {
  loading.value = true;
  try { const { data } = await api.get('/asignaturas'); asignaturas.value = data; } finally { loading.value = false; }
}

async function cargarGrados() {
  const { data } = await api.get('/grados'); grados.value = data;
}

function abrirDialog(data?: any) {
  if (data) {
    editando.value = true; editandoId.value = data.id;
    form.value = { titulo: data.titulo, codigo: data.codigo, cursoAcademico: data.cursoAcademico, gradoId: data.gradoId };
  } else {
    editando.value = false; editandoId.value = null;
    form.value = { titulo: '', codigo: '', cursoAcademico: '', gradoId: null };
  }
  dialogVisible.value = true;
}

async function guardar() {
  if (editando.value) { await api.patch(`/asignaturas/${editandoId.value}`, form.value); }
  else { await api.post('/asignaturas', form.value); }
  dialogVisible.value = false; cargar();
}

async function eliminar(data: any) { await api.delete(`/asignaturas/${data.id}`); cargar(); }
</script>
<style scoped>
.field { margin-bottom: 1rem; }
.field label { display: block; margin-bottom: 0.5rem; }
</style>
