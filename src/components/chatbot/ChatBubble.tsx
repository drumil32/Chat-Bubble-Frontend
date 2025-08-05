import React from 'react';
import { MessageCircle, X } from 'lucide-react';
import './chatbot.css';

interface ChatBubbleProps {
  isOpen: boolean;
  onClick: () => void;
  unreadCount?: number;
}

const ChatBubble: React.FC<ChatBubbleProps> = ({ isOpen, onClick, unreadCount = 0 }) => {
  return (
    <button
      onClick={onClick}
      className={`chat-bubble ${isOpen ? 'is-open' : ''}`}
      aria-label={isOpen ? 'Close chat' : 'Open chat'}
    >
      {/* Icon with smooth transition */}
      <div className="chat-bubble-icon">
        <MessageCircle className="message-icon" />
        <X className="close-icon" />
      </div>
      
      {/* Unread count badge */}
      {unreadCount > 0 && !isOpen && (
        <div className="unread-badge">
          {unreadCount > 99 ? '99+' : unreadCount}
        </div>
      )}
    </button>
  );
};

export default ChatBubble;