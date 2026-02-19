<script setup lang="ts">
import type { ToasterProps } from "@nuxt/ui";

const toaster: ToasterProps = {
  position: "top-right",
  duration: 4000,
  max: 1,
};
</script>

<template>
  <UApp :toaster="toaster">
    <NuxtPage />
  </UApp>
</template>
