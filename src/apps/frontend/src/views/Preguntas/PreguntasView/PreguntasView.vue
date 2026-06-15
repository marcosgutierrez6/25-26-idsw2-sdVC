<template>
  <div class="p-6">
    <div class="flex items-center justify-between mb-6">
      <h1 class="text-2xl font-bold text-surface-900 dark:text-surface-0">Preguntas</h1>
      <Button label="Nueva Pregunta" icon="pi pi-plus" @click="router.push('/preguntas/nuevo')" />
    </div>

    <DataTable :value="items" :loading="loading" :paginator="true" :rows="limit" :totalRecords="total" lazy @page="onPage">
      <Column field="id" header="ID" sortable style="width: 60px" />
      <Column field="enunciado" header="Enunciado" />
      <Column field="tema" header="Tema" sortable style="width: 100px" />
      <Column field="dificultad" header="Dificultad" sortable style="width: 80px" />
      <Column header="Respuestas" style="width: 80px">
        <template #body="{ data }">
          <span class="respuesta-numero">{{ data.respuestas.length }}</span>
        </template>
      </Column>
      <Column header="Acciones" style="width: 100px">
        <template #body="{ data }">
          <Button icon="pi pi-pencil" class="p-button-text" @click="router.push(`/preguntas/${data.id}/editar`)" />
          <Button icon="pi pi-trash" class="p-button-text p-button-danger" @click="confirmarEliminar(data)" />
        </template>
      </Column>
    </DataTable>

    <Dialog v-model:visible="deleteDialog" header="Confirmar eliminación" modal>
      <p class="m-0">¿Estás seguro de que quieres eliminar esta pregunta?</p>
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
    const { data } = await api.get('/preguntas', { params: { page: page.value, limit } });
    items.value = data.data;
    total.value = data.total;
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
  await api.delete(`/preguntas/${itemToDelete.value.id}`);
  deleteDialog.value = false;
  itemToDelete.value = null;
  cargar();
}
</script>

<style scoped>
.respuesta-numero {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  font-weight: bold;
  font-size: 0.875rem;
}

.respuesta-numero.correcta {
  background: linear-gradient(135deg, #84fab0 0%, #8fd3f4 100%);
  color: #333;
}
</style>
