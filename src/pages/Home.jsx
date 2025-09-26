import React, { useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Star, Quote, Calendar, Users, Award, TrendingUp, Trash2, Facebook, Instagram, Calculator, Phone } from 'lucide-react';
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


const LoadingSpinner = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="animate-spin rounded-full h-20 w-20 border-b-4 border-orange-500"></div>
  </div>
);

// New component for animated reviews
const AnimatedReviews = ({ reviews, isSignedIn, user, handleDeleteReview }) => {
  const containerRef = useRef(null);
  const [duration, setDuration] = useState(30); // Base duration for animation

  useEffect(() => {
    // Adjust animation speed based on number of reviews
    if (reviews.length > 5) {
      setDuration(40 + (reviews.length * 2));
    } else {
      setDuration(30);
    }
  }, [reviews.length]);

  return (
    <div className="overflow-hidden py-4" ref={containerRef}>
      <motion.div
        className="flex"
        animate={{
          x: [0, -containerRef.current?.scrollWidth / 2 || -1000],
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: duration,
            ease: "linear",
          },
        }}
      >
        {/* Double the reviews to create seamless loop */}
        {[...reviews, ...reviews].map((review, index) => (
          <motion.div
            key={`${review.id}-${index}`}
            className="flex-shrink-0 mx-3 bg-gradient-to-br from-orange-50 to-white p-6 rounded-2xl shadow-lg min-w-[300px] max-w-[320px]"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Quote className="h-8 w-8 text-orange-500 mb-4" />
            <div className="mb-4">
              <div className="flex space-x-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`h-5 w-5 ${star <= review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                  />
                ))}
              </div>
            </div>
            <p className="text-gray-700 mb-4 italic">"{review.comment}"</p>
            <div className="flex justify-between items-center text-sm text-gray-500">
              <span className="font-medium">{review.name}</span>
              <span>
                {review.createdAt && !isNaN(new Date(review.createdAt).getTime()) 
                  ? new Date(review.createdAt).toLocaleDateString() 
                  : 'No date'}
              </span>
            </div>
            {(isSignedIn && user?.id === review.userId) && (
              <button
                onClick={() => handleDeleteReview(review.id)}
                className="absolute top-3 right-3 text-red-500 hover:text-red-700 transition"
                title="Delete Review"
              >
                <Trash2 size={18} />
              </button>
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
        const q = query(
          collection(db, "reviews"),
          orderBy("createdAt", "desc"),
          limit(50)
        );
        const querySnapshot = await getDocs(q);
        
        const reviewsData = querySnapshot.docs.map(doc => {
          const data = doc.data();
          return {
            id: doc.id,
            ...data,
            createdAt: data.createdAt?.toDate ? data.createdAt.toDate() : null,
            isCurrentUser: isSignedIn && data.userId === user?.id
          };
        });
        
        setReviews(reviewsData);
      } catch (error) {
        console.error("Error fetching reviews:", error);
        toast({
          title: "Error",
          description: "Could not load reviews",
          variant: "destructive"
        });
      }
    };

    fetchReviews();
  }, [isSignedIn, user?.id]);

  const handleBookConsultation = () => {
    if (!isSignedIn) return;
    sendConsultationRequest();
    toast({
      title: "Consultation Request Sent!",
      description: "Thank you for your interest. Our team will contact you shortly to schedule your consultation.",
    });
  };

  const handleDeleteReview = async (id) => {
    if (!isSignedIn) {
      toast({
        title: "Not signed in",
        description: "Please sign in to delete your review",
        variant: "destructive"
      });
      return;
    }

    try {
      await deleteDoc(doc(db, "reviews", id));
      setReviews((prev) => prev.filter((review) => review.id !== id));

      toast({ 
        title: "Deleted", 
        description: "Your review has been removed." 
      });
    } catch (error) {
      console.error("Error deleting review:", error);
      toast({ 
        title: "Error", 
        description: "Could not delete review", 
        variant: "destructive" 
      });
    }
  };

  const handleSubmitReview = async (e) => {
    e.preventDefault();

    if (!isSignedIn) {
      return toast({
        title: "Please sign in",
        description: "You need to be logged in to submit a review",
        variant: "destructive",
      });
    }

    const trimmedComment = newReview.comment.trim();
    if (trimmedComment.length < 3) {
      return toast({
        title: "Invalid comment",
        description: "Comment must be at least 3 characters",
        variant: "destructive",
      });
    }

    if (newReview.rating < 1 || newReview.rating > 5) {
      return toast({
        title: "Invalid rating",
        description: "Rating must be between 1 and 5",
        variant: "destructive",
      });
    }

    try {
      const reviewData = {
        name: user.fullName || user.username || "Anonymous",
        userId: user.id,
        rating: Number(newReview.rating),
        comment: trimmedComment,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      };

      const docRef = await addDoc(collection(db, "reviews"), reviewData);

      setReviews((prev) => [
        {
          id: docRef.id,
          ...reviewData,
          createdAt: new Date(),
          isCurrentUser: true,
        },
        ...prev,
      ]);

      setNewReview({ rating: 5, comment: '' });

      toast({
        title: "Success!",
        description: "Your review has been submitted",
      });
    } catch (error) {
      console.error("Error adding review:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to submit review",
        variant: "destructive",
      });
    }
  };

  const renderStars = (rating, interactive = false, onRatingChange = null) => (
    <div className="flex space-x-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`h-5 w-5 ${star <= rating ? 'text-yellow-400 fill-current' : 'text-gray-300'} ${interactive ? 'cursor-pointer hover:text-yellow-400' : ''}`}
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
        <title>Vaastu Guru - Expert Numerology & Vaastu Consultancy</title>
        <meta name="description" content="Get expert numerology and vaastu consultations from Yashraj Guruji and Rishabh Goel. Transform your life with ancient wisdom and modern insights." />
      </Helmet>
      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="relative py-20 px-4 text-center">
          <div className="container mx-auto max-w-6xl">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="space-y-8">
              <h1 className="text-5xl md:text-7xl font-bold text-white text-shadow">Welcome to <span className="text-black">Vaastu Guru</span></h1>
              <p className="text-xl md:text-2xl text-white max-w-3xl mx-auto">Unlock the secrets of your destiny through ancient numerology and vaastu wisdom</p>
              <div className="flex flex-wrap justify-center gap-4 mt-8">
                {isSignedIn ? (
                  <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                      <Button className="orange-gradient text-white hover:orange-gradient-hover transition-transform duration-300 ease-in-out hover:scale-105 px-8 py-3 text-lg rounded-xl">
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
                      className="orange-gradient text-white hover:orange-gradient-hover transition-transform duration-300 ease-in-out hover:scale-105 px-8 py-3 text-lg rounded-xl"
                    >
                      Book Consultation
                    </Button>
                  </SignInButton>
                )}
                <Button asChild variant="outline" className="border-white text-white hover:bg-white hover:text-orange-500 transition-transform duration-300 ease-in-out hover:scale-105 px-8 py-3 text-lg rounded-xl">
                  <Link to="/services">Learn More</Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

{/* Consultation Section */}
<section className="py-16 bg-white">
  <div className="container mx-auto px-4">
    <div className="grid md:grid-cols-2 gap-12 items-center">
      <motion.div 
        initial={{ opacity: 0, x: -30 }} 
        whileInView={{ opacity: 1, x: 0 }} 
        transition={{ duration: 0.8 }} 
        className="space-y-6"
      >
        <h2 className="text-3xl md:text-4xl font-bold gradient-text">Book Expert Consultation</h2>
        <p className="text-lg text-gray-600">
          Get personalized guidance from our experts in numerology and vaastu shastra. 
          Transform your life and spaces with ancient wisdom tailored to your needs.
        </p>
        
        {/* Call Consultation Feature Info - Redesigned */}
        <div className="bg-gradient-to-br from-orange-50 to-amber-50 p-5 rounded-2xl border-2 border-orange-100 shadow-sm">
          <div className="flex items-start gap-3">
            <div className="bg-orange-500 p-2 rounded-full flex-shrink-0">
              <Phone className="h-5 w-5 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-orange-800 text-lg mb-1">Instant Call Consultation</h3>
              <p className="text-sm text-orange-700 mb-3">
                Connect directly with Rishabh Goel for immediate guidance
              </p>
              <div className="flex items-center justify-between bg-white p-3 rounded-xl border border-orange-200">
                <div>
                  <span className="text-xs text-gray-500 line-through block">Regular: ₹2099</span>
                  <span className="text-xl font-bold text-orange-600">Only ₹499</span>
                </div>
                <div className="text-right">
                  <span className="text-xs bg-gradient-to-r from-orange-500 to-amber-500 text-white px-2 py-1 rounded-full font-medium">
                    77% OFF
                  </span>
                  <p className="text-xs text-green-600 mt-1 font-medium">Limited Time</p>
                </div>
              </div>
              <ul className="text-xs text-orange-700 mt-3 space-y-1 pl-1">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-orange-500 rounded-full"></div>
                  <span>Accepts one Date of Birth</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-orange-500 rounded-full"></div>
                  <span>Immediate connection after payment</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-orange-500 rounded-full"></div>
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
                <Button className="orange-gradient text-white hover:orange-gradient-hover px-8 py-3 text-lg rounded-xl hover:orange-gradient-hover transition-transform duration-300 ease-in-out">
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
              <Button className="orange-gradient text-white hover:orange-gradient-hover px-8 py-3 text-lg rounded-xl hover:orange-gradient-hover transition-transform duration-300 ease-in-out">
                Book Consultation
              </Button>
            </SignInButton>
          )}
        </div>
      </motion.div>
      <motion.div 
        initial={{ opacity: 0, x: 30 }} 
        whileInView={{ opacity: 1, x: 0 }} 
        transition={{ duration: 0.8, delay: 0.2 }} 
        className="flex justify-center"
      >
        <img 
          src="https://eugenixhairsciences.com/wp-content/uploads/2023/09/consultation.jpg" 
          alt="Consultation session" 
          className="rounded-xl shadow-lg w-full max-w-md"
        />
      </motion.div>
    </div>
  </div>
</section>

        {/* Calculator Section */}
        <section className="py-16 bg-gradient-to-r from-orange-50 to-white">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <motion.div 
                initial={{ opacity: 0, x: -30 }} 
                whileInView={{ opacity: 1, x: 0 }} 
                transition={{ duration: 0.8 }} 
                className="flex justify-center order-2 md:order-1"
              >
                <img 
                  src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
                  alt="Numerology calculator" 
                  className="rounded-xl shadow-lg w-full max-w-md"
                />
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, x: 30 }} 
                whileInView={{ opacity: 1, x: 0 }} 
                transition={{ duration: 0.8, delay: 0.2 }} 
                className="space-y-6 order-1 md:order-2"
              >
                <h2 className="text-3xl md:text-4xl font-bold gradient-text">Numerology Calculator</h2>
                <p className="text-lg text-gray-600">
                  Discover insights about yourself with our advanced numerology calculator:
                </p>
                <ul className="space-y-4 text-gray-700">
                  <li className="flex items-start">
                    <Calculator className="h-5 w-5 text-orange-500 mr-2 mt-1 flex-shrink-0" />
                    <span>Analyzes your core personality traits and behaviors</span>
                  </li>
                  <li className="flex items-start">
                    <Calculator className="h-5 w-5 text-orange-500 mr-2 mt-1 flex-shrink-0" />
                    <span>Shows your current fortune meter</span>
                  </li>
                  <li className="flex items-start">
                    <Calculator className="h-5 w-5 text-orange-500 mr-2 mt-1 flex-shrink-0" />
                    <span>Checks name compatibility with person</span>
                  </li>
                </ul>
                <Button asChild className="orange-gradient text-white hover:orange-gradient-hover px-8 py-3 text-lg rounded-xl hover:orange-gradient-hover transition-transform duration-300 ease-in-out hover:scale-105">
                  <Link to="/calculator">Try Calculator</Link>
                </Button>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {[{ icon: Users, number: "10000+", label: "Happy Clients" }, { icon: Calendar, number: "25+", label: "Years Experience" }, { icon: Award, number: "98%", label: "Success Rate" }, { icon: TrendingUp, number: "24/7", label: "Support" }].map((stat, index) => (
                <motion.div key={index} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: index * 0.1 }} className="space-y-4">
                  <stat.icon className="h-12 w-12 text-orange-500 mx-auto" />
                  <div>
                    <div className="text-3xl font-bold gradient-text">{stat.number}</div>
                    <div className="text-gray-600">{stat.label}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

{/* Experts Section */}
<section className="py-20 bg-gradient-to-r from-orange-50 to-white">
  <div className="container mx-auto px-4">
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="text-center mb-16"
    >
      <h2 className="text-4xl font-bold gradient-text mb-4">
        Meet Our Expert Consultants
      </h2>
      <p className="text-xl text-gray-600 max-w-3xl mx-auto">
        Our experienced consultants combine ancient wisdom with modern insights to guide you
      </p>
    </motion.div>

    <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
      {/* Yashraj Guruji */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="bg-white rounded-2xl shadow-md p-8 text-center border border-gray-100 hover:shadow-xl transition duration-300"
      >
        <img
          alt="Yashraj Guruji - Numerology Expert"
          className="w-40 h-40 rounded-full mx-auto mb-6 object-cover border-4 border-orange-100"
          src="/images/Profile2.jpg"
        />
        <h3 className="text-2xl font-bold text-gray-900 mb-1">Yashraj Guruji</h3>
        <p className="text-pink-600 font-medium mb-4">Senior Numerology Consultant</p>
        <p className="text-gray-600 text-sm mb-4">
          With over 20 years of experience in numerology, Yashraj Guruji has helped thousands discover their life path through numbers.
        </p>
        <div className="text-sm text-left text-gray-700 mb-4 space-y-1">
          <p>• Expert in Life Path Analysis</p>
          <p>• Residential Vaastu Specialist</p>
          <p>• Business Numerology Consultant</p>
        </div>
        <div className="text-sm text-left text-gray-700 mb-4 space-y-1">
          <p><strong>Address:</strong> C1, Yamuna Vihar, Delhi-110053</p>
        </div>
        <div className="flex justify-center gap-6 mt-4">
          <a
            href="https://www.instagram.com/yashrajguruji/?igsh=b2U1aXpzcXh5amI%3D#"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
          >
            <Instagram className="w-5 h-5 text-pink-600 hover:text-pink-700 transition" />
          </a>
          <a
            href="https://www.facebook.com/yash.kumargoel.5?rdid=VHXOM0u9TtMFE7qH&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F16GB7zP53k%2F#"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
          >
            <Facebook className="w-5 h-5 text-blue-600 hover:text-blue-700 transition" />
          </a>
        </div>
      </motion.div>

      {/* Rishabh Goel */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="bg-white rounded-2xl shadow-md p-8 text-center border border-gray-100 hover:shadow-xl transition duration-300"
      >
        <img
          alt="Rishabh Goel - Vaastu Consultant"
          className="w-40 h-40 rounded-full mx-auto mb-6 object-cover border-4 border-orange-100"
          src="/images/Profile.jpg"
        />
        <h3 className="text-2xl font-bold text-gray-900 mb-1">Rishabh Goel</h3>
        <p className="text-orange-500 font-medium mb-4">Vaastu Consultant</p>
        <p className="text-gray-600 text-sm mb-4">
          A renowned Vaastu expert with 7+ years of experience, Rishabh Goel harmonizes spaces for prosperity and peace.
        </p>
        <div className="text-sm text-left text-gray-700 mb-4 space-y-1">
          <p>• Residential Vaastu Specialist</p>
          <p>• Commercial Space Consultant</p>
          <p>• Numerology Consultant</p>
        </div>
        <div className="text-sm text-left text-gray-700 mb-4 space-y-1">
          <p><strong>Address:</strong> C1, Yamuna Vihar, Delhi-110053</p>
        </div>
        <div className="flex justify-center gap-6 mt-4">
          <a
            href="https://www.instagram.com/goel_bhaiji/?utm_source=qr&igsh=MTdmdTJseXdsbGV2cg%3D%3D#"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
          >
            <Instagram className="w-5 h-5 text-pink-600 hover:text-pink-700 transition" />
          </a>
          <a
            href="https://www.facebook.com/VaastuGuruBhaaiji?rdid=SUgkZb3o6ORBzvv3&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1BTUVN8G2S%2F#"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
          >
            <Facebook className="w-5 h-5 text-blue-600 hover:text-blue-700 transition" />
          </a>
        </div>
      </motion.div>
    </div>
  </div>
</section>


        {/* Reviews Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-center mb-12">
              <h2 className="text-4xl font-bold gradient-text mb-4">What Our Clients Say</h2>
              <p className="text-xl text-gray-600">Real experiences from satisfied clients</p>
            </motion.div>
            
            {/* Animated Reviews */}
            {reviews.length > 0 ? (
              <AnimatedReviews 
                reviews={reviews} 
                isSignedIn={isSignedIn} 
                user={user} 
                handleDeleteReview={handleDeleteReview} 
              />
            ) : (
              <p className="text-center text-gray-500 py-8">No reviews yet. Be the first to leave one!</p>
            )}

            {/* Submit Review */}
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="max-w-2xl mx-auto bg-gradient-to-br from-orange-50 to-white p-8 rounded-2xl shadow-lg mt-16">
              <h3 className="text-2xl font-bold gradient-text mb-6 text-center">Share Your Experience</h3>
              {!isSignedIn && (
                <div className="text-center mb-6 p-4 bg-orange-100 rounded-xl">
                  <p className="text-orange-700 mb-4">Please login to submit a review</p>
                  <SignInButton mode="modal">
                    <Button className="orange-gradient text-white hover:orange-gradient-hover transition-transform duration-300 ease-in-out hover:scale-105 rounded-xl">
                      Login / Sign Up
                    </Button>
                  </SignInButton>
                </div>
              )}
              <form onSubmit={handleSubmitReview} className="space-y-6">
                <div>
                  <Label className="text-sm font-medium text-gray-700 mb-2 block">Your Rating</Label>
                  {renderStars(newReview.rating, true, (rating) => setNewReview({ ...newReview, rating }))}
                </div>
                <div>
                  <Label htmlFor="comment" className="text-sm font-medium text-gray-700 mb-2 block">Your Review</Label>
                  <textarea 
                    id="comment" 
                    value={newReview.comment} 
                    onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })} 
                    placeholder="Share your experience with our services..." 
                    className="w-full p-3 border border-gray-300 rounded-xl focus:border-orange-500 focus:ring-orange-500 min-h-[120px] resize-none" 
                    disabled={!isSignedIn} 
                    required
                  />
                </div>
                <Button 
                  type="submit" 
                  disabled={!isSignedIn} 
                  className="w-full orange-gradient text-white hover:orange-gradient-hover transition-transform duration-300 ease-in-out hover:scale-105 rounded-xl"
                >
                  Submit Review
                </Button>
              </form>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Home;