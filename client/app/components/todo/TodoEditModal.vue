<script setup lang="ts">
interface Task {
  id: string;
  title: string;
  description: string;
}

const props = defineProps<{
  task: Task;
  open: boolean;
}>();

const emit = defineEmits<{
  (e: "close"): void;
  (e: "updated"): void;
}>();
</script>

<template>
  <UtilsBaseModal v-if="open" @close="emit('close')">
    <h2 class="text-lg font-semibold mb-4">Editar tarefa</h2>

    <TodoForm
      :initial-title="task.title"
      :initial-description="task.description"
      :task-id="task.id"
      @submit-success="emit('updated')"
    />
  </UtilsBaseModal>
</template>
