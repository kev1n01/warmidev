<script setup>
import IconLoader from "@/icons/IconLoader.vue";
import { useMessageHandler } from "@/lib/messageHandler";
import { qaStore, messages } from "@/lib/qaStore";
import { onMounted, ref, nextTick, watch } from "vue";
import VueMarkdown from 'vue-markdown-render'
import { useTranslations } from "@/i18n/utils";

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
  },
  currentLang: {
    type: String,
    required: true
  }
});


const translateLabels = useTranslations(
    props.currentLang,
);

const loadingmessages = ref(false)
const { streamBotResponse } = useMessageHandler();
const messagesContainer = ref(null);

const scrollToBottom = () => {
  nextTick(() => {
    if (messagesContainer.value) {
      messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight;
    }
  });
};

const loadMessages = () => {
  loadingmessages.value = true
  qaStore.initMessagesFromStorage();
  setTimeout(() => {
    loadingmessages.value = false
    scrollToBottom();
  }, 500);
}

watch(() => messages.value, () => {
  scrollToBottom();
}, { deep: true });

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
    {{translateLabels('chatbot.loading.messages')}}
  </div>
  <div v-else ref="messagesContainer" class="m-5 sm:m-20 flex flex-col space-y-4 max-h-[80dvh] overflow-y-auto scroll-smooth overflow-x-hidden">
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
              <div class="h-2  bg-white/20 dark:bg-gray-500 rounded"></div>
              <div class="space-y-3">
                <div class="grid grid-cols-3 gap-4">
                  <div class="h-2  bg-white/20 dark:bg-gray-500 rounded col-span-2"></div>
                  <div class="h-2  bg-white/20 dark:bg-gray-500 rounded col-span-1"></div>
                </div>
                <div class="h-2  bg-white/20 dark:bg-gray-500 rounded"></div>
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

.content-markdown ol {
  @apply space-y-2;
}

.content-markdown code {
  @apply bg-slate-100/20 dark:bg-slate-950 text-black dark:text-rose-300 p-2 rounded-lg !mt-10;
}

.content-markdown a {
  @apply text-black dark:text-violet-300 dark:hover:text-violet-400 hover:underline;
}

.content-markdown li::before {
  content: '-';
  margin-right: 1px;
}
</style>
