<script setup lang="ts">
interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  createdAt: string;
  deletedAt: string | null;
}

defineProps<{
  task: Task;
}>();
</script>
<template>
  <li
    class="flex items-center justify-between p-4 border rounded-xl bg-gray-50 opacity-70"
  >
    <div class="flex items-center gap-3">
      <input type="checkbox" checked class="h-4 w-4" disabled />
      <div class="flex flex-col">
        <span class="font-medium line-through">{{ task.title }}</span>
        <span class="text-sm text-gray-500 line-through">{{
          task.description
        }}</span>
      </div>
    </div>
  </li>
</template>
