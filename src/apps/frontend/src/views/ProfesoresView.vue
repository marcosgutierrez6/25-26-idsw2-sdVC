<template>
  <div>
    <Toolbar class="mb-3">
      <template #start><h1 class="m-0">Profesores</h1></template>
      <template #end>
        <Button label="Nuevo Profesor" icon="pi pi-plus" @click="abrirDialog()" />
      </template>
    </Toolbar>

    <DataTable :value="profesores" :loading="loading">
      <Column field="id" header="ID" sortable />
      <Column field="nombre" header="Nombre" sortable />
      <Column field="apellidos" header="Apellidos" sortable />
      <Column field="dni" header="DNI" />
      <Column field="email" header="Email" />
      <Column field="rol" header="Rol" />
      <Column header="Acciones">
        <template #body="{ data }">
          <Button icon="pi pi-pencil" class="p-button-text" @click="abrirDialog(data)" />
          <Button icon="pi pi-trash" class="p-button-text p-button-danger" @click="eliminar(data)" />
        </template>
      </Column>
    </DataTable>

    <Dialog v-model:visible="dialogVisible" :header="editando ? 'Editar Profesor' : 'Nuevo Profesor'" modal>
      <form @submit.prevent="guardar">
        <div class="field"><label>Nombre</label><InputText v-model="form.nombre" class="w-full" required /></div>
        <div class="field"><label>Apellidos</label><InputText v-model="form.apellidos" class="w-full" required /></div>
        <div class="field"><label>DNI</label><InputText v-model="form.dni" class="w-full" required /></div>
        <div class="field"><label>Email</label><InputText v-model="form.email" type="email" class="w-full" required /></div>
        <div class="field"><label>Contraseña</label><InputText v-model="form.password" type="password" class="w-full" :required="!editando" /></div>
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

const profesores = ref<any[]>([]);
const loading = ref(false);
const dialogVisible = ref(false);
const editando = ref(false);
const editandoId = ref<number | null>(null);
const form = ref({ nombre: '', apellidos: '', dni: '', email: '', password: '' });

onMounted(() => cargar());

async function cargar() {
  loading.value = true;
  try { const { data } = await api.get('/profesores'); profesores.value = data; } finally { loading.value = false; }
}

function abrirDialog(data?: any) {
  if (data) {
    editando.value = true; editandoId.value = data.id;
    form.value = { nombre: data.nombre, apellidos: data.apellidos, dni: data.dni, email: data.email, password: '' };
  } else {
    editando.value = false; editandoId.value = null;
    form.value = { nombre: '', apellidos: '', dni: '', email: '', password: '' };
  }
  dialogVisible.value = true;
}

async function guardar() {
  if (editando.value) { await api.patch(`/profesores/${editandoId.value}`, form.value); }
  else { await api.post('/profesores', form.value); }
  dialogVisible.value = false; cargar();
}
async function eliminar(data: any) { await api.delete(`/profesores/${data.id}`); cargar(); }
</script>
<style scoped>
.field { margin-bottom: 1rem; }
.field label { display: block; margin-bottom: 0.5rem; }
</style>
