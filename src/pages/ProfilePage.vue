<template>
  <ion-page>
    <ProfileHeader/>  
    <IonContent>
      <ProfileList/>
    </IonContent>
  </ion-page>
</template>

<script setup lang="ts">
import ProfileHeader from '@/components/profile/ProfileHeader.vue';
import ProfileList from '@/components/profile/ProfileList.vue';
import { IonContent } from '@ionic/vue';



</script>