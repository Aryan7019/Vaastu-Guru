import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Calculator, Home, Building, Palette, Triangle, PenTool } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link, useLocation } from 'react-router-dom';
import { useUser, SignInButton } from '@clerk/clerk-react';
import { ConsultationForm } from "../components/ConsultationForm";
import { Dialog, DialogContent, DialogTrigger, DialogTitle, DialogHeader, DialogDescription } from '../components/ui/dialog';

const LoadingSpinner = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="animate-spin rounded-full h-20 w-20 border-b-4 border-orange-500"></div>
  </div>
);

const Services = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { isSignedIn , isLoaded } = useUser();
  const location = useLocation();

  const services = [
    {
      title: "Numerology",
      description: "Discover your life path number and understand your core personality traits, strengths, and challenges through the ancient science of numbers.",
      img: "https://plus.unsplash.com/premium_photo-1717717670034-0d673f50f895?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8bnVtZXJvbG9neXxlbnwwfHwwfHx8MA%3D%3D",
      icon: <Calculator className="w-6 h-6" />
    },
    {
      title: "Name Correction",
      description: "Enhance your luck and align your name's vibrations with your birth number for better life outcomes and success.",
      img: "https://plus.unsplash.com/premium_photo-1666739032615-ecbd14dfb543?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YWxwaGFiZXR8ZW58MHx8MHx8fDA%3D",
      icon: <PenTool className="w-6 h-6" />
    },
    {
      title: "Residential Vaastu",
      description: "Align your home's energy to bring peace, prosperity, and good health to your family through proper space arrangement.",
      img: "https://aurorealty.com/blog/wp-content/uploads/2019/10/vastu-shastra-for-home.jpg",
      icon: <Home className="w-6 h-6" />
    },
    {
      title: "Commercial Vaastu",
      description: "Attract success in business by balancing energies in shops, offices, and workspaces for optimal financial growth.",
      img: "https://www.vasthusubramanyam.com/wp-content/uploads/2019/09/commercial-e1568478793888.jpg",
      icon: <Building className="w-6 h-6" />
    },
    {
      title: "Industrial Vaastu",
      description: "Optimize industrial spaces for increased productivity, safety, and positive outcomes through proper energy flow.",
      img: "https://www.azumuta.com/wp-content/uploads/2024/05/petrochemical-industry-with-twilight-sky-2-1536x1024-1.jpeg",
      icon: <Building className="w-6 h-6" />
    },
    {
      title: "Color Therapy",
      description: "Use the vibration of colors to heal, balance emotions, and enhance well-being through chromotherapy techniques.",
      img: "https://www.shutterstock.com/image-illustration/human-spirit-powerful-energy-connect-600nw-1416917957.jpg",
      icon: <Palette className="w-6 h-6" />
    },
    {
      title: "Pyramid Therapy",
      description: "Harness the ancient power of pyramids to neutralize negativity and amplify positivity in your environment.",
      img: "https://dailygalaxy.com/wp-content/uploads/2025/04/The-Great-Pyramid-of-Giza-Has-MORE-Than-Four-Sides.jpg",
      icon: <Triangle className="w-6 h-6" />
    }
  ];

  if (!isLoaded) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <Helmet>
        <title>Our Services | NumaVaastu - Numerology & Vaastu Consultancy</title>
        <meta name="description" content="Explore our range of numerology and vaastu services designed to bring balance, prosperity, and harmony to your life." />
      </Helmet>

      <div className="min-h-screen py-20">
        {/* Hero Section */}
        <section className="relative px-4 text-center">
          <div className="container mx-auto max-w-6xl">
            <motion.div 
              initial={{ opacity: 0, y: 30 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.8 }} 
              className="space-y-4" 
            >
              <h1 className="text-5xl md:text-7xl font-bold text-white text-shadow mb-2">
                Our <span className="text-black">Services</span>
              </h1>
              <p className="text-xl text-white max-w-3xl mx-auto">
                Professional numerology and vaastu services to transform your living and working spaces
              </p>
            </motion.div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-12">
          <div className="container mx-auto px-4 text-center">
            <div className="bg-white rounded-2xl shadow-md p-8 border border-gray-100">
              <motion.div 
                initial={{ opacity: 0 }} 
                whileInView={{ opacity: 1 }} 
                transition={{ duration: 0.5 }} 
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" 
              >
                {services.map((service, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ y: -5 }}
                    className="bg-white max-w-sm mx-auto rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer border border-gray-100"
                  >
                    <div className="h-45 overflow-hidden">
                      <img
                        src={service.img}
                        alt={service.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-6">
                      <div className="flex items-center mb-4">
                        <div className="bg-orange-100 p-2 rounded-full mr-4">
                          {service.icon}
                        </div>
                        <h3 className="text-xl font-semibold text-gray-800">{service.title}</h3>
                      </div>
                      <p className="text-gray-600 text-sm leading-relaxed">{service.description}</p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* Consultation CTA */}
        <section className="py-16">
          <div className="container mx-auto px-4 text-center">
            <motion.div 
              initial={{ opacity: 0, y: 30 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.8 }} 
              className="bg-white rounded-2xl p-8 shadow-lg card-shadow"
            >
              <h2 className="text-3xl font-bold gradient-text mb-4">Personalized Guidance Available</h2>
              <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
                Our experts provide customized solutions tailored to your specific needs and challenges.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                {isSignedIn ? (
                  <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                      <Button className="hover:bg-white transition-transform duration-300 ease-in-out hover:scale-105 orange-gradient text-white hover:orange-gradient-hover px-8 py-3 text-lg rounded-xl">
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
                  <SignInButton 
                    mode="modal"
                    redirectUrl={location.pathname}
                  >
                    <Button className="hover:bg-white hover:text-orange-500 transition-transform duration-300 ease-in-out hover:scale-105 orange-gradient text-white hover:orange-gradient-hover px-8 py-3 text-lg rounded-xl">
                      Book Consultation
                    </Button>
                  </SignInButton>
                )}
                <Button asChild variant="outline" className="border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white px-8 py-3 text-lg rounded-xl hover:bg-white hover:text-orange-500 transition-transform duration-300 ease-in-out hover:scale-105">
                  <Link to="/calculator">
                    <Calculator className="inline-block w-5 h-5 mr-2" /> Try Our Analysis Tool
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