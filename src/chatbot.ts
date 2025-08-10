import React from 'react';
import { createRoot } from 'react-dom/client';
import ChatbotWidget from './components/chatbot/ChatbotWidget';
import { ChatbotConfig, ChatbotDesign } from './types/chatbot';
import './index.css';

// Default design configuration
const defaultDesign: ChatbotDesign = {
  primaryColor: '#007bff',
  secondaryColor: '#f8f9fa',
  backgroundColor: '#ffffff',
  textColor: '#333333',
  borderRadius: '8px',
  fontSize: '14px',
  fontFamily: 'Arial, sans-serif',
  buttonSize: '60px',
  chatHeight: '400px',
  chatWidth: '350px',
};

// Global function to create chatbot widget
export const createChatWidget = (config: ChatbotConfig = {}) => {
  // Set default values with design customization
  const fullConfig: ChatbotConfig = {
    selector: 'body',
    theme: 'light',
    position: 'bottom-right',
    welcomeMessage: 'Hi! How can I help you today?',
    baseUrl: 'http://localhost:3001',
    design: { ...defaultDesign, ...config.design },
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

  // Apply custom styles and pointer events
  const style = document.createElement('style');
  style.textContent = `
    #chatbot-widget-container .chatbot-widget * {
      pointer-events: auto;
    }
    
    /* Custom design variables */
    :root {
      --chatbot-primary-color: ${fullConfig.design?.primaryColor};
      --chatbot-secondary-color: ${fullConfig.design?.secondaryColor};
      --chatbot-background-color: ${fullConfig.design?.backgroundColor};
      --chatbot-text-color: ${fullConfig.design?.textColor};
      --chatbot-border-radius: ${fullConfig.design?.borderRadius};
      --chatbot-font-size: ${fullConfig.design?.fontSize};
      --chatbot-font-family: ${fullConfig.design?.fontFamily};
      --chatbot-button-size: ${fullConfig.design?.buttonSize};
      --chatbot-chat-height: ${fullConfig.design?.chatHeight};
      --chatbot-chat-width: ${fullConfig.design?.chatWidth};
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