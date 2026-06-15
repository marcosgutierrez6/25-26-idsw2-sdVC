<template>
  <div class="bg-surface-0 dark:bg-surface-950 p-6">
    <div class="flex items-center justify-between mb-6">
      <h1 class="text-2xl font-bold text-surface-900 dark:text-surface-0">
        {{ pregunta?.id ? 'Editar Pregunta Contextual' : 'Nueva Pregunta Contextual' }}
      </h1>
      <Button label="Volver" icon="pi pi-arrow-left" severity="secondary" @click="volver" />
    </div>

    <form @submit.prevent="guardar" class="max-w-2xl">
      <TabPills :tabs="tabs" v-model="active" class="mb-6" />

      <div v-if="active === 0" class="space-y-4">
        <div class="field">
          <label for="asignatura">Asignatura</label>
          <Select
            id="asignatura"
            v-model="form.asignaturaId"
            :options="asignaturas"
            optionLabel="titulo"
            optionValue="id"
            class="w-full"
            required
            :disabled="!!pregunta?.id"
          />
        </div>

        <div class="field">
          <label for="enunciado">Enunciado</label>
          <Textarea
            id="enunciado"
            v-model="form.enunciado"
            class="w-full"
            rows="4"
            required
          />
        </div>

        <div class="field">
          <label for="tema">Tema</label>
          <InputText
            id="tema"
            v-model="form.tema"
            class="w-full"
            required
          />
        </div>

        <div class="field">
          <label for="dificultad">Dificultad</label>
          <Select
            id="dificultad"
            v-model="form.dificultad"
            :options="['BAJA', 'MEDIA', 'ALTA']"
            class="w-full"
            required
          />
        </div>

        <div class="field">
          <label for="contexto">Contexto</label>
          <Textarea
            id="contexto"
            v-model="form.contexto"
            class="w-full"
            rows="4"
            placeholder="Describe el contexto o escenario para esta pregunta"
            required
          />
        </div>

        <div class="field">
          <label for="recursos">Recursos/Materiales Necesarios</label>
          <Textarea
            id="recursos"
            v-model="form.recursos"
            class="w-full"
            rows="3"
            placeholder="Documenta, imágenes, videos, o recursos que el estudiante debe usar"
          />
        </div>

        <div class="field">
          <label for="tiempoEstimado">Tiempo Estimado (minutos)</label>
          <InputNumber
            id="tiempoEstimado"
            v-model="form.tiempoEstimado"
            class="w-full"
            :min="1"
            :max="180"
          />
        </div>
      </div>

      <div v-if="active === 1" class="space-y-4">
        <h3 class="text-lg font-semibold">Respuestas</h3>
        <div v-for="(r, i) in form.respuestas" :key="i" class="p-4 border border-surface-300 dark:border-surface-700 rounded-lg">
          <div class="flex justify-between items-center mb-3">
            <label class="font-semibold">Opción {{ i + 1 }}</label>
            <Button
              icon="pi pi-trash"
              class="p-button-text p-button-danger"
              @click="form.respuestas.splice(i, 1)"
              v-if="form.respuestas.length > 2"
              type="button"
            />
          </div>

          <div class="field">
            <label>Texto de la respuesta</label>
            <Textarea
              v-model="r.opcion"
              placeholder="Ingrese la opción de respuesta"
              class="w-full"
              rows="2"
              required
            />
          </div>

          <div class="field">
            <label>Explicación</label>
            <Textarea
              v-model="r.explicacion"
              placeholder="Explique por qué esta respuesta es correcta/incorrecta"
              class="w-full"
              rows="2"
            />
          </div>

          <div class="flex items-center gap-3">
            <Checkbox v-model="r.esCorrecta" :binary="true" :input-id="`correcta-${i}`" />
            <label :for="`correcta-${i}`">Respuesta correcta</label>
          </div>
        </div>

        <Button
          label="Añadir respuesta"
          icon="pi pi-plus"
          class="p-button-sm"
          @click="form.respuestas.push({ opcion: '', esCorrecta: false, explicacion: '' })"
          v-if="form.respuestas.length < 5"
          type="button"
        />
      </div>

      <div class="flex gap-2 mt-6">
        <Button type="submit" :label="pregunta?.id ? 'Actualizar' : 'Crear'" icon="pi pi-check" />
        <Button label="Cancelar" severity="secondary" @click="volver" type="button" />
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import api from '../../../api/axios';
import TabPills from '../../../components/TabPills.vue';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import InputNumber from 'primevue/inputnumber';
import Textarea from 'primevue/textarea';
import Select from 'primevue/select';
import Checkbox from 'primevue/checkbox';

const route = useRoute();
const router = useRouter();

const preguntaId = computed(() => route.params.id ? Number(route.params.id) : null);

const form = ref({
  asignaturaId: null,
  enunciado: '',
  tema: '',
  dificultad: 'MEDIA',
  contexto: '',
  recursos: '',
  tiempoEstimado: 15,
  respuestas: [
    { opcion: '', esCorrecta: false, explicacion: '' },
    { opcion: '', esCorrecta: false, explicacion: '' }
  ]
});

const pregunta = ref<any>(null);
const asignaturas = ref<any[]>([]);
const active = ref(0);

const tabs = computed(() => [
  { label: 'Información general', icon: 'pi pi-info-circle' },
  { label: 'Respuestas', icon: 'pi pi-list' },
]);

onMounted(async () => {
  cargarAsignaturas();
  if (preguntaId.value) {
    const { data } = await api.get(`/preguntas/${preguntaId.value}`);
    pregunta.value = data;
    form.value = {
      asignaturaId: data.bateria?.asignaturaId || null,
      enunciado: data.enunciado,
      tema: data.tema,
      dificultad: data.dificultad,
      contexto: data.contextoPreguntas?.contexto || '',
      recursos: data.contextoPreguntas?.recursos || '',
      tiempoEstimado: data.contextoPreguntas?.tiempoEstimado || 15,
      respuestas: data.respuestas.map((r: any) => ({
        opcion: r.opcion,
        esCorrecta: r.esCorrecta,
        explicacion: r.explicacion || ''
      })),
    };
  }
});

async function cargarAsignaturas() {
  const { data } = await api.get('/asignaturas', { params: { limit: 100 } });
  asignaturas.value = data.data;
}

async function guardar() {
  try {
    if (preguntaId.value) {
      await api.patch(`/preguntas/${preguntaId.value}`, {
        enunciado: form.value.enunciado,
        tema: form.value.tema,
        dificultad: form.value.dificultad,
      });

      await api.patch(`/preguntas/${preguntaId.value}/contexto`, {
        contexto: form.value.contexto,
        recursos: form.value.recursos,
        tiempoEstimado: form.value.tiempoEstimado,
      });
    } else {
      const baterias = await api.get('/bateria');
      let bateria = baterias.data.find((b: any) => b.asignaturaId === form.value.asignaturaId);
      if (!bateria) {
        bateria = (await api.post('/bateria', { asignaturaId: form.value.asignaturaId })).data;
      }

      const { data: preguntaCreada } = await api.post('/preguntas', {
        enunciado: form.value.enunciado,
        tema: form.value.tema,
        dificultad: form.value.dificultad,
        bateriaId: bateria.id,
        esContextual: true,
      });

      await api.post(`/preguntas/${preguntaCreada.id}/contexto`, {
        contexto: form.value.contexto,
        recursos: form.value.recursos,
        tiempoEstimado: form.value.tiempoEstimado,
      });

      for (const r of form.value.respuestas) {
        if (r.opcion) {
          await api.post('/respuestas', {
            opcion: r.opcion,
            esCorrecta: r.esCorrecta,
            explicacion: r.explicacion,
            preguntaId: preguntaCreada.id,
          });
        }
      }
    }
    router.push('/preguntas-contextuales');
  } catch (error) {
    console.error('Error al guardar pregunta contextual:', error);
  }
}

function volver() {
  router.push('/preguntas-contextuales');
}
</script>

<style scoped>
.field { margin-bottom: 1rem; }
.field label { display: block; margin-bottom: 0.5rem; font-weight: 500; }
</style>
