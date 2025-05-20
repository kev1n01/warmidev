<script setup>
import { useHiddenContainerChat } from "@/lib/useHiddenContainerChat";
import { useTranslations } from "@/i18n/utils";
import TooltipCursor from "./TooltipCursor.vue";

const { isHidden } = useHiddenContainerChat();
const props = defineProps({
  currentLang: {
    type: String,
    required: true
  },
});
const translateLabels = useTranslations(
    props.currentLang,
);
</script>

<template>
  <button
    :title="translateLabels('chat.buttonfloat.title')"
    class="fixed bottom-32 right-4 bg-white  font-semibold  stroke-2 rounded-full p-3 py-5 sm:bottom-24 sm:right-8 group opacity-0 text-black text-sm transition-opacity duration-200 ease-in-out"
    :class="{
      'opacity-100': !isHidden,
      'opacity-0': isHidden,
    }"
    @click="isHidden = true"
    >
      <p class="relative group">
        <TooltipCursor :label="translateLabels('chat.buttonfloat.title')" position="top-[36px] left-1/2"/>
        {{ translateLabels('chat.buttonfloat.label') }}
      </p>
    </button
  >
</template>
