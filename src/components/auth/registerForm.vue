<template>
  <ion-page>
    <!-- SAFE AREA: mismo header que en LoginPage -->
    <ion-header class="ion-no-border">
      <ion-toolbar>
        <ion-button
          slot="start"
          fill="clear"
          size="small"
          routerLink="/"
          routerDirection="back"
          style="--ripple-color: transparent;"
        >
          <ion-icon :icon="chevronBackOutline"></ion-icon>
        </ion-button>
        <ion-title size="small">CREAR CUENTA</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content fullscreen>
      <div class="content-center ion-padding ion-text-center">
        <ion-list class="form-list">
          <!-- Logo, igual que en Login -->
          <div class="logo-section">
            <div class="logo-container">
              <img :src="logoRedesIp" class="logo" />
            </div>
          </div>

          <!-- Nombre completo -->
          <ion-item>
            <ion-input
              v-model="fullName"
              label="Nombre completo"
              label-placement="floating"
              placeholder="Ingresa tu nombre completo"
              @keyup.enter="onSubmit"
            />
          </ion-item>

          <!-- Correo -->
          <ion-item :class="{ 'has-error': emailTouched && !isEmailValid }">
            <ion-input
              v-model="email"
              label="Correo electrónico"
              label-placement="floating"
              placeholder="Ingresa tu correo institucional"
              type="email"
              @ionBlur="emailTouched = true"
              @keyup.enter="onSubmit"
            />
          </ion-item>

          <!-- Password -->
          <ion-item :class="{ 'has-error': passwordTouched && !isPasswordValid }">
            <ion-input
              v-model="password"
              label="Contraseña"
              label-placement="floating"
              placeholder="Mínimo 4 caracteres"
              type="password"
              @ionBlur="passwordTouched = true"
              @keyup.enter="onSubmit"
            />
          </ion-item>

          <!-- Confirmar password -->
          <ion-item :class="{ 'has-error': confirmTouched && !passwordsMatch }">
            <ion-input
              v-model="passwordConfirm"
              label="Confirmar contraseña"
              label-placement="floating"
              placeholder="Repite tu contraseña"
              type="password"
              @ionBlur="confirmTouched = true"
              @keyup.enter="onSubmit"
            />
          </ion-item>

          <!-- Link a iniciar sesión -->
          <div class="container-register">
            <span class="helper-text">
              ¿Ya tienes una cuenta?
              <a href="/login">Inicia sesión</a>
            </span>
          </div>
        </ion-list>
      </div>
    </ion-content>

    <!-- Footer fijo, respetando safe area bottom -->
    <ion-footer class="ftr">
      <ion-button
        expand="full"
        color="primary"
        class="btn-ctr"
        :disabled="!canSubmit"
        @click="onSubmit"
      >
        {{ loading ? 'CREANDO CUENTA...' : 'CREAR CUENTA' }}
      </ion-button>
    </ion-footer>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonButton,
  IonList,
  IonItem,
  IonInput,
  IonTitle,
  IonFooter,
  IonToolbar,
  IonHeader,
  IonContent,
  IonPage,
  IonIcon,
} from '@ionic/vue';
import { chevronBackOutline } from 'ionicons/icons';
import logoRedesIp from '@/assets/Redesip-logo.png';
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { UsersService } from '@/mock/auth/usersService';

const router = useRouter();

const fullName = ref('');
const email = ref('');
const password = ref('');
const passwordConfirm = ref('');
const loading = ref(false);

// Para marcar los campos en rojo solo cuando se tocan
const emailTouched = ref(false);
const passwordTouched = ref(false);
const confirmTouched = ref(false);

const isEmailValid = computed(() =>
  /\S+@\S+\.\S+/.test(email.value)
  // si quieres restringir a un dominio:
  // /^[^@]+@unimar\.edu\.ve$/i.test(email.value)
);

const isPasswordValid = computed(() =>
  password.value.length >= 4
);

const passwordsMatch = computed(() =>
  password.value !== '' && password.value === passwordConfirm.value
);

const canSubmit = computed(
  () =>
    !loading.value &&
    fullName.value.trim().length > 0 &&
    isEmailValid.value &&
    isPasswordValid.value &&
    passwordsMatch.value
);

async function onSubmit() {
  if (!canSubmit.value) return;

  loading.value = true;
  try {
    const user = UsersService.register(
      fullName.value.trim(),
      email.value.trim(),
      password.value,
      'waiter' // default para mesero
    );

    localStorage.setItem('authUser', JSON.stringify(user));
    router.push('/menu'); // o '/login'
  } catch (e: any) {
    alert(e.message || 'Error al crear la cuenta');
  } finally {
    loading.value = false;
  }
}
</script>


<style scoped>
.logo-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 2rem 0 1.5rem;
  text-align: center;
}

.logo-container {
  width: 5.5rem;
  height: 5.5rem;
  background: #f4f4f4;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  margin-bottom: 0.75rem;
  border: 1px solid #ddd;
}

.logo {
  width: 3.5rem;
  height: 3.5rem;
  object-fit: contain;
}

.container-register {
  margin-top: 1.5rem;
  text-align: center;
}



a {
  text-decoration: none;
}

/* Mismo estilo de botón del login */
.btn-ctr {
  margin: 0;
  height: 4rem;
}

/* Bordes rojos cuando hay error */
.has-error {
  --highlight-color-focused: #f44336;
  --border-color: #f44336;
}

/* Si quisieras algo de padding extra abajo, se lo puedes dar al footer,
   pero Ionic ya respeta el safe-area-bottom */
.ftr {
  /* opcional:
  padding-bottom: env(safe-area-inset-bottom);
  */
}
</style>
