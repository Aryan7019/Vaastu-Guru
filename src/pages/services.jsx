import { useState, memo } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Calculator, Home, Building, Palette, Triangle, PenTool } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link, useLocation } from 'react-router-dom';
import { useUser, SignInButton } from '@clerk/clerk-react';
import { ConsultationForm } from "../components/ConsultationForm";
import { Dialog, DialogContent, DialogTrigger, DialogTitle, DialogHeader, DialogDescription } from '../components/ui/dialog';
import LoadingSpinner from '../components/LoadingSpinner';

// Static services data moved outside component
const SERVICES = [
    {
      title: "Numerology",
      description: "Discover your life path number and understand your core personality traits, strengths, and challenges through the ancient science of numbers.",
      img: "https://plus.unsplash.com/premium_photo-1717717670034-0d673f50f895?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8bnVtZXJvbG9neXxlbnwwfHwwfHx8MA%3D%3D",
      icon: <Calculator className="w-5 h-5 sm:w-6 sm:h-6" />
    },
    {
      title: "Name Correction",
      description: "Enhance your luck and align your name's vibrations with your birth number for better life outcomes and success.",
      img: "https://plus.unsplash.com/premium_photo-1666739032615-ecbd14dfb543?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YWxwaGFiZXR8ZW58MHx8MHx8fDA%3D",
      icon: <PenTool className="w-5 h-5 sm:w-6 sm:h-6" />
    },
    {
      title: "Residential Vaastu",
      description: "Align your home's energy to bring peace, prosperity, and good health to your family through proper space arrangement.",
      img: "https://aurorealty.com/blog/wp-content/uploads/2019/10/vastu-shastra-for-home.jpg",
      icon: <Home className="w-5 h-5 sm:w-6 sm:h-6" />
    },
    {
      title: "Commercial Vaastu",
      description: "Attract success in business by balancing energies in shops, offices, and workspaces for optimal financial growth.",
      img: "https://www.vasthusubramanyam.com/wp-content/uploads/2019/09/commercial-e1568478793888.jpg",
      icon: <Building className="w-5 h-5 sm:w-6 sm:h-6" />
    },
    {
      title: "Industrial Vaastu",
      description: "Optimize industrial spaces for increased productivity, safety, and positive outcomes through proper energy flow.",
      img: "https://www.azumuta.com/wp-content/uploads/2024/05/petrochemical-industry-with-twilight-sky-2-1536x1024-1.jpeg",
      icon: <Building className="w-5 h-5 sm:w-6 sm:h-6" />
    },
    {
      title: "Color Therapy",
      description: "Use the vibration of colors to heal, balance emotions, and enhance well-being through chromotherapy techniques.",
      img: "https://www.shutterstock.com/image-illustration/human-spirit-powerful-energy-connect-600nw-1416917957.jpg",
      icon: <Palette className="w-5 h-5 sm:w-6 sm:h-6" />
    },
    {
      title: "Pyramid Therapy",
      description: "Harness the ancient power of pyramids to neutralize negativity and amplify positivity in your environment.",
      img: "https://dailygalaxy.com/wp-content/uploads/2025/04/The-Great-Pyramid-of-Giza-Has-MORE-Than-Four-Sides.jpg",
      icon: <Triangle className="w-5 h-5 sm:w-6 sm:h-6" />
    }
];

// Memoized Service Card
const ServiceCard = memo(({ service, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
    className="group relative overflow-hidden rounded-xl sm:rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer"
  >
    <div className="h-64 sm:h-72 md:h-80 overflow-hidden relative">
      <img
        src={service.img}
        alt={service.title}
        className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-orange-600/90 via-orange-500/60 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-400 ease-out"></div>
      
      <div className="absolute inset-0 p-4 sm:p-5 md:p-6 flex flex-col justify-end text-white">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: index * 0.1 + 0.2 }}
          className="transform group-hover:-translate-y-2 transition-transform duration-400 ease-out"
        >
          <div className="flex items-center mb-3 sm:mb-4">
            <div className="bg-white/20 backdrop-blur-md p-2 sm:p-3 rounded-full mr-3 sm:mr-4 group-hover:bg-white/30 transition-colors duration-300 ease-out">
              {service.icon}
            </div>
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold">{service.title}</h3>
          </div>
          <p className="text-white/90 leading-relaxed group-hover:text-white transition-colors duration-300 ease-out text-sm sm:text-base line-clamp-3">
            {service.description}
          </p>
          
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            className="mt-3 sm:mt-4 opacity-0 group-hover:opacity-100 transition-all duration-300"
          >
            <div className="inline-flex items-center text-white font-semibold text-sm sm:text-base">
              Learn More 
              <svg className="ml-2 w-3 h-3 sm:w-4 sm:h-4 transform group-hover:translate-x-1 transition-transform duration-300 ease-out" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  </motion.div>
));

const Services = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { isSignedIn, isLoaded } = useUser();
  const location = useLocation();

  if (!isLoaded) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <Helmet>
        <title>Our Services | NumaVaastu - Numerology & Vaastu Consultancy</title>
        <meta name="description" content="Explore our range of numerology and vaastu services designed to bring balance, prosperity, and harmony to your life." />
      </Helmet>

      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="relative px-4 text-center py-12 sm:py-16 min-h-[40vh] sm:min-h-[50vh] flex items-center overflow-hidden">
          
          <div className="container mx-auto max-w-6xl relative z-10">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              transition={{ duration: 0.8, ease: "easeOut" }} 
              className="space-y-4 sm:space-y-6" 
            >
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
              >
                <div className="inline-flex items-center px-4 sm:px-6 py-2 sm:py-3 bg-white/20 backdrop-blur-md rounded-full border border-white/30 text-white font-medium text-sm sm:text-base mb-4 sm:mb-6">
                  <span className="mr-2">🌟</span>
                  What we offer
                </div>
              </motion.div>
              
              <motion.h1 
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
              >
                <span className="text-white" style={{ textShadow: '3px 3px 6px rgba(0,0,0,0.4)' }}>Our </span>
                <span className="text-black" style={{ textShadow: '2px 2px 4px rgba(255,255,255,0.5), 0 0 10px rgba(255,255,255,0.3)' }}>Services</span>
              </motion.h1>
              <motion.p 
                className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/95 max-w-4xl mx-auto px-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
                style={{ textShadow: '1px 1px 3px rgba(0,0,0,0.3)' }}
              >
                Professional numerology and vaastu services to transform your living and working spaces
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* Enhanced Services Grid */}
        <section className="py-8 sm:py-12 relative">
          <div className="absolute inset-0 bg-gradient-to-br from-orange-50 via-white to-orange-50"></div>
          
          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-10 sm:mb-16"
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-orange-600 to-orange-400 bg-clip-text text-transparent mb-3 sm:mb-4">
                Transform Your Life
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto px-2">
                Choose from our comprehensive range of services designed to bring harmony and prosperity
              </p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0 }} 
              whileInView={{ opacity: 1 }} 
              transition={{ duration: 0.5 }} 
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8" 
            >
              {SERVICES.map((service, index) => (
                <ServiceCard key={service.title} service={service} index={index} />
              ))}
            </motion.div>
          </div>
        </section>

        {/* Consultation CTA */}
        <section className="py-12 sm:py-16">
          <div className="container mx-auto px-4 text-center">
            <motion.div 
              initial={{ opacity: 0, y: 30 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.8 }} 
              className="bg-white rounded-xl sm:rounded-2xl p-6 sm:p-8 shadow-lg card-shadow"
            >
              <h2 className="text-2xl sm:text-3xl font-bold gradient-text mb-3 sm:mb-4">Personalized Guidance Available</h2>
              <p className="text-gray-600 mb-6 sm:mb-8 max-w-2xl mx-auto text-sm sm:text-base">
                Our experts provide customized solutions tailored to your specific needs and challenges.
              </p>
              <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 sm:gap-4">
                {isSignedIn ? (
                  <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                      <Button className="w-full sm:w-auto hover:bg-white transition-transform duration-300 ease-in-out hover:scale-105 orange-gradient text-white hover:orange-gradient-hover px-6 sm:px-8 py-2.5 sm:py-3 text-base sm:text-lg rounded-xl">
                        Book Consultation
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-[95vw] sm:max-w-[425px] mx-2">
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
                  <SignInButton 
                    mode="modal"
                    redirectUrl={location.pathname}
                  >
                    <Button className="w-full sm:w-auto hover:bg-white hover:text-orange-500 transition-transform duration-300 ease-in-out hover:scale-105 orange-gradient text-white hover:orange-gradient-hover px-6 sm:px-8 py-2.5 sm:py-3 text-base sm:text-lg rounded-xl">
                      Book Consultation
                    </Button>
                  </SignInButton>
                )}
                <Button asChild variant="outline" className="w-full sm:w-auto border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white px-6 sm:px-8 py-2.5 sm:py-3 text-base sm:text-lg rounded-xl hover:bg-white hover:text-orange-500 transition-transform duration-300 ease-in-out hover:scale-105">
                  <Link to="/calculator">
                    <Calculator className="inline-block w-4 h-4 sm:w-5 sm:h-5 mr-2" /> Try Our Analysis Tool
                  </Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Services;
