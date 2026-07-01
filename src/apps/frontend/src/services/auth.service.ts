import api from '../api/axios';

export async function IniciarSesion(email: string, password: string) {
  const { data } = await api.post('/auth/login', { email, password });
  return data;
}

export async function CerrarSesion() {
  const { data } = await api.post('/auth/logout');
  return data;
}
