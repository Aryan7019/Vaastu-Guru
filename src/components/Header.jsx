import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Compass } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useUser, SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { user } = useUser();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/learn' },
    { name: 'Therapy', path: '/therapy' },
    { name: 'Calculator', path: '/calculator' },
    { name: 'Services', path: '/services' }
  ];

  return (
    <>
      <header className="bg-white/80 backdrop-blur-lg shadow-lg sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3">
              <img  
                alt="Logo" 
                className="h-16 w-auto"
                src="/images/bhaggya darshhan.png" 
              />
              <div className="hidden sm:block">
                <h1 className="text-2xl font-bold gradient-text">Vaastu Guru</h1>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`font-medium transition-colors duration-200 ${
                    location.pathname === item.path
                      ? 'text-orange-500'
                      : 'text-gray-700 hover:text-orange-500'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            {/* Desktop Auth */}
            <div className="hidden md:flex items-center space-x-4">
              <SignedIn>
                <div className="flex items-center space-x-4">
                  <span className="text-gray-700">
                    Welcome{user?.fullName ? `, ${user.fullName}` : ''}
                  </span>
                  <UserButton 
                    appearance={{
                      elements: {
                        avatarBox: "h-10 w-10"
                      }
                    }}
                  />
                </div>
              </SignedIn>

              <SignedOut>
                <SignInButton 
                  mode="modal"
                  redirectUrl={location.pathname}
                  afterSignInUrl={location.pathname}
                  afterSignUpUrl={location.pathname}
                >
                  <Button className="orange-gradient text-white hover:orange-gradient-hover rounded-xl transition-transform duration-300 ease-in-out hover:scale-105">
                    Login / Sign Up
                  </Button>
                </SignInButton>
              </SignedOut>
            </div>

            {/* Mobile Layout */}
            <div className="md:hidden flex items-center gap-4">
              <SignedIn>
                <UserButton 
                  appearance={{
                    elements: {
                      avatarBox: "h-8 w-8"
                    }
                  }}
                />
              </SignedIn>
              
              <SignedOut>
                <SignInButton 
                  mode="modal"
                  redirectUrl={location.pathname}
                  afterSignInUrl={location.pathname}
                  afterSignUpUrl={location.pathname}
                >
                  <Button 
                    size="sm"
                    className="orange-gradient text-white hover:orange-gradient-hover rounded-xl transition-transform duration-300 ease-in-out hover:scale-105"
                  >
                    Login / Sign Up
                  </Button>
                </SignInButton>
              </SignedOut>

              {/* Menu toggle button */}
              <button
                onClick={toggleMenu}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <motion.div
                  animate={{ rotate: isMenuOpen ? 90 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Compass className="h-6 w-6 text-orange-500" />
                </motion.div>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden bg-white border-t border-gray-200"
            >
              <div className="container mx-auto px-4 py-4 space-y-4">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    onClick={() => setIsMenuOpen(false)}
                    className={`block py-2 font-medium transition-colors duration-200 ${
                      location.pathname === item.path
                        ? 'text-orange-500'
                        : 'text-gray-700 hover:text-orange-500'
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
};

export default Header;