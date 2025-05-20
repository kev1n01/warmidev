<script setup>
import IconSend from "@/icons/IconSend.vue";
import IconX from "@/icons/IconX.vue";
import IconLoader from "@/icons/IconLoader.vue";
import IconCircleMinus from "@/icons/IconCircleMinus.vue";
import { qaStore } from "@/lib/qaStore";
import { ref } from "vue";
import { useHiddenContainerChat } from "@/lib/useHiddenContainerChat";
import { useMessageHandler } from "@/lib/messageHandler";
const { isHidden } = useHiddenContainerChat();

const inputText = ref("");
const { isLoading, streamBotResponse } = useMessageHandler();
const props = defineProps({
  urlbot: {
    type: String,
    required: true
  },
  parammessage: {
    type: String,
    required: true
  },
  names: {
    type: String,
    required: true
  }
});

const sendMessage = async () => {
  if (inputText.value.trim() === "") return;
  // Si no hay parametro message redireccionar a warmichat
  if (props.parammessage === "" && qaStore.messages.value.length === 0) {
    window.location.href = `/warmichat?message=${encodeURIComponent(inputText.value.trim())}`;
    return;
  }

  try {
    const previousQuery = qaStore.getLasUserMessage();
    await streamBotResponse(props.names, inputText.value.trim(), previousQuery, props.urlbot)
  } catch (error) {
    console.error("Error al enviar el mensaje:", error);
  } finally {
    inputText.value = "";
  }
};

function handleKeyDown(event) {
  if (event.key === 'Enter') {
    sendMessage();
  }
}
</script>

<template>
  <div
    class="w-full sm:w-10/12 2xl:w-1/2 sm:translate-x-[10%] 2xl:translate-x-1/2 sticky bottom-2 backdrop-blur-xl bg-pink-400/60 dark:bg-gray-800/50 px-7 py-3 rounded-3xl border-[1px] shadow-lg border-white shadow-pink-400/50 transition-opacity duration-200 ease-in-out"
    :class="{
      'opacity-100': isHidden,
      'opacity-0': !isHidden,
    }">
    <div class="flex items-center gap-2">
      <button @click="isHidden = false" class="cursor-pointer" title="Cerrar chat">
        <IconCircleMinus class="size-4 sm:size-5" />
      </button>
      <input type="text" name="chat" placeholder="Haz cualquier pregunta sobre WarmiDev"
        class="w-full p-2 border-none focus:outline-none focus:ring-0 bg-transparent text-white placeholder:text-white/80 placeholder:text-xs sm:placeholder:text-sm"
        autofocus v-model="inputText" @keydown="handleKeyDown" />
      <button :class="[inputText !== '' ? 'block' : 'hidden']" @click="inputText = ''">
        <IconX class="size-4 sm:size-5" />
      </button>
      <button
        :class="[
          inputText.trim() && !isLoading ? 'dark:bg-pink-400/70 bg-black/40 focus:outline-none hover:bg-black/60 hover:dark:bg-white/40' : 'cursor-not-allowed dark:bg-black/40 bg-white/40 dark:text-gray-400 text-black/30', 'rounded-full p-2 transition-colors duration-200 ease-in-out'
        ]"
        :disabled="isLoading || !inputText.trim()"
        @click="sendMessage">
        <IconSend class="size-4 sm:size-5" v-if="!isLoading" />
        <IconLoader class="size-4 sm:size-5 animate-spin" v-else />
      </button>
    </div>
  </div>
</template>

<style scoped></style>