<script setup lang="ts">
import Header from "~/components/Header.vue";
import LoginShop from "~/components/LoginShop.vue";
import Footer from "~/components/Footer.vue";
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <div class="flex-1">
      <Header />
      <LoginShop />
    </div>
    <Footer />
  </div>
</template>
