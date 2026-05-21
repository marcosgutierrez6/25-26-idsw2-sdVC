<template>
  <div class="login-container">
    <Card style="width: 400px">
      <template #title>Iniciar Sesión</template>
      <template #content>
        <form @submit.prevent="handleLogin">
          <div class="field">
            <label for="email">Email</label>
            <InputText id="email" v-model="email" type="email" class="w-full" required />
          </div>
          <div class="field">
            <label for="password">Contraseña</label>
            <Password id="password" v-model="password" class="w-full" :feedback="false" required />
          </div>
          <Button type="submit" label="Ingresar" class="w-full mt-2" :loading="loading" />
          <Message v-if="error" severity="error" class="mt-2">{{ error }}</Message>
        </form>
      </template>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/auth';
import Card from 'primevue/card';
import InputText from 'primevue/inputtext';
import Password from 'primevue/password';
import Button from 'primevue/button';
import Message from 'primevue/message';

const auth = useAuthStore();
const router = useRouter();
const email = ref('');
const password = ref('');
const loading = ref(false);
const error = ref('');

async function handleLogin() {
  loading.value = true;
  error.value = '';
  try {
    await auth.login(email.value, password.value);
    router.push('/');
  } catch {
    error.value = 'Credenciales inválidas';
  } finally {
    loading.value = false;
  }
}
</script>

<style scoped>
.login-container {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: #f0f2f5;
}
.field {
  margin-bottom: 1rem;
}
.field label {
  display: block;
  margin-bottom: 0.5rem;
}
</style>
