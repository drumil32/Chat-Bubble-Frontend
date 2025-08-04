import React from 'react';
import { MessageCircle, X } from 'lucide-react';

interface ChatBubbleProps {
  isOpen: boolean;
  onClick: () => void;
  unreadCount?: number;
}

const ChatBubble: React.FC<ChatBubbleProps> = ({ isOpen, onClick, unreadCount = 0 }) => {
  return (
    <button
      onClick={onClick}
      className={`
        fixed bottom-6 right-6 z-50
        w-16 h-16 rounded-full
        bg-gradient-primary
        shadow-chat
        flex items-center justify-center
        transition-all duration-300 ease-smooth
        hover:scale-110 hover:shadow-glow
        animate-pulse-glow
        ${isOpen ? 'rotate-0' : 'rotate-0 hover:rotate-12'}
      `}
      aria-label={isOpen ? 'Close chat' : 'Open chat'}
    >
      {/* Icon with smooth transition */}
      <div className="relative">
        <MessageCircle 
          className={`
            w-8 h-8 text-white
            transition-all duration-300
            ${isOpen ? 'scale-0 rotate-180' : 'scale-100 rotate-0'}
          `}
        />
        <X 
          className={`
            w-8 h-8 text-white absolute inset-0
            transition-all duration-300
            ${isOpen ? 'scale-100 rotate-0' : 'scale-0 rotate-180'}
          `}
        />
      </div>
      
      {/* Unread count badge */}
      {unreadCount > 0 && !isOpen && (
        <div className="
          absolute -top-2 -right-2
          bg-red-500 text-white
          text-xs font-bold
          rounded-full w-6 h-6
          flex items-center justify-center
          animate-bounce-in
        ">
          {unreadCount > 99 ? '99+' : unreadCount}
        </div>
      )}
    </button>
  );
};

export default ChatBubble;