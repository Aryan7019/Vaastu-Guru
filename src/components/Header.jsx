import { useState, useEffect, useCallback, memo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Compass, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useUser, SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react';

// Static nav items moved outside component
const NAV_ITEMS = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/learn' },
  { name: 'Therapy', path: '/therapy' },
  { name: 'Calculator', path: '/calculator' },
  { name: 'Services', path: '/services' }
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { user } = useUser();

  // Detect scroll to change header appearance
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = useCallback(() => setIsMenuOpen(prev => !prev), []);
  const closeMenu = useCallback(() => setIsMenuOpen(false), []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-white shadow-lg' 
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-3 sm:px-4 py-2 sm:py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 sm:space-x-3 group flex-shrink-0">
            <motion.img  
              alt="Logo" 
              className="h-10 sm:h-12 md:h-14 w-auto"
              src="/images/bhaggya darshhan.png"
            />
            <span className={`hidden sm:block text-lg sm:text-xl md:text-2xl font-bold transition-colors duration-300 ${
              scrolled ? 'text-orange-600' : 'text-white'
            }`}>
              NumaVaastu
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`px-3 xl:px-5 py-2 xl:py-2.5 rounded-full text-sm xl:text-base font-medium transition-all duration-300 ${
                  location.pathname === item.path
                    ? scrolled 
                      ? 'bg-orange-100 text-orange-600' 
                      : 'bg-white/20 text-white'
                    : scrolled
                      ? 'text-gray-700 hover:text-orange-600 hover:bg-orange-50'
                      : 'text-white/90 hover:text-white hover:bg-white/10'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Desktop Auth */}
          <div className="hidden lg:flex items-center space-x-2 xl:space-x-3">
            <SignedIn>
              <span className={`text-sm xl:text-base font-medium transition-colors duration-300 whitespace-nowrap ${
                scrolled ? 'text-gray-700' : 'text-white/90'
              }`}>
                Welcome, {user?.firstName || 'User'}
              </span>
              <UserButton 
                appearance={{
                  elements: {
                    avatarBox: "h-9 w-9 xl:h-10 xl:w-10 ring-2 ring-orange-400"
                  }
                }}
              />
            </SignedIn>

            <SignedOut>
              <SignInButton mode="modal">
                <Button className={`font-semibold px-5 xl:px-7 py-2 xl:py-2.5 rounded-full text-sm xl:text-base shadow-lg transition-all duration-300 ${
                  scrolled 
                    ? 'bg-orange-600 text-white hover:bg-orange-700' 
                    : 'bg-white text-orange-600 hover:bg-white/90'
                }`}>
                  Login / Sign Up
                </Button>
              </SignInButton>
            </SignedOut>
          </div>

          {/* Mobile Menu Button - Compass Icon */}
          <button
            className={`lg:hidden p-2 rounded-lg transition-all duration-300 ${
              scrolled 
                ? 'text-orange-600 hover:bg-orange-50' 
                : 'text-white hover:bg-white/10'
            }`}
            onClick={toggleMenu}
          >
            <motion.div
              animate={{ rotate: isMenuOpen ? 180 : 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Compass className="h-6 w-6" />}
            </motion.div>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className={`lg:hidden border-t transition-all duration-300 ${
              scrolled 
                ? 'bg-white border-gray-200' 
                : 'bg-black/20 backdrop-blur-md border-white/10'
            }`}
          >
            <div className="container mx-auto px-4 py-4 space-y-2">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={closeMenu}
                  className={`block px-4 py-3 rounded-xl text-base font-medium transition-all ${
                    location.pathname === item.path
                      ? scrolled 
                        ? 'bg-orange-100 text-orange-600' 
                        : 'bg-white/20 text-white'
                      : scrolled
                        ? 'text-gray-700 hover:bg-gray-100'
                        : 'text-white/90 hover:bg-white/10'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              
              <div className={`pt-4 border-t ${scrolled ? 'border-gray-200' : 'border-white/10'}`}>
                <SignedIn>
                  <div className="flex items-center justify-between px-4">
                    <span className={`text-base ${scrolled ? 'text-gray-700' : 'text-white/90'}`}>
                      Welcome, {user?.firstName || 'User'}
                    </span>
                    <UserButton />
                  </div>
                </SignedIn>
                <SignedOut>
                  <SignInButton mode="modal">
                    <Button className={`w-full font-semibold py-3 rounded-xl transition-all duration-300 ${
                      scrolled 
                        ? 'bg-orange-600 text-white hover:bg-orange-700' 
                        : 'bg-white text-orange-600 hover:bg-white/90'
                    }`}>
                      Login / Sign Up
                    </Button>
                  </SignInButton>
                </SignedOut>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;