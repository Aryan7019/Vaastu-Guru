import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Compass, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import AuthModal from '@/components/AuthModal';
import { useAuth } from '@/contexts/AuthContext';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const location = useLocation();
  const { user, logout } = useAuth();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Learn', path: '/learn' },
    { name: 'Calculator', path: '/calculator' }
  ];

  return (
    <>
      <header className="bg-white/80 backdrop-blur-lg shadow-lg sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-3">
              <img  
                alt="Bhaggya Darshhan Logo" 
                className="h-16 w-auto"
               src="https://storage.googleapis.com/hostinger-horizons-assets-prod/a763965f-1fd9-476b-af4e-14e94d6d5e1c/125dd8c36c4554e08dcf54cf2b4c5bbe.png" />
              <div className="hidden sm:block">
                <h1 className="text-2xl font-bold gradient-text">Vaastu Guru</h1>
              </div>
            </Link>

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

            <div className="hidden md:flex items-center space-x-4">
              {user ? (
                <div className="flex items-center space-x-4">
                  <span className="text-gray-700">Welcome{user.displayName ? `, ${user.displayName}` : ''}</span>
                  <Button
                    onClick={logout}
                    variant="outline"
                    className="border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white rounded-xl"
                  >
                    Logout
                  </Button>
                </div>
              ) : (
                <Button
                  onClick={() => setIsAuthModalOpen(true)}
                  className="orange-gradient text-white hover:orange-gradient-hover rounded-xl"
                >
                  Login / Sign Up
                </Button>
              )}
            </div>

            <button
              onClick={toggleMenu}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
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
                
                <div className="pt-4 border-t border-gray-200">
                  {user ? (
                    <div className="space-y-2">
                      <p className="text-gray-700">Welcome, {user.name}</p>
                      <Button
                        onClick={() => {
                          logout();
                          setIsMenuOpen(false);
                        }}
                        variant="outline"
                        className="w-full border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white rounded-xl"
                      >
                        Logout
                      </Button>
                    </div>
                  ) : (
                    <Button
                      onClick={() => {
                        setIsAuthModalOpen(true);
                        setIsMenuOpen(false);
                      }}
                      className="w-full orange-gradient text-white hover:orange-gradient-hover rounded-xl"
                    >
                      Login / Sign Up
                    </Button>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
      />
    </>
  );
};

export default Header;