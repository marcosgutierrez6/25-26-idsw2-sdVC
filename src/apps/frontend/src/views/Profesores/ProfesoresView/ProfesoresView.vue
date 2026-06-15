<template>
  <div class="p-6">
    <div class="flex items-center justify-between mb-6">
      <h1 class="text-2xl font-bold text-surface-900 dark:text-surface-0">Profesores</h1>
      <Button label="Nuevo Profesor" icon="pi pi-plus" @click="router.push('/profesores/nuevo')" />
    </div>

    <DataTable :value="items" :loading="loading" :paginator="true" :rows="limit" :totalRecords="total" lazy @page="onPage">
      <Column field="id" header="ID" sortable />
      <Column field="nombre" header="Nombre" sortable />
      <Column field="apellidos" header="Apellidos" sortable />
      <Column field="dni" header="DNI" />
      <Column field="email" header="Email" />
      <Column field="rol" header="Rol" />
      <Column header="Acciones">
        <template #body="{ data }">
          <Button icon="pi pi-pencil" class="p-button-text" @click="router.push(`/profesores/${data.id}/editar`)" />
          <Button icon="pi pi-trash" class="p-button-text p-button-danger" @click="confirmarEliminar(data)" />
        </template>
      </Column>
    </DataTable>

    <Dialog v-model:visible="deleteDialog" header="Confirmar eliminación" modal>
      <p class="m-0">¿Estás seguro de que quieres eliminar al profesor <strong>{{ itemToDelete?.nombre }} {{ itemToDelete?.apellidos }}</strong>?</p>
      <div class="flex gap-2 justify-end mt-4">
        <Button label="Cancelar" severity="secondary" @click="deleteDialog = false" />
        <Button label="Eliminar" severity="danger" @click="eliminar" />
      </div>
    </Dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import api from '../../../api/axios';
import Button from 'primevue/button';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Dialog from 'primevue/dialog';

const router = useRouter();

const items = ref<any[]>([]);
const loading = ref(false);
const total = ref(0);
const page = ref(1);
const limit = 10;

const deleteDialog = ref(false);
const itemToDelete = ref<any>(null);

onMounted(() => cargar());

async function cargar() {
  loading.value = true;
  try {
    const { data: res } = await api.get('/profesores', { params: { page: page.value, limit } });
    items.value = res.data;
    total.value = res.total;
  } finally {
    loading.value = false;
  }
}

function onPage(event: any) {
  page.value = event.page + 1;
  cargar();
}

function confirmarEliminar(data: any) {
  itemToDelete.value = data;
  deleteDialog.value = true;
}

async function eliminar() {
  if (!itemToDelete.value) return;
  await api.delete(`/profesores/${itemToDelete.value.id}`);
  deleteDialog.value = false;
  itemToDelete.value = null;
  cargar();
}
</script>
