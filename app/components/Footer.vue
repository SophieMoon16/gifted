<script setup lang="ts">
import type { NavigationMenuItem } from "@nuxt/ui";

const items: NavigationMenuItem[] = [
  {
    label: "Mentions",
    to: "/mentions",
  },
  {
    label: "Conditions",
    to: "/conditions",
  },
  {
    label: "Confidentialité",
    to: "/confidentialite",
  },
  {
    label: "Contact",
    to: "/contact",
  },
];
</script>

<template>
  <UFooter>
    <template #left>
      <p class="text-muted text-sm">
        Copyright © Gifted {{ new Date().getFullYear() }}
      </p>
    </template>

    <UNavigationMenu :items="items" variant="link" />

    <template #right>
      <UButton
        icon="i-simple-icons-instagram"
        color="neutral"
        variant="ghost"
        to="https://instagram.com"
        aria-label="Instagram"
        target="_blank"
      />
      <UButton
        icon="i-simple-icons-github"
        color="neutral"
        variant="ghost"
        to="https://github.com/nuxt/nuxt"
        aria-label="GitHub"
        target="_blank"
      />
    </template>
  </UFooter>
</template>
