import { useState, useCallback } from 'react';
import axios from 'axios';
import { ChatMessage, ChatbotConfig, ChatResponse, ChatRequest, LeadData, LeadSubmissionResponse } from '../types/chatbot';

export const useChatbot = (config: ChatbotConfig) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [sessionToken, setSessionToken] = useState(config.token || '');
  const [isSubmittingLead, setIsSubmittingLead] = useState(false);

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
          needsUserInfo: data.data.needsUserInfo,
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

  const submitLead = useCallback(async (leadData: LeadData): Promise<void> => {
    setIsSubmittingLead(true);
    
    try {
      const response = await axios.post<LeadSubmissionResponse>(`${config.baseUrl}/api/leads-data`, {
        conversationToken: sessionToken,
        ...leadData,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.data.success) {
        // Update messages to remove needsUserInfo flag from the last bot message
        setMessages(prev => prev.map(msg => 
          !msg.isUser && msg.needsUserInfo 
            ? { ...msg, needsUserInfo: false }
            : msg
        ));

        // Add a confirmation message
        const confirmationMessage: ChatMessage = {
          id: Date.now().toString(),
          message: "Thank you for sharing your information! I can now assist you better.",
          isUser: false,
          timestamp: new Date(),
          needsUserInfo: false,
        };

        setTimeout(() => {
          setMessages(prev => [...prev, confirmationMessage]);
        }, 300);
      } else {
        throw new Error(response.data.message || 'Failed to submit lead data');
      }
    } catch (error: any) {
      console.error('Lead submission error:', error);
      
      // Add error message
      const errorMessage: ChatMessage = {
        id: Date.now().toString(),
        message: 'Sorry, there was an issue saving your information. You can continue chatting, and I\'ll still do my best to help!',
        isUser: false,
        timestamp: new Date(),
        needsUserInfo: false,
      };

      setTimeout(() => {
        setMessages(prev => [...prev, errorMessage]);
      }, 300);
      
      throw error; // Re-throw so the form can handle it
    } finally {
      setIsSubmittingLead(false);
    }
  }, [config.baseUrl, sessionToken]);

  return {
    messages,
    isTyping,
    sendMessage,
    clearMessages,
    submitLead,
    isSubmittingLead,
  };
};