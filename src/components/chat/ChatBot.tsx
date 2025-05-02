import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, Send, X, Minimize2, Maximize2 } from 'lucide-react';

interface Message {
  id: string;
  type: 'user' | 'bot';
  text: string;
  timestamp: Date;
}

const initialMessage: Message = {
  id: '1',
  type: 'bot',
  text: 'Hi! I\'m Yatra Assistant. How can I help you plan your perfect Indian adventure today?',
  timestamp: new Date()
};

const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([initialMessage]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateResponse = async (userMessage: string): Promise<string> => {
    // Simulate AI response based on user input
    setIsTyping(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsTyping(false);

    const responses: { [key: string]: string } = {
      default: "I'd be happy to help you plan your trip to India. What specific information are you looking for?",
      destination: "We offer tours to many beautiful destinations across India including Kerala, Rajasthan, Goa, and the Himalayas. Would you like to know more about any specific destination?",
      booking: "To book a tour, you can use our booking form at the top of the homepage. Would you like me to guide you through the process?",
      price: "Our tour prices vary depending on the destination, duration, and inclusions. Could you tell me which destination you're interested in?",
      contact: "You can reach our team at info@yatra-explore.com or call us at +91 9876543210. Would you like me to connect you with a travel expert?",
    };

    const message = userMessage.toLowerCase();
    if (message.includes('destination')) return responses.destination;
    if (message.includes('book') || message.includes('reservation')) return responses.booking;
    if (message.includes('price') || message.includes('cost')) return responses.price;
    if (message.includes('contact') || message.includes('support')) return responses.contact;
    return responses.default;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      text: inputText,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');

    const response = await generateResponse(inputText);
    const botMessage: Message = {
      id: (Date.now() + 1).toString(),
      type: 'bot',
      text: response,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, botMessage]);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Chat Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-primary-500 text-white p-4 rounded-full shadow-lg hover:bg-primary-600 transition-colors"
        >
          <MessageSquare size={24} />
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className={`bg-white rounded-lg shadow-xl w-[380px] transition-all ${
          isMinimized ? 'h-[60px]' : 'h-[600px]'
        }`}>
          {/* Header */}
          <div className="bg-primary-500 text-white p-4 rounded-t-lg flex justify-between items-center">
            <div className="flex items-center">
              <MessageSquare size={20} className="mr-2" />
              <h3 className="font-medium">Yatra Assistant</h3>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setIsMinimized(!isMinimized)}
                className="hover:text-gray-200 transition-colors"
              >
                {isMinimized ? <Maximize2 size={18} /> : <Minimize2 size={18} />}
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="hover:text-gray-200 transition-colors"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {!isMinimized && (
            <>
              {/* Messages */}
              <div className="p-4 h-[480px] overflow-y-auto">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`mb-4 flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] p-3 rounded-lg ${
                        message.type === 'user'
                          ? 'bg-primary-500 text-white'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {message.text}
                    </div>
                  </div>
                ))}
                {isTyping && (
                  <div className="flex justify-start mb-4">
                    <div className="bg-gray-100 text-gray-800 p-3 rounded-lg">
                      <div className="flex space-x-2">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <form onSubmit={handleSubmit} className="p-4 border-t">
                <div className="relative">
                  <textarea
                    ref={inputRef}
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Type your message..."
                    className="w-full pr-10 py-2 px-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-primary-300 resize-none"
                    rows={1}
                  />
                  <button
                    type="submit"
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-primary-500 hover:text-primary-600"
                    disabled={!inputText.trim()}
                  >
                    <Send size={20} />
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default ChatBot;