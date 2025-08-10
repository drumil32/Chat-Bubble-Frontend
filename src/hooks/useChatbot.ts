import { useState, useCallback } from 'react';
import axios from 'axios';
import { ChatMessage, ChatbotConfig, ChatResponse, ChatRequest } from '../types/chatbot';

export const useChatbot = (config: ChatbotConfig) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [sessionToken, setSessionToken] = useState(config.token || '');

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
        ...(sessionToken && { token: sessionToken }),
      };

      // Send to backend using axios
      const response = await axios.post<ChatResponse>(`${config.baseUrl}/api/chat`, request, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = response.data;

      if (data.success) {
        // Update session token if provided
        if (data.data.token) {
          setSessionToken(data.data.token);
        }

        // Add bot response
        const botMessage: ChatMessage = {
          id: (Date.now() + 1).toString(),
          message: data.data.reply,
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