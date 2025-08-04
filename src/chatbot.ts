import React from 'react';
import { createRoot } from 'react-dom/client';
import ChatbotWidget from './components/chatbot/ChatbotWidget';
import { ChatbotConfig } from './types/chatbot';
import './index.css';

// Global function to create chatbot widget
export const createChatWidget = (config: ChatbotConfig) => {
  // Validate required config
  if (!config.token || !config.baseUrl) {
    throw new Error('ChatWidget: token and baseUrl are required');
  }

  // Set default values
  const fullConfig: ChatbotConfig = {
    selector: 'body',
    theme: 'light',
    position: 'bottom-right',
    welcomeMessage: 'Hi! How can I help you today?',
    ...config,
  };

  // Find target element
  const targetElement = fullConfig.selector 
    ? document.querySelector(fullConfig.selector)
    : document.body;

  if (!targetElement) {
    throw new Error(`ChatWidget: Target element "${fullConfig.selector}" not found`);
  }

  // Create container
  const widgetContainer = document.createElement('div');
  widgetContainer.id = 'chatbot-widget-container';
  widgetContainer.style.position = 'fixed';
  widgetContainer.style.zIndex = '999999';
  widgetContainer.style.pointerEvents = 'none';
  widgetContainer.style.top = '0';
  widgetContainer.style.left = '0';
  widgetContainer.style.width = '100%';
  widgetContainer.style.height = '100%';

  // Apply pointer events to specific elements
  const style = document.createElement('style');
  style.textContent = `
    #chatbot-widget-container .chatbot-widget * {
      pointer-events: auto;
    }
  `;
  document.head.appendChild(style);

  // Mount widget
  targetElement.appendChild(widgetContainer);
  const root = createRoot(widgetContainer);
  
  root.render(React.createElement(ChatbotWidget, { config: fullConfig }));

  // Return cleanup function
  return () => {
    root.unmount();
    if (widgetContainer.parentNode) {
      widgetContainer.parentNode.removeChild(widgetContainer);
    }
    if (style.parentNode) {
      style.parentNode.removeChild(style);
    }
  };
};

// Make function globally available
if (typeof window !== 'undefined') {
  (window as any).createChatWidget = createChatWidget;
}