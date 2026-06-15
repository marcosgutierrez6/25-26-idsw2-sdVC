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
        { path: 'grados', name: 'Grados', component: () => import('../views/GradosView.vue') },
        { path: 'grados/nuevo', name: 'GradosNuevo', component: () => import('../views/GradosFormView.vue') },
        { path: 'grados/:id/editar', name: 'GradosEditar', component: () => import('../views/GradosFormView.vue') },
        { path: 'asignaturas', name: 'Asignaturas', component: () => import('../views/AsignaturasView.vue') },
        { path: 'alumnos', name: 'Alumnos', component: () => import('../views/AlumnosView.vue') },
        { path: 'profesores', name: 'Profesores', component: () => import('../views/ProfesoresView.vue') },
        { path: 'preguntas', name: 'Preguntas', component: () => import('../views/PreguntasView.vue') },
        { path: 'examenes', name: 'Examenes', component: () => import('../views/ExamenesView.vue') },
        { path: 'bateria', name: 'Bateria', component: () => import('../views/BateriaView.vue') },
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
