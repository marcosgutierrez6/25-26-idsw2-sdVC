import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { IniciarSesion, CerrarSesion } from '../services/auth.service';

interface User {
  id: number;
  nombre: string;
  apellidos: string;
  email: string;
  rol: string;
}

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null);
  const token = ref<string | null>(localStorage.getItem('access_token'));

  const isAuthenticated = computed(() => !!token.value);
  const isAdmin = computed(() => user.value?.rol === 'ADMIN');
  const isDocente = computed(() => user.value?.rol === 'DOCENTE');

  async function IniciarSesionStore(email: string, password: string) {
    const data = await IniciarSesion(email, password);
    token.value = data.access_token;
    user.value = data.user;
    localStorage.setItem('access_token', data.access_token);
    return data;
  }

  function CerrarSesionStore() {
    user.value = null;
    token.value = null;
    localStorage.removeItem('access_token');
    CerrarSesion();
  }

  return { user, token, isAuthenticated, isAdmin, isDocente, IniciarSesion: IniciarSesionStore, CerrarSesion: CerrarSesionStore };
});
