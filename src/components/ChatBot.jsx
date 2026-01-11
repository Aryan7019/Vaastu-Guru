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
      text: "Hello! I'm your AI assistant for NumaVaastu. I can help you with questions about numerology, vaastu, and our services. How can I assist you today?",
      isBot: true
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');

  const predefinedResponses = {
    // Greetings
    greeting: "Hello! 👋 Welcome to NumaVaastu! I'm here to help you with numerology, vaastu, and our services. How can I assist you today?",
    howAreYou: "I'm doing great, thank you for asking! 😊 How can I help you today with numerology or vaastu?",
    thanks: "You're welcome! 🙏 Feel free to ask if you have any more questions about our services.",
    bye: "Goodbye! 👋 Thank you for visiting NumaVaastu. Have a wonderful day filled with positive energy!",
    
    // Website & Services
    numerology: "Numerology is the study of numbers and their mystical relationship with life events. Each number from 1-9 has unique vibrations and meanings. Your birth date and name can reveal insights about your personality, life path, and destiny.",
    vaastu: "Vaastu Shastra is an ancient Indian science of architecture and space arrangement. It focuses on harmonizing human dwellings with natural forces and cosmic energies to bring prosperity, health, and happiness.",
    consultants: "Our expert consultants are Yashraj Guruji and Rishabh Goel. Both have years of experience in numerology and vaastu consultation, helping thousands of clients achieve harmony in their lives.",
    contact: "You can contact us at mobile number +919650881509 or click on the 'Book Consultation' button to schedule an appointment.",
    services: "We offer: \n• Personalized numerology readings\n• Vaastu consultations for homes & offices\n• Name correction suggestions\n• Color therapy guidance\n• Pyramid therapy\n• Life path guidance based on numbers",
    calculator: "Our numerology calculator analyzes your birth date and name to provide insights into your life path number, destiny number, and personality traits. Go to the Calculator page and sign in to access this feature!",
    
    // Website pages
    about: "Our About page explains the ancient sciences of Numerology and Vaastu Shastra. You can learn about number meanings (1-9) and directional principles. Navigate there from the menu!",
    therapy: "We offer Color Therapy and Pyramid Therapy! Color therapy uses color frequencies to balance your well-being, while pyramid therapy harnesses cosmic energy for healing. Check our Therapy page for details!",
    home: "Our Home page showcases NumaVaastu's services, our expert consultants, and ways to connect with us. You can book consultations and explore our offerings there.",
    
    // Pricing & Booking
    price: "For pricing details and consultation fees, please contact us at +919650881509 or book a consultation through our website. Our team will provide you with all the information.",
    book: "To book a consultation, click the 'Book Consultation' button on any page. You'll need to sign in first, then fill out the form with your details. Our team will contact you shortly!",
    
    // Features
    report: "After using our calculator, you can generate a detailed numerology report! Just click the 'Generate Report' button in the results section to get a printable PDF of your analysis.",
    
    // General questions
    what: "NumaVaastu is your destination for numerology and vaastu guidance. We help you understand the power of numbers and spatial harmony to improve your life, relationships, and prosperity.",
    who: "NumaVaastu was founded by Yashraj Guruji and Rishabh Goel, experts in numerology and vaastu shastra with years of experience helping people achieve balance and success.",
    
    default: "I can help you with:\n• Numerology & Vaastu information\n• Our services & consultants\n• Calculator & reports\n• Booking consultations\n• Contact details\n\nJust ask me anything about these topics! 😊"
  };

  const getResponse = (input) => {
    const lowerInput = input.toLowerCase().trim();
    
    // Greetings
    if (/^(hi|hello|hey|hii+|hola|namaste|good morning|good afternoon|good evening)/.test(lowerInput)) {
      return predefinedResponses.greeting;
    }
    if (lowerInput.includes('how are you') || lowerInput.includes('how r u') || lowerInput.includes('whats up') || lowerInput.includes("what's up")) {
      return predefinedResponses.howAreYou;
    }
    if (lowerInput.includes('thank') || lowerInput.includes('thanks') || lowerInput.includes('thx')) {
      return predefinedResponses.thanks;
    }
    if (/^(bye|goodbye|see you|take care|cya)/.test(lowerInput) || lowerInput.includes('bye')) {
      return predefinedResponses.bye;
    }
    
    // Website specific
    if (lowerInput.includes('what is') && (lowerInput.includes('numavaastu') || lowerInput.includes('this website') || lowerInput.includes('this site'))) {
      return predefinedResponses.what;
    }
    if (lowerInput.includes('who') && (lowerInput.includes('founder') || lowerInput.includes('created') || lowerInput.includes('made') || lowerInput.includes('behind'))) {
      return predefinedResponses.who;
    }
    
    // Pages
    if (lowerInput.includes('about') || lowerInput.includes('learn')) {
      return predefinedResponses.about;
    }
    if (lowerInput.includes('therapy') || lowerInput.includes('color') || lowerInput.includes('pyramid')) {
      return predefinedResponses.therapy;
    }
    if (lowerInput.includes('home') || lowerInput.includes('main page')) {
      return predefinedResponses.home;
    }
    
    // Services & Features
    if (lowerInput.includes('numerology') || lowerInput.includes('number meaning') || lowerInput.includes('birth number')) {
      return predefinedResponses.numerology;
    }
    if (lowerInput.includes('vaastu') || lowerInput.includes('vastu') || lowerInput.includes('direction')) {
      return predefinedResponses.vaastu;
    }
    if (lowerInput.includes('consultant') || lowerInput.includes('expert') || lowerInput.includes('guruji') || lowerInput.includes('rishabh') || lowerInput.includes('yashraj')) {
      return predefinedResponses.consultants;
    }
    if (lowerInput.includes('service') || lowerInput.includes('offer') || lowerInput.includes('provide') || lowerInput.includes('do you do')) {
      return predefinedResponses.services;
    }
    if (lowerInput.includes('calculator') || lowerInput.includes('calculate') || lowerInput.includes('find my number')) {
      return predefinedResponses.calculator;
    }
    if (lowerInput.includes('report') || lowerInput.includes('pdf') || lowerInput.includes('download')) {
      return predefinedResponses.report;
    }
    
    // Contact & Booking
    if (lowerInput.includes('contact') || lowerInput.includes('reach') || lowerInput.includes('phone') || lowerInput.includes('call') || lowerInput.includes('mobile')) {
      return predefinedResponses.contact;
    }
    if (lowerInput.includes('price') || lowerInput.includes('cost') || lowerInput.includes('fee') || lowerInput.includes('charge') || lowerInput.includes('how much')) {
      return predefinedResponses.price;
    }
    if (lowerInput.includes('book') || lowerInput.includes('appointment') || lowerInput.includes('consultation') || lowerInput.includes('schedule')) {
      return predefinedResponses.book;
    }
    
    // Help
    if (lowerInput.includes('help') || lowerInput.includes('what can you do') || lowerInput.includes('options')) {
      return predefinedResponses.default;
    }
    
    return predefinedResponses.default;
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
      const response = getResponse(inputMessage);

      const botMessage = {
        id: Date.now() + 1,
        text: response,
        isBot: true
      };

      setMessages(prev => [...prev, botMessage]);
    }, 800);

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
        className="fixed bottom-[72px] sm:bottom-[76px] right-4 z-50 w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full shadow-xl flex items-center justify-center text-white hover:from-orange-600 hover:to-orange-700 transition-all duration-300"
        style={{ boxShadow: '0 4px 20px rgba(249, 115, 22, 0.5)' }}
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
              <X className="h-5 w-5 sm:h-6 sm:w-6" />
            </motion.div>
          ) : (
            <motion.div
              key="chat"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <MessageCircle className="h-5 w-5 sm:h-6 sm:w-6" />
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
            className="fixed bottom-[136px] sm:bottom-[144px] right-2 sm:right-4 z-40 w-[calc(100vw-16px)] sm:w-80 max-w-sm h-80 sm:h-96 bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-3 sm:p-4">
              <div className="flex items-center space-x-2">
                <Bot className="h-4 w-4 sm:h-5 sm:w-5" />
                <div>
                  <h3 className="font-semibold text-white text-sm sm:text-base">AI Assistant</h3>
                  <p className="text-xs text-white/90">Ask me about numerology & vaastu</p>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 p-3 sm:p-4 overflow-y-auto space-y-3 bg-gray-50">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
                >
                  <div
                    className={`max-w-[85%] sm:max-w-xs p-2.5 sm:p-3 rounded-lg text-xs sm:text-sm ${
                      message.isBot
                        ? 'bg-white text-gray-800 shadow-sm border border-gray-100'
                        : 'bg-gradient-to-r from-orange-500 to-orange-600 text-white'
                    }`}
                  >
                    {message.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Input */}
            <div className="p-3 sm:p-4 border-t border-gray-200 bg-white">
              <div className="flex space-x-2">
                <Input
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask me anything..."
                  className="flex-1 text-sm text-gray-800 bg-gray-50 border-gray-200 focus:border-orange-500"
                />
                <Button
                  onClick={handleSendMessage}
                  size="sm"
                  className="bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:from-orange-600 hover:to-orange-700"
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
