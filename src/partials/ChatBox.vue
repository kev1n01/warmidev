<script setup>
import IconLoader from "@/icons/IconLoader.vue";
import { qaStore, messages } from "@/lib/qaStore";
import { agentWarmi } from "@/services/agentwarmi";
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
});

const loading = ref(false)

const loadMessages = () => {
  loading.value = true
  qaStore.initMessagesFromStorage();
  setTimeout(() => {
    loading.value = false
  }, 2000);
}

onMounted(async () => {
  loadMessages()
  if (messages.value.length === 1 && props.parammessage !== '') {
    const answerbot = await agentWarmi(props.urlbot, props.parammessage)
    qaStore.addMessage({
      sender: 'bot',
      content: answerbot,
    });

    console.log("Respuesta del bot:", answerbot);
  }
});
</script>

<template>
  <div v-if="loading" class="flex justify-center items-center content-center gap-2 h-[80dvh]">
    <IconLoader class="size-5 animate-spin" />
    Cargando mensajes
  </div>
  <div v-else class="m-5 sm:m-20 flex flex-col space-y-4">
    <div v-for="(message, index) in messages" :key="index">
      <div v-if="message.sender === 'user'"
        class="text-slate-900 dark:text-pink-300 text-xl font-monts font-medium justify-end flex text-end">
        {{ message.content }}
      </div>
      <div v-else-if="message.sender === 'bot'"
        class="w-full sm:w-3/5 dark:bg-white/5 bg-black/10 rounded-xl p-2 text-start text-pretty ">
        <vue-markdown :source="message.content" class="content-markdown" />
      </div>
    </div>
  </div>
</template>

<style>
.content-markdown p {
  @apply leading-8;
}
</style>
