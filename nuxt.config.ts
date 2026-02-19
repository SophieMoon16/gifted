// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  nitro: {
    preset: "node-server",
  },
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  css: ["~/assets/css/main.css"],
  modules: ["@nuxt/ui", "@nuxt/image"],
  colorMode: {
    preference: "light", // Force le mode clair par défaut
    fallback: "light", // Si pas de préférence, utilise light
  },
});
