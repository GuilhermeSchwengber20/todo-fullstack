<template>
  <li
    class="flex items-center justify-between p-4 border rounded-xl hover:bg-gray-50 transition"
  >
    <div class="flex items-center gap-3">
      <input type="checkbox" class="h-4 w-4" />
      <span class="text-sm"> Nome da tarefa </span>
    </div>

    <div class="flex items-center gap-2">
      <button
        class="text-xs px-3 py-1 border rounded-lg hover:bg-gray-100 transition"
      >
        Editar
      </button>
      <button
        class="text-xs px-3 py-1 border border-red-300 text-red-500 rounded-lg hover:bg-red-50 transition"
      >
        Remover
      </button>
    </div>
  </li>
</template>
