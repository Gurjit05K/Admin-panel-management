import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

function ChatWindow({ messages, sendMessage, user, copilotResponse, showCopilot }) {
  const [input, setInput] = useState('');
  const [isCopilotInserted, setIsCopilotInserted] = useState(false);
  const inputRef = useRef(null);

  // Insert Copilot response into input
  useEffect(() => {
    if (copilotResponse) {
      setInput(copilotResponse);
      setIsCopilotInserted(true);
      inputRef.current?.focus();
      setTimeout(() => setIsCopilotInserted(false), 1000); // Clear highlight after 1s
    }
  }, [copilotResponse]);

  const handleSend = (e) => {
    e.preventDefault();
    if (input.trim()) {
      sendMessage(input);
      setInput('');
      setIsCopilotInserted(false);
    }
  };

  return (
    <div className={`flex-1 flex flex-col bg-white rounded-lg shadow-md ${showCopilot ? 'md:mr-80' : ''}`}>
      {/* Header */}
      <div className="p-4 border-b border-gray-200 bg-teal-50 rounded-t-lg">
        <h2 className="text-lg font-semibold text-gray-900">{user}</h2>
      </div>

      {/* Messages */}
      <div className="flex-1 p-4 overflow-y-auto">
        <AnimatePresence>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className={`mb-4 ${
                msg.sender === 'Admin' ? 'text-right' : 'text-left'
              }`}
            >
              <div
                className={`inline-block p-3 rounded-lg ${
                  msg.sender === 'Admin'
                    ? 'bg-teal-500 text-white'
                    : 'bg-gray-200 text-gray-900'
                }`}
              >
                <p>{msg.text}</p>
                <p className="text-xs mt-1 opacity-75">{msg.timestamp}</p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Input */}
      <div className="p-4 border-t border-gray-200">
        <form onSubmit={handleSend} className="flex">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            ref={inputRef}
            className={`flex-1 p-3 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm ${
              isCopilotInserted ? 'bg-teal-50' : ''
            }`}
            placeholder="Type a message or use AI Copilot..."
          />
          <button
            type="submit"
            className="p-3 bg-teal-500 text-white rounded-r-lg hover:bg-teal-600 transition duration-150 text-sm font-medium"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}

export default ChatWindow;