<template>
  <ion-modal :is-open="isOpen" @didDismiss="close">
    <ion-header class="ion-no-border picker-header">
      <ion-toolbar>
        <ion-button fill="clear" @click="close">
          <ion-icon :icon="closeOutline" />
        </ion-button>
      </ion-toolbar>

      <ion-searchbar
        placeholder="Buscar producto"
        class="picker-search"
        show-clear-button="always"
        v-model="searchQuery"
      />

      <ion-segment scrollable v-model="activeCategory" class="category-segment" value="default">
        <ion-segment-button value="all">
          <ion-label>Todos</ion-label>
        </ion-segment-button>

        <ion-segment-button
          v-for="cat in categories"
          :key="cat.id"
          :value="cat.id"
        >
          <ion-label>{{ cat.name }}</ion-label>
        </ion-segment-button>
      </ion-segment>

    </ion-header>

    <ion-content>
      <ion-list class="product-list">
        <ion-item
          v-for="prod in filteredProducts"
          :key="prod.id"
          class="product-row"
          lines="full"
          button
          :detail="false"
        >
          <!-- IMAGEN -->
          <ion-thumbnail slot="start" class="thumb">
            <ion-img :src="getProductImage(prod.imageKey)" />

            <div v-if="tempCart[prod.id]" class="qty-badge">
              x{{ tempCart[prod.id].qty }}
            </div>
          </ion-thumbnail>

          <!-- NOMBRE -->
          <ion-label class="name-label">
            <h3>{{ prod.name }}</h3>
          </ion-label>

          <!-- PRECIO -->
          <ion-label slot="end" class="price-label">
            {{ prod.currency }}. {{ prod.price.toFixed(2) }}
          </ion-label>

          <!-- BOTONES -->
          <div slot="end" class="action-buttons">
            <ion-button
              fill="clear"
              size="small"
              class="icon-btn"
              @click.stop="add(prod)"
            >
              <ion-icon name="add-circle-outline"></ion-icon>
            </ion-button>

            <ion-button
              fill="clear"
              size="small"
              class="icon-btn"
              :disabled="!tempCart[prod.id]"
              @click.stop="remove(prod)"
            >
              <ion-icon name="remove-circle-outline"></ion-icon>
            </ion-button>
          </div>
        </ion-item>
      </ion-list>
    </ion-content>

    <!-- FOOTER -->
    <ion-footer class="picker-ion-footer ion-no-border">
      <ion-item lines="none">

        <!-- Cantidad de artículos -->
        <ion-label class="footer-qty">
          {{ totalQty }} artículos
        </ion-label>
        <!-- Precios -->
        <ion-label class="footer-prices" slot="end">
          <div class="usd">{{ totalUSDFormatted }}$</div>
          <div class="bs">Bs. {{ totalBSFormatted }}</div>
        </ion-label>

      </ion-item>

      <ion-button expand="full" class="btn-confirm" @click="confirmSelection">
        Confirmar
      </ion-button>
    </ion-footer>
  </ion-modal>
</template>

<script setup lang="ts">
import { IonContent, IonItem, IonList, IonIcon, IonModal,  } from '@ionic/vue'
import { closeOutline } from "ionicons/icons";
import { ref, computed, watch } from "vue";
import { categories } from "@/mock/menu/categories";
import { getProductImage } from "@/mock/menu/productImages";
import type { CategoryProduct } from "@/mock/menu/categories";
import type { Delivery } from "@/mock/deliveries/deliveries";
import { DeliveryService } from "@/mock/deliveries/deliveriesService";

const props = defineProps<{
  order: Delivery | null;
  isOpen: boolean;
}>();

const emit = defineEmits<{
  (e: "update:isOpen", value: boolean): void;
}>();

// -------------------------------
// ESTADOS
// -------------------------------
const activeCategory = ref<"all" | number>("all");
const searchQuery = ref("");

const tempCart = ref<Record<number, { qty: number; product: CategoryProduct }>>(
  {}
);

// -------------------------------
// RESTAURAR CARRITO CUANDO ABRE
// -------------------------------
watch(
  () => props.isOpen,
  (isOpen) => {
    if (isOpen && props.order) {
      tempCart.value = {};

      for (const p of props.order.products) {
        tempCart.value[p.id] = {
          qty: p.qty,
          product: {
            id: p.id,
            name: p.name,
            price: p.price,
            currency: p.currency,
            imageKey: p.imageKey,
          },
        };
      }

      console.log("🔄 tempCart restaurado:", tempCart.value);
    }
  }
);

// -------------------------------
// Cerrar modal 
// -------------------------------
function close() {
  emit("update:isOpen", false);
  activeCategory.value = "all";
  searchQuery.value = "";
}

// -------------------------------
// LISTA DE PRODUCTOS PLANA
// -------------------------------
const flatProducts = categories.flatMap((cat) =>
  cat.products.map((p) => ({
    ...p,
    categoryId: cat.id,
  }))
);

// -------------------------------
// FILTRADO
// -------------------------------
const filteredProducts = computed(() => {
  return flatProducts.filter((prod) => {
    const matchesCategory =
      activeCategory.value === "all" ||
      prod.categoryId === activeCategory.value;

    const matchesSearch = prod.name
      .toLowerCase()
      .includes(searchQuery.value.toLowerCase());

    return matchesCategory && matchesSearch;
  });
});

// -------------------------------
// AGREGAR / REMOVER
// -------------------------------
function add(p: CategoryProduct) {
  if (!tempCart.value[p.id]) {
    tempCart.value[p.id] = { qty: 1, product: p };
  } else {
    tempCart.value[p.id].qty++;
  }
}

function remove(p: CategoryProduct) {
  const item = tempCart.value[p.id];
  if (!item) return;

  if (item.qty <= 1) {
    delete tempCart.value[p.id];
  } else {
    item.qty--;
  }
}

// -------------------------------
// TOTALES
// -------------------------------
const totalQty = computed(() =>
  Object.values(tempCart.value).reduce((acc, p) => acc + p.qty, 0)
);

const totalUSDNumber = computed(() =>
  Object.values(tempCart.value).reduce(
    (acc, p) => acc + p.qty * p.product.price,
    0
  )
);

const totalUSDFormatted = computed(() => totalUSDNumber.value.toFixed(2));
const totalBSFormatted = computed(() => (totalUSDNumber.value * 78).toFixed(2));

// -------------------------------
// GUARDAR CARRITO AL PEDIDO
// -------------------------------
function confirmSelection() {
  if (!props.order) return;
  console.log("🟦 SINCRONIZANDO PEDIDO CON tempCart");
  props.order.products.splice(0, props.order.products.length);
  for (const key in tempCart.value) {
    const entry = tempCart.value[key];
    props.order.products.push({
      id: entry.product.id,
      name: entry.product.name,
      price: entry.product.price,
      currency: entry.product.currency,
      qty: entry.qty,
      imageKey: entry.product.imageKey,
    });
  }
  console.log("🟩 Productos finales en el pedido:", props.order.products);

  // debugging para la card de pedidosPage
  DeliveryService.updateTotals(props.order);
  DeliveryService.save();

  close();
}
</script>



<style scoped>
.product-row {
  --inner-padding-end: 0;
  --padding-start: 0;
}

.thumb {
  width: 60px;
  height: 60px;
  position: relative;
  border-radius: 8px;
  overflow: hidden;
}

.qty-badge {
  position: absolute;
  bottom: 4px;
  left: 4px;
  background: rgba(0, 0, 0, 0.75);
  color: white;
  font-size: 0.7rem;
  padding: 2px 6px;
  border-radius: 4px;
}

.name-label h3 {
  font-size: 0.95rem;
  font-weight: 600;
}

.price-label {
  text-align: right;
  font-size: 0.9rem;
  font-weight: 600;
  margin-left: 6px;
}

.action-buttons {
  display: flex;
  align-items: center;
  gap: 4px;
}

.icon-btn {
  --color: #0074fd;
  --padding-start: 4px;
  --padding-end: 4px;
}

.picker-footer {
  margin-top: 10px;
  padding: 14px 18px;
  display: flex;
  justify-content: space-between;
  background: #f0f0f0;
  border-top: 1px solid #d4d4d4;
  font-weight: 600;
  font-size: 0.9rem;
}

.footer-button {
  --background: #0074fd;
  height: 52px;
  font-weight: bold;
  border-radius: 0;
}
</style>