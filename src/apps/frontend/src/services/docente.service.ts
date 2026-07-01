import api from '../api/axios';

export async function verDocente(page = 1, limit = 10, id?: number) {
  if (id) {
    const { data } = await api.get(`/docentes/${id}`);
    return data;
  }
  const { data } = await api.get('/docentes', { params: { page, limit } });
  return data;
}

export async function crearDocente(payload: Record<string, any>) {
  const { data } = await api.post('/docentes', payload);
  return data;
}

export async function editarDocente(id: number, payload: Record<string, any>) {
  const { data } = await api.patch(`/docentes/${id}`, payload);
  return data;
}

export async function eliminarDocente(id: number) {
  await api.delete(`/docentes/${id}`);
}
