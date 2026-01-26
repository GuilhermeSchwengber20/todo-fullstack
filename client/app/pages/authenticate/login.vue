<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const config = useRuntimeConfig();
const API_URL = config.public.apiBase;

const email = ref("");
const password = ref("");
const error = ref<string | null>(null);
const loading = ref(false);

const handleLogin = async () => {
  error.value = null;
  loading.value = true;

  try {
    await $fetch(`${API_URL}/auth/login`, {
      method: "POST",
      credentials: "include",
      body: {
        email: email.value,
        password: password.value,
      },
    });

    // se cchegou aqui os cookies deram certo
    router.push("/tasks");
  } catch (error: any) {
    error.value = error?.data?.message || "Erro ao entrar. Tente novamente.";
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="w-full max-w-md bg-white p-8 rounded-2xl shadow">
      <h1 class="text-2xl font-bold text-center mb-6">Entrar</h1>

      <form class="space-y-4" @submit.prevent="handleLogin">
        <div>
          <label class="block text-sm font-medium">Email</label>
          <input
            v-model="email"
            type="email"
            placeholder="seu@email.com"
            class="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring"
          />
        </div>

        <div>
          <label class="block text-sm font-medium">Senha</label>
          <input
            v-model="password"
            type="password"
            placeholder="••••••••"
            class="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring"
          />
        </div>

        <button
          type="submit"
          :disabled="loading"
          class="w-full bg-black text-white py-2 rounded-lg hover:opacity-90 transition"
        >
          {{ loading ? "Entrando..." : "Entrar" }}
        </button>
        <p v-if="error" class="text-sm text-red-600 text-center">
          {{ error }}
        </p>
      </form>

      <p class="text-sm text-center mt-4">
        Não tem conta?
        <NuxtLink to="/authenticate/register" class="font-semibold underline"
          >Criar conta</NuxtLink
        >
      </p>
    </div>
  </div>
</template>
