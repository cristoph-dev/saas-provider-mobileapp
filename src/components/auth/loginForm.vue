<template>
  <ion-page>
    <ion-header class="ion-no-border">
      <ion-toolbar>
        <ion-button slot="start" fill="clear" size="small"  routerLink="/" routerDirection="back" style=" --ripple-color: transparent;">
          <ion-icon :icon="chevronBackOutline"></ion-icon>
        </ion-button>
        <ion-title size="small">INICIAR SESIÓN</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content fullscreen>
    <div class="content-center ion-padding ion-text-center">
        <ion-list class="form-list">
        <div class="logo-section">
            <div class="logo-container">
            <img :src="logoRedesIp" class="logo" />
            </div>
        </div>

        <ion-item>
            <ion-input
            v-model="email"
            label="Correo electronico"
            label-placement="floating"
            placeholder="Ingresa tu correo electronico registrado"
            @keyup.enter="onSubmit"
            />
        </ion-item>

        <ion-item>
            <ion-input
            v-model="password"
            label="Password"
            label-placement="floating"
            placeholder="Ingresa tu contraseña"
            type="password"
            @keyup.enter="onSubmit"
            />
        </ion-item>

        <div>
            <a href="/register">Olvide la contraseña</a>
        </div>
        </ion-list>
    </div>
    </ion-content>

    <ion-footer class="ftr">
            <ion-button expand="full" color="primary" class="btn-ctr" :disabled="!canSubmit" @click="onSubmit">INICIAR SESIÓN</ion-button>
    </ion-footer>

    <!-- <div class="ion-text-center">
        <ion-button class="btn-cta" expand="full" routerLink="/menu" routerDirection="forward">Ingresar</ion-button>
    </div> -->
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonSkeletonText,
  IonButton,
  IonList,
  IonItem,
  IonInput,
  IonLabel,
  IonTitle,
  IonFooter,
  IonToolbar,
  IonHeader,
  IonContent,
  IonRippleEffect
} from "@ionic/vue";
import { chevronBackOutline } from "ionicons/icons";
import  logoRedesIp  from '@/assets/Redesip-logo.png'
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { UsersService } from '@/mock/usersService';

const router = useRouter();

const email = ref('');
const password = ref('');
const loading = ref(false);

const canSubmit = computed(() =>
  !loading.value &&
  /\S+@\S+\.\S+/.test(email.value) &&
  password.value.length >= 4
);


async function onSubmit() {
  if (!canSubmit.value) return;
  loading.value = true;
  try {
    const user = UsersService.login(email.value, password.value);
    localStorage.setItem('authUser', JSON.stringify(user));
    router.push('/menu');
  } catch (e: any) {
    alert(e.message || 'Error al iniciar sesión');     // cambiar por iontoast
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
a {
    padding-top: 1.5rem;
}


.ftr-toolbar {
  --padding-start: 0;
  --padding-end: 0;
  --padding-top: 0;
}

.btn-ctr {
    margin: 0;
    height: 4rem;
}


</style>
