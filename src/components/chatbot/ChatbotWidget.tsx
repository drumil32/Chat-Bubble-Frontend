import React, { useState } from 'react';
import ChatBubble from './ChatBubble';
import ChatWindow from './ChatWindow';
import { ChatbotConfig } from '../../types/chatbot';
import { useChatbot } from '../../hooks/useChatbot';

interface ChatbotWidgetProps {
  config: ChatbotConfig;
}

const ChatbotWidget: React.FC<ChatbotWidgetProps> = ({ config }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { messages, isTyping, sendMessage, submitLead, isSubmittingLead } = useChatbot(config);

  const toggleChat = () => {
    setIsOpen(prev => !prev);
  };

  return (
    <div className="chatbot-widget">
      <ChatBubble 
        isOpen={isOpen} 
        onClick={toggleChat}
        unreadCount={0} // TODO: Implement unread count logic
      />
      
      <ChatWindow
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        messages={messages}
        onSendMessage={sendMessage}
        isTyping={isTyping}
        welcomeMessage={config.welcomeMessage}
        onSubmitLead={submitLead}
        isSubmittingLead={isSubmittingLead}
      />
    </div>
  );
};

export default ChatbotWidget;