import React from 'react';
import { ChatMessage } from '../../types/chatbot';

interface MessageBubbleProps {
  message: ChatMessage;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const { isUser, message: text, timestamp } = message;

  return (
    <div className={`
      flex ${isUser ? 'justify-end' : 'justify-start'}
      animate-fade-in
    `}>
      <div className={`
        max-w-[80%] px-4 py-3 rounded-2xl
        ${isUser 
          ? 'bg-chat-user-bg text-chat-user-text rounded-br-sm' 
          : 'bg-chat-bot-bg text-chat-bot-text rounded-bl-sm border border-border'
        }
        shadow-sm
        relative
        break-words
      `}>
        <p className="text-sm leading-relaxed whitespace-pre-wrap">
          {text}
        </p>
        
        {/* Timestamp */}
        <div className={`
          text-xs mt-1 opacity-70
          ${isUser ? 'text-white/70' : 'text-gray-500'}
        `}>
          {timestamp.toLocaleTimeString([], { 
            hour: '2-digit', 
            minute: '2-digit' 
          })}
        </div>

        {/* Message tail */}
        <div className={`
          absolute w-3 h-3
          ${isUser 
            ? 'bg-chat-user-bg -right-1 bottom-3 rounded-br-sm'
            : 'bg-chat-bot-bg -left-1 bottom-3 rounded-bl-sm border-l border-b border-border'
          }
          transform rotate-45
        `} />
      </div>
    </div>
  );
};

export default MessageBubble;