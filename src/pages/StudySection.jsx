import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Book, Calculator, Home, Star, TrendingUp, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import AuthModal from '@/components/AuthModal';
import { sendConsultationRequest } from '@/services/emailService';
import { toast } from '@/components/ui/use-toast';

const StudySection = () => {
  const [activeTab, setActiveTab] = useState('numerology');
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const { user } = useAuth();

  const handleBookConsultation = () => {
    if (!user) {
      setIsAuthModalOpen(true);
      return;
    }
    sendConsultationRequest(user);
    toast({
      title: "Consultation Request Sent!",
      description: "Thank you for your interest. Our team will contact you shortly to schedule your consultation.",
    });
  };

  const numerologyPrinciples = [
    { number: 1, meaning: "Leadership", description: "Independent, pioneering, ambitious. Natural leaders who initiate new projects.", color: "text-red-500" },
    { number: 2, meaning: "Cooperation", description: "Diplomatic, peaceful, supportive. Excel in partnerships and teamwork.", color: "text-orange-500" },
    { number: 3, meaning: "Creativity", description: "Artistic, expressive, optimistic. Natural communicators and entertainers.", color: "text-yellow-500" },
    { number: 4, meaning: "Stability", description: "Practical, organized, hardworking. Build solid foundations for success.", color: "text-green-500" },
    { number: 5, meaning: "Freedom", description: "Adventurous, versatile, curious. Love change and new experiences.", color: "text-blue-500" },
    { number: 6, meaning: "Nurturing", description: "Caring, responsible, family-oriented. Natural healers and counselors.", color: "text-indigo-500" },
    { number: 7, meaning: "Spirituality", description: "Analytical, introspective, mystical. Seek deeper understanding of life.", color: "text-purple-500" },
    { number: 8, meaning: "Material Success", description: "Ambitious, business-minded, authoritative. Excel in material achievements.", color: "text-pink-500" },
    { number: 9, meaning: "Universal Love", description: "Humanitarian, generous, wise. Serve humanity with compassion.", color: "text-teal-500" }
  ];

  const vaastuPrinciples = [
    { direction: "North", element: "Water", significance: "Wealth and Career", tips: "Keep this area clean and clutter-free. Place water features here.", icon: "💧" },
    { direction: "Northeast", element: "Water + Earth", significance: "Spirituality and Knowledge", tips: "Ideal for prayer room or study area. Avoid heavy furniture.", icon: "🕉️" },
    { direction: "East", element: "Air", significance: "Health and Family", tips: "Good for main entrance. Keep windows open for fresh air.", icon: "🌬️" },
    { direction: "Southeast", element: "Fire", significance: "Energy and Passion", tips: "Perfect for kitchen placement. Avoid water elements here.", icon: "🔥" },
    { direction: "South", element: "Fire", significance: "Fame and Recognition", tips: "Display achievements and awards. Use red or orange colors.", icon: "⭐" },
    { direction: "Southwest", element: "Earth", significance: "Relationships and Stability", tips: "Master bedroom location. Use earth tones and heavy furniture.", icon: "🏔️" },
    { direction: "West", element: "Metal", significance: "Children and Creativity", tips: "Good for children's room. Display creative works here.", icon: "🎨" },
    { direction: "Northwest", element: "Metal + Air", significance: "Travel and Helpful People", tips: "Guest room or office space. Keep travel photos here.", icon: "✈️" }
  ];

  return (
    <>
      <Helmet>
        <title>Study - Learn Numerology & Vaastu | Bhaggya Darshhan</title>
        <meta name="description" content="Explore the ancient sciences of numerology and vaastu shastra. Learn principles, meanings, and practical applications for a harmonious life." />
      </Helmet>

      <div className="min-h-screen py-20">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-center mb-16">
            <h1 className="text-5xl md:text-7xl font-bold text-white text-shadow mb-4">Study <span className="text-black">Ancient Wisdom</span></h1>
            <p className="text-xl text-white max-w-3xl mx-auto">Discover the profound sciences of numerology and vaastu shastra that have guided humanity for millennia</p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="flex justify-center mb-12">
            <div className="bg-white rounded-2xl p-2 shadow-lg">
              <button onClick={() => setActiveTab('numerology')} className={`px-8 py-3 rounded-xl font-medium transition-all duration-300 ${activeTab === 'numerology' ? 'orange-gradient text-white' : 'text-gray-600 hover:text-orange-500'}`}>
                <Calculator className="inline-block w-5 h-5 mr-2" />Numerology
              </button>
              <button onClick={() => setActiveTab('vaastu')} className={`px-8 py-3 rounded-xl font-medium transition-all duration-300 ${activeTab === 'vaastu' ? 'orange-gradient text-white' : 'text-gray-600 hover:text-orange-500'}`}>
                <Home className="inline-block w-5 h-5 mr-2" />Vaastu Shastra
              </button>
            </div>
          </motion.div>

          {activeTab === 'numerology' && (
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} className="space-y-12">
              <div className="bg-white rounded-2xl p-8 shadow-lg card-shadow">
                <h2 className="text-3xl font-bold gradient-text mb-6">What is Numerology?</h2>
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div>
                    <p className="text-gray-700 mb-4">Numerology is the ancient study of numbers and their mystical relationship with life events. It's based on the belief that numbers have vibrational frequencies that influence our lives, personalities, and destinies.</p>
                    <p className="text-gray-700 mb-6">By analyzing your birth date and name, numerology reveals insights about your:</p>
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex items-center"><Star className="h-4 w-4 text-orange-500 mr-2" /> Life Path and Purpose</li>
                      <li className="flex items-center"><Star className="h-4 w-4 text-orange-500 mr-2" /> Personality Traits</li>
                      <li className="flex items-center"><Star className="h-4 w-4 text-orange-500 mr-2" /> Career Guidance</li>
                      <li className="flex items-center"><Star className="h-4 w-4 text-orange-500 mr-2" /> Relationship Compatibility</li>
                    </ul>
                  </div>
                  <div className="text-center">
                    <img alt="Numerology chart with mystical numbers and symbols" className="w-full max-w-md mx-auto rounded-2xl shadow-lg" src="https://images.unsplash.com/photo-1644212054093-e5924f084240" />
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-2xl p-8 shadow-lg card-shadow">
                <h3 className="text-2xl font-bold gradient-text mb-8 text-center">Core Number Meanings</h3>
                <div className="grid md:grid-cols-3 gap-6">
                  {numerologyPrinciples.map((principle, index) => (
                    <motion.div key={principle.number} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: index * 0.1 }} className="bg-gradient-to-br from-orange-50 to-white p-6 rounded-2xl border border-orange-100 hover:shadow-lg transition-shadow">
                      <div className="text-center mb-4">
                        <div className={`text-4xl font-bold ${principle.color} mb-2`}>{principle.number}</div>
                        <h4 className="text-lg font-semibold text-gray-800">{principle.meaning}</h4>
                      </div>
                      <p className="text-gray-600 text-sm text-center">{principle.description}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'vaastu' && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} className="space-y-12">
              <div className="bg-white rounded-2xl p-8 shadow-lg card-shadow">
                <h2 className="text-3xl font-bold gradient-text mb-6">What is Vaastu Shastra?</h2>
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div>
                    <p className="text-gray-700 mb-4">Vaastu Shastra is an ancient Indian science of architecture and space arrangement. It harmonizes human dwellings with natural forces and cosmic energies to promote prosperity, health, and happiness.</p>
                    <p className="text-gray-700 mb-6">Based on the five elements (Panchamahabhuta), Vaastu principles help create:</p>
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex items-center"><Star className="h-4 w-4 text-orange-500 mr-2" /> Positive Energy Flow</li>
                      <li className="flex items-center"><Star className="h-4 w-4 text-orange-500 mr-2" /> Enhanced Well-being</li>
                      <li className="flex items-center"><Star className="h-4 w-4 text-orange-500 mr-2" /> Financial Prosperity</li>
                      <li className="flex items-center"><Star className="h-4 w-4 text-orange-500 mr-2" /> Harmonious Relationships</li>
                    </ul>
                  </div>
                  <div className="text-center">
                    <img alt="Vaastu compass showing eight directions with elements" className="w-full max-w-md mx-auto rounded-2xl shadow-lg" src="https://images.unsplash.com/photo-1598677128962-89d71838f39b" />
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-2xl p-8 shadow-lg card-shadow">
                <h3 className="text-2xl font-bold gradient-text mb-8 text-center">Directional Principles</h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {vaastuPrinciples.map((principle, index) => (
                    <motion.div key={principle.direction} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: index * 0.1 }} className="bg-gradient-to-br from-orange-50 to-white p-6 rounded-2xl border border-orange-100 hover:shadow-lg transition-shadow">
                      <div className="text-center mb-4">
                        <div className="text-3xl mb-2">{principle.icon}</div>
                        <h4 className="text-lg font-semibold text-gray-800">{principle.direction}</h4>
                        <p className="text-sm text-orange-600 font-medium">{principle.element}</p>
                      </div>
                      <div className="space-y-2">
                        <p className="text-sm font-medium text-gray-700">{principle.significance}</p>
                        <p className="text-xs text-gray-600">{principle.tips}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-center mt-16">
            <div className="bg-white rounded-2xl p-8 shadow-lg card-shadow">
              <h3 className="text-2xl font-bold gradient-text mb-4">Ready to Apply This Knowledge?</h3>
              <p className="text-gray-600 mb-6">Use our calculator to get personalized insights or book a consultation with our experts</p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button asChild className="orange-gradient text-white hover:orange-gradient-hover rounded-xl">
                  <Link to="/calculator">Try Calculator</Link>
                </Button>
                <Button onClick={handleBookConsultation} variant="outline" className="border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white rounded-xl">
                  Book Consultation
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </>
  );
};

export default StudySection;