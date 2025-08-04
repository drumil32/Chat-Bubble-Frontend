import React from 'react';

const TypingIndicator: React.FC = () => {
  return (
    <div className="flex justify-start animate-fade-in">
      <div className="
        bg-chat-bot-bg text-chat-bot-text
        px-4 py-3 rounded-2xl rounded-bl-sm
        border border-border shadow-sm
        relative
      ">
        <div className="flex items-center space-x-1">
          <div className="text-sm text-gray-500 mr-2">Typing</div>
          <div className="flex space-x-1">
            <div className="
              w-2 h-2 bg-gray-400 rounded-full
              animate-typing
            " style={{ animationDelay: '0ms' }} />
            <div className="
              w-2 h-2 bg-gray-400 rounded-full
              animate-typing
            " style={{ animationDelay: '200ms' }} />
            <div className="
              w-2 h-2 bg-gray-400 rounded-full
              animate-typing
            " style={{ animationDelay: '400ms' }} />
          </div>
        </div>

        {/* Message tail */}
        <div className="
          absolute w-3 h-3
          bg-chat-bot-bg -left-1 bottom-3 rounded-bl-sm
          border-l border-b border-border
          transform rotate-45
        " />
      </div>
    </div>
  );
};

export default TypingIndicator;