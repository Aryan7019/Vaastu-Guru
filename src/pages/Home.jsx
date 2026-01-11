import React, { useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet';
import { motion, useInView } from 'framer-motion';
import { Star, Quote, Calendar, Users, Award, TrendingUp, Trash2, Facebook, Instagram, Calculator, Phone, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { toast } from '@/components/ui/use-toast';
import { Link } from 'react-router-dom';
import { sendConsultationRequest } from '@/services/emailService';
import { useUser, SignInButton } from '@clerk/clerk-react';
import { collection, addDoc, getDocs, deleteDoc, doc, query, orderBy, serverTimestamp, limit } from "firebase/firestore";
import { db } from "../components/firebase";
import { ConsultationForm } from "../components/ConsultationForm";
import { Dialog, DialogContent, DialogTrigger, DialogHeader, DialogTitle, DialogDescription } from '../components/ui/dialog';

// Animated Counter Component
const AnimatedCounter = ({ end, suffix = "", duration = 2 }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!isInView) return;
    
    let startTime;
    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(easeOut * end));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [end, duration, isInView]);

  return <span ref={ref}>{count}{suffix}</span>;
};

// Loading Spinner
const LoadingSpinner = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="animate-spin rounded-full h-16 w-16 border-4 border-orange-200 border-t-orange-500"></div>
  </div>
);

// Animated Reviews Component with Enhanced Testimonial Cards
const AnimatedReviews = ({ reviews, isSignedIn, user, handleDeleteReview }) => {
  const containerRef = useRef(null);

  if (reviews.length === 0) return null;

  return (
    <div className="overflow-hidden py-8" ref={containerRef}>
      <motion.div
        className="flex gap-8"
        animate={{ x: [0, -1500] }}
        transition={{
          x: { repeat: Infinity, repeatType: "loop", duration: 35, ease: "linear" }
        }}
      >
        {[...reviews, ...reviews].map((review, index) => (
          <motion.div
            key={`${review.id}-${index}`}
            className="flex-shrink-0 w-96 bg-white/95 backdrop-blur-lg p-8 rounded-3xl relative group shadow-xl hover:shadow-2xl hover:shadow-orange-500/10 transition-all duration-500 border border-orange-100/50"
            
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            {/* Quote icon with gradient */}
            <div className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center shadow-lg">
              <Quote className="h-6 w-6 text-white" />
            </div>
            
            {/* Rating stars */}
            <div className="flex gap-1 mb-4 mt-4 justify-center">
              {[1, 2, 3, 4, 5].map((star) => (
                <motion.div
                  key={star}
                  
                  transition={{ duration: 0.2, ease: "easeOut" }}
                >
                  <Star
                    className={`h-5 w-5 ${star <= review.rating ? 'text-orange-400 fill-orange-400' : 'text-gray-200'}`}
                  />
                </motion.div>
              ))}
            </div>
            
            {/* Review text */}
            <p className="text-gray-700 text-base leading-relaxed mb-6 italic text-center">
              "{review.comment}"
            </p>
            
            {/* Reviewer info with avatar */}
            <div className="flex items-center justify-center gap-4 pt-4 border-t border-orange-100">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white font-bold text-lg shadow-lg">
                {review.name?.charAt(0)?.toUpperCase() || 'A'}
              </div>
              <div className="text-left">
                <span className="font-bold text-gray-800 block">{review.name}</span>
                <span className="text-gray-500 text-xs">
                  {review.createdAt ? new Date(review.createdAt).toLocaleDateString() : 'Verified Customer'}
                </span>
              </div>
            </div>
            
            {/* Delete button */}
            {isSignedIn && user?.id === review.userId && (
              <motion.button
                onClick={() => handleDeleteReview(review.id)}
                className="absolute top-4 right-4 p-2 bg-red-50 text-red-400 hover:text-red-600 hover:bg-red-100 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300"
                
                
              >
                <Trash2 size={16} />
              </motion.button>
            )}
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

const Home = () => {
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({ rating: 5, comment: '' });
  const { isLoaded, isSignedIn, user } = useUser();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const q = query(collection(db, "reviews"), orderBy("createdAt", "desc"), limit(50));
        const querySnapshot = await getDocs(q);
        const reviewsData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          createdAt: doc.data().createdAt?.toDate?.() || null
        }));
        setReviews(reviewsData);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };
    fetchReviews();
  }, [isSignedIn, user?.id]);

  const handleDeleteReview = async (id) => {
    if (!isSignedIn) return;
    try {
      await deleteDoc(doc(db, "reviews", id));
      setReviews(prev => prev.filter(r => r.id !== id));
      toast({ title: "Review deleted" });
    } catch (error) {
      toast({ title: "Error", description: "Could not delete review", variant: "destructive" });
    }
  };

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    if (!isSignedIn) {
      toast({ title: "Please sign in", variant: "destructive" });
      return;
    }
    if (newReview.comment.trim().length < 3) {
      toast({ title: "Comment too short", variant: "destructive" });
      return;
    }
    try {
      const reviewData = {
        name: user.fullName || user.username || "Anonymous",
        userId: user.id,
        rating: Number(newReview.rating),
        comment: newReview.comment.trim(),
        createdAt: serverTimestamp()
      };
      const docRef = await addDoc(collection(db, "reviews"), reviewData);
      setReviews(prev => [{ id: docRef.id, ...reviewData, createdAt: new Date() }, ...prev]);
      setNewReview({ rating: 5, comment: '' });
      toast({ title: "Review submitted!" });
    } catch (error) {
      toast({ title: "Error", description: "Failed to submit review", variant: "destructive" });
    }
  };

  const renderStars = (rating, interactive = false, onRatingChange = null) => (
    <div className="flex space-x-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`h-5 w-5 ${star <= rating ? 'text-orange-400 fill-current' : 'text-gray-300'} ${interactive ? 'cursor-pointer hover:text-orange-400' : ''}`}
          onClick={interactive ? () => onRatingChange(star) : undefined}
        />
      ))}
    </div>
  );

  if (!isLoaded) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <Helmet>
        <title>NumaVaastu - Expert Numerology & Vaastu Consultancy</title>
        <meta name="description" content="Get expert numerology and vaastu consultations from Yashraj Guruji and Rishabh Goel. Transform your life with ancient wisdom and modern insights." />
      </Helmet>
      <div className="min-h-screen">
        {/* Enhanced Hero Section */}
        <section className="relative py-16 sm:py-20 md:py-24 px-4 text-center overflow-hidden min-h-screen flex items-center">
          
          <div className="container mx-auto max-w-6xl relative z-10">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              transition={{ duration: 1, ease: "easeOut" }} 
              className="space-y-6 sm:space-y-8"
            >
              {/* Premium badge */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
                className="mb-4 sm:mb-8"
              >
                <div className="inline-flex items-center px-4 sm:px-6 py-2 sm:py-3 bg-white/20 backdrop-blur-md rounded-full border border-white/30 text-white font-medium text-sm sm:text-base">
                  <span className="mr-2">✨</span>
                  Ancient Wisdom, Modern Transformation
                </div>
              </motion.div>
              
              <motion.h1 
                className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-bold text-white leading-tight"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
                style={{
                  textShadow: '3px 3px 6px rgba(0,0,0,0.4), 0 0 20px rgba(255,255,255,0.3)'
                }}
              >
                Welcome to{' '}
                <span 
                  className="block mt-2 sm:mt-4 text-black"
                  style={{
                    textShadow: '2px 2px 4px rgba(255,255,255,0.5), 0 0 10px rgba(255,255,255,0.3)'
                  }}
                >
                  NumaVaastu
                </span>
              </motion.h1>
              
              <motion.p 
                className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/95 max-w-4xl mx-auto font-medium leading-relaxed px-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
                style={{
                  textShadow: '1px 1px 3px rgba(0,0,0,0.3)'
                }}
              >
                Combining Ancient Numerology and Vaastu Shastra for Your Complete Life Transformation
              </motion.p>
              
              <motion.div 
                className="flex flex-col sm:flex-row flex-wrap justify-center gap-4 sm:gap-6 mt-8 sm:mt-12 px-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.7, ease: "easeOut" }}
              >
                {isSignedIn ? (
                  <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                      <motion.div
                        
                        
                        transition={{ duration: 0.2, ease: "easeOut" }}
                      >
                        <Button className="w-full sm:w-auto bg-white text-orange-600 hover:bg-orange-50 font-bold px-6 sm:px-10 py-3 sm:py-4 text-base sm:text-lg rounded-full shadow-2xl border-2 border-white/20 backdrop-blur-sm">
                          <Calendar className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                          Book Consultation
                        </Button>
                      </motion.div>
                    </DialogTrigger>
                    <DialogContent className="max-w-[95vw] sm:max-w-[425px] bg-white mx-2">
                      <DialogHeader>
                        <DialogTitle className="text-orange-600 text-lg sm:text-xl font-bold">Book a Consultation</DialogTitle>
                        <DialogDescription className="text-gray-600 text-sm sm:text-base">
                          Fill out the form below and we'll contact you shortly
                        </DialogDescription>
                      </DialogHeader>
                      <ConsultationForm onSuccess={() => setIsDialogOpen(false)} />
                    </DialogContent>
                  </Dialog>
                ) : (
                  <SignInButton mode="modal">
                    <motion.div
                      
                      
                      transition={{ duration: 0.2, ease: "easeOut" }}
                    >
                      <Button className="w-full sm:w-auto bg-white text-orange-600 hover:bg-orange-50 font-bold px-6 sm:px-10 py-3 sm:py-4 text-base sm:text-lg rounded-full shadow-2xl border-2 border-white/20">
                        <Calendar className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                        Book Consultation
                      </Button>
                    </motion.div>
                  </SignInButton>
                )}
                
                <motion.div
                  
                  
                  transition={{ duration: 0.2, ease: "easeOut" }}
                >
                  <Button 
                    asChild 
                    variant="outline" 
                    className="w-full sm:w-auto bg-white/10 border-white/30 text-white hover:bg-white/20 hover:text-white font-bold px-6 sm:px-10 py-3 sm:py-4 text-base sm:text-lg rounded-full backdrop-blur-md shadow-xl"
                  >
                    <Link to="/services">
                      <TrendingUp className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                      Explore Services
                    </Link>
                  </Button>
                </motion.div>
              </motion.div>
              
              {/* Enhanced special offer badge */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.9, ease: "easeOut" }}
                className="mt-8 sm:mt-12"
              >
                <motion.div 
                  className="inline-block bg-gradient-to-r from-yellow-400 to-orange-400 text-orange-900 font-bold px-6 sm:px-8 py-2 sm:py-3 rounded-full shadow-2xl text-sm sm:text-base"
                  animate={{ opacity: [1, 0.85, 1] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                  ✨ Special Launch Offer - 77% Off ✨
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Consultation Section */}
        <section className="py-12 sm:py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
              <motion.div 
                initial={{ opacity: 0, x: -30 }} 
                whileInView={{ opacity: 1, x: 0 }} 
                transition={{ duration: 0.8 }} 
                className="space-y-4 sm:space-y-6"
              >
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold gradient-text">Book Expert Consultation</h2>
                <p className="text-base sm:text-lg text-gray-600">
                  Get personalized guidance from our experts in numerology and vaastu shastra. 
                  Transform your life and spaces with ancient wisdom tailored to your needs.
                </p>
                
                {/* Call Consultation Feature Info - Redesigned */}
                <div className="glass-card p-4 sm:p-6 rounded-2xl border border-orange-200/50">
                  <div className="flex flex-col sm:flex-row items-start gap-3">
                    <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-2 rounded-full flex-shrink-0">
                      <Phone className="h-5 w-5 text-white" />
                    </div>
                    <div className="flex-1 w-full">
                      <h3 className="font-semibold text-orange-800 text-base sm:text-lg mb-1">Instant Call Consultation</h3>
                      <p className="text-xs sm:text-sm text-orange-700 mb-3">
                        Connect directly with Rishabh Goel for immediate guidance
                      </p>
                      <div className="flex flex-col xs:flex-row items-start xs:items-center justify-between glass-card p-3 rounded-xl border border-orange-200/30 gap-2">
                        <div>
                          <span className="text-xs text-gray-500 line-through block">Regular: ₹2099</span>
                          <span className="text-lg sm:text-xl font-bold text-orange-600">Only ₹499</span>
                        </div>
                        <div className="text-left xs:text-right">
                          <span className="badge-premium text-xs">
                            77% OFF
                          </span>
                          <p className="text-xs text-green-600 mt-1 font-medium">Limited Time</p>
                        </div>
                      </div>
                      <ul className="text-xs text-orange-700 mt-3 space-y-1 pl-1">
                        <li className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 bg-orange-500 rounded-full flex-shrink-0"></div>
                          <span>Accepts one Date of Birth</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 bg-orange-500 rounded-full flex-shrink-0"></div>
                          <span>Immediate connection after payment</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 bg-orange-500 rounded-full flex-shrink-0"></div>
                          <span>Personalized solutions for your needs</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-4">
                  {isSignedIn ? (
                    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                      <DialogTrigger asChild>
                        <motion.div
                          
                          
                          transition={{ duration: 0.2, ease: "easeOut" }}
                        >
                          <Button className="btn-premium text-white font-semibold px-6 sm:px-8 py-2.5 sm:py-3 text-base sm:text-lg rounded-full">
                            Book Consultation
                          </Button>
                        </motion.div>
                      </DialogTrigger>
                      <DialogContent className="max-w-[95vw] sm:max-w-[425px] bg-white mx-2">
                        <DialogHeader>
                          <DialogTitle className="gradient-text">Book a Consultation</DialogTitle>
                          <DialogDescription>
                            Fill out the form below and we'll contact you shortly
                          </DialogDescription>
                        </DialogHeader>
                        <ConsultationForm onSuccess={() => setIsDialogOpen(false)} />
                      </DialogContent>
                    </Dialog>
                  ) : (
                    <SignInButton mode="modal">
                      <motion.div
                        
                        
                        transition={{ duration: 0.2, ease: "easeOut" }}
                      >
                        <Button className="btn-premium text-white font-semibold px-6 sm:px-8 py-2.5 sm:py-3 text-base sm:text-lg rounded-full">
                          Book Consultation
                        </Button>
                      </motion.div>
                    </SignInButton>
                  )}
                </div>
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, x: 30 }} 
                whileInView={{ opacity: 1, x: 0 }} 
                transition={{ duration: 0.8, delay: 0.2 }} 
                className="flex justify-center mt-8 md:mt-0"
              >
                <img 
                  src="https://eugenixhairsciences.com/wp-content/uploads/2023/09/consultation.jpg" 
                  alt="Consultation session" 
                  className="rounded-xl shadow-lg w-full max-w-sm sm:max-w-md hover-lift"
                />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Enhanced Calculator Section */}
        <section className="py-12 sm:py-16 md:py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-orange-50 via-white to-orange-50"></div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
              <motion.div 
                initial={{ opacity: 0, x: -30 }} 
                whileInView={{ opacity: 1, x: 0 }} 
                transition={{ duration: 0.8 }} 
                className="flex justify-center order-2 md:order-1"
              >
                <img 
                  src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
                  alt="Numerology calculator" 
                  className="rounded-xl shadow-lg w-full max-w-sm sm:max-w-md hover-lift"
                />
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, x: 30 }} 
                whileInView={{ opacity: 1, x: 0 }} 
                transition={{ duration: 0.8, delay: 0.2 }} 
                className="space-y-4 sm:space-y-6 order-1 md:order-2"
              >
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold gradient-text">Numerology Calculator</h2>
                <p className="text-base sm:text-lg text-gray-600">
                  Discover insights about yourself with our advanced numerology calculator:
                </p>
                <ul className="space-y-3 sm:space-y-4 text-gray-700">
                  <li className="flex items-start">
                    <Calculator className="h-5 w-5 text-orange-500 mr-2 mt-1 flex-shrink-0" />
                    <span className="text-sm sm:text-base">Analyzes your core personality traits and behaviors</span>
                  </li>
                  <li className="flex items-start">
                    <Calculator className="h-5 w-5 text-orange-500 mr-2 mt-1 flex-shrink-0" />
                    <span className="text-sm sm:text-base">Shows your current fortune meter</span>
                  </li>
                  <li className="flex items-start">
                    <Calculator className="h-5 w-5 text-orange-500 mr-2 mt-1 flex-shrink-0" />
                    <span className="text-sm sm:text-base">Checks name compatibility with person</span>
                  </li>
                </ul>
                <motion.div
                  
                  
                  transition={{ duration: 0.2, ease: "easeOut" }}
                >
                  <Button asChild className="btn-premium text-white font-semibold px-6 sm:px-8 py-2.5 sm:py-3 text-base sm:text-lg rounded-full">
                    <Link to="/calculator">
                      <Calculator className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                      Try Calculator
                    </Link>
                  </Button>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Enhanced Stats Section with Animated Counters */}
        <section className="py-12 sm:py-16 md:py-20 relative overflow-hidden">
          {/* Gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-orange-100 via-white to-orange-50"></div>
          
          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-10 sm:mb-16"
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold gradient-text mb-3 sm:mb-4">
                Trusted by Thousands
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto px-4">
                Our proven track record speaks for itself
              </p>
            </motion.div>
            
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
              {[
                { icon: Users, number: 10000, suffix: "+", label: "Happy Clients", color: "from-blue-500 to-purple-600" }, 
                { icon: Calendar, number: 25, suffix: "+", label: "Years Experience", color: "from-green-500 to-teal-600" }, 
                { icon: Award, number: 98, suffix: "%", label: "Success Rate", color: "from-orange-500 to-orange-700" }, 
                { icon: TrendingUp, number: 24, suffix: "/7", label: "Support", color: "from-pink-500 to-red-600" }
              ].map((stat, index) => (
                <motion.div 
                  key={index} 
                  initial={{ opacity: 0, y: 30, scale: 0.9 }} 
                  whileInView={{ opacity: 1, y: 0, scale: 1 }} 
                  transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
                  
                  className="text-center group"
                >
                  <div className="glass-card card-glow p-4 sm:p-6 md:p-8 rounded-2xl h-full">
                    <motion.div
                      className={`w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 mx-auto mb-4 sm:mb-6 rounded-full bg-gradient-to-r ${stat.color} flex items-center justify-center shadow-lg`}
                      
                      transition={{ duration: 0.4, ease: "easeOut" }}
                    >
                      <stat.icon className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 text-white" />
                    </motion.div>
                    
                    <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-1 sm:mb-2">
                      <AnimatedCounter 
                        end={stat.number} 
                        suffix={stat.suffix}
                        duration={2.5}
                      />
                    </div>
                    
                    <div className="text-gray-600 font-semibold text-sm sm:text-base md:text-lg">{stat.label}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Enhanced Experts Section */}
        <section className="py-12 sm:py-16 md:py-20 relative overflow-hidden">
          {/* Gradient background with floating elements */}
          <div className="absolute inset-0 bg-gradient-to-br from-orange-50 via-orange-50 to-white"></div>
          <div className="absolute top-20 left-10 text-4xl sm:text-6xl opacity-10 animate-pulse hidden sm:block">🧿</div>
          <div className="absolute bottom-20 right-10 text-3xl sm:text-5xl opacity-15 animate-bounce hidden sm:block">✨</div>
          
          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-10 sm:mb-16"
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold gradient-text mb-3 sm:mb-4">
                Meet Our Expert Consultants
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto px-4">
                Our experienced consultants combine ancient wisdom with modern insights to guide you
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-6 sm:gap-8 md:gap-12 max-w-6xl mx-auto">
              {/* Yashraj Guruji */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                
                className="relative bg-white/90 backdrop-blur-lg rounded-2xl sm:rounded-3xl p-5 sm:p-6 md:p-8 text-center group overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-orange-500/20 transition-all duration-500"
              >
                {/* Gradient border effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-orange-400/20 via-transparent to-orange-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl sm:rounded-3xl"></div>
                
                <motion.div
                  
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="relative mb-4 sm:mb-6 z-10"
                >
                  <div className="relative inline-block">
                    <img
                      alt="Yashraj Guruji - Numerology Expert"
                      className="w-36 h-36 sm:w-44 sm:h-44 md:w-56 md:h-56 rounded-full mx-auto object-cover border-4 border-orange-400 shadow-2xl group-hover:shadow-orange-500/40 transition-all duration-500 image-zoom"
                      src="/images/Profile2.jpg"
                    />
                    {/* Glow effect on hover */}
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-orange-400 to-orange-600 opacity-0 group-hover:opacity-30 blur-xl transition-opacity duration-500"></div>
                  </div>
                  <div className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full flex items-center justify-center shadow-lg animate-pulse">
                    <span className="text-white text-sm sm:text-lg font-bold">✓</span>
                  </div>
                </motion.div>
                
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 relative z-10">Yashraj Guruji</h3>
                <div className="inline-block bg-gradient-to-r from-orange-500 to-orange-600 text-white text-xs font-bold px-3 sm:px-4 py-1.5 sm:py-2 rounded-full mb-3 sm:mb-4 shadow-lg">
                  Senior Numerology & Vaastu Consultant
                </div>
                
                <p className="text-gray-600 mb-4 sm:mb-6 leading-relaxed relative z-10 text-sm sm:text-base">
                  With over 20 years of experience in numerology, Yashraj Guruji has helped thousands discover their life path through numbers.
                </p>
                
                <div className="text-left space-y-2 sm:space-y-3 mb-4 sm:mb-6 relative z-10">
                  <div className="flex items-center text-gray-700 group-hover:translate-x-2 transition-transform duration-300">
                    <div className="w-2 h-2 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full mr-3 flex-shrink-0"></div>
                    <span className="text-xs sm:text-sm">Expert in Life Path Analysis</span>
                  </div>
                  <div className="flex items-center text-gray-700 group-hover:translate-x-2 transition-transform duration-300 delay-75">
                    <div className="w-2 h-2 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full mr-3 flex-shrink-0"></div>
                    <span className="text-xs sm:text-sm">Residential Vaastu Specialist</span>
                  </div>
                  <div className="flex items-center text-gray-700 group-hover:translate-x-2 transition-transform duration-300 delay-150">
                    <div className="w-2 h-2 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full mr-3 flex-shrink-0"></div>
                    <span className="text-xs sm:text-sm">Business Numerology Consultant</span>
                  </div>
                </div>
                
                <div className="bg-orange-50 p-3 sm:p-4 rounded-xl mb-4 sm:mb-6 text-left relative z-10 border border-orange-100">
                  <p className="text-xs sm:text-sm text-gray-600">
                    <strong className="text-orange-600">📍 Address:</strong> C1, Yamuna Vihar, Delhi-110053
                  </p>
                </div>
                
                <div className="flex justify-center gap-3 sm:gap-4 relative z-10">
                  <motion.a
                    href="https://www.instagram.com/yashrajguruji/?igsh=b2U1aXpzcXh5amI%3D#"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gradient-to-r from-pink-500 to-purple-500 p-2.5 sm:p-3 rounded-full text-white shadow-lg hover:shadow-pink-500/50 transition-all duration-300"
                    
                    
                    transition={{ duration: 0.2, ease: "easeOut" }}
                  >
                    <Instagram className="h-4 w-4 sm:h-5 sm:w-5" />
                  </motion.a>
                  <motion.a
                    href="https://www.facebook.com/yashrajguruji"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gradient-to-r from-blue-500 to-blue-600 p-2.5 sm:p-3 rounded-full text-white shadow-lg hover:shadow-blue-500/50 transition-all duration-300"
                    
                    
                    transition={{ duration: 0.2, ease: "easeOut" }}
                  >
                    <Facebook className="h-4 w-4 sm:h-5 sm:w-5" />
                  </motion.a>
                </div>
              </motion.div>

              {/* Rishabh Goel */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                
                className="relative bg-white/90 backdrop-blur-lg rounded-2xl sm:rounded-3xl p-5 sm:p-6 md:p-8 text-center group overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-orange-500/20 transition-all duration-500"
              >
                {/* Gradient border effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-orange-400/20 via-transparent to-orange-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl sm:rounded-3xl"></div>
                
                <motion.div
                  
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="relative mb-4 sm:mb-6 z-10"
                >
                  <div className="relative inline-block">
                    <img
                      alt="Rishabh Goel - Vaastu Consultant"
                      className="w-36 h-36 sm:w-44 sm:h-44 md:w-56 md:h-56 rounded-full mx-auto object-cover border-4 border-orange-400 shadow-2xl group-hover:shadow-orange-500/40 transition-all duration-500 image-zoom"
                      src="/images/Profile.jpg"
                    />
                    {/* Glow effect on hover */}
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-orange-400 to-orange-600 opacity-0 group-hover:opacity-30 blur-xl transition-opacity duration-500"></div>
                  </div>
                  <div className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full flex items-center justify-center shadow-lg animate-pulse">
                    <span className="text-white text-sm sm:text-lg font-bold">✓</span>
                  </div>
                </motion.div>
                
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 relative z-10">Rishabh Goel</h3>
                <div className="inline-block bg-gradient-to-r from-orange-500 to-orange-600 text-white text-xs font-bold px-3 sm:px-4 py-1.5 sm:py-2 rounded-full mb-3 sm:mb-4 shadow-lg">
                  Numerology & Vaastu Consultant
                </div>
                
                <p className="text-gray-600 mb-4 sm:mb-6 leading-relaxed relative z-10 text-sm sm:text-base">
                  A renowned Vaastu expert with 7+ years of experience, Rishabh Goel harmonizes spaces for prosperity and peace.
                </p>
                
                <div className="text-left space-y-2 sm:space-y-3 mb-4 sm:mb-6 relative z-10">
                  <div className="flex items-center text-gray-700 group-hover:translate-x-2 transition-transform duration-300">
                    <div className="w-2 h-2 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full mr-3 flex-shrink-0"></div>
                    <span className="text-xs sm:text-sm">Residential Vaastu Specialist</span>
                  </div>
                  <div className="flex items-center text-gray-700 group-hover:translate-x-2 transition-transform duration-300 delay-75">
                    <div className="w-2 h-2 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full mr-3 flex-shrink-0"></div>
                    <span className="text-xs sm:text-sm">Commercial Space Consultant</span>
                  </div>
                  <div className="flex items-center text-gray-700 group-hover:translate-x-2 transition-transform duration-300 delay-150">
                    <div className="w-2 h-2 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full mr-3 flex-shrink-0"></div>
                    <span className="text-xs sm:text-sm">Numerology Consultant</span>
                  </div>
                </div>
                
                <div className="bg-orange-50 p-3 sm:p-4 rounded-xl mb-4 sm:mb-6 text-left relative z-10 border border-orange-100">
                  <p className="text-xs sm:text-sm text-gray-600">
                    <strong className="text-orange-600">📍 Address:</strong> C1, Yamuna Vihar, Delhi-110053
                  </p>
                </div>
                
                <div className="flex justify-center gap-3 sm:gap-4 relative z-10">
                  <motion.a
                    href="https://www.instagram.com/goel_bhaiji/?utm_source=qr&igsh=MTdmdTJseXdsbGV2cg%3D%3D#"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gradient-to-r from-pink-500 to-purple-500 p-3 rounded-full text-white shadow-lg hover:shadow-pink-500/50 transition-all duration-300"
                    
                    
                    transition={{ duration: 0.2, ease: "easeOut" }}
                  >
                    <Instagram className="h-5 w-5" />
                  </motion.a>
                  <motion.a
                    href="https://www.facebook.com/VaastuGuruBhaaiji?rdid=SUgkZb3o6ORBzvv3&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1BTUVN8G2S%2F#"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gradient-to-r from-blue-500 to-blue-600 p-3 rounded-full text-white shadow-lg hover:shadow-blue-500/50 transition-all duration-300"
                    
                    
                    transition={{ duration: 0.2, ease: "easeOut" }}
                  >
                    <Facebook className="h-5 w-5" />
                  </motion.a>
                </div>
              </motion.div>
            </div>
          </div>
        </section>        {/* Enhanced Reviews Section */}
        <section className="py-20 relative overflow-hidden">
          {/* Gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-white via-orange-50 to-orange-50"></div>
          
          <div className="container mx-auto px-4 relative z-10">
            <motion.div 
              initial={{ opacity: 0, y: 30 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.8 }} 
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold gradient-text mb-4 font-bold">
                What Our Clients Say
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Real experiences from satisfied clients who transformed their lives
              </p>
            </motion.div>
            
            {/* Animated Reviews */}
            {reviews.length > 0 ? (
              <div className="mb-16">
                <AnimatedReviews 
                  reviews={reviews} 
                  isSignedIn={isSignedIn} 
                  user={user} 
                  handleDeleteReview={handleDeleteReview} 
                />
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-16"
              >
                <div className="glass-card p-8 rounded-2xl max-w-md mx-auto">
                  <div className="text-6xl mb-4">⭐</div>
                  <p className="text-gray-600 text-lg">No reviews yet. Be the first to leave one!</p>
                </div>
              </motion.div>
            )}

            {/* Enhanced Submit Review */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.8 }} 
              className="max-w-2xl mx-auto"
            >
              <div className="glass-card-strong card-glow p-8 rounded-3xl">
                <h3 className="text-2xl font-bold gradient-text mb-6 text-center font-bold">
                  Share Your Experience
                </h3>
                
                {!isSignedIn && (
                  <motion.div 
                    className="text-center mb-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <div className="glass-card p-6 rounded-2xl border border-orange-200">
                      <div className="text-4xl mb-3">🔐</div>
                      <p className="text-orange-700 mb-4 font-medium">Please login to submit a review</p>
                      <SignInButton mode="modal">
                        <motion.div
                          
                          
                          transition={{ duration: 0.2, ease: "easeOut" }}
                        >
                          <Button className="btn-premium text-white font-semibold px-8 py-3 rounded-full">
                            Login / Sign Up
                          </Button>
                        </motion.div>
                      </SignInButton>
                    </div>
                  </motion.div>
                )}
                
                <form onSubmit={handleSubmitReview} className="space-y-6">
                  <div>
                    <Label className="text-sm font-semibold text-gray-700 mb-3 block">
                      Your Rating
                    </Label>
                    <div className="flex justify-center">
                      {renderStars(newReview.rating, true, (rating) => setNewReview({ ...newReview, rating }))}
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="comment" className="text-sm font-semibold text-gray-700 mb-3 block">
                      Your Review
                    </Label>
                    <textarea 
                      id="comment" 
                      value={newReview.comment} 
                      onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })} 
                      placeholder="Share your experience with our services..." 
                      className="input-enhanced w-full p-4 border border-gray-200 rounded-2xl focus:border-orange-500 focus:ring-orange-500 min-h-[120px] resize-none bg-white/50 backdrop-blur-sm" 
                      disabled={!isSignedIn} 
                      required
                    />
                  </div>
                  
                  <motion.div
                    
                    
                    transition={{ duration: 0.2, ease: "easeOut" }}
                  >
                    <Button 
                      type="submit" 
                      disabled={!isSignedIn} 
                      className="btn-premium w-full text-white font-semibold py-4 text-lg rounded-2xl"
                    >
                      Submit Review ✨
                    </Button>
                  </motion.div>
                </form>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Home;
