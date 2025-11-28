<template>
    <ion-header class="ion-no-border">
        <ion-toolbar>
          <ion-card class="profile-card">
            <div class="info-wrapper">
              <ion-card-title>{{ user?.name }}</ion-card-title>
              <ion-card-subtitle>{{ user?.email }}</ion-card-subtitle>
            </div>
            <ion-icon :icon="personCircleSharp" class="profile-icon"></ion-icon>

          </ion-card>
      </ion-toolbar>
    </ion-header>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { IonPage, IonHeader, IonContent, IonCard, IonIcon, IonCardTitle, IonCardSubtitle } from "@ionic/vue";
import { personCircleSharp } from "ionicons/icons";
import type { User } from "@/mock/auth/users";

// Reactive state
const user = ref<User | null>(null);

onMounted(() => {
  const data = localStorage.getItem("authUser");
  if (data) {
    user.value = JSON.parse(data) as User;
  }
});
</script>

<style scoped>
.profile-card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 14px;
  margin: 16px;
  margin-top: 40px;
}

.info-wrapper {
  display: flex;
  flex-direction: column;
}

.profile-icon {
  font-size: 60px;
}
</style>