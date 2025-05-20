import { ref } from 'vue';
import { qaStore } from "@/lib/qaStore";
import { agentWarmi } from "@/services/agentwarmi";
import { generateMessage } from './utils';

export function useMessageHandler() { 
  const isLoading = ref(false);
  const streamBotResponse = async(names: string, query: string, previousQuery: string, url: string) => {
    try {
      isLoading.value = true;

      qaStore.addMessage({
        sender: 'user',
        content: query,
      });
      
      qaStore.addMessage({
        sender: 'bot',
        content: '',
        isStreaming: false,
        isLoading: true
      });

      const queryData = {
        query,
        previousQuery,
        names
      }
      
      const { stream, decoder } = await agentWarmi(url, queryData)
      qaStore.setLoadingStatus(false);
      qaStore.setStreamingStatus(true);
      
      let accumulatedText = '';

      while(true){
        const { done, value } = await stream!.read();
        if (done) break;

        const chunk = decoder.decode(value);
        for (const line of chunk.split('\n')) {
            if (!line.trim()) continue;

            if (line.startsWith('0:')) {
                accumulatedText += line.substring(3).replace(/"/g, '');
                qaStore.updateLastBotMessage(accumulatedText);
                await new Promise(resolve => setTimeout(resolve, Math.random() * 30 + 10));
            }
        }
      }
    } catch (error){
      qaStore.destroyLastMessageBot()
      generateMessage('Lo siento, hubo un error en la comunicación. Intentelo de nuevo. 🥺')
    } finally {
      qaStore.setStreamingStatus(false);
      isLoading.value = false;
    }
  }

  return {
    streamBotResponse,
    isLoading
  }
  
}