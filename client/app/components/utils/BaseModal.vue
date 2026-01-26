<script setup lang="ts">
import { onMounted, onUnmounted } from "vue";

const emit = defineEmits<{
  (e: "close"): void;
}>();

const close = () => emit("close");

const onEsc = (e: KeyboardEvent) => {
  if (e.key === "Escape") {
    close();
  }
};

onMounted(() => {
  document.addEventListener("keydown", onEsc);
  document.body.style.overflow = "hidden"; // trava scroll
});

onUnmounted(() => {
  document.removeEventListener("keydown", onEsc);
  document.body.style.overflow = "";
});
</script>

<template>
  <Teleport to="body">
    <div
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
      @click.self="close"
    >
      <div
        class="bg-white w-full max-w-lg rounded-2xl shadow-xl p-6 animate-modal"
      >
        <slot />
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
@keyframes modal {
  from {
    opacity: 0;
    transform: scale(0.95) translateY(10px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

.animate-modal {
  animation: modal 0.15s ease-out;
}
</style>
