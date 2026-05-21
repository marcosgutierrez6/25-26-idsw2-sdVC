import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import api from '../api/axios';

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

  async function login(email: string, password: string) {
    const { data } = await api.post('/auth/login', { email, password });
    token.value = data.access_token;
    user.value = data.user;
    localStorage.setItem('access_token', data.access_token);
    return data;
  }

  async function register(nombre: string, apellidos: string, dni: string, email: string, password: string) {
    const { data } = await api.post('/auth/register', { nombre, apellidos, dni, email, password });
    token.value = data.access_token;
    user.value = data.user;
    localStorage.setItem('access_token', data.access_token);
    return data;
  }

  function logout() {
    user.value = null;
    token.value = null;
    localStorage.removeItem('access_token');
  }

  return { user, token, isAuthenticated, isAdmin, isDocente, login, register, logout };
});
