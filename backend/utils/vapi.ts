interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

interface ChatApiResponse {
  id: string;
  assistantId: string;
  messages: ChatMessage[];
  output: ChatMessage[];
  createdAt: string;
  updatedAt: string;
  orgId?: string;
  sessionId?: string;
  name?: string;
}

interface ChatResponse {
  chatId: string;
  response: string;
  fullData: ChatApiResponse;
}

async function sendChatMessage(
  message: string, 
  previousChatId?: string
): Promise<ChatResponse> {
  const response = await fetch('https://api.vapi.ai/chat', {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer YOUR_API_KEY',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      assistantId: 'your-assistant-id',
      input: message,
      ...(previousChatId && { previousChatId })
    })
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const chat: ChatApiResponse = await response.json();
  return {
    chatId: chat.id,
    response: chat.output[0].content,
    fullData: chat
  };
}

// Usage example
async function example() {
  const firstMessage = await sendChatMessage("Hello, I need help");
  console.log(firstMessage.response);

  const followUp = await sendChatMessage("Tell me more", firstMessage.chatId);
  console.log(followUp.response);
}

export { sendChatMessage, example };