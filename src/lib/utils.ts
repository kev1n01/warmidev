import { qaStore } from "@/lib/qaStore";

export const generateMessage = async (message: string) => {
  qaStore.addMessage({
    sender: 'bot',
    content: '',
    isStreaming: true,
  });

  let accumulatedText = '';

  const characters = message.split('');

  let currentIndex = 0;

  while (currentIndex < characters.length) {
    // Randomly determine chunk size (1-3 characters)
    const chunkSize = Math.floor(Math.random() * 3) + 1;
    const chunk = characters
        .slice(currentIndex, currentIndex + chunkSize)
        .join('');

    // Update accumulated text and store
    accumulatedText += chunk;
    qaStore.updateLastBotMessage(accumulatedText);

    // Simulate network delay (between 10-40ms)
    await delay(Math.random() * 30 + 10);

    currentIndex += chunkSize;
  }

  // Set streaming to false when complete
  qaStore.setStreamingStatus(false);

  return accumulatedText;
}

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
