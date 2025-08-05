import React from 'react';
import './chatbot.css';

const TypingIndicator: React.FC = () => {
  return (
    <div className="typing-indicator">
      <div className="typing-bubble">
        <div className="typing-content">
          <div className="typing-text">Typing</div>
          <div className="typing-dots">
            <div className="typing-dot" />
            <div className="typing-dot" />
            <div className="typing-dot" />
          </div>
        </div>

        {/* Message tail */}
        <div className="message-tail bot" />
      </div>
    </div>
  );
};

export default TypingIndicator;