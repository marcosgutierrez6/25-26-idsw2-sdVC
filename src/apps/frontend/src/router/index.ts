import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '../stores/auth';
import AppLayout from '../layouts/AppLayout.vue';
import AuthLayout from '../layouts/AuthLayout.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: AppLayout,
      meta: { requiresAuth: true },
      redirect: '/dashboard',
      children: [
        { path: 'dashboard', name: 'Dashboard', component: () => import('../views/DashboardView.vue') },
        { path: 'grados', name: 'Grados', component: () => import('../views/Grados/GradosView/GradosView.vue') },
        { path: 'grados/nuevo', name: 'GradosNuevo', component: () => import('../views/Grados/GradosForm/GradosFormView.vue') },
        { path: 'grados/:id/editar', name: 'GradosEditar', component: () => import('../views/Grados/GradosForm/GradosFormView.vue') },
        { path: 'asignaturas', name: 'Asignaturas', component: () => import('../views/Asignaturas/AsignaturasView/AsignaturasView.vue') },
        { path: 'asignaturas/nuevo', name: 'AsignaturasNuevo', component: () => import('../views/Asignaturas/AsignaturasForm/AsignaturasFormView.vue') },
        { path: 'asignaturas/:id/editar', name: 'AsignaturasEditar', component: () => import('../views/Asignaturas/AsignaturasForm/AsignaturasFormView.vue') },
        { path: 'alumnos', name: 'Alumnos', component: () => import('../views/Alumnos/AlumnosView/AlumnosView.vue') },
        { path: 'alumnos/nuevo', name: 'AlumnosNuevo', component: () => import('../views/Alumnos/AlumnosForm/AlumnosFormView.vue') },
        { path: 'alumnos/:id/editar', name: 'AlumnosEditar', component: () => import('../views/Alumnos/AlumnosForm/AlumnosFormView.vue') },
        { path: 'docentes', name: 'Docentes', component: () => import('../views/Profesores/ProfesoresView/ProfesoresView.vue') },
        { path: 'docentes/nuevo', name: 'DocentesNuevo', component: () => import('../views/Profesores/ProfesoresForm/ProfesoresFormView.vue') },
        { path: 'docentes/:id/editar', name: 'DocentesEditar', component: () => import('../views/Profesores/ProfesoresForm/ProfesoresFormView.vue') },
        { path: 'preguntas', name: 'Preguntas', component: () => import('../views/Preguntas/PreguntasView/PreguntasView.vue') },
        { path: 'preguntas/nuevo', name: 'PreguntasNueva', component: () => import('../views/Preguntas/PreguntasForm/PreguntasFormView.vue') },
        { path: 'preguntas/:id/editar', name: 'PreguntasEditar', component: () => import('../views/Preguntas/PreguntasForm/PreguntasFormView.vue') },
        { path: 'preguntas-contextuales', name: 'PreguntasContextuales', component: () => import('../views/Preguntas/PreguntasView/PreguntasContextualesView.vue') },
        { path: 'preguntas-contextuales/nueva', name: 'PreguntasContextualesNueva', component: () => import('../views/Preguntas/PreguntasForm/PreguntasContextualesFormView.vue') },
        { path: 'preguntas-contextuales/:id/editar', name: 'PreguntasContextualesEditar', component: () => import('../views/Preguntas/PreguntasForm/PreguntasContextualesFormView.vue') },
        { path: 'examenes', name: 'Examenes', component: () => import('../views/Examenes/ExamenesView/ExamenesView.vue') },
        { path: 'bateria', name: 'Bateria', component: () => import('../views/Bateria/BateriaView/BateriaView.vue') },
        { path: 'bateria/nueva', name: 'BateriaNueva', component: () => import('../views/Bateria/BateriaForm/BateriaFormView.vue') },
        { path: 'bateria/:id/editar', name: 'BateriaEditar', component: () => import('../views/Bateria/BateriaForm/BateriaFormView.vue') },
        { path: 'configuracion/exportar', name: 'Exportar', component: () => import('../views/Configuracion/ConfiguracionExportar/ConfiguracionExportarView.vue') },
        { path: 'configuracion/importar', name: 'Importar', component: () => import('../views/Configuracion/ConfiguracionImportar/ConfiguracionImportarView.vue') },
      ],
    },
    {
      path: '/auth',
      component: AuthLayout,
      meta: { requiresAuth: false },
      redirect: '/auth/login',
      children: [
        { path: 'login', name: 'Login', component: () => import('../views/auth/LoginView.vue') },
      ],
    },
  ],
});

router.beforeEach((to, _from, next) => {
  const auth = useAuthStore();
  if (to.meta.requiresAuth !== false && !auth.isAuthenticated) {
    next('/auth/login');
  } else if (to.path.startsWith('/auth') && auth.isAuthenticated) {
    next('/dashboard');
  } else {
    next();
  }
});

export default router;
