<template>
  <div class="bg-surface-0 dark:bg-surface-950 p-6">
    <div class="flex items-center justify-between mb-6">
      <h1 class="text-2xl font-bold text-surface-900 dark:text-surface-0">
        {{ grado?.id ? 'Editar Grado' : 'Nuevo Grado' }}
      </h1>
      <Button label="Volver" icon="pi pi-arrow-left" severity="secondary" @click="volver" />
    </div>

    <TabPills :tabs="tabs" v-model="active" class="mb-6" />

    <div v-if="active === 0">
      <form @submit.prevent="guardar" class="max-w-md">
        <div class="field">
          <label for="titulo">Título</label>
          <InputText id="titulo" v-model="form.titulo" class="w-full" required />
        </div>
        <div class="field">
          <label for="codigo">Código</label>
          <InputText id="codigo" v-model="form.codigo" class="w-full" required />
        </div>
        <div class="flex gap-2 mt-4">
          <Button type="submit" :label="grado?.id ? 'Actualizar' : 'Crear'" icon="pi pi-check" />
          <Button label="Cancelar" severity="secondary" @click="volver" />
        </div>
      </form>
    </div>

    <div v-if="active === 1">
      <DataTable :value="asignaturas" :loading="loadingAsig" :paginator="true" :rows="10" :totalRecords="totalAsig" lazy @page="onPageAsig">
        <Column field="id" header="ID" sortable />
        <Column field="titulo" header="Título" sortable />
        <Column field="codigo" header="Código" />
        <Column field="cursoAcademico" header="Curso" />
      </DataTable>
    </div>

    <div v-if="active === 2">
      <DataTable :value="alumnos" :loading="loadingAlu" :paginator="true" :rows="10" :totalRecords="totalAlu" lazy @page="onPageAlu">
        <Column field="id" header="ID" sortable />
        <Column field="nombre" header="Nombre" sortable />
        <Column field="apellidos" header="Apellidos" sortable />
        <Column field="dni" header="DNI" />
        <Column field="email" header="Email" />
      </DataTable>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import api from '../../../api/axios';
import TabPills from '../../../components/TabPills.vue';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';

const route = useRoute();
const router = useRouter();

const gradoId = computed(() => route.params.id ? Number(route.params.id) : null);

const form = ref({ titulo: '', codigo: '' });
const grado = ref<any>(null);

const asignaturas = ref<any[]>([]);
const totalAsig = ref(0);
const loadingAsig = ref(false);
const pageAsig = ref(1);

const alumnos = ref<any[]>([]);
const totalAlu = ref(0);
const loadingAlu = ref(false);
const pageAlu = ref(1);

const active = ref(0);

const tabs = computed(() => [
  { label: 'Configuración general', icon: 'pi pi-cog' },
  { label: 'Asignaturas', icon: 'pi pi-bookmark', disabled: !gradoId.value },
  { label: 'Alumnos', icon: 'pi pi-users', disabled: !gradoId.value },
]);

onMounted(async () => {
  if (gradoId.value) {
    const { data } = await api.get(`/grados/${gradoId.value}`);
    grado.value = data;
    form.value = { titulo: data.titulo, codigo: data.codigo };
    cargarAsignaturas();
    cargarAlumnos();
  }
});

async function cargarAsignaturas() {
  if (!gradoId.value) return;
  loadingAsig.value = true;
  try {
    const { data: res } = await api.get('/asignaturas', { params: { page: pageAsig.value, limit: 10, gradoId: gradoId.value } });
    asignaturas.value = res.data;
    totalAsig.value = res.total;
  } finally {
    loadingAsig.value = false;
  }
}

function onPageAsig(event: any) {
  pageAsig.value = event.page + 1;
  cargarAsignaturas();
}

async function cargarAlumnos() {
  if (!gradoId.value) return;
  loadingAlu.value = true;
  try {
    const { data: res } = await api.get('/alumnos', { params: { page: pageAlu.value, limit: 10, gradoId: gradoId.value } });
    alumnos.value = res.data;
    totalAlu.value = res.total;
  } finally {
    loadingAlu.value = false;
  }
}

function onPageAlu(event: any) {
  pageAlu.value = event.page + 1;
  cargarAlumnos();
}

async function guardar() {
  if (gradoId.value) {
    await api.patch(`/grados/${gradoId.value}`, form.value);
  } else {
    await api.post('/grados', form.value);
  }
  router.push('/grados');
}

function volver() {
  router.push('/grados');
}
</script>

<style scoped>
.field { margin-bottom: 1rem; }
.field label { display: block; margin-bottom: 0.5rem; }
</style>
