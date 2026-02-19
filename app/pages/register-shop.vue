<script setup lang="ts">
import Header from "~/components/Header.vue";
import RegisterShop from "~/components/RegisterShop.vue";
import Footer from "~/components/Footer.vue";
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <div class="flex-1">
      <Header />
      <RegisterShop />
    </div>
    <Footer />
  </div>
</template>
