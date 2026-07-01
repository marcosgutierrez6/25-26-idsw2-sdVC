<template>
  <div class="flex h-screen w-screen bg-surface-50 dark:bg-surface-950 font-sans antialiased overflow-hidden">

    <div class="bg-surface-900 h-screen border-r border-surface-800 flex flex-col w-80 select-none shrink-0 z-50">
      <div class="p-4 flex items-center justify-center h-40">
        <img src="../assets/images/JorgestorLogo.png" alt="Jorgestor" class="w-full h-full object-cover" />
      </div>

      <div class="overflow-y-auto flex-1 p-2 flex flex-col gap-4">
        <!-- Elementos fijos superiores -->
        <ul class="list-none m-0 flex flex-col gap-1">
          <li>
            <router-link
              to="/dashboard"
              class="menu-link"
              :class="{ 'menu-active': $route.path === '/dashboard' }"
            >
              <i class="pi pi-home text-base! leading-none!" />
              <span class="font-medium text-base leading-tight">Inicio</span>
              <span v-if="$route.path === '/dashboard'" class="menu-indicator" />
            </router-link>
          </li>
          <li>
            <router-link
              to="/examenes"
              class="menu-link"
              :class="{ 'menu-active': $route.path === '/examenes' }"
            >
              <i class="pi pi-file text-base! leading-none!" />
              <span class="font-medium text-base leading-tight">Exámenes</span>
              <span v-if="$route.path === '/examenes'" class="menu-indicator" />
            </router-link>
          </li>
        </ul>

        <hr class="border-t border-surface-800 my-0" />

        <!-- Secciones colapsables -->
        <ul v-for="(section, si) in collapsibleSections" :key="si" class="list-none m-0 flex flex-col">
          <li>
            <div
              @click="toggleSection(si)"
              class="flex items-center cursor-pointer p-3 gap-4 rounded-lg section-header"
            >
              <span class="font-semibold text-base leading-tight">{{ section.title }}</span>
              <i :class="{ 'pi pi-angle-down': !openSections[si], 'pi pi-angle-up': openSections[si] }" class="text-base! leading-none! text-surface-400 ml-auto" />
            </div>
            <ul v-show="openSections[si]" class="list-none m-0 flex flex-col gap-1 mt-1">
              <li v-for="(item, ii) in section.items" :key="ii">
                <router-link
                  v-if="!item.adminOnly || auth.isAdmin"
                  :to="item.path"
                  class="menu-link"
                  :class="{ 'menu-active': $route.path === item.path }"
                >
                  <span class="inline-flex items-center justify-center p-1 bg-blue-500/30 rounded-md border border-blue-500/30">
                    <i :class="item.icon + ' text-xs! leading-none! text-violet-200'" />
                  </span>
                  <span class="font-medium text-base leading-tight">{{ item.text }}</span>
                  <span v-if="$route.path === item.path" class="menu-indicator" />
                </router-link>
              </li>
            </ul>
          </li>
          <li v-if="si < collapsibleSections.length - 1">
            <hr class="border-t border-surface-800 my-0" />
          </li>
        </ul>
      </div>

      <div class="p-2 mt-auto border-surface-800 border-t">
        <ul class="list-none p-2 m-0 overflow-hidden hidden animate-duration-150">
          <li>
            <router-link :to="`/docentes/${auth.user?.id}/editar`" class="flex items-center cursor-pointer p-3 gap-2 rounded-lg text-surface-400 border border-transparent menu-link hover:text-surface-0 hover:bg-surface-800">
              <i class="pi pi-user text-base! leading-none!" />
              <span class="font-medium text-base leading-tight">Editar Perfil</span>
            </router-link>
          </li>
          <li>
            <a class="flex items-center cursor-pointer p-3 gap-2 rounded-lg text-surface-400 border border-transparent menu-link hover:text-surface-0 hover:bg-surface-800" @click="cerrarSesion">
              <i class="pi pi-sign-out text-base! leading-none!" />
              <span class="font-medium text-base leading-tight">Cerrar sesión</span>
            </a>
          </li>
        </ul>
        <a
          v-styleclass="{
            selector: '@prev',
            enterFromClass: 'hidden',
            enterActiveClass: 'animate-slidedown',
            leaveToClass: 'hidden',
            leaveActiveClass: 'animate-slideup'
          }"
          class="flex items-center cursor-pointer p-2 gap-2 text-surface-400 hover:text-surface-0 transition-colors"
        >
          <img src="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png" class="w-8 h-8 rounded-full" />
          <span class="font-medium text-base leading-tight">{{ auth.user?.nombre }} {{ auth.user?.apellidos }}</span>
          <i class="pi pi-angle-up text-base! leading-none! text-surface-400 ml-auto" />
        </a>
      </div>
    </div>

    <main class="flex-1 h-full overflow-y-auto">
      <router-view />
    </main>

    <Toast />
  </div>
</template>

<script setup lang="ts">
import 'primeicons/primeicons.css';
import { useRoute, useRouter } from 'vue-router';
import { useAuthStore } from '../stores/auth';
import { ref } from 'vue';
import Toast from 'primevue/toast';

const auth = useAuthStore();
const router = useRouter();
const $route = useRoute();

const openSections = ref<boolean[]>([true, true]); // Todas las secciones abiertas por defecto

function toggleSection(index: number) {
  openSections.value[index] = !openSections.value[index];
}

function cerrarSesion() {
  auth.CerrarSesion();
  router.push('/auth/login');
}

interface MenuItem {
  path: string
  text: string
  icon: string
  adminOnly?: boolean
}

interface MenuSection {
  title: string
  items: MenuItem[]
}

const collapsibleSections: MenuSection[] = [
  {
    title: 'Academia',
    items: [
      { path: '/alumnos', text: 'Alumnos', icon: 'pi pi-users' },
      { path: '/docentes', text: 'Docentes', icon: 'pi pi-user', adminOnly: true },
      { path: '/preguntas', text: 'Preguntas', icon: 'pi pi-question-circle' },
      { path: '/bateria', text: 'Batería', icon: 'pi pi-database' },
    ],
  },
  {
    title: 'Configuración',
    items: [
      { path: '/grados', text: 'Grados', icon: 'pi pi-book' },
      { path: '/asignaturas', text: 'Asignaturas', icon: 'pi pi-bookmark' },
      { path: '/configuracion/exportar', text: 'Exportar', icon: 'pi pi-download' },
      { path: '/configuracion/importar', text: 'Importar', icon: 'pi pi-upload' },
    ],
  },
];
</script>

<style scoped>
.section-header {
  color: var(--p-surface-0);
  border: 1px solid transparent;
  transition: all 0.15s;
}
.section-header:hover {
  background-color: var(--p-surface-800);
  border-color: var(--p-surface-700);
}

.menu-link {
  position: relative;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem;
  border-radius: 0.5rem;
  color: var(--p-surface-400);
  border: 1px solid transparent;
  transition: all 0.15s;
  cursor: pointer;
  text-decoration: none;
}
.menu-link:hover {
  background-color: var(--p-surface-800);
  border-color: var(--p-surface-700);
  color: var(--p-surface-0);
}

.menu-active {
  background-color: var(--p-surface-800) !important;
  color: var(--p-surface-0) !important;
  border-color: var(--p-surface-700) !important;
}

.menu-indicator {
  position: absolute;
  left: 0;
  width: 4px;
  height: 1.5rem;
  background: var(--p-primary-color);
  border-radius: 0 4px 4px 0;
}
</style>
