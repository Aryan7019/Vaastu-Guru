import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Book, Calculator, Home, Star, TrendingUp, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useUser, SignInButton } from '@clerk/clerk-react';
import { ConsultationForm } from "../components/ConsultationForm";
import { Dialog, DialogContent, DialogTrigger, DialogTitle, DialogHeader, DialogDescription } from '../components/ui/dialog';
import LoadingSpinner from '../components/LoadingSpinner';

const StudySection = () => {
  const [activeTab, setActiveTab] = useState('numerology');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { isSignedIn, user, isLoaded } = useUser();

  const numerologyPrinciples = [
    {
      number: 1,
      meaning: "Leadership",
      description: "Independent, driven, and natural leaders with a pioneering spirit.",
      color: "text-red-500"
    },
    {
      number: 2,
      meaning: "Harmony",
      description: "Sensitive, diplomatic, and gifted at bringing people together.",
      color: "text-orange-500"
    },
    {
      number: 3,
      meaning: "Knowledge",
      description: "Curious minds who value learning, insight, and intellectual growth.",
      color: "text-orange-500"
    },
    {
      number: 4,
      meaning: "Stability",
      description: "Practical, reliable, and hardworking with a love for order.",
      color: "text-green-500"
    },
    {
      number: 5,
      meaning: "Freedom",
      description: "Adventurous and versatile individuals who thrive on change and express themselves with clarity and confidence.",
      color: "text-blue-500"
    },
    {
      number: 6,
      meaning: "Care",
      description: "Caring, family-focused, and drawn to beauty, comfort, and elegance.",
      color: "text-indigo-500"
    },
    {
      number: 7,
      meaning: "Spiritual",
      description: "Introspective, analytical, and seekers of deeper meaning.",
      color: "text-purple-500"
    },
    {
      number: 8,
      meaning: "Ambition",
      description: "Confident, disciplined, and success-oriented with strong willpower.",
      color: "text-pink-500"
    },
    {
      number: 9,
      meaning: "Compassion",
      description: "Kind, idealistic, and devoted to service and global harmony.",
      color: "text-teal-500"
    }
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

  if (!isLoaded) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <Helmet>
        <title>About Numerology & Vaastu</title>
        <meta name="description" content="Explore the ancient sciences of numerology and vaastu shastra. Learn principles, meanings, and practical applications for a harmonious life." />
      </Helmet>

      <div className="min-h-screen pt-16 sm:pt-20 pb-8">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-center mb-6 sm:mb-10">
            <h1 className="text-3xl sm:text-5xl md:text-7xl font-bold text-white text-shadow mb-2 sm:mb-4">About <span className="text-black">Ancient Wisdom</span></h1>
            <p className="text-sm sm:text-lg text-white max-w-3xl mx-auto px-2">Discover the profound sciences of numerology and vaastu shastra</p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="flex justify-center mb-6 sm:mb-10">
            <div className="bg-white rounded-2xl p-2 shadow-lg flex">
              <button onClick={() => setActiveTab('numerology')} className={`px-4 sm:px-8 py-2 sm:py-3 rounded-xl font-medium transition-all duration-300 text-sm sm:text-base whitespace-nowrap ${activeTab === 'numerology' ? 'orange-gradient text-white' : 'text-gray-600 hover:text-orange-500'}`}>
                <Calculator className="inline-block w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2" />Numerology
              </button>
              <button onClick={() => setActiveTab('vaastu')} className={`px-4 sm:px-8 py-2 sm:py-3 rounded-xl font-medium transition-all duration-300 text-sm sm:text-base whitespace-nowrap ${activeTab === 'vaastu' ? 'orange-gradient text-white' : 'text-gray-600 hover:text-orange-500'}`}>
                <Home className="inline-block w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2" />Vaastu
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
                <Button asChild className="orange-gradient text-white transition-transform duration-300 ease-in-out hover:scale-105 hover:orange-gradient-hover rounded-xl">
                  <Link to="/calculator">Try Calculator</Link>
                </Button>
                {isSignedIn ? (
                  <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                      <Button 
                      variant="outline"
                      className="border-orange-500 text-orange-500 transition-transform duration-300 ease-in-out hover:scale-105 hover:bg-orange-500 hover:text-white rounded-xl"
                    >
                      Book Consultation
                    </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Book a Consultation</DialogTitle>
                        <DialogDescription>
                          Fill out the form below and we'll contact you shortly
                        </DialogDescription>
                      </DialogHeader>
                      <ConsultationForm onSuccess={() => setIsDialogOpen(false)} />
                    </DialogContent>
                  </Dialog>
                ) : (
                  <SignInButton mode="modal">
                    <Button 
                      variant="outline"
                      className="border-orange-500 text-orange-500 transition-transform duration-300 ease-in-out hover:scale-105 hover:bg-orange-500 hover:text-white rounded-xl"
                    >
                      Book Consultation
                    </Button>
                  </SignInButton>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default StudySection;
