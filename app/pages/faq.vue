<template>
  <div class="min-h-screen flex flex-col">
    <div class="flex-1">
      <Header />
      <Accordion />
    </div>
    <Footer />
  </div>
</template>
<script setup>
import Header from "~/components/Header.vue";
import Accordion from "~/components/Accordion.vue";
import Footer from "~/components/Footer.vue";
</script>
