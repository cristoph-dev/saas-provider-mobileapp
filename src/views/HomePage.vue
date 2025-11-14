<template>
  <ion-page>
    <ion-content :fullscreen="true" style="--background-color: #fff; --background:#fff;">
      <Swiper
        class="home-swiper"
        :modules="[Pagination, Navigation, Autoplay]"
        :slides-per-view="1"
        :space-between="16"
        :loop="true"
        :pagination="{ clickable: false }"
        :navigation="false"
        :autoplay="{ delay: 5000, disableOnInteraction: true }"
      >
        <SwiperSlide class="slide">
          <h2 class="slide-title">Crea tu menú facilmente</h2>
          <p class="slide-desc">Diseña y actualiza tu carta en minutos. Agrega productos, precios y fotos sin complicaciones para ofrecer una experiencia moderna y atractiva a tus clientes.</p>
          <ion-img :src="carrouselImg1"></ion-img>
        </SwiperSlide>

        <SwiperSlide class="slide">
          <h2 class="slide-title">Gestiona pedidos y facturas</h2>
          <p class="slide-desc">Controla tus ventas, pedidos y facturación desde un solo lugar. Automatiza tus procesos y mantén todo tu negocio bajo control, sin papeles ni errores.</p>
          <ion-img :src="carrouselImg2"></ion-img>
        </SwiperSlide>

        <SwiperSlide class="slide">          
          <h2 class="slide-title">Impulsa tu negocio</h2>
          <p class="slide-desc">Haz crecer tu emprendimiento con herramientas pensadas para ti. Aumenta tus ingresos, mejora tu organización y lleva tu marca al siguiente nivel.</p>
          <ion-img :src="carrouselImg3"></ion-img>
        </SwiperSlide>
      </Swiper>

      <div class="ion-text-center">
        <ion-button routerLink="/register" routerDirection="forward" color="primary">EMPEZAR AHORA</ion-button> <!-- TODO KYC para medio personalizar la app -->
        <ion-button routerLink="/login" routerDirection="forward" fill="clear" expand="full" style="--color:#000;">YA TENGO UNA CUENTA</ion-button>
      </div>

    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonContent, IonHeader, IonImg, IonPage, IonTitle, IonToolbar, IonButton} from '@ionic/vue';
import { useRouter } from 'vue-router'
import  carrouselImg1  from '@/assets/1.png';
import  carrouselImg2  from '@/assets/2.png';
import  carrouselImg3  from '@/assets/3.png';
const router = useRouter();


// swiper 
import { Swiper, SwiperSlide} from 'swiper/vue';
import { Pagination, Navigation, Autoplay } from 'swiper/modules'
import 'swiper/css'
import '@ionic/vue/css/ionic-swiper.css';
import 'swiper/css/navigation'
import 'swiper/css/pagination'

</script>

<style scoped>
.home-swiper {
  height: 80%;
}

.slide {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  text-align: center;
  padding: 1rem;
  color: white;
}


ion-img {
  width: 70%;
  height: 50%; 
  object-fit: cover;
  border-radius: 0.5rem;
}


.slide-title {
  font-size: 1.5rem;
  font-weight: bold;
  margin-top: 3rem;
  color: #000000;
}


.slide-desc {
  font-size: 0.9rem;
  color: #000000;
  margin: 0.5rem 0 1rem 0;
  max-width: 80%;
  text-decoration: none;
}

:deep(.swiper-slide) {
  background-color: #ffffff !important;
}

:deep(.swiper-pagination) {
  bottom: 20px !important;
}

:deep(.swiper-pagination-bullet) {
  width: 8px;
  height: 8px;
  background: rgb(135, 135, 135);
  opacity: 1;
}

:deep(.swiper-pagination-bullet-active) {
  background: #000000;
}

</style>
