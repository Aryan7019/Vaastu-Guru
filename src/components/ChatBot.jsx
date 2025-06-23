
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Bot } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I'm your AI assistant for Bhaggya Darshhan. I can help you with questions about numerology, vaastu, and our services. How can I assist you today?",
      isBot: true
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');

  const predefinedResponses = {
    numerology: "Numerology is the study of numbers and their mystical relationship with life events. Each number from 1-9 has unique vibrations and meanings. Your birth date and name can reveal insights about your personality, life path, and destiny.",
    vaastu: "Vaastu Shastra is an ancient Indian science of architecture and space arrangement. It focuses on harmonizing human dwellings with natural forces and cosmic energies to bring prosperity, health, and happiness.",
    consultants: "Our expert consultants are Yashraj guruji and Rishabh Goel. Both have years of experience in numerology and vaastu consultation, helping thousands of clients achieve harmony in their lives.",
    contact: "You can contact at mobile number +919650881509 or click on book appointment button to schedule a consultation.",
    services: "We offer personalized numerology readings, vaastu consultations for homes and offices, name correction suggestions, and guidance for important life decisions based on numerical analysis.",
    calculator: "Our numerology calculator analyzes your birth date and name to provide insights into your life path number, destiny number, and personality traits. You'll need to sign up to access this feature.",
    default: "I understand you're interested in learning more. Could you please ask about numerology, vaastu, our consultants, services, or the calculator? I'm here to help with any specific questions!"
  };

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: Date.now(),
      text: inputMessage,
      isBot: false
    };

    setMessages(prev => [...prev, userMessage]);

    // Generate bot response
    setTimeout(() => {
      const lowerInput = inputMessage.toLowerCase();
      let response = predefinedResponses.default;

      if (lowerInput.includes('numerology') || lowerInput.includes('number')) {
        response = predefinedResponses.numerology;
      } else if (lowerInput.includes('vaastu') || lowerInput.includes('vastu')) {
        response = predefinedResponses.vaastu;
      } else if (lowerInput.includes('consultant') || lowerInput.includes('expert')) {
        response = predefinedResponses.consultants;
      } else if (lowerInput.includes('service') || lowerInput.includes('help')) {
        response = predefinedResponses.services;
      } else if (lowerInput.includes('calculator') || lowerInput.includes('calculate')) {
        response = predefinedResponses.calculator;
      }else if (lowerInput.includes('contact') || lowerInput.includes('reach') || lowerInput.includes('phone')) {
        response = predefinedResponses.contact;
     }

      const botMessage = {
        id: Date.now() + 1,
        text: response,
        isBot: true
      };

      setMessages(prev => [...prev, botMessage]);
    }, 1000);

    setInputMessage('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Chat Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 orange-gradient rounded-full shadow-lg flex items-center justify-center text-white hover:orange-gradient-hover transition-all duration-300"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X className="h-6 w-6" />
            </motion.div>
          ) : (
            <motion.div
              key="chat"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <MessageCircle className="h-6 w-6" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-24 right-6 z-40 w-80 h-96 bg-white rounded-lg shadow-xl border border-gray-200 flex flex-col"
          >
            {/* Header */}
            <div className="orange-gradient text-white p-4 rounded-t-lg">
              <div className="flex items-center space-x-2">
                <Bot className="h-5 w-5" />
                <div>
                  <h3 className="font-semibold">AI Assistant</h3>
                  <p className="text-xs opacity-90">Ask me about numerology & vaastu</p>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
                >
                  <div
                    className={`max-w-xs p-3 rounded-lg text-sm ${
                      message.isBot
                        ? 'bg-gray-100 text-gray-800'
                        : 'orange-gradient text-white'
                    }`}
                  >
                    {message.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Input */}
            <div className="p-4 border-t border-gray-200">
              <div className="flex space-x-2">
                <Input
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask me anything..."
                  className="flex-1 text-sm"
                />
                <Button
                  onClick={handleSendMessage}
                  size="sm"
                  className="orange-gradient text-white hover:orange-gradient-hover"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatBot;
