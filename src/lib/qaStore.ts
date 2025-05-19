import { ref } from "vue";

export interface Message {
  id?: string;
  sender: 'user' | 'bot';
  content: string;
  isStreaming?: boolean;
  isLoading?: boolean;
}

export const messages = ref<Message[]>([]);

export const qaStore = {
  messages,

  initMessagesFromStorage() {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('messages');
      if (stored) {
        this.messages.value = JSON.parse(stored);
      }
    }
  },

  addMessage(message: Message) {
    const messageWithId = {
      ...message,
      id: message.id || crypto.randomUUID(),
    };
    this.messages.value.push(messageWithId);
    if (typeof window !== 'undefined') {
      localStorage.setItem('messages', JSON.stringify(this.messages.value));
    }
  },

  getLastMessage() {
    return this.messages.value[this.messages.value.length - 1] || null;
  },

  clearMessages() {
    this.messages.value = [];
    if (typeof window !== 'undefined') {
      localStorage.removeItem('messages');
    }
  },
};
