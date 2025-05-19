<script setup>
import { useHiddenContainerChat } from "@/lib/useHiddenContainerChat";
const { isHidden } = useHiddenContainerChat();
</script>

<template>
  <button
    title="Abrir chat"
    class="fixed bottom-32 right-4 bg-white  font-semibold  stroke-2 rounded-full p-3 py-5 sm:bottom-24 sm:right-8 group opacity-0 text-black text-sm transition-opacity duration-200 ease-in-out"
    :class="{
      'opacity-100': !isHidden,
      'opacity-0': isHidden,
    }"
    @click="isHidden = true"
    >
      Preguntar WarmiBot
    </button
  >
</template>
