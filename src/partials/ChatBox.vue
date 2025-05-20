<script setup>
import IconLoader from "@/icons/IconLoader.vue";
import { useMessageHandler } from "@/lib/messageHandler";
import { qaStore, messages } from "@/lib/qaStore";
import { onMounted, ref } from "vue";
import VueMarkdown from 'vue-markdown-render'

const props = defineProps({
  parammessage: {
    type: String,
    required: true
  },
  urlbot: {
    type: String,
    required: true
  },
  names: {
    type: String,
    required: true
  }
});

const loadingmessages = ref(false)
const { streamBotResponse } = useMessageHandler();

const loadMessages = () => {
  loadingmessages.value = true
  qaStore.initMessagesFromStorage();
  setTimeout(() => {
    loadingmessages.value = false
  }, 500);
}

const parsedMarkdown = (content) => {
  return content.replace(/\\n\\n/g, '\n\n').replace(/\\n/g, '\n') 
}

onMounted(async () => {
  loadMessages()
  // Si hay parametro message y solo hay un mensaje entonces hacer peticion
  if (messages.value.length === 0 && props.parammessage !== '') {
    await streamBotResponse(props.names, props.parammessage, '', props.urlbot)
  }
});
</script>

<template>
  <div v-if="loadingmessages" class="flex justify-center items-center content-center gap-2 h-[80dvh]">
    <IconLoader class="size-5 animate-spin" />
    Cargando mensajes
  </div>
  <div v-else class="m-5 sm:m-20 flex flex-col space-y-4">
    <div v-for="(message, index) in messages" :key="index">
      <div v-if="message.sender === 'user'"
        class="text-slate-900 dark:text-pink-300 text-lg font-monts font-medium justify-end flex text-end">
        <p class="bg-white/60 dark:bg-transparent rounded-xl px-2">{{ message.content }}</p>
      </div>
      <div v-else-if="message.sender === 'bot'"
        class="w-full dark:bg-white/5 bg-black/10 rounded-xl p-2 text-start text-pretty ">
        <div v-if="message.isLoading && !message.isStreaming">
          <div class="animate-pulse flex space-x-4">
              <div class="flex-1 space-y-6 py-1">
                  <div class="h-2 bg-gray-500 rounded"></div>
                  <div class="space-y-3">
                      <div class="grid grid-cols-3 gap-4">
                          <div class="h-2 bg-gray-500 rounded col-span-2"></div>
                          <div class="h-2 bg-gray-500 rounded col-span-1"></div>
                      </div>
                      <div class="h-2 bg-gray-500 rounded"></div>
                  </div>
              </div>
          </div>
        </div>
        <vue-markdown :source="parsedMarkdown(message.content)" class="content-markdown space-y-5" />
      </div>
    </div>
  </div>
</template>

<style>
.content-markdown p {
  @apply leading-6;
}

.content-markdown ol{
  @apply space-y-2;
}
.content-markdown li::before {
  content: '-';
  margin-right: 1px;
}
</style>
