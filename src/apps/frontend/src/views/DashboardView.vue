<template>
  <div class="w-full bg-surface-50 dark:bg-surface-950 font-sans antialiased text-surface-700 dark:text-surface-200 select-none p-8 flex flex-col gap-8">

    <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      <div class="flex flex-col gap-0.5">
        <h1 class="text-2xl font-bold text-surface-900 dark:text-surface-0 tracking-tight">Dashboard</h1>
        <p class="text-sm text-surface-500 dark:text-surface-400 font-medium">Resumen del sistema</p>
      </div>

      <div class="flex items-center gap-3 self-end md:self-auto">
        <div class="relative">
          <i class="pi pi-search absolute left-3 top-1/2 -translate-y-1/2 text-surface-400 dark:text-surface-500 text-sm" />
          <input
            v-model="search"
            type="text"
            placeholder="Buscar..."
            class="w-64 pl-9 pr-4 py-2 bg-surface-0 dark:bg-surface-800 border border-surface-200 dark:border-surface-600 rounded-xl text-sm focus:outline-none focus:border-primary transition-colors shadow-sm placeholder-surface-400 dark:placeholder-surface-500 text-surface-700 dark:text-surface-200"
          />
        </div>
        <button class="w-10 h-10 bg-surface-0 dark:bg-surface-800 border border-surface-200 dark:border-surface-600 rounded-xl flex items-center justify-center text-surface-500 dark:text-surface-400 hover:bg-surface-100 dark:hover:bg-surface-700 shadow-sm cursor-pointer transition-colors">
          <i class="pi pi-bell" />
        </button>
      </div>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">

      <div class="p-5 bg-cyan-50 dark:bg-cyan-400/10 rounded-2xl border border-cyan-100 dark:border-cyan-400/20 flex flex-col gap-5 relative overflow-hidden">
        <div class="flex justify-between items-center">
          <div class="flex justify-center items-center h-10 w-10 bg-cyan-500 text-surface-0 rounded-xl shadow-sm">
            <i class="pi pi-book text-lg" />
          </div>
          <span class="text-xs font-semibold text-cyan-500/80 bg-surface-0/80 dark:bg-surface-900/80 px-2 py-1 rounded-md shadow-sm">Grados</span>
        </div>
        <div class="flex flex-col gap-1">
          <span class="text-sm text-cyan-600 dark:text-cyan-300 font-semibold tracking-wide">Grados</span>
          <div class="text-3xl font-bold text-cyan-900 dark:text-cyan-100 tracking-tight">{{ stats.grados }}</div>
        </div>
      </div>

      <div class="p-5 bg-orange-50 dark:bg-orange-400/10 rounded-2xl border border-orange-100 dark:border-orange-400/20 flex flex-col gap-5 relative overflow-hidden">
        <div class="flex justify-between items-center">
          <div class="flex justify-center items-center h-10 w-10 bg-orange-500 text-surface-0 rounded-xl shadow-sm">
            <i class="pi pi-bookmark text-lg" />
          </div>
          <span class="text-xs font-semibold text-orange-500/80 bg-surface-0/80 dark:bg-surface-900/80 px-2 py-1 rounded-md shadow-sm">Asignaturas</span>
        </div>
        <div class="flex flex-col gap-1">
          <span class="text-sm text-orange-600 dark:text-orange-300 font-semibold tracking-wide">Asignaturas</span>
          <div class="text-3xl font-bold text-orange-900 dark:text-orange-100 tracking-tight">{{ stats.asignaturas }}</div>
        </div>
      </div>

      <div class="p-5 bg-slate-100 dark:bg-slate-400/10 rounded-2xl border border-slate-200 dark:border-slate-400/20 flex flex-col gap-5 relative overflow-hidden">
        <div class="flex justify-between items-center">
          <div class="flex justify-center items-center h-10 w-10 bg-slate-600 dark:bg-slate-500 text-surface-0 rounded-xl shadow-sm">
            <i class="pi pi-users text-lg" />
          </div>
          <span class="text-xs font-semibold text-slate-500/80 bg-surface-0/80 dark:bg-surface-900/80 px-2 py-1 rounded-md shadow-sm">Alumnos</span>
        </div>
        <div class="flex flex-col gap-1">
          <span class="text-sm text-slate-600 dark:text-slate-300 font-semibold tracking-wide">Alumnos</span>
          <div class="text-3xl font-bold text-slate-800 dark:text-slate-100 tracking-tight">{{ stats.alumnos }}</div>
        </div>
      </div>

      <div class="p-5 bg-purple-50 dark:bg-purple-400/10 rounded-2xl border border-purple-100 dark:border-purple-400/20 flex flex-col gap-5 relative overflow-hidden">
        <div class="flex justify-between items-center">
          <div class="flex justify-center items-center h-10 w-10 bg-purple-500 text-surface-0 rounded-xl shadow-sm">
            <i class="pi pi-question-circle text-lg" />
          </div>
          <span class="text-xs font-semibold text-purple-500/80 bg-surface-0/80 dark:bg-surface-900/80 px-2 py-1 rounded-md shadow-sm">Preguntas</span>
        </div>
        <div class="flex flex-col gap-1">
          <span class="text-sm text-purple-600 dark:text-purple-300 font-semibold tracking-wide">Preguntas</span>
          <div class="text-3xl font-bold text-purple-900 dark:text-purple-100 tracking-tight">{{ stats.preguntas }}</div>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 w-full items-start">

      <div class="bg-surface-0 dark:bg-surface-900 rounded-3xl p-6 shadow-sm border border-surface-200 dark:border-surface-700 lg:col-span-2 flex flex-col gap-6">
        <span class="text-lg font-bold text-surface-900 dark:text-surface-0 tracking-tight">Últimos Exámenes</span>

        <div class="flex flex-col gap-3">
          <div
            v-for="examen in ultimosExamenes"
            :key="examen.id"
            class="flex items-center justify-between p-3 bg-surface-0 dark:bg-surface-900 border border-surface-200 dark:border-surface-700 rounded-2xl hover:bg-surface-50 dark:hover:bg-surface-800 transition-all duration-200 cursor-pointer shadow-sm"
          >
            <div class="flex items-center gap-4">
              <div class="w-12 h-12 bg-emerald-500 text-surface-0 rounded-xl flex items-center justify-center shadow-sm">
                <i class="pi pi-file text-lg" />
              </div>
              <div class="flex flex-col">
                <span class="font-semibold text-surface-900 dark:text-surface-0 text-base">{{ examen.asignatura?.titulo || 'Sin asignatura' }}</span>
                <span class="text-xs text-surface-500 dark:text-surface-400 font-medium">{{ formatDate(examen.createdAt) }}</span>
              </div>
            </div>
            <div class="flex items-center gap-4">
              <Tag :value="examen.estado" :severity="estadoSeverity(examen.estado)" class="rounded-lg px-2.5 py-1 text-xs font-bold" />
              <i class="pi pi-chevron-right text-surface-300 dark:text-surface-600 pr-1" />
            </div>
          </div>

          <div v-if="ultimosExamenes.length === 0" class="text-center py-12 text-surface-400 dark:text-surface-500 font-medium flex flex-col items-center gap-2">
            <i class="pi pi-folder-open text-3xl text-surface-300 dark:text-surface-600" />
            No hay exámenes recientes
          </div>
        </div>
      </div>

      <div class="bg-surface-0 dark:bg-surface-900 shadow-sm rounded-3xl p-6 border border-surface-200 dark:border-surface-700 flex flex-col gap-6">
        <span class="text-lg font-bold text-surface-900 dark:text-surface-0 tracking-tight">Exámenes por Estado</span>

        <div class="flex flex-col gap-3">
          <div class="flex justify-between items-end">
            <span class="text-4xl font-extrabold text-surface-900 dark:text-surface-0 tracking-tight">{{ stats.examenes }}</span>
            <span class="text-sm font-semibold text-surface-500 dark:text-surface-400 pb-1">Total exámenes</span>
          </div>

          <MeterGroup
            :value="meterItems"
            :pt="{
              meters: { class: 'h-3 bg-surface-100 dark:bg-surface-700 rounded-full overflow-hidden' },
              meter: { class: 'h-3 first:rounded-l-full last:rounded-r-full' },
              labellist: { class: 'hidden!' }
            }"
          />
        </div>

        <div class="flex flex-col gap-4 pt-2">
          <span class="text-sm font-bold text-surface-500 dark:text-surface-400 uppercase tracking-wider">Detalles</span>

          <div class="flex flex-col gap-3.5">
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-3">
                <span class="w-3 h-3 bg-cyan-500 rounded-full shadow-sm" />
                <span class="text-sm text-surface-700 dark:text-surface-200 font-medium">Generados</span>
              </div>
              <span class="text-sm font-bold text-surface-800 dark:text-surface-100">{{ stats.examenesGenerados }}</span>
            </div>

            <div class="flex items-center justify-between">
              <div class="flex items-center gap-3">
                <span class="w-3 h-3 bg-amber-500 rounded-full shadow-sm" />
                <span class="text-sm text-surface-700 dark:text-surface-200 font-medium">Asignados</span>
              </div>
              <span class="text-sm font-bold text-surface-800 dark:text-surface-100">{{ stats.examenesAsignados }}</span>
            </div>

            <div class="flex items-center justify-between">
              <div class="flex items-center gap-3">
                <span class="w-3 h-3 bg-purple-500 rounded-full shadow-sm" />
                <span class="text-sm text-surface-700 dark:text-surface-200 font-medium">Resueltos</span>
              </div>
              <span class="text-sm font-bold text-surface-800 dark:text-surface-100">{{ stats.examenesResueltos }}</span>
            </div>

            <div class="flex items-center justify-between">
              <div class="flex items-center gap-3">
                <span class="w-3 h-3 bg-pink-500 rounded-full shadow-sm" />
                <span class="text-sm text-surface-700 dark:text-surface-200 font-medium">Corregidos</span>
              </div>
              <span class="text-sm font-bold text-surface-800 dark:text-surface-100">{{ stats.examenesCorregidos }}</span>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue';
import { useAuthStore } from '../stores/auth';
import api from '../api/axios';
import Button from 'primevue/button';
import Avatar from 'primevue/avatar';
import IconField from 'primevue/iconfield';
import InputIcon from 'primevue/inputicon';
import InputText from 'primevue/inputtext';
import MeterGroup from 'primevue/metergroup';
import ProgressBar from 'primevue/progressbar';
import Tag from 'primevue/tag';

const auth = useAuthStore();

const search = ref('');

const stats = reactive({
  grados: 0,
  asignaturas: 0,
  alumnos: 0,
  preguntas: 0,
  examenes: 0,
  examenesGenerados: 0,
  examenesAsignados: 0,
  examenesResueltos: 0,
  examenesCorregidos: 0,
  examenesNomina: 0,
  examenesSEPE: 0,
});

const ultimosExamenes = ref<any[]>([]);

const meterItems = ref([
  { label: 'Generados', value: 25, color: 'var(--p-cyan-500)' },
  { label: 'Asignados', value: 25, color: 'var(--p-amber-500)' },
  { label: 'Resueltos', value: 25, color: 'var(--p-violet-500)' },
  { label: 'Corregidos', value: 25, color: 'var(--p-pink-500)' },
]);

function estadoSeverity(estado: string) {
  switch (estado) {
    case 'GENERADO': return 'info';
    case 'ASIGNADO': return 'warn';
    case 'RESUELTO': return 'success';
    case 'CORREGIDO': return 'contrast';
    default: return 'secondary';
  }
}

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  return d.toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' });
}

onMounted(async () => {
  try {
    const [gradosRes, asigRes, alumRes, pregRes, examRes] = await Promise.all([
      api.get('/grados?limit=1'),
      api.get('/asignaturas?limit=1'),
      api.get('/alumnos?limit=1'),
      api.get('/preguntas?limit=1'),
      api.get('/examenes?limit=5'),
    ]);

    stats.grados = gradosRes.data.total || 0;
    stats.asignaturas = asigRes.data.total || 0;
    stats.alumnos = alumRes.data.total || 0;
    stats.preguntas = pregRes.data.total || 0;

    const examenes = examRes.data.data || [];
    ultimosExamenes.value = examenes.slice(0, 5);
    stats.examenes = examRes.data.total || 0;

    stats.examenesGenerados = examenes.filter((e: any) => e.estado === 'GENERADO').length;
    stats.examenesAsignados = examenes.filter((e: any) => e.estado === 'ASIGNADO').length;
    stats.examenesResueltos = examenes.filter((e: any) => e.estado === 'RESUELTO').length;
    stats.examenesCorregidos = examenes.filter((e: any) => e.estado === 'CORREGIDO').length;
    stats.examenesNomina = examenes.filter((e: any) => e.evaluacion === 'EXAMEN_FINAL').length;
    stats.examenesSEPE = examenes.filter((e: any) => e.evaluacion === 'EXAMEN_EXTRAORDINARIO').length;

    const total = stats.examenes || 1;
    meterItems.value = [
      { label: 'Generados', value: Math.round((stats.examenesGenerados / total) * 100), color: 'var(--p-cyan-500)' },
      { label: 'Asignados', value: Math.round((stats.examenesAsignados / total) * 100), color: 'var(--p-amber-500)' },
      { label: 'Resueltos', value: Math.round((stats.examenesResueltos / total) * 100), color: 'var(--p-violet-500)' },
      { label: 'Corregidos', value: Math.round((stats.examenesCorregidos / total) * 100), color: 'var(--p-pink-500)' },
    ];
  } catch {
    // Error al cargar datos del dashboard
  }
});
</script>
