import React, { useState, useRef, useEffect } from 'react';
import { Send, Minimize2 } from 'lucide-react';
import { ChatMessage } from '../../types/chatbot';
import MessageBubble from './MessageBubble';
import TypingIndicator from './TypingIndicator';

interface ChatWindowProps {
  isOpen: boolean;
  onClose: () => void;
  messages: ChatMessage[];
  onSendMessage: (message: string) => void;
  isTyping: boolean;
  welcomeMessage?: string;
}

const ChatWindow: React.FC<ChatWindowProps> = ({
  isOpen,
  onClose,
  messages,
  onSendMessage,
  isTyping,
  welcomeMessage = "Hi! How can I help you today?"
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
    <div className={`
      fixed bottom-24 right-6 z-40
      w-96 h-[500px] max-h-[80vh]
      bg-white rounded-2xl
      shadow-elegant border border-border
      backdrop-blur-lg
      animate-slide-up
      flex flex-col
      overflow-hidden
    `}>
      {/* Header */}
      <div className="
        bg-gradient-primary text-white
        px-6 py-4 rounded-t-2xl
        flex items-center justify-between
      ">
        <div>
          <h3 className="font-semibold text-lg">Chat Support</h3>
          <p className="text-white/80 text-sm">We're here to help</p>
        </div>
        <button
          onClick={onClose}
          className="
            p-2 rounded-lg
            hover:bg-white/20
            transition-colors duration-200
          "
          aria-label="Close chat"
        >
          <Minimize2 className="w-5 h-5" />
        </button>
      </div>

      {/* Messages Container */}
      <div className="
        flex-1 overflow-y-auto
        px-4 py-4 space-y-4
        bg-gradient-to-b from-white to-gray-50/50
      ">
        {/* Welcome Message */}
        {messages.length === 0 && (
          <div className="text-center py-8">
            <div className="
              bg-chat-bot-bg text-chat-bot-text
              rounded-xl px-4 py-3 mx-4
              shadow-sm animate-fade-in
            ">
              {welcomeMessage}
            </div>
          </div>
        )}

        {/* Messages */}
        {messages.map((message) => (
          <MessageBubble key={message.id} message={message} />
        ))}

        {/* Typing Indicator */}
        {isTyping && <TypingIndicator />}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input Form */}
      <form onSubmit={handleSubmit} className="
        p-4 border-t border-border
        bg-white rounded-b-2xl
      ">
        <div className="flex gap-2">
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message..."
            className="
              flex-1 px-4 py-3
              border border-border rounded-xl
              focus:outline-none focus:ring-2 focus:ring-primary
              resize-none
              transition-all duration-200
            "
            maxLength={500}
          />
          <button
            type="submit"
            disabled={!inputValue.trim()}
            className="
              p-3 rounded-xl
              bg-gradient-primary text-white
              hover:shadow-glow
              disabled:opacity-50 disabled:cursor-not-allowed
              transition-all duration-200
              flex items-center justify-center
            "
            aria-label="Send message"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatWindow;