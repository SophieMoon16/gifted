<script setup lang="ts">
import Header from "~/components/Header.vue";
import ActivationUser from "~/components/ActivationUser.vue";
import Footer from "~/components/Footer.vue";
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <div class="flex-1">
      <Header />
      <ActivationUser />
    </div>
    <Footer />
  </div>
</template>
