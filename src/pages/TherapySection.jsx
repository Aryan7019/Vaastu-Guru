import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Star, Palette, Triangle, Calculator } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useUser, SignInButton } from '@clerk/clerk-react';
import { sendConsultationRequest } from '@/services/emailService';
import { toast } from '@/components/ui/use-toast';
import { ConsultationForm } from "../components/ConsultationForm";
import { Dialog, DialogContent, DialogTrigger, DialogTitle, DialogHeader, DialogDescription } from '../components/ui/dialog';

const TherapySection = () => {
  const [activeTab, setActiveTab] = useState('color');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { isSignedIn, user } = useUser();

  const handleBookConsultation = () => {
    if (!isSignedIn) return;
    sendConsultationRequest(user);
    toast({
      title: "Consultation Request Sent!",
      description: "Thank you for your interest. Our team will contact you shortly to schedule your consultation.",
    });
  };

  const colorTherapyPoints = [
    {
      color: "Red",
      meaning: "Energy & Passion",
      description: "Stimulates vitality, increases circulation, and boosts confidence.",
      hex: "#f87171"
    },
    {
      color: "Orange",
      meaning: "Creativity & Joy",
      description: "Enhances social interaction, stimulates creativity, and boosts mood.",
      hex: "#fb923c"
    },
    {
      color: "Blue",
      meaning: "Calm & Clarity",
      description: "Promotes peace, reduces stress, and enhances communication.",
      hex: "#60a5fa"
    },
    {
      color: "Green",
      meaning: "Balance & Healing",
      description: "Supports emotional balance, harmony, and rejuvenation.",
      hex: "#34d399"
    },
    {
      color: "Yellow",
      meaning: "Joy & Intellect",
      description: "Stimulates mental clarity, positivity, and learning.",
      hex: "#facc15"
    },
    {
      color: "Purple",
      meaning: "Spiritual Insight",
      description: "Encourages meditation, intuition, and deeper wisdom.",
      hex: "#c084fc"
    }
  ];

  const pyramidTherapyPoints = [
    {
      use: "Meditation Aid",
      description: "Enhances focus and spiritual connection when meditating under pyramids.",
      icon: "🧘"
    },
    {
      use: "Energy Balancing",
      description: "Used to align chakras and balance subtle energies.",
      icon: "⚡"
    },
    {
      use: "Vaastu Remedies",
      description: "Pyramids neutralize negative energy in homes and workspaces.",
      icon: "🏠"
    },
    {
      use: "Healing Amplifier",
      description: "Placed under water or food, pyramids enhance their positive properties.",
      icon: "💧"
    }
  ];

  return (
    <>
      <Helmet>
        <title>Therapies - Color & Pyramid | Bhaggya Darshhan</title>
        <meta name="description" content="Explore Color Therapy and Pyramid Therapy to balance your energies and enhance well-being through ancient practices." />
      </Helmet>

      <div className="min-h-screen py-20">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-center mb-16">
            <h1 className="text-5xl md:text-7xl font-bold text-white text-shadow mb-4">Explore <span className="text-black">Healing Therapies</span></h1>
            <p className="text-xl text-white max-w-3xl mx-auto">Discover ancient therapeutic practices to harmonize your energy and enhance well-being</p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="flex justify-center mb-12">
            <div className="bg-white rounded-2xl p-2 shadow-lg">
              <button onClick={() => setActiveTab('color')} className={`px-8 py-3 rounded-xl font-medium transition-all duration-300 ${activeTab === 'color' ? 'orange-gradient text-white' : 'text-gray-600 hover:text-orange-500'}`}>
                <Palette className="inline-block w-5 h-5 mr-2" />Color
              </button>
              <button onClick={() => setActiveTab('pyramid')} className={`px-8 py-3 rounded-xl font-medium transition-all duration-300 ${activeTab === 'pyramid' ? 'orange-gradient text-white' : 'text-gray-600 hover:text-orange-500'}`}>
                <Triangle className="inline-block w-5 h-5 mr-2" />Pyramid
              </button>
            </div>
          </motion.div>

          {activeTab === 'color' && (
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} className="space-y-12">
              <div className="bg-white rounded-2xl p-8 shadow-lg card-shadow">
                <h2 className="text-3xl font-bold gradient-text mb-6">🌈 What is Color Therapy?</h2>
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div>
                    <p className="text-gray-700 mb-4">Color Therapy (Chromotherapy) is the holistic use of color frequencies to balance physical, emotional, and spiritual well-being. Each color emits a specific vibration that can positively affect the human body and mind.</p>
                    <p className="text-gray-700 mb-6">It helps you with:</p>
                    <ul className="space-y-3 text-gray-700">
                      <li className="flex items-start">
                        <Star className="h-4 w-4 text-orange-500 mr-2 mt-1 flex-shrink-0" />
                        <div>
                          <strong className="text-orange-600">Emotional Healing</strong> - Soothes stress, anxiety, and emotional imbalances using calming colors.
                        </div>
                      </li>
                      <li className="flex items-start">
                        <Star className="h-4 w-4 text-orange-500 mr-2 mt-1 flex-shrink-0" />
                        <div>
                          <strong className="text-orange-600">Energy Rejuvenation</strong> - Stimulates energy levels and vitality through warm, energizing hues.
                        </div>
                      </li>
                      <li className="flex items-start">
                        <Star className="h-4 w-4 text-orange-500 mr-2 mt-1 flex-shrink-0" />
                        <div>
                          <strong className="text-orange-600">Chakra Alignment</strong> - Uses specific colors to balance and harmonize the energy centers.
                        </div>
                      </li>
                      <li className="flex items-start">
                        <Star className="h-4 w-4 text-orange-500 mr-2 mt-1 flex-shrink-0" />
                        <div>
                          <strong className="text-orange-600">Mental Clarity</strong> - Enhances focus and mood by influencing brainwave activity.
                        </div>
                      </li>
                    </ul>
                  </div>
                  <div className="text-center">
                    <img 
                      src="https://media.istockphoto.com/id/1027020366/vector/human-mind-brain-spirit-energy-connect-to-the-universe-power-abstract-art-watercolor.jpg?s=612x612&w=0&k=20&c=-BW7ZMgDAQvFk4hSLVH_3o5ejQIVNYQpvnWDHxgswyk=" 
                      alt="Color Therapy Illustration" 
                      className="w-full max-w-md mx-auto rounded-2xl shadow-lg"
                    />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-lg card-shadow">
                <h3 className="text-2xl font-bold gradient-text mb-8 text-center">Color Meanings & Benefits</h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {colorTherapyPoints.map((point, index) => (
                    <motion.div 
                      key={index} 
                      className="bg-gradient-to-br from-orange-50 to-white p-6 rounded-2xl border border-orange-100 hover:shadow-lg transition-shadow" 
                      style={{ borderColor: point.hex }} 
                      initial={{ opacity: 0, y: 20 }} 
                      whileInView={{ opacity: 1, y: 0 }} 
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <div className="text-center mb-4">
                        <div className="text-3xl font-bold" style={{ color: point.hex }}>{point.color}</div>
                        <h4 className="text-lg font-semibold text-gray-800">{point.meaning}</h4>
                      </div>
                      <p className="text-gray-600 text-sm text-center">{point.description}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'pyramid' && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} className="space-y-12">
              <div className="bg-white rounded-2xl p-8 shadow-lg card-shadow">
                <h2 className="text-3xl font-bold gradient-text mb-6">🔺 What is Pyramid Therapy?</h2>
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div>
                    <p className="text-gray-700 mb-4">Pyramid Therapy utilizes the sacred geometry of pyramids to harness cosmic energy for healing and personal transformation. The structure of a pyramid amplifies and balances subtle energies.</p>
                    <p className="text-gray-700 mb-6">It supports you through:</p>
                    <ul className="space-y-3 text-gray-700">
                      <li className="flex items-start">
                        <Star className="h-4 w-4 text-orange-500 mr-2 mt-1 flex-shrink-0" />
                        <div>
                          <strong className="text-orange-600">Meditative Enhancement</strong> - Pyramids deepen your meditative state by aligning inner frequencies.
                        </div>
                      </li>
                      <li className="flex items-start">
                        <Star className="h-4 w-4 text-orange-500 mr-2 mt-1 flex-shrink-0" />
                        <div>
                          <strong className="text-orange-600">Energy Purification</strong> - Neutralizes negativity and promotes energetic balance.
                        </div>
                      </li>
                      <li className="flex items-start">
                        <Star className="h-4 w-4 text-orange-500 mr-2 mt-1 flex-shrink-0" />
                        <div>
                          <strong className="text-orange-600">Space Cleansing</strong> - Improves Vaastu by correcting energy distortions in your environment.
                        </div>
                      </li>
                      <li className="flex items-start">
                        <Star className="h-4 w-4 text-orange-500 mr-2 mt-1 flex-shrink-0" />
                        <div>
                          <strong className="text-orange-600">Healing Acceleration</strong> - Elevates the vibrational quality of food, water, and surroundings.
                        </div>
                      </li>
                    </ul>
                  </div>
                  <div className="text-center">
                    <img 
                      src="https://dailygalaxy.com/wp-content/uploads/2025/04/The-Great-Pyramid-of-Giza-Has-MORE-Than-Four-Sides.jpg" 
                      alt="Pyramid Therapy Illustration" 
                      className="w-full max-w-md mx-auto rounded-2xl shadow-lg"
                    />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-lg card-shadow">
                <h3 className="text-2xl font-bold gradient-text mb-8 text-center">Pyramid Applications</h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {pyramidTherapyPoints.map((item, index) => (
                    <motion.div 
                      key={index} 
                      className="bg-gradient-to-br from-orange-50 to-white p-6 rounded-2xl border border-orange-100 hover:shadow-lg transition-shadow" 
                      initial={{ opacity: 0, y: 20 }} 
                      whileInView={{ opacity: 1, y: 0 }} 
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <div className="text-center mb-4">
                        <div className="text-3xl mb-2">{item.icon}</div>
                        <h4 className="text-lg font-semibold text-gray-800">{item.use}</h4>
                      </div>
                      <p className="text-sm text-gray-600 text-center">{item.description}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-center mt-16">
            <div className="bg-white rounded-2xl p-8 shadow-lg card-shadow">
              <h3 className="text-2xl font-bold gradient-text mb-4">Want Personalized Therapy Guidance?</h3>
              <p className="text-gray-600 mb-6">Discover your ideal therapy colors or pyramid placements with our tools</p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button asChild className="orange-gradient text-white transition-transform duration-300 ease-in-out hover:scale-105 hover:orange-gradient-hover rounded-xl">
                  <Link to="/calculator">
                    <Calculator className="inline-block w-5 h-5 mr-2" /> Try Calculator
                  </Link>
                </Button>
                {isSignedIn ? (
                  <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                      <Button 
                        variant="outline"
                        className="border-orange-500 text-orange-500 transition-transform duration-300 ease-in-out hover:scale-105 hover:bg-orange-500 hover:text-white rounded-xl"
                      >
                        Book Therapy Session
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Book a Therapy Session</DialogTitle>
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
                      Book Therapy Session
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

export default TherapySection;