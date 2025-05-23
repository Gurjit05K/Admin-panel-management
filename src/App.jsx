import { useState } from 'react';
import Sidebar from './components/Sidebar';
import ConversationList from './components/ConversationList';
import ChatWindow from './components/ChatWindow';
import Settings from './components/Settings';
import AICopilot from './components/AICopilot';

// Dummy data for conversations and messages
const dummyConversations = [
  { id: 1, user: 'John Doe', lastMessage: 'Hi, need help!', timestamp: '10:30 AM' },
  { id: 2, user: 'Jane Smith', lastMessage: 'Thanks for the update.', timestamp: '9:15 AM' },
  { id: 3, user: 'Alice Brown', lastMessage: 'Any updates on my ticket?', timestamp: '8:45 AM' },
];

const dummyMessages = {
  1: [
    { id: 1, sender: 'John Doe', text: 'Hi, need help!', timestamp: '10:30 AM' },
    { id: 2, sender: 'Admin', text: 'Sure, how can I assist?', timestamp: '10:32 AM' },
  ],
  2: [
    { id: 1, sender: 'Jane Smith', text: 'Thanks for the update.', timestamp: '9:15 AM' },
  ],
  3: [
    { id: 1, sender: 'Alice Brown', text: 'Any updates on my ticket?', timestamp: '8:45 AM' },
  ],
};

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [messages, setMessages] = useState(dummyMessages);
  const [showSettings, setShowSettings] = useState(false);
  const [showCopilot, setShowCopilot] = useState(false);
  const [copilotResponse, setCopilotResponse] = useState('');

  // Toggle sidebar for mobile
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  // Select a conversation and show Copilot
  const selectConversation = (id) => {
    setSelectedConversation(id);
    setShowSettings(false);
    setShowCopilot(true); // Auto-open Copilot
    setIsSidebarOpen(false);
    setCopilotResponse(''); // Clear previous response
  };

  // Send a message in the chat window
  const sendMessage = (text) => {
    if (!selectedConversation) return;
    const newMessage = {
      id: messages[selectedConversation].length + 1,
      sender: 'Admin',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    setMessages({
      ...messages,
      [selectedConversation]: [...messages[selectedConversation], newMessage],
    });
    setCopilotResponse(''); // Clear Copilot response after sending
  };

  // Insert Copilot response into chat composer
  const insertCopilotResponse = (response) => {
    setCopilotResponse(response);
    setShowCopilot(true); // Keep Copilot open
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar
        isOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
        setShowSettings={setShowSettings}
        setShowCopilot={setShowCopilot}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col md:flex-row">
        {/* Conversation List */}
        <ConversationList
          conversations={dummyConversations}
          selectConversation={selectConversation}
          selectedConversation={selectedConversation}
        />

        {/* Chat Window, Settings, or Placeholder */}
        <div className="flex-1 flex flex-col relative">
          {showSettings ? (
            <Settings />
          ) : selectedConversation ? (
            <ChatWindow
              messages={messages[selectedConversation]}
              sendMessage={sendMessage}
              user={dummyConversations.find((c) => c.id === selectedConversation).user}
              insertCopilotResponse={insertCopilotResponse}
              copilotResponse={copilotResponse}
              showCopilot={showCopilot}
            />
          ) : (
            <div className="flex-1 flex items-center justify-center text-gray-500">
              Select a conversation to start chatting
            </div>
          )}
          {/* AI Copilot Panel */}
          {selectedConversation && showCopilot && (
            <AICopilot
              conversations={dummyConversations}
              selectedConversation={selectedConversation}
              insertCopilotResponse={insertCopilotResponse}
              setShowCopilot={setShowCopilot}
              messages={messages}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
