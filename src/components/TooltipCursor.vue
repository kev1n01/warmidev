<script setup>
  const props  = defineProps({
    position: {
      type: String,
      default: 'top-[36px] left-1/2',
    },
    label: {
      type: String,
      default: 'Someone',
    }
  })
</script>
<template>

  <span
  class="absolute transform -translate-x-1/2 px-2 py-1 text-[10px] text-white bg-gray-800 rounded-md opacity-0 sm:group-hover:opacity-100 group-hover:opacity-0 transition-opacity duration-200 pointer-events-none whitespace-nowrap tracking-wider"
  :class="[props.position]"
  >
    {{ props.label }}
  </span>
</template>