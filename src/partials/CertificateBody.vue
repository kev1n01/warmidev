<script setup>
import { onMounted, ref, computed } from 'vue';
import html2canvas from 'html2canvas';
import logowarmi from '@/assets/logo.webp'

const props = defineProps({
  user: {
    type: Object,
    required: true,
  },
});

const certificado = ref(null);

const descripcion = 'Por haber completado satisfactoriamente el Bootcamp de Programación para Mujeres de warmidev.tech.';
const imagenPerfil = computed(() => props.user?.imageUrl || 'https://via.placeholder.com/150');

// Función para exportar como PDF
const exportarPDF = async (fullname) => {
  try {
    const module = await import('html2pdf.js');
    const html2pdf = module.default;

    const opt = {
      margin: 0,
      filename: `${fullname}_certificado.pdf`,
      image: { type: 'jpeg', quality: 1 },
      html2canvas: {
        scale: 3,
        logging: true,
        useCORS: true,
        allowTaint: true
      },
      jsPDF: {
        unit: 'mm',
        format: 'a4',
        orientation: 'landscape',
        compressPDF: true
      },
    };

    await html2pdf().set(opt).from(certificado.value).save();

  } catch (error) {
    console.error('Error al exportar PDF:', error);
  }
};

// Función para exportar como PNG
const exportarPNG = async (fullname) => {
  try {

    const canvas = await html2canvas(certificado.value, {
      scale: 3,
      logging: true,
      useCORS: true,
      allowTaint: true
    });

    const link = document.createElement('a');
    link.download = props.user.fullName + `_certificado.png`;
    link.href = canvas.toDataURL('image/png', 1.0);
    link.click();

  } catch (error) {
    console.error('Error al exportar PNG:', error);
  }
};

onMounted(async () => {
  if (typeof window !== 'undefined') {
    try {
      const module = await import('html2pdf.js');
      html2pdf = module.default;
    } catch (error) {
      console.error('Error al cargar html2pdf:', error);
    }
  }
});
</script>

<template>
  <div class="flex justify-center space-x-6">
    <button @click="exportarPDF(props.user.fullName)"
      class="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors shadow-md flex items-center">
      <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
          d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10"></path>
      </svg>
      Exportar PDF
    </button>
    <button @click="exportarPNG(props.user.fullName)"
      class="bg-pink-500 text-white px-6 py-3 rounded-lg hover:bg-pink-700 transition-colors shadow-md flex items-center">
      <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z">
        </path>
      </svg>
      Exportar PNG
    </button>
  </div>
  <div class="certificado-container">
    <div ref="certificado" class="certificado">
      <!-- Fondo decorativo -->
      <div class="absolute inset-0 bg-gradient-to-br from-purple-50 to-white opacity-50"></div>
      <div class="absolute inset-0 border-8 border-purple-200 opacity-30 pointer-events-none"></div>

      <!-- Contenido del certificado -->
      <div class="relative z-10 h-full flex flex-col items-center justify-between p-12">
        <!-- Encabezado -->
        <div class="w-full flex justify-end items-start">
          <div class="text-right">
            <div class="text-purple-600 font-medium">Certificado N° {{ Math.floor(Math.random() * 10000) }}</div>
            <div class="text-gray-500 text-sm">Fecha: {{ new Date().toLocaleDateString() }}</div>
          </div>
        </div>

        <!-- Cuerpo principal -->
        <div class="flex-1 flex flex-col items-center justify-center w-full">
          <h1 class="text-4xl font-bold text-purple-800 mb-8 text-center">CERTIFICADO DE FINALIZACIÓN</h1>

          <div class="text-xl text-gray-600 mb-12 text-center">Se otorga el presente certificado a:</div>

          <h2
            class="text-3xl font-bold text-center text-purple-700 mb-8 px-12 py-4 border-b-2 border-t-2 border-purple-300">
            {{ props.user.fullName }}
          </h2>

          <div class="text-xl text-gray-700 mb-12 text-center max-w-2xl leading-relaxed">
            {{ descripcion }}
          </div>

          <div class="flex justify-center mb-12 gap-10">
            <img :src="logowarmi.src" alt="Warmidev Logo" class="size-24" />
            <img :src="imagenPerfil" alt="Foto de la participante"
              class="size-28 rounded-full object-cover shadow-lg" />
          </div>
        </div>

        <!-- Pie de página -->
        <div class="w-full">
          <div class="text-center text-sm text-gray-500 mb-6">
            WarmiDev.tech - Empoderando mujeres en tecnología
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.certificado-container {
  @apply flex justify-center items-start p-4;
}

.certificado {
  @apply bg-white shadow-xl rounded-lg relative overflow-hidden w-full;
  aspect-ratio: 3/2;
}

@media print {
  .certificado {
    width: 297mm !important;
    height: 210mm !important;
    box-shadow: none !important;
  }

  button {
    display: none !important;
  }
}
</style>