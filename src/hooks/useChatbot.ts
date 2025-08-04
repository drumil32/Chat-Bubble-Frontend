import { useState, useCallback } from 'react';
import { ChatMessage, ChatbotConfig, ChatResponse, ChatRequest } from '../types/chatbot';

export const useChatbot = (config: ChatbotConfig) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [sessionToken, setSessionToken] = useState(config.token);

  const sendMessage = useCallback(async (messageText: string) => {
    // Add user message immediately
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      message: messageText,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);

    try {
      // Prepare request
      const request: ChatRequest = {
        message: messageText,
        token: sessionToken,
      };

      // Send to backend
      const response = await fetch(`${config.baseUrl}/api/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(request),
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data: ChatResponse = await response.json();

      if (data.success) {
        // Update session token if provided
        if (data.token) {
          setSessionToken(data.token);
        }

        // Add bot response
        const botMessage: ChatMessage = {
          id: (Date.now() + 1).toString(),
          message: data.response,
          isUser: false,
          timestamp: new Date(),
        };

        // Simulate realistic typing delay
        setTimeout(() => {
          setMessages(prev => [...prev, botMessage]);
          setIsTyping(false);
        }, Math.random() * 1000 + 500);
      } else {
        throw new Error('Bot response indicated failure');
      }
    } catch (error) {
      console.error('Chat error:', error);
      
      // Add error message
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        message: 'Sorry, I\'m having trouble connecting right now. Please try again later.',
        isUser: false,
        timestamp: new Date(),
      };

      setTimeout(() => {
        setMessages(prev => [...prev, errorMessage]);
        setIsTyping(false);
      }, 500);
    }
  }, [config.baseUrl, sessionToken]);

  const clearMessages = useCallback(() => {
    setMessages([]);
  }, []);

  return {
    messages,
    isTyping,
    sendMessage,
    clearMessages,
  };
};