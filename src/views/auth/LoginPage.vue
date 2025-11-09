<template>
  <ion-page>
    <ion-content> 
      <LoginForm></LoginForm>
    </ion-content>
  </ion-page>
</template>


<script setup lang="ts">
  import { IonPage, IonContent } from '@ionic/vue';
  import LoginForm from '@/components/auth/loginForm.vue';
</script>