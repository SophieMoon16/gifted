<script setup lang="ts">
import { ref, onMounted } from "vue";
import type { NavigationMenuItem } from "@nuxt/ui";
const toast = useToast();

const state = reactive({
  name: "",
  email: "",
  password: "",
});

defineProps<{
  mode: "slideover" | "drawer" | "modal";
}>();

const shop = ref<{ id: number; name: string; logoUrl?: string } | null>(null);
const loading = ref(true);
const error = ref<string | null>(null);
const shopSlug = ref<string | null>(null);

const items = ref<NavigationMenuItem[]>([]);

function slugify(name: string) {
  return name
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-") // remplace les espaces par des -
    .replace(/[^\w-]+/g, ""); // supprime les caractères non alphanumériques
}

onMounted(() => {
  try {
    const storedShop = localStorage.getItem("shop");
    const storedId = localStorage.getItem("id");
    if (!storedShop) throw new Error("Aucun shop trouvé");

    const parsedShop = JSON.parse(storedShop);
    shop.value = parsedShop;

    // 🔹 vérifie que parsedShop existe avant de slugifier
    if (parsedShop && parsedShop.name) {
      shopSlug.value = slugify(parsedShop.name);
    } else {
      throw new Error("Nom du shop introuvable");
    }

    // 🔹 ici shop.value est sûr
    const shopId = shop.value?.id;

    items.value = [
      {
        label: "Accueil",
        icon: "i-lucide-house",
        to: `/shop-account/${shopId}/${shopSlug.value}/dashboard`,
      },
      {
        label: "Configuration",
        icon: "i-lucide-pen-tool",
        to: `/shop-account/${shopId}/${shopSlug.value}/configuration`,
      },
      {
        label: "Notifications",
        icon: "i-lucide-bell",
        to: `/shop-account/${shopId}/${shopSlug.value}/notifications`,
      },
      {
        label: "Statistiques",
        icon: "i-lucide-users",
        to: `/shop-account/${shopId}/${shopSlug.value}/statistics`,
      },
      {
        label: "Paramètres",
        icon: "i-lucide-settings",
        to: `/shop-account/${shopId}/${shopSlug.value}/settings`,
      },
      { label: "Logout", icon: "i-lucide-log-out", to: "/logout" },
    ];
  } catch (err: any) {
    error.value = err.message || "Erreur inattendue";
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <UDashboardGroup>
    <UDashboardSidebar :mode="mode">
      <template #header="{ collapsed }">
        <Logo v-if="collapsed" class="h-5 w-auto ml-2" />

        <!-- logo principal aligné à gauche -->
        <img v-else src="/img/logo.png" alt="Logo" class="h-10 w-auto ml-2" />
      </template>

      <UNavigationMenu :items="items" orientation="vertical" />
    </UDashboardSidebar>

    <UDashboardPanel>
      <template #header>
        <UDashboardNavbar :title="shop?.name || 'Dashboard'" />
      </template>
      <template #body>
        <slot />
      </template>
    </UDashboardPanel>
  </UDashboardGroup>
</template>
