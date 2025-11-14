<template>
  <ion-page>
      <VentasHeader v-model:activeTab="activeTab"/>
    <IonContent>
      <keep-alive>
        <component :is="currentComponent" />
      </keep-alive>
    </IonContent>

  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonToolbar, IonTitle, IonHeader, IonTabs, IonRouterOutlet, IonTabBar, IonTabButton, IonIcon, IonContent,IonAccordion, IonAccordionGroup, IonItem, IonLabel, IonBadge, IonInput, IonPopover, IonList, IonThumbnail, IonImg, IonModal, IonButtons } from '@ionic/vue';
import { searchSharp, menuOutline, ellipsisVertical, addOutline, chevronCollapseOutline, chevronExpandOutline, chevronDownOutline, chevronUpOutline, copyOutline, trashOutline, closeOutline} from 'ionicons/icons';
import { ref, computed } from 'vue'
import VentasHeader from '@/components/pedidos/pedidosHeader.vue';


import PedidosView from '@/views/pedidos/PedidosView.vue';
import MesasView from '@/views/pedidos/MesasView.vue';
// componente de en medio
const activeTab = ref<'pedidos'|'mesas'>('pedidos')
const map = {
  pedidos: PedidosView,
  mesas: MesasView,
}

const currentComponent = computed(() => map[activeTab.value])
</script>
