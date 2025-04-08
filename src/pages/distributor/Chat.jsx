import { useState, useEffect, useRef } from 'react';
import { Send, Paperclip, MoreVertical, ChevronLeft, User, Phone, Video } from 'lucide-react';

export default function DistributorCustomerChat() {
  const [activeChat, setActiveChat] = useState(null);
  const [message, setMessage] = useState('');
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userType, setUserType] = useState('customer'); // 'customer' or 'distributor'
  const messagesEndRef = useRef(null);

  // Sample data - in a real app you'd fetch this from an API
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setConversations([
        {
          id: 1,
          name: userType === 'customer' ? 'ABC Distribution Co.' : 'John Smith',
          unread: 2,
          lastMessage: 'About the latest order...',
          lastTime: '10:42 AM',
          avatar: userType === 'customer' ? '/api/placeholder/40/40' : '/api/placeholder/40/40',
          messages: [
            { id: 1, sender: 'distributor', text: 'Hello! How can I help you today?', time: '10:30 AM' },
            { id: 2, sender: 'customer', text: 'Hi, I wanted to ask about my recent API order #12345', time: '10:35 AM' },
            { id: 3, sender: 'distributor', text: 'Of course! I can see your order. What information do you need?', time: '10:38 AM' },
            { id: 4, sender: 'customer', text: 'About the latest order...', time: '10:42 AM' },
          ]
        },
        {
          id: 2,
          name: userType === 'customer' ? 'XYZ Supply Inc.' : 'Jane Doe',
          unread: 0,
          lastMessage: 'Invoice #INV-2023-04-12 has been paid',
          lastTime: 'Yesterday',
          avatar: userType === 'customer' ? '/api/placeholder/40/40' : '/api/placeholder/40/40',
          messages: [
            { id: 1, sender: 'distributor', text: 'Hi there! Your invoice #INV-2023-04-12 has been generated', time: 'Yesterday, 2:15 PM' },
            { id: 2, sender: 'customer', text: 'Thanks, I will process the payment right away', time: 'Yesterday, 3:20 PM' },
            { id: 3, sender: 'distributor', text: 'Invoice #INV-2023-04-12 has been paid', time: 'Yesterday, 4:45 PM' },
          ]
        },
        {
          id: 3,
          name: userType === 'customer' ? 'Global Distributors LLC' : 'Robert Johnson',
          unread: 0,
          lastMessage: 'Thank you for your prompt response',
          lastTime: 'Apr 3',
          avatar: userType === 'customer' ? '/api/placeholder/40/40' : '/api/placeholder/40/40',
          messages: [
            { id: 1, sender: 'customer', text: 'Hi, I need to increase my API call limit for next month', time: 'Apr 3, 9:12 AM' },
            { id: 2, sender: 'distributor', text: 'I can help you with that. What limit are you looking for?', time: 'Apr 3, 9:30 AM' },
            { id: 3, sender: 'customer', text: 'I need to increase to the enterprise tier with 1M calls', time: 'Apr 3, 10:05 AM' },
            { id: 4, sender: 'distributor', text: 'I\'ve updated your account. The changes will be effective from next billing cycle', time: 'Apr 3, 10:45 AM' },
            { id: 5, sender: 'customer', text: 'Thank you for your prompt response', time: 'Apr 3, 11:02 AM' },
          ]
        }
      ]);
      setLoading(false);
      setActiveChat(1); // Set first conversation as active by default
    }, 1000);
  }, [userType]);

  // Scroll to bottom of messages whenever messages change or active chat changes
  useEffect(() => {
    scrollToBottom();
  }, [activeChat, conversations]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = () => {
    if (!message.trim()) return;
    
    const newMessage = {
      id: Date.now(),
      sender: userType,
      text: message,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    setConversations(prevConversations => 
      prevConversations.map(convo => 
        convo.id === activeChat 
          ? {
              ...convo,
              lastMessage: message,
              lastTime: 'Just now',
              messages: [...convo.messages, newMessage]
            }
          : convo
      )
    );
    
    setMessage('');
    
    // In a real app, you would send this message to your backend API
    // sendMessageToAPI(activeChat, message);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const toggleUserType = () => {
    setUserType(prevType => prevType === 'customer' ? 'distributor' : 'customer');
  };

  const getActiveConversation = () => {
    return conversations.find(convo => convo.id === activeChat);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar / Conversation List */}
      <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-semibold text-gray-800">Messages</h1>
            <button 
              onClick={toggleUserType} 
              className="px-3 py-1 bg-blue-100 text-blue-600 rounded-md text-sm"
            >
              Switch to {userType === 'customer' ? 'Distributor' : 'Customer'} View
            </button>
          </div>
          <div className="mt-2">
            <input 
              type="text" 
              placeholder="Search conversations..." 
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto">
          {conversations.map(conversation => (
            <div 
              key={conversation.id}
              className={`p-3 border-b border-gray-200 cursor-pointer hover:bg-gray-50 flex items-center ${activeChat === conversation.id ? 'bg-blue-50' : ''}`}
              onClick={() => setActiveChat(conversation.id)}
            >
              <img 
                src={conversation.avatar} 
                alt={conversation.name} 
                className="w-12 h-12 rounded-full mr-3 bg-gray-300"
              />
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-baseline">
                  <h2 className="text-sm font-medium text-gray-900 truncate">{conversation.name}</h2>
                  <span className="text-xs text-gray-500">{conversation.lastTime}</span>
                </div>
                <p className="text-sm text-gray-500 truncate">{conversation.lastMessage}</p>
              </div>
              {conversation.unread > 0 && (
                <span className="ml-2 bg-blue-500 text-white text-xs font-medium px-2 py-0.5 rounded-full">
                  {conversation.unread}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
      
      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {activeChat ? (
          <>
            {/* Chat Header */}
            <div className="px-4 py-3 bg-white border-b border-gray-200 flex items-center justify-between">
              <div className="flex items-center">
                <button className="mr-2 md:hidden">
                  <ChevronLeft size={24} className="text-gray-500" />
                </button>
                <img 
                  src={getActiveConversation()?.avatar} 
                  alt={getActiveConversation()?.name} 
                  className="w-10 h-10 rounded-full mr-3 bg-gray-300"
                />
                <div>
                  <h2 className="font-medium text-gray-900">{getActiveConversation()?.name}</h2>
                  <p className="text-xs text-gray-500">Online</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <button className="p-2 rounded-full hover:bg-gray-100">
                  <Phone size={20} className="text-gray-600" />
                </button>
                <button className="p-2 rounded-full hover:bg-gray-100">
                  <Video size={20} className="text-gray-600" />
                </button>
                <button className="p-2 rounded-full hover:bg-gray-100">
                  <User size={20} className="text-gray-600" />
                </button>
                <button className="p-2 rounded-full hover:bg-gray-100">
                  <MoreVertical size={20} className="text-gray-600" />
                </button>
              </div>
            </div>
            
            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
              {getActiveConversation()?.messages.map(msg => (
                <div 
                  key={msg.id}
                  className={`mb-4 flex ${msg.sender === userType ? 'justify-end' : 'justify-start'}`}
                >
                  <div 
                    className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                      msg.sender === userType 
                        ? 'bg-blue-500 text-white rounded-br-none' 
                        : 'bg-white text-gray-800 border border-gray-200 rounded-bl-none'
                    }`}
                  >
                    <p>{msg.text}</p>
                    <p className={`text-xs mt-1 text-right ${msg.sender === userType ? 'text-blue-100' : 'text-gray-500'}`}>
                      {msg.time}
                    </p>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
            
            {/* Message Input */}
            <div className="p-3 bg-white border-t border-gray-200">
              <div className="flex items-center">
                <button className="p-2 rounded-full hover:bg-gray-100 text-gray-600">
                  <Paperclip size={20} />
                </button>
                <textarea 
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={handleKeyPress}
                  placeholder="Type a message..."
                  className="flex-1 mx-2 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  rows="1"
                />
                <button 
                  onClick={handleSendMessage}
                  disabled={!message.trim()}
                  className={`p-2 rounded-full ${message.trim() ? 'bg-blue-500 hover:bg-blue-600 text-white' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}
                >
                  <Send size={20} />
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center bg-gray-50">
            <div className="text-center p-6">
              <div className="bg-gray-200 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageSquare size={32} className="text-gray-500" />
              </div>
              <h3 className="text-gray-800 font-medium text-lg">No conversation selected</h3>
              <p className="text-gray-500 mt-1">Choose a conversation from the list to start chatting</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// MessageSquare icon component since it's not imported at the top
function MessageSquare({ size = 24, className = "" }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
    </svg>
  );
}