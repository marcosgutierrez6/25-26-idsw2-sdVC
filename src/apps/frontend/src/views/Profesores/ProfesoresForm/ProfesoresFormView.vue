<template>
  <div class="bg-surface-0 dark:bg-surface-950 p-6">
    <div class="flex items-center justify-between mb-6">
      <h1 class="text-2xl font-bold text-surface-900 dark:text-surface-0">
        {{ profesor?.id ? 'Editar Profesor' : 'Nuevo Profesor' }}
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
        <label for="password">Contraseña</label>
        <InputText id="password" v-model="form.password" type="password" class="w-full" :required="!profesor?.id" />
      </div>

      <div class="flex gap-2 mt-6">
        <Button type="submit" :label="profesor?.id ? 'Actualizar' : 'Crear'" icon="pi pi-check" />
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

const route = useRoute();
const router = useRouter();

const profesorId = computed(() => route.params.id ? Number(route.params.id) : null);

const form = ref({ nombre: '', apellidos: '', dni: '', email: '', password: '' });
const profesor = ref<any>(null);

onMounted(async () => {
  if (profesorId.value) {
    const { data } = await api.get(`/profesores/${profesorId.value}`);
    profesor.value = data;
    form.value = {
      nombre: data.nombre,
      apellidos: data.apellidos,
      dni: data.dni,
      email: data.email,
      password: '',
    };
  }
});

async function guardar() {
  try {
    if (profesorId.value) {
      const payload: Record<string, any> = {
        nombre: form.value.nombre,
        apellidos: form.value.apellidos,
        dni: form.value.dni,
        email: form.value.email,
      };
      if (form.value.password) {
        payload.password = form.value.password;
      }
      await api.patch(`/profesores/${profesorId.value}`, payload);
    } else {
      await api.post('/profesores', form.value);
    }
    router.push('/profesores');
  } catch (error) {
    console.error('Error al guardar profesor:', error);
  }
}

function volver() {
  router.push('/profesores');
}
</script>

<style scoped>
.field { margin-bottom: 1rem; }
.field label { display: block; margin-bottom: 0.5rem; font-weight: 500; }
</style>
