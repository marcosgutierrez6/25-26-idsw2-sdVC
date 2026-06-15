<template>
  <div class="bg-surface-0 dark:bg-surface-950 p-6">
    <div class="flex items-center justify-between mb-6">
      <h1 class="text-2xl font-bold text-surface-900 dark:text-surface-0">
        {{ alumno?.id ? 'Editar Alumno' : 'Nuevo Alumno' }}
      </h1>
      <Button label="Volver" icon="pi pi-arrow-left" severity="secondary" @click="volver" />
    </div>

    <form @submit.prevent="guardar" class="max-w-md space-y-4">
      <div class="field">
        <label for="nombre">Nombre</label>
        <InputText id="nombre" v-model="form.nombre" class="w-full" required />
      </div>

      <div class="field">
        <label for="apellidos">Apellidos</label>
        <InputText id="apellidos" v-model="form.apellidos" class="w-full" required />
      </div>

      <div class="field">
        <label for="dni">DNI</label>
        <InputText id="dni" v-model="form.dni" class="w-full" required />
      </div>

      <div class="field">
        <label for="email">Email</label>
        <InputText id="email" v-model="form.email" type="email" class="w-full" required />
      </div>

      <div class="field">
        <label for="grado">Grado</label>
        <Select id="grado" v-model="form.gradoId" :options="grados" optionLabel="titulo" optionValue="id" class="w-full" />
      </div>

      <div class="flex gap-2 mt-6">
        <Button type="submit" :label="alumno?.id ? 'Actualizar' : 'Crear'" icon="pi pi-check" />
        <Button label="Cancelar" severity="secondary" @click="volver" type="button" />
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import api from '../../../api/axios';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import Select from 'primevue/select';

const route = useRoute();
const router = useRouter();

const alumnoId = computed(() => route.params.id ? Number(route.params.id) : null);

const form = ref({ nombre: '', apellidos: '', dni: '', email: '', gradoId: null });
const alumno = ref<any>(null);
const grados = ref<any[]>([]);

onMounted(async () => {
  await cargarGrados();
  if (alumnoId.value) {
    const { data } = await api.get(`/alumnos/${alumnoId.value}`);
    alumno.value = data;
    form.value = {
      nombre: data.nombre,
      apellidos: data.apellidos,
      dni: data.dni,
      email: data.email,
      gradoId: data.gradoId,
    };
  }
});

async function cargarGrados() {
  const { data: res } = await api.get('/grados', { params: { limit: 100 } });
  grados.value = res.data;
}

async function guardar() {
  try {
    if (alumnoId.value) {
      await api.patch(`/alumnos/${alumnoId.value}`, form.value);
    } else {
      await api.post('/alumnos', form.value);
    }
    router.push('/alumnos');
  } catch (error) {
    console.error('Error al guardar alumno:', error);
  }
}

function volver() {
  router.push('/alumnos');
}
</script>

<style scoped>
.field { margin-bottom: 1rem; }
.field label { display: block; margin-bottom: 0.5rem; font-weight: 500; }
</style>
