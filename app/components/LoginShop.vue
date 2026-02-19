<script setup lang="ts">
const toast = useToast();
const showPassword = ref(false);
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}
interface LoginResponse {
  success: boolean;
  message: string;
}
const state = reactive({
  email: "",
  password: "",
});

async function submitLogin() {
  // console.log("Form submitted with data:", state);
  state.email = normalizeEmail(state.email);
  if (!state.email || !state.password) {
    toast.add({
      title: "Oups ! Une petite erreur",
      description: "Tous les champs doivent être renseignés.",
      icon: "i-lucide-annoyed",
      progress: false,
    });
    return;
  }

  if (!emailRegex.test(state.email)) {
    toast.add({
      title: "Oups ! Une petite erreur",
      description: "L'email n'est pas valide.",
      icon: "i-lucide-annoyed",
      progress: false,
    });
    return;
  }

  if (state.password.length < 5) {
    toast.add({
      title: "Oups ! Une petite erreur",
      description: "Le mot de passe doit contenir au moins 5 caractères.",
      icon: "i-lucide-annoyed",
      progress: false,
    });
    return;
  }

  try {
    const response = await $fetch<LoginResponse>("/api/login-shop", {
      method: "POST",
      body: state,
    });

    if (response.success) {
      toast.add({
        title: "Connexion réussie !",
        description: response.message,
        icon: "i-lucide-check",
        progress: false,
      });
    }
  } catch (err: any) {
    const message =
      err.data?.statusMessage || "Une erreur inattendue est survenue";

    toast.add({
      title: "Oups ! Une petite erreur",
      description: message,
      icon: "i-lucide-annoyed",
      progress: false,
    });
  }
}
</script>

<template>
  <div class="flex items-center justify-center py-7">
    <UForm
      :state="state"
      class="space-y-4 w-full max-w-md p-7 border border-gray-300 rounded"
      @submit="submitLogin"
    >
      <UIcon name="i-lucide-store" class="w-full size-8 mx-auto" />
      <h3 class="text-center text-2xl font-bold">
        Se connecter en tant que commerçant
      </h3>
      <p class="text-center text-sm">
        Pas encore inscrit chez nous ?
        <a href="/register-shop" class="hover:underline">S'inscrire</a>
      </p>
      <UFormField label="Email" name="email">
        <UInput class="w-full" v-model="state.email" />
      </UFormField>
      <UFormField label="Mot de passe" name="password">
        <UInput
          :type="showPassword ? 'text' : 'password'"
          v-model="state.password"
          class="w-full"
        >
          <template #trailing>
            <UButton
              type="button"
              color="neutral"
              variant="ghost"
              size="sm"
              :icon="showPassword ? 'i-lucide-eye' : 'i-lucide-eye-closed'"
              @click="showPassword = !showPassword"
              class="cursor-pointer"
              :aria-label="
                showPassword
                  ? 'Masquer le mot de passe'
                  : 'Afficher le mot de passe'
              "
            />
          </template>
        </UInput>
      </UFormField>
      <UButton
        class="w-full flex justify-center items-center cursor-pointer"
        type="submit"
      >
        Se connecter
      </UButton>
    </UForm>
  </div>
</template>
