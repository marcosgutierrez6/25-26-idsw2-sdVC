import { defineStore } from 'pinia';
import { ref } from 'vue';

export const usePreguntasFormStore = defineStore('preguntasForm', () => {
  const asignaturaIdTmp = ref<number | null>(null);

  function setAsignaturaId(id: number | null) {
    asignaturaIdTmp.value = id;
  }

  function getAsignaturaId() {
    return asignaturaIdTmp.value;
  }

  function clearAsignaturaId() {
    asignaturaIdTmp.value = null;
  }

  return {
    asignaturaIdTmp,
    setAsignaturaId,
    getAsignaturaId,
    clearAsignaturaId,
  };
});
