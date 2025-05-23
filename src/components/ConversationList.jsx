function ConversationList({ conversations, selectConversation, selectedConversation }) {
  return (
    <div className="w-full md:w-1/3 bg-white border-r border-gray-200 overflow-y-auto">
      {conversations.map((conv) => (
        <div
          key={conv.id}
          className={`p-4 border-b border-gray-200 hover:bg-gray-50 cursor-pointer transition duration-150 ${
            selectedConversation === conv.id ? 'bg-blue-50' : ''
          }`}
          onClick={() => selectConversation(conv.id)}
        >
          <div className="flex items-center">
            <div className="w-10 h-10 bg-blue-500 text-white rounded-full flex items-center justify-center">
              {conv.user[0]}
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-900">{conv.user}</p>
              <p className="text-sm text-gray-500 truncate">{conv.lastMessage}</p>
              <p className="text-xs text-gray-400">{conv.timestamp}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ConversationList;