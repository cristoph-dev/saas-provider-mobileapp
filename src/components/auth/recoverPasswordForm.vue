<template>
  <ion-page>
    <ion-header class="ion-no-border">
      <ion-toolbar>
        <ion-button slot="start" fill="clear" size="small" @click="goBack"><ion-icon :icon="chevronBackOutline"/></ion-button>
        <ion-title size="small">RECUPERAR CONTRASEÑA</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content fullscreen>
      <div class="content ion-padding ion-text-center">
        <h2 class="title">Recuperar contraseña</h2>
        <p class="subtitle">
          Ingresa el e-mail vinculado a tu cuenta para recibir instrucciones
          para recuperación de la contraseña.
        </p>

        <ion-item :class="{ 'has-error': emailTouched && !isEmailValid }">
          <ion-input
            v-model="email"
            label="E-mail"
            label-placement="floating"
            placeholder="Ingresa tu correo registrado"
            type="email"
            @ionBlur="emailTouched = true"
            @keyup.enter="onSubmit"
          />
        </ion-item>
      </div>
    </ion-content>

    <!-- BOTÓN ENVIAR ABAJO (como en el ejemplo) -->
    <ion-footer>
      <ion-button
        expand="full"
        class="btn-ctr"
        :disabled="!canSubmit"
        @click="onSubmit"
      >
        {{ loading ? 'ENVIANDO...' : 'ENVIAR' }}
      </ion-button>
    </ion-footer>

    <!-- MODAL DE ÉXITO -->
    <ion-modal :is-open="showModal" @didDismiss="closeToLogin">
      <ion-page>
        <ion-header class="ion-no-border">
          <ion-toolbar>
            <ion-button slot="start" fill="clear" size="small" style="--ripple-color: transparent;" @click="closeToLogin">
              <ion-icon :icon="chevronBackOutline" />
            </ion-button>
          </ion-toolbar>
        </ion-header>

        <ion-content fullscreen>
          <div class="modal-content ion-padding ion-text-center">
            <!-- Aquí luego puedes poner una ilustración -->
            <div class="mail-illustration">
              <!-- <img src="@/assets/mail-ok.svg" alt="Mail enviado" /> -->
            </div>

            <h2 class="title">¡Enviado con éxito!</h2>

            <p class="subtitle">
              Enviamos un correo electrónico con instrucciones sobre cómo
              restablecer tu contraseña a
              <strong>{{ email }}</strong>.
            </p>
            <ion-button fill="clear" class="link-button" @click="editEmail">Editar o reenviar correo electrónico</ion-button>

            <ion-button expand="block" fill="outline" class="btn-outline" @click="closeToLogin">Volver al inicio de sesión</ion-button>
          </div>
        </ion-content>
      </ion-page>
    </ion-modal>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonButton,
  IonTitle,
  IonContent,
  IonFooter,
  IonItem,
  IonInput,
  IonIcon,
  IonModal,
} from '@ionic/vue';
import { chevronBackOutline } from 'ionicons/icons';
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const email = ref('');
const loading = ref(false);
const emailTouched = ref(false);
const showModal = ref(false);

const isEmailValid = computed(() => /\S+@\S+\.\S+/.test(email.value));

const canSubmit = computed(
  () => !loading.value && isEmailValid.value
);

async function onSubmit() {
  emailTouched.value = true;
  if (!canSubmit.value) return;

  loading.value = true;
  try {
    // Aquí podrías validar contra UsersService si quieres:
    // const user = UsersService.getAll().find(u => u.email === email.value.trim());
    // if (!user) throw new Error('No existe un usuario con ese correo');

    showModal.value = true;
  } catch (e: any) {
    alert(e.message || 'Error al procesar la solicitud');
  } finally {
    loading.value = false;
  }
}

function goBack() {
  router.back();
}

function closeToLogin() {
  showModal.value = false;
  router.replace('/login');
}

function editEmail() {
  showModal.value = false;
}
</script>

<style scoped>
.content {
  margin-top: 1rem;
}

.title {
  font-size: 1.3rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
}

.subtitle {
  font-size: 0.95rem;
  color: #666;
  margin-bottom: 1.5rem;
  text-align: center;
}

.subtitle.small {
  font-size: 0.85rem;
}

.btn-ctr {
  margin: 0;
  height: 3.5rem;
  text-transform: uppercase;
  font-weight: 600;
}

/* Borde rojo si el correo es inválido */
.has-error {
  --highlight-color-focused: #f44336;
  --border-color: #f44336;
}

/* MODAL */
.modal-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: 1rem;
  margin-top: 2rem;
}

.mail-illustration {
  width: 120px;
  height: 120px;
  margin-bottom: 1rem;
  border-radius: 24px;
  background: #f4f4f4;
  display: flex;
  align-items: center;
  justify-content: center;
}

.link-button {
  text-transform: none;
  font-size: 0.95rem;
}

.btn-outline {
  margin-top: 1rem;
  text-transform: none;
}
</style>
