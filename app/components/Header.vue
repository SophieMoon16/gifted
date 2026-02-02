<script setup lang="ts">
import type { NavigationMenuItem } from "@nuxt/ui";

const route = useRoute();

const items = computed<NavigationMenuItem[]>(() => [
  { label: "Accueil", to: "/", icon: "i-lucide-home" },
  {
    label: "Foire Aux Questions",
    to: "/faq",
    icon: "i-lucide-circle-question-mark",
  },
  {
    label: "Explorer",
    to: "/explorer",
    icon: "i-lucide-rocket",
  },
]);
</script>

<template>
  <UHeader toggle-side="left">
    <template #title>
      <div>
        <NuxtImg
          src="/img/logo.png"
          alt="Gifted light"
          class="logo block dark:hidden h-10 w-auto"
        />

        <NuxtImg
          src="/img/logo.png"
          alt="Gifted dark"
          class="logo hidden dark:block h-10 w-auto"
        />
      </div>
    </template>
    <UNavigationMenu :items="items" />

    <template #right>
      <UColorModeButton />

      <UTooltip text="Open on GitHub" :kbds="['meta', 'G']">
        <UButton
          color="neutral"
          variant="ghost"
          to="https://github.com/nuxt/ui"
          target="_blank"
          icon="i-simple-icons-github"
          aria-label="GitHub"
        />
      </UTooltip>
    </template>

    <template #body>
      <UNavigationMenu :items="items" orientation="vertical" class="-mx-2.5" />
    </template>
  </UHeader>
</template>

<style scoped></style>
