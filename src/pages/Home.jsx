import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Star, Quote, Calendar, Users, Award, TrendingUp, Trash2, Facebook, Instagram } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/components/ui/use-toast';
import AuthModal from '@/components/AuthModal';
import { Link } from 'react-router-dom';
import { sendConsultationRequest } from '@/services/emailService';
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  query,
  orderBy,
  Timestamp
} from 'firebase/firestore';
import { db } from "../components/firebase"; // adjust path to your firebase config

const Home = () => {
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({ rating: 5, comment: '' });
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const q = query(collection(db, "reviews"), orderBy("date", "desc"));
        const querySnapshot = await getDocs(q);
        const reviewsData = querySnapshot.docs.map(doc => {
          const data = doc.data();
          return {
            id: doc.id,
            ...data,
            
          };
        });
        setReviews(reviewsData);
      } catch (error) {
        console.error("Error fetching reviews: ", error);
      }
    };

    fetchReviews();
  }, []);

  const handleBookConsultation = () => {
    if (!user) {
      setIsAuthModalOpen(true);
      return;
    }
    sendConsultationRequest();
    toast({
      title: "Consultation Request Sent!",
      description: "Thank you for your interest. Our team will contact you shortly to schedule your consultation.",
    });
  };

  const handleDeleteReview = async (id) => {
    try {
      await deleteDoc(doc(db, "reviews", id));
      const filtered = reviews.filter(r => r.id !== id);
      setReviews(filtered);
      toast({ title: "Deleted", description: "Your review has been removed." });
    } catch (error) {
      console.error("Error deleting review: ", error);
      toast({ title: "Error", description: "Could not delete review", variant: "destructive" });
    }
  };

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    if (!user) return setIsAuthModalOpen(true);

    if (!newReview.comment.trim()) {
      return toast({
        title: "Error",
        description: "Please write a comment for your review",
        variant: "destructive",
      });
    }

   const review = {
  name: user?.displayName || user?.email || "Anonymous",
  rating: newReview.rating,
  comment: newReview.comment,
  date: Timestamp.now(),
};

try {
  const docRef = await addDoc(collection(db, "reviews"), review);
  setReviews([{ id: docRef.id, ...review, date: review.date.toDate() }, ...reviews]);
  setNewReview({ rating: 5, comment: '' });
  toast({ title: "Success!", description: "Your review has been submitted successfully" });
} catch (error) {
  console.error("Error adding review: ", error);
  toast({ title: "Error", description: "Failed to submit review", variant: "destructive" });
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
                <Button onClick={handleBookConsultation} className="orange-gradient text-white hover:orange-gradient-hover px-8 py-3 text-lg rounded-xl">Book Consultation</Button>
                <Button asChild variant="outline" className="border-white text-white hover:bg-white hover:text-orange-500 px-8 py-3 text-lg rounded-xl">
                  <Link to="/study">Learn More</Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {[{ icon: Users, number: "5000+", label: "Happy Clients" }, { icon: Calendar, number: "25+", label: "Years Experience" }, { icon: Award, number: "98%", label: "Success Rate" }, { icon: TrendingUp, number: "24/7", label: "Support" }].map((stat, index) => (
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
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-center mb-16">
              <h2 className="text-4xl font-bold gradient-text mb-4">Meet Our Expert Consultants</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">Our experienced consultants combine ancient wisdom with modern insights to guide you</p>
            </motion.div>
            <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
              {/* Yashraj Guruji */}
<motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} className="bg-white rounded-2xl shadow-lg p-8 text-center card-shadow">
  <img alt="Yashraj Guruji - Numerology Expert" className="w-32 h-32 rounded-full mx-auto mb-6 object-cover" src="/images/Profile2.jpg" />
  <h3 className="text-2xl font-bold gradient-text mb-2">Yashraj Guruji</h3>
  <p className="text-orange-500 font-medium mb-2">Senior Numerology Consultant</p>
  <p className="text-gray-600 mb-4">With over 20 years of experience in numerology, Yashraj Guruji has helped thousands discover their life path through numbers.</p>
  <div className="space-y-2 text-sm text-gray-600 text-left mb-4">
    <p>• Expert in Life Path Analysis</p>
    <p>• Residential Vaastu Specialist</p>
    <p>• Business Numerology Consultant</p>
  </div>
  <div className="text-left text-sm text-gray-700 mb-4">
    <p><strong>Mobile:</strong> +91-9650189822</p>
    <p><strong>Address:</strong> C1, Yamuna Vihar, Delhi-110053</p>
  </div>
  <div className="flex justify-center gap-4 mt-4">
    <a href="https://www.instagram.com/yashrajguruji/?igsh=b2U1aXpzcXh5amI%3D#" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
      <Instagram className="text-pink-600 hover:text-pink-700 w-5 h-5" />
    </a>
    <a href="https://www.facebook.com/yash.kumargoel.5?rdid=VHXOM0u9TtMFE7qH&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F16GB7zP53k%2F#" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
      <Facebook className="text-blue-600 hover:text-blue-700 w-5 h-5" />
    </a>
  </div>
</motion.div>


              {/* Rishabh Goel */}
              <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} className="bg-white rounded-2xl shadow-lg p-8 text-center card-shadow">
  <img alt="Rishabh Goel - Vaastu Consultant" className="w-32 h-32 rounded-full mx-auto mb-6 object-cover" src="/images/Profile.jpg" />
  <h3 className="text-2xl font-bold gradient-text mb-2">Rishabh Goel</h3>
  <p className="text-orange-500 font-medium mb-2">Vaastu Consultant</p>
  <p className="text-gray-600 mb-4">A renowned Vaastu expert with 7+ years of experience, Rishabh Goel harmonizes spaces for prosperity and peace.</p>
  <div className="space-y-2 text-sm text-gray-600 text-left mb-4">
    <p>• Residential Vaastu Specialist</p>
    <p>• Commercial Space Consultant</p>
    <p>• Numerology Consultant</p>
  </div>
  <div className="text-left text-sm text-gray-700 mb-4">
    <p><strong>Mobile:</strong> +91-9650881509</p>
    <p><strong>Address:</strong> C1, Yamuna Vihar, Delhi-110053</p>
  </div>
  <div className="flex justify-center gap-4 mt-4">
    <a href="https://www.instagram.com/goel_bhaiji/?utm_source=qr&igsh=MTdmdTJseXdsbGV2cg%3D%3D#" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
      <Instagram className="text-pink-600 hover:text-pink-700 w-5 h-5" />
    </a>
    <a href="https://www.facebook.com/VaastuGuruBhaaiji?rdid=SUgkZb3o6ORBzvv3&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1BTUVN8G2S%2F#" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
      <Facebook className="text-blue-600 hover:text-blue-700 w-5 h-5" />
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
            <div className="overflow-x-auto pb-4">
              <div className="flex space-x-6 w-max">
                {reviews.map((review, index) => (
                  <motion.div key={review.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: index * 0.1 }} className="relative bg-gradient-to-br from-orange-50 to-white p-6 rounded-2xl shadow-lg min-w-[300px] max-w-[320px]">
                    <Quote className="h-8 w-8 text-orange-500 mb-4" />
                    <div className="mb-4">{renderStars(review.rating)}</div>
                    <p className="text-gray-700 mb-4 italic">"{review.comment}"</p>
                    <div className="flex justify-between items-center text-sm text-gray-500">
                      <span className="font-medium">{review.name}</span>
<span>{(review.date?.toDate?.() || new Date(review.date)).toLocaleDateString()}</span>

                    </div>
                    {user && review.name === (user.displayName || user.email) && (
  <button
    onClick={() => handleDeleteReview(review.id)}
    className="absolute top-2 right-2 text-red-600 hover:text-red-800"
    aria-label="Delete review"
  >
    <Trash2 className="h-5 w-5" />
  </button>
)}

                  </motion.div>
                ))}
              </div>
            </div>

            {/* Submit Review */}
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="max-w-2xl mx-auto bg-gradient-to-br from-orange-50 to-white p-8 rounded-2xl shadow-lg mt-16">
              <h3 className="text-2xl font-bold gradient-text mb-6 text-center">Share Your Experience</h3>
              {!user && (
                <div className="text-center mb-6 p-4 bg-orange-100 rounded-xl">
                  <p className="text-orange-700 mb-4">Please login to submit a review</p>
                  <Button onClick={() => setIsAuthModalOpen(true)} className="orange-gradient text-white hover:orange-gradient-hover rounded-xl">Login / Sign Up</Button>
                </div>
              )}
              <form onSubmit={handleSubmitReview} className="space-y-6">
                <div>
                  <Label className="text-sm font-medium text-gray-700 mb-2 block">Your Rating</Label>
                  {renderStars(newReview.rating, true, (rating) => setNewReview({ ...newReview, rating }))}
                </div>
                <div>
                  <Label htmlFor="comment" className="text-sm font-medium text-gray-700 mb-2 block">Your Review</Label>
                  <textarea id="comment" value={newReview.comment} onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })} placeholder="Share your experience with our services..." className="w-full p-3 border border-gray-300 rounded-xl focus:border-orange-500 focus:ring-orange-500 min-h-[120px] resize-none" disabled={!user} />
                </div>
                <Button type="submit" disabled={!user} className="w-full orange-gradient text-white hover:orange-gradient-hover rounded-xl">Submit Review</Button>
              </form>
            </motion.div>
          </div>
        </section>
      </div>
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </>
  );
};

export default Home;
