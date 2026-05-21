<template>
  <div>
    <Toolbar class="mb-3">
      <template #start>
        <h1 class="m-0">Grados</h1>
      </template>
      <template #end>
        <Button label="Nuevo Grado" icon="pi pi-plus" @click="dialogVisible = true" />
      </template>
    </Toolbar>

    <DataTable :value="grados" :loading="loading">
      <Column field="id" header="ID" sortable />
      <Column field="titulo" header="Título" sortable />
      <Column field="codigo" header="Código" sortable />
      <Column header="Acciones">
        <template #body="{ data }">
          <Button icon="pi pi-pencil" class="p-button-text" @click="editar(data)" />
          <Button icon="pi pi-trash" class="p-button-text p-button-danger" @click="eliminar(data)" />
        </template>
      </Column>
    </DataTable>

    <Dialog v-model:visible="dialogVisible" :header="editando ? 'Editar Grado' : 'Nuevo Grado'" modal>
      <form @submit.prevent="guardar">
        <div class="field">
          <label for="titulo">Título</label>
          <InputText id="titulo" v-model="form.titulo" class="w-full" required />
        </div>
        <div class="field">
          <label for="codigo">Código</label>
          <InputText id="codigo" v-model="form.codigo" class="w-full" required />
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

const grados = ref<any[]>([]);
const loading = ref(false);
const dialogVisible = ref(false);
const editando = ref(false);
const editandoId = ref<number | null>(null);
const form = ref({ titulo: '', codigo: '' });

onMounted(() => cargar());

async function cargar() {
  loading.value = true;
  try {
    const { data } = await api.get('/grados');
    grados.value = data;
  } finally {
    loading.value = false;
  }
}

function editar(data: any) {
  editando.value = true;
  editandoId.value = data.id;
  form.value = { titulo: data.titulo, codigo: data.codigo };
  dialogVisible.value = true;
}

async function guardar() {
  if (editando.value) {
    await api.patch(`/grados/${editandoId.value}`, form.value);
  } else {
    await api.post('/grados', form.value);
  }
  dialogVisible.value = false;
  editando.value = false;
  editandoId.value = null;
  form.value = { titulo: '', codigo: '' };
  cargar();
}

async function eliminar(data: any) {
  await api.delete(`/grados/${data.id}`);
  cargar();
}
</script>

<style scoped>
.field { margin-bottom: 1rem; }
.field label { display: block; margin-bottom: 0.5rem; }
</style>
