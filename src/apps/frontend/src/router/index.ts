import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '../stores/auth';
import MainLayout from '../layouts/MainLayout.vue';
import LoginView from '../views/LoginView.vue';
import DashboardView from '../views/DashboardView.vue';
import GradosView from '../views/GradosView.vue';
import AsignaturasView from '../views/AsignaturasView.vue';
import AlumnosView from '../views/AlumnosView.vue';
import ProfesoresView from '../views/ProfesoresView.vue';
import PreguntasView from '../views/PreguntasView.vue';
import ExamenesView from '../views/ExamenesView.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/login', name: 'Login', component: LoginView, meta: { requiresAuth: false } },
    {
      path: '/',
      component: MainLayout,
      meta: { requiresAuth: true },
      children: [
        { path: '', name: 'Dashboard', component: DashboardView },
        { path: 'grados', name: 'Grados', component: GradosView },
        { path: 'asignaturas', name: 'Asignaturas', component: AsignaturasView },
        { path: 'alumnos', name: 'Alumnos', component: AlumnosView },
        { path: 'profesores', name: 'Profesores', component: ProfesoresView },
        { path: 'preguntas', name: 'Preguntas', component: PreguntasView },
        { path: 'examenes', name: 'Examenes', component: ExamenesView },
      ],
    },
  ],
});

router.beforeEach((to, _from, next) => {
  const auth = useAuthStore();
  if (to.meta.requiresAuth !== false && !auth.isAuthenticated) {
    next('/login');
  } else if (to.path === '/login' && auth.isAuthenticated) {
    next('/');
  } else {
    next();
  }
});

export default router;
