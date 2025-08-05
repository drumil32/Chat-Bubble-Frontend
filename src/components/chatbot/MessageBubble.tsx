import React from 'react';
import { ChatMessage } from '../../types/chatbot';
import './chatbot.css';

interface MessageBubbleProps {
  message: ChatMessage;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const { isUser, message: text, timestamp } = message;

  return (
    <div className={`message-bubble-container ${isUser ? 'user' : 'bot'}`}>
      <div className={`message-bubble ${isUser ? 'user' : 'bot'}`}>
        <p className="message-text">
          {text}
        </p>
        
        {/* Timestamp */}
        <div className={`message-timestamp ${isUser ? 'user' : 'bot'}`}>
          {timestamp.toLocaleTimeString([], { 
            hour: '2-digit', 
            minute: '2-digit' 
          })}
        </div>

        {/* Message tail */}
        <div className={`message-tail ${isUser ? 'user' : 'bot'}`} />
      </div>
    </div>
  );
};

export default MessageBubble;