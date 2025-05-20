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

  getLasUserMessage(){
    const userMessages = this.messages.value.filter(msg => msg.sender === 'user');
    return userMessages.length > 0 ? userMessages[userMessages.length - 1].content : '';
  },

  updateLastBotMessage(content: string) {
    const botMessages = this.messages.value.filter(msg => msg.sender === 'bot');
    const lastMessage = botMessages[botMessages.length - 1]
    if (lastMessage) {
      lastMessage.content = content;
    }
    localStorage.setItem('messages', JSON.stringify(this.messages.value));
  },

  setStreamingStatus(status: boolean){
    const lastMessage = this.messages.value[this.messages.value.length - 1]
    if (lastMessage && lastMessage.sender === 'bot') {
      lastMessage.isStreaming = status;
    }
  },

  setLoadingStatus(status: boolean){
    const lastMessage = this.messages.value[this.messages.value.length - 1]
    if (lastMessage && lastMessage.sender === 'bot') {
      lastMessage.isLoading = status;
    }
  },

  destroyLastMessageBot(){
    const lastMessage = this.messages.value[this.messages.value.length - 1]
    if (lastMessage && lastMessage.sender === 'bot') {
      this.messages.value.pop()
      if (typeof window !== 'undefined') {
        localStorage.setItem('messages', JSON.stringify(this.messages.value));
      }
    }
  }
};
