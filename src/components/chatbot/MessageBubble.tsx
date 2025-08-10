import React from 'react';
import ReactMarkdown from 'react-markdown';
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
        <div className="message-text">
          {isUser ? (
            <p>{text}</p>
          ) : (
            <ReactMarkdown
              components={{
                // Customize markdown rendering for better styling
                p: ({ children }) => <p className="markdown-p">{children}</p>,
                strong: ({ children }) => <strong className="markdown-strong">{children}</strong>,
                em: ({ children }) => <em className="markdown-em">{children}</em>,
                ul: ({ children }) => <ul className="markdown-ul">{children}</ul>,
                ol: ({ children }) => <ol className="markdown-ol">{children}</ol>,
                li: ({ children }) => <li className="markdown-li">{children}</li>,
                code: ({ children }) => <code className="markdown-code">{children}</code>,
                blockquote: ({ children }) => <blockquote className="markdown-blockquote">{children}</blockquote>,
                h1: ({ children }) => <h1 className="markdown-h1">{children}</h1>,
                h2: ({ children }) => <h2 className="markdown-h2">{children}</h2>,
                h3: ({ children }) => <h3 className="markdown-h3">{children}</h3>,
              }}
            >
              {text}
            </ReactMarkdown>
          )}
        </div>
        
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