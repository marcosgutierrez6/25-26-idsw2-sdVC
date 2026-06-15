<template>
  <div class="layout">
    <Toolbar class="toolbar">
      <template #start>
        <Button icon="pi pi-bars" @click="sidebarVisible = !sidebarVisible" class="p-button-text" />
        <span class="font-bold ml-2">Generador de Exámenes</span>
      </template>
      <template #end>
        <span class="mr-2">{{ auth.user?.nombre }} {{ auth.user?.apellidos }}</span>
        <Button label="Cerrar sesión" icon="pi pi-sign-out" severity="secondary" @click="cerrarSesion" />
      </template>
    </Toolbar>

    <Sidebar v-model:visible="sidebarVisible">
      <Menu :model="menuItems" />
    </Sidebar>

    <div class="content">
      <router-view />
    </div>
    <Toast />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/auth';
import Toolbar from 'primevue/toolbar';
import Button from 'primevue/button';
import Sidebar from 'primevue/sidebar';
import Menu from 'primevue/menu';
import Toast from 'primevue/toast';
import type { MenuItem } from 'primevue/menuitem';

const auth = useAuthStore();
const router = useRouter();
const sidebarVisible = ref(false);

const menuItems = computed<MenuItem[]>(() => [
  { label: 'Dashboard', icon: 'pi pi-home', command: () => router.push('/') },
  { label: 'Grados', icon: 'pi pi-book', command: () => router.push('/grados') },
  { label: 'Asignaturas', icon: 'pi pi-bookmark', command: () => router.push('/asignaturas') },
  { label: 'Alumnos', icon: 'pi pi-users', command: () => router.push('/alumnos') },
  ...(auth.isAdmin
    ? [{ label: 'Profesores', icon: 'pi pi-user', command: () => router.push('/profesores') as any }]
    : []),
  { label: 'Preguntas', icon: 'pi pi-question-circle', command: () => router.push('/preguntas') },
  { label: 'Exámenes', icon: 'pi pi-file', command: () => router.push('/examenes') },
]);

function cerrarSesion() {
  auth.logout();
  router.push('/login');
}
</script>

<style scoped>
.layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
.toolbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
}
.content {
  margin-top: 4rem;
  padding: 1.5rem;
}
</style>
