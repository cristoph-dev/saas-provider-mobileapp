<template>
  <ion-list>
    <ion-item>
      <ion-icon slot="start" :icon="albumsOutline"></ion-icon>
      <ion-label>Categorías</ion-label>
    </ion-item>

    <ion-item>
      <ion-icon slot="start" :icon="notificationsOutline"></ion-icon>
      <ion-label>Notificaciones</ion-label>
    </ion-item>
    <ion-item>
      <ion-icon slot="start" :icon="moonOutline"></ion-icon>
      <ion-label>Tema Oscuro</ion-label>

      <ion-toggle
        slot="end"
        justify="space-between"
        v-model="darkMode"
        @ionChange="toggleDarkMode"
      ></ion-toggle>
    </ion-item>

    <ion-item @click="logout">
      <ion-icon slot="start" :icon="logOutOutline"></ion-icon>
      <ion-label>Salir</ion-label>
    </ion-item>
  </ion-list>
</template>

<script setup lang="ts">
    import { logOutOutline, moonOutline, albumsOutline, notificationsOutline ,homeOutline, cashOutline, receiptOutline, homeSharp, cashSharp, receiptSharp, fastFoodOutline, fastFoodSharp, menuOutline, menu, menuSharp, pricetagOutline, pricetag, receipt, pizza, pizzaOutline} from 'ionicons/icons';
    import { ref, onMounted } from "vue";
      const darkMode = ref(false);
      onMounted(() => {
        const saved = localStorage.getItem("darkMode");

        if (saved === "true") {
          darkMode.value = true;
          document.body.classList.add("dark");
        }

        if (saved === "false") {
          darkMode.value = false;
          document.body.classList.remove("dark");
        }
      });
      function toggleDarkMode() {
        if (darkMode.value) {
          document.body.classList.add("dark");
          localStorage.setItem("darkMode", "true");
        } else {
          document.body.classList.remove("dark");
          localStorage.setItem("darkMode", "false");
        }
      }
      function logout() {
        localStorage.removeItem("authUser");
        window.location.href = "/";
      }
</script>