<script setup>
import { Bell, Settings, BarChart3, Sliders } from "lucide-vue-next";

const links = [
  {
    label: "Notifications",
    icon: Bell,
    to: "/notifications",
  },
  {
    label: "Configuration",
    icon: Sliders,
    to: "/configuration",
  },
  {
    label: "Statistiques",
    icon: BarChart3,
    to: "/stats",
  },
  {
    label: "Paramètres",
    icon: Settings,
    to: "/settings",
  },
];
</script>

<template>
  <header class="border-b bg-white">
    <div class="max-w-6xl mx-auto flex justify-between items-center p-4">
      <h1 class="font-bold text-xl">FidelyApp</h1>

      <nav class="flex gap-6">
        <NuxtLink
          v-for="link in links"
          :key="link.label"
          :to="link.to"
          class="flex items-center gap-2 hover:text-primary"
        >
          <component :is="link.icon" size="20" />
          <span class="hidden md:block">
            {{ link.label }}
          </span>
        </NuxtLink>
      </nav>
    </div>
  </header>
</template>
