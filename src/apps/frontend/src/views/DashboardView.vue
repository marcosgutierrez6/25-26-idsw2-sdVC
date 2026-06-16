<template>
  <div class="dashboard" style="background: var(--color-bg-base); color: var(--color-text-primary);">

    <div class="dashboard__header">
      <div class="dashboard__title-group">
        <h1 class="dashboard__title">Dashboard</h1>
        <p class="dashboard__subtitle">Resumen del sistema</p>
      </div>

      <div class="dashboard__toolbar">
        <div class="dashboard__search-wrapper">
          <i class="pi pi-search dashboard__search-icon" />
          <input
            v-model="search"
            type="text"
            placeholder="Buscar..."
            class="dashboard__search-input"
          />
        </div>
        <button class="dashboard__notify-btn">
          <i class="pi pi-bell" />
        </button>
      </div>
    </div>

    <div class="dashboard__kpi-grid">
      <router-link to="/grados" class="dashboard__kpi-link">
        <DashboardKpiCard
          label="Grados"
          :value="stats.grados"
          icon="pi pi-book"
          badge="Grados"
          :accent-color="'var(--color-primary)'"
        />
      </router-link>

      <router-link to="/asignaturas" class="dashboard__kpi-link">
        <DashboardKpiCard
          label="Asignaturas"
          :value="stats.asignaturas"
          icon="pi pi-bookmark"
          badge="Asignaturas"
          :accent-color="'var(--color-primary-light)'"
        />
      </router-link>

      <router-link to="/alumnos" class="dashboard__kpi-link">
        <DashboardKpiCard
          label="Alumnos"
          :value="stats.alumnos"
          icon="pi pi-users"
          badge="Alumnos"
          :accent-color="'var(--color-neutral)'"
        />
      </router-link>

      <router-link to="/preguntas" class="dashboard__kpi-link">
        <DashboardKpiCard
          label="Preguntas"
          :value="stats.preguntas"
          icon="pi pi-question-circle"
          badge="Preguntas"
          :accent-color="'var(--accent-info)'"
        />
      </router-link>
    </div>

    <div class="dashboard__content-grid">

      <div class="dashboard__panel dashboard__panel--large">
        <span class="dashboard__panel-title">Últimos Exámenes</span>

        <div class="dashboard__exam-list">
          <router-link
            v-for="examen in ultimosExamenes"
            :key="examen.id"
            :to="`/examenes`"
            class="dashboard__exam-item dashboard__exam-link"
          >
            <div class="dashboard__exam-left">
              <div class="dashboard__exam-icon">
                <i class="pi pi-file" />
              </div>
              <div class="dashboard__exam-info">
                <span class="dashboard__exam-title">{{ examen.asignatura?.titulo || 'Sin asignatura' }}</span>
                <span class="dashboard__exam-date">{{ formatDate(examen.createdAt) }}</span>
              </div>
            </div>
            <div class="dashboard__exam-right">
              <Tag :value="examen.estado" :severity="estadoSeverity(examen.estado)" class="rounded-lg px-2.5 py-1 text-xs font-bold" />
              <i class="pi pi-chevron-right dashboard__exam-chevron" />
            </div>
          </router-link>

          <div v-if="ultimosExamenes.length === 0" class="dashboard__empty-state">
            <i class="pi pi-folder-open" />
            <span>No hay exámenes recientes</span>
          </div>
        </div>
      </div>

      <div class="dashboard__panel">
        <span class="dashboard__panel-title">Exámenes por Estado</span>

        <div class="dashboard__stats">
          <div class="dashboard__stats-header">
            <span class="dashboard__stats-value">{{ stats.examenes }}</span>
            <span class="dashboard__stats-label">Total exámenes</span>
          </div>

          <MeterGroup
            :value="meterItems"
            :pt="{
              meters: { class: 'h-3 rounded-full overflow-hidden' },
              meter: { class: 'h-3 first:rounded-l-full last:rounded-r-full' },
              labellist: { class: 'hidden!' }
            }"
            style="background: var(--color-bg-row);"
          />
        </div>

        <div class="dashboard__details">
          <span class="dashboard__details-title">Detalles</span>

          <div class="dashboard__details-grid">
            <div class="dashboard__detail-item">
              <div class="dashboard__detail-indicator" style="background: var(--accent-info);"></div>
              <span class="dashboard__detail-label">Generados</span>
              <span class="dashboard__detail-value">{{ stats.examenesGenerados }}</span>
            </div>

            <div class="dashboard__detail-item">
              <div class="dashboard__detail-indicator" style="background: var(--accent-warning);"></div>
              <span class="dashboard__detail-label">Asignados</span>
              <span class="dashboard__detail-value">{{ stats.examenesAsignados }}</span>
            </div>

            <div class="dashboard__detail-item">
              <div class="dashboard__detail-indicator" style="background: var(--accent-info);"></div>
              <span class="dashboard__detail-label">Resueltos</span>
              <span class="dashboard__detail-value">{{ stats.examenesResueltos }}</span>
            </div>

            <div class="dashboard__detail-item">
              <div class="dashboard__detail-indicator" style="background: var(--accent-error);"></div>
              <span class="dashboard__detail-label">Corregidos</span>
              <span class="dashboard__detail-value">{{ stats.examenesCorregidos }}</span>
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
import DashboardKpiCard from '../components/DashboardKpiCard.vue';
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

<style scoped>
.dashboard {
  width: 100%;
  font-family: var(--font-family-base);
  font-size: var(--font-size-base);
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  min-height: 100vh;
}

.dashboard__header {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

@media (min-width: 768px) {
  .dashboard__header {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
  }
}

.dashboard__title-group {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.dashboard__title {
  font-size: var(--font-size-2xl);
  font-weight: 700;
  color: var(--color-text-primary);
  letter-spacing: -0.02em;
}

.dashboard__subtitle {
  font-size: var(--font-size-sm);
  font-weight: 500;
  color: var(--color-text-secondary);
}

.dashboard__toolbar {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.dashboard__search-wrapper {
  position: relative;
  width: 16rem;
}

.dashboard__search-icon {
  position: absolute;
  left: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  color: var(--color-text-muted);
  font-size: 0.875rem;
}

.dashboard__search-input {
  width: 100%;
  padding: 0.5rem 1rem 0.5rem 2.25rem;
  background: var(--color-bg-surface);
  border: 1px solid var(--color-border);
  border-radius: 0.75rem;
  color: var(--color-text-primary);
  font-size: var(--font-size-sm);
  transition: all var(--transition-base);
}

.dashboard__search-input::placeholder {
  color: var(--color-text-muted);
}

.dashboard__search-input:focus {
  outline: none;
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px var(--color-primary-muted);
}

.dashboard__notify-btn {
  width: 2.5rem;
  height: 2.5rem;
  background: var(--color-bg-surface);
  border: 1px solid var(--color-border);
  border-radius: 0.75rem;
  color: var(--color-text-secondary);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all var(--transition-base);
}

.dashboard__notify-btn:hover {
  background: var(--color-bg-hover);
  color: var(--color-text-primary);
}

.dashboard__kpi-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
  width: 100%;
}

.dashboard__kpi-link {
  text-decoration: none;
  display: block;
  transition: transform var(--transition-base);
}

.dashboard__kpi-link:hover {
  transform: translateY(-4px);
}

@media (max-width: 1536px) {
  .dashboard__kpi-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

@media (max-width: 1024px) {
  .dashboard__kpi-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 640px) {
  .dashboard__kpi-grid {
    grid-template-columns: 1fr;
  }
}

.dashboard__content-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  width: 100%;
  align-items: start;
}

@media (min-width: 1024px) {
  .dashboard__content-grid {
    grid-template-columns: 2fr 1fr;
  }
}

.dashboard__panel {
  background: var(--color-bg-surface);
  border: 1px solid var(--color-border);
  border-radius: 1rem;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.dashboard__panel--large {
  grid-column: 1 / -1;
}

@media (min-width: 1024px) {
  .dashboard__panel--large {
    grid-column: 1;
  }
}

.dashboard__panel-title {
  font-size: var(--font-size-lg);
  font-weight: 700;
  color: var(--color-text-primary);
  letter-spacing: -0.01em;
}

.dashboard__exam-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.dashboard__exam-item {
  display: flex !important;
  align-items: center !important;
  justify-content: space-between !important;
  padding: 0.875rem;
  background: var(--color-bg-base);
  border: 1px solid var(--color-border);
  border-radius: 1rem;
  cursor: pointer;
  transition: all var(--transition-base);
  text-decoration: none;
  color: inherit;
  gap: 0.75rem;
}

.dashboard__exam-item:hover {
  background: var(--color-bg-hover);
  border-color: var(--color-primary-border);
}

.dashboard__exam-left {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.dashboard__exam-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 3rem;
  height: 3rem;
  background: var(--color-primary-muted);
  color: var(--color-primary);
  border-radius: 0.75rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  font-size: 1.125rem;
}

.dashboard__exam-info {
  display: flex;
  flex-direction: column;
}

.dashboard__exam-title {
  font-weight: 600;
  color: var(--color-text-primary);
  font-size: var(--font-size-base);
}

.dashboard__exam-date {
  font-size: var(--font-size-xs);
  color: var(--color-text-muted);
  font-weight: 500;
}

.dashboard__exam-right {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.dashboard__exam-chevron {
  color: var(--color-text-muted);
  padding-right: 0.25rem;
}

.dashboard__empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem;
  color: var(--color-text-muted);
  font-weight: 500;
  gap: 0.5rem;
}

.dashboard__empty-state i {
  font-size: 1.875rem;
  opacity: 0.6;
}

.dashboard__stats {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.dashboard__stats-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
}

.dashboard__stats-value {
  font-size: 2.25rem;
  font-weight: 800;
  color: var(--color-text-primary);
  letter-spacing: -0.02em;
}

.dashboard__stats-label {
  font-size: var(--font-size-sm);
  font-weight: 600;
  color: var(--color-text-secondary);
}

.dashboard__details {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding-top: 0.75rem;
  border-top: 1px solid var(--color-border);
}

.dashboard__details-title {
  font-size: var(--font-size-sm);
  font-weight: 700;
  color: var(--color-text-muted);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.dashboard__details-grid {
  display: flex;
  flex-direction: column;
  gap: 0.875rem;
}

.dashboard__detail-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.dashboard__detail-indicator {
  width: 0.75rem;
  height: 0.75rem;
  border-radius: 50%;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
}

.dashboard__detail-label {
  flex: 1;
  margin-left: 0.75rem;
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  font-weight: 500;
}

.dashboard__detail-value {
  font-size: var(--font-size-sm);
  font-weight: 700;
  color: var(--color-text-primary);
}
</style>
