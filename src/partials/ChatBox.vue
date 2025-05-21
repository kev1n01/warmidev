<script setup>
import IconLoader from "@/icons/IconLoader.vue";
import { useMessageHandler } from "@/lib/messageHandler";
import { qaStore, messages } from "@/lib/qaStore";
import { onMounted, ref, nextTick, watch } from "vue";
import VueMarkdown from 'vue-markdown-render'
import { useTranslations } from "@/i18n/utils";
import imgWarmiBoot from "@assets/warmiboot.webp"

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
  <div v-if="messages.length === 0 || loadingmessages " class="flex justify-center items-center content-center h-dvh">
    <div>
      <div class="relative p-5 w-full h-full">
        <h3
          class="bg-pink-50 rounded-xl px-3 py-1 absolute -top-10 -left-5  sm:-top-0 sm:-left-1/4 text-slate-900 text-sm sm:text-base rounded-br-none w-[100px] lg:w-[200px] text-center shadow-inner shadow-slate-700">
          <span v-if="messages.length !== 0 && messages" class="flex justify-center items-center content-center gap-2">
            <IconLoader class="size-5 animate-spin" />
            {{ translateLabels('chatbot.loading.messages') }}
          </span>
          <span v-else>
            {{ translateLabels('chatbot.welcome') }} {{ props.names }}.
            <span>{{ translateLabels('chatbot.question.help') }}</span>
          </span>
        </h3>
        <div class="relative">
          <img :src="imgWarmiBoot.src" alt="warmibotblur" width="200" height="200"
            class="sm:size-[300px] blur-lg invert dark:invert-0" loading="lazy" />
          <img :src="imgWarmiBoot.src" alt="warmibot" width="200" height="200"
            class="sm:size-[300px] inset-0 absolute" />
        </div>
      </div>
    </div>
  </div>

  <div v-else ref="messagesContainer"
    class="pb-7 m-1 flex flex-col space-y-4 max-h-[80dvh] overflow-y-auto scroll-smooth overflow-x-hidden">
    <div v-for="(message, index) in messages" :key="index" v-if="messages.length > 0">
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
