export default defineAppConfig({
  ui: {
    colors: {
      primary: "zinc",
      secondary: "zinc",
      neutral: "gray",
      success: "emerald",
      info: "blue",
      warning: "amber",
      error: "rose",
    },
  },
  colorMode: {
    preference: "light", // mode light par défaut
    fallback: "light",
    classSuffix: "",
    storageKey: "color-mode", // facultatif, pour ne pas se baser sur localStorage
  },
});
