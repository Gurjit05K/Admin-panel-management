import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes } from 'react-icons/fa';

function AICopilot({ conversations, selectedConversation, insertCopilotResponse, setShowCopilot, messages }) {
  const [input, setInput] = useState('');
  const [responses, setResponses] = useState([]);
  const [tone, setTone] = useState('Default');

  // Simulate AI Copilot responses
  const handleQuery = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    let responseText = 'Here’s a suggested response.';
    const conversation = conversations.find((c) => c.id === selectedConversation);
    const convoMessages = messages[selectedConversation] || [];
    const lastMessage = convoMessages[convoMessages.length - 1];

    // Handle specific query types
    if (input.toLowerCase().includes('summarize')) {
      responseText = convoMessages.length
        ? `Summary of conversation with ${conversation.user}: ${convoMessages
            .slice(-2)
            .map((m) => `${m.sender}: ${m.text}`)
            .join('; ')}.`
        : 'No messages to summarize.';
    } else if (input.toLowerCase().includes('find') || input.toLowerCase().includes('search')) {
      responseText = `Found ${conversations.length} conversations. Try selecting one for details.`;
    } else if (input.toLowerCase().includes('email')) {
      responseText = `Drafted email: Subject: Follow-up\nDear ${conversation.user}, Thanks for your message...`;
    } else if (input.toLowerCase().includes('make this') || input.toLowerCase().includes('tone: ')) {
      const baseText = input.match(/make this.*?: *(.*)/i)?.[1] || 'Please update your profile';
      switch (tone) {
        case 'Friendly':
          responseText = `Hey ${conversation.user}! Could you kindly ${baseText.toLowerCase()}? Thanks a bunch! 😊`;
          break;
        case 'Formal':
          responseText = `Dear ${conversation.user}, Please ${baseText.toLowerCase()} at your earliest convenience. Thank you.`;
          break;
        case 'Concise':
          responseText = `${baseText}.`;
          break;
        case 'Professional':
          responseText = `Hello ${conversation.user}, Kindly ${baseText.toLowerCase()}. Regards, [Your Team]`;
          break;
        case 'Casual':
          responseText = `Yo ${conversation.user}, can you ${baseText.toLowerCase()}? Cheers!`;
          break;
        default:
          responseText = baseText;
      }
    } else if (
      input.toLowerCase().includes('respond in') ||
      input.toLowerCase().includes('reply in') ||
      input.toLowerCase().includes('how to respond')
    ) {
      // Handle tone-specific replies to the latest message
      if (!lastMessage) {
        responseText = `Hi ${conversation.user}, how can I help you today?`;
      } else {
        const isGratitude = lastMessage.text.toLowerCase().includes('thanks') || lastMessage.text.toLowerCase().includes('thank you');
        if (isGratitude) {
          switch (tone) {
            case 'Friendly':
              responseText = `You're welcome, ${conversation.user}! Happy to help! 😊`;
              break;
            case 'Formal':
              responseText = `It is my pleasure to assist you, ${conversation.user}.`;
              break;
            case 'Concise':
              responseText = `You're welcome.`;
              break;
            case 'Professional':
              responseText = `My pleasure, ${conversation.user}. How may I assist you further?`;
              break;
            case 'Casual':
              responseText = `No problem, ${conversation.user}!`;
              break;
            default:
              responseText = `You're welcome, ${conversation.user}.`;
          }
        } else {
          switch (tone) {
            case 'Friendly':
              responseText = `Hey ${conversation.user}, glad you reached out! What's next? 😊`;
              break;
            case 'Formal':
              responseText = `Dear ${conversation.user}, Thank you for your message. How may I assist you further?`;
              break;
            case 'Concise':
              responseText = `What's next?`;
              break;
            case 'Professional':
              responseText = `Hello ${conversation.user}, Thank you for your message. Please let me know how I can assist.`;
              break;
            case 'Casual':
              responseText = `Yo ${conversation.user}, what's up next?`;
              break;
            default:
              responseText = `Hi ${conversation.user}, how can I assist you further?`;
          }
        }
      }
    } else {
      // Fallback: Suggest a reply based on the latest message
      responseText = lastMessage
        ? `Suggested reply to "${lastMessage.text}": How can I assist you further?`
        : `Hi ${conversation.user}, how can I help you today?`;
    }

    setResponses([...responses, { id: responses.length + 1, query: input, response: responseText }]);
    setInput('');
  };

  // Copy response to chat composer
  const copyToComposer = (response) => {
    insertCopilotResponse(response);
    setInput(''); // Clear Copilot input
  };

  return (
    <motion.div
      initial={{ x: 300, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 300, opacity: 0 }}
      className="fixed top-0 right-0 w-full md:w-80 h-full bg-white shadow-xl z-30 flex flex-col md:rounded-l-lg"
    >
      {/* Header */}
      <div className="p-4 border-b border-gray-200 bg-teal-50 flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-900">AI Copilot</h2>
        <button
          onClick={() => setShowCopilot(false)}
          className="text-gray-600 hover:text-gray-800"
        >
          <FaTimes size={20} />
        </button>
      </div>

      {/* Responses */}
      <div className="flex-1 p-4 overflow-y-auto">
        <AnimatePresence>
          {responses.map((res) => (
            <motion.div
              key={res.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mb-4"
            >
              <div className="p-3 bg-gray-100 rounded-lg">
                <p className="font-semibold text-sm">You: {res.query}</p>
                <p className="mt-1 text-sm">Copilot: {res.response}</p>
                <button
                  onClick={() => copyToComposer(res.response)}
                  className="mt-2 p-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition duration-150 text-sm"
                >
                  Copy to Composer
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Tone Selector */}
      <div className="p-4 border-t border-gray-200">
        <label className="block text-sm font-medium text-gray-700 mb-2">Adjust Tone:</label>
        <select
          value={tone}
          onChange={(e) => setTone(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm"
        >
          <option value="Default">Default</option>
          <option value="Friendly">Friendly</option>
          <option value="Formal">Formal</option>
          <option value="Concise">Concise</option>
          <option value="Professional">Professional</option>
          <option value="Casual">Casual</option>
        </select>
      </div>

      {/* Input */}
      <div className="p-4 border-t border-gray-200">
        <form onSubmit={handleQuery} className="flex">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 p-3 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm"
            placeholder="e.g., Respond in Friendly tone"
          />
          <button
            type="submit"
            className="p-3 bg-teal-500 text-white rounded-r-lg hover:bg-teal-600 transition duration-150 text-sm font-medium"
          >
            Ask
          </button>
        </form>
      </div>
    </motion.div>
  );
}

export default AICopilot;