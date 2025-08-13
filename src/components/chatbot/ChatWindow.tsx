import React, { useState, useRef, useEffect } from 'react';
import { Send, Minimize2 } from 'lucide-react';
import { ChatMessage, LeadData } from '../../types/chatbot';
import MessageBubble from './MessageBubble';
import TypingIndicator from './TypingIndicator';
import LeadForm from './LeadForm';
import './chatbot.css';

interface ChatWindowProps {
  isOpen: boolean;
  onClose: () => void;
  messages: ChatMessage[];
  onSendMessage: (message: string) => void;
  isTyping: boolean;
  welcomeMessage?: string;
  onSubmitLead: (data: LeadData) => Promise<void>;
  isSubmittingLead: boolean;
}

const ChatWindow: React.FC<ChatWindowProps> = ({
  isOpen,
  onClose,
  messages,
  onSendMessage,
  isTyping,
  welcomeMessage = "Hi! How can I help you today?",
  onSubmitLead,
  isSubmittingLead
}) => {
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      onSendMessage(inputValue.trim());
      setInputValue('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="chat-window">
      {/* Header */}
      <div className="chat-header">
        <div>
          <h3>Chat Support</h3>
          <p>We're here to help</p>
        </div>
        <button onClick={onClose} aria-label="Close chat">
          <Minimize2 />
        </button>
      </div>

      {/* Messages Container */}
      <div className="messages-container">
        {/* Welcome Message */}
        {messages.length === 0 && (
          <div className="welcome-message">
            <div className="welcome-message-bubble">
              {welcomeMessage}
            </div>
          </div>
        )}

        {/* Messages */}
        {messages.map((message, index) => (
          <React.Fragment key={message.id}>
            <MessageBubble message={message} />
            {/* Show lead form after bot message if needsUserInfo is true */}
            {!message.isUser && message.needsUserInfo && index === messages.length - 1 && !isTyping && (
              <LeadForm 
                onSubmit={onSubmitLead}
                isSubmitting={isSubmittingLead}
              />
            )}
          </React.Fragment>
        ))}

        {/* Typing Indicator */}
        {isTyping && <TypingIndicator />}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input Form */}
      <form onSubmit={handleSubmit} className="input-form">
        <div className="input-container">
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message..."
            className="input-field"
            maxLength={500}
          />
          <button
            type="submit"
            disabled={!inputValue.trim()}
            className="send-button"
            aria-label="Send message"
          >
            <Send />
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatWindow;