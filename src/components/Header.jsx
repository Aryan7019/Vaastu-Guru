import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Compass } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useUser, useClerk, SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from '@clerk/clerk-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { user } = useUser();
  const { signOut } = useClerk();

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
                alt="Logo" 
                className="h-16 w-auto"
                src="/images/bhaggya darshhan.png" 
              />
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
              <SignedIn>
                <div className="flex items-center space-x-4">
                  <span className="text-gray-700">Welcome{user?.fullName ? `, ${user.fullName}` : ''}</span>
                  <UserButton afterSignOutUrl="/" />
                  <Button
                    onClick={() => signOut()}
                    variant="outline"
                    className="border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white rounded-xl transition-transform duration-300 ease-in-out hover:scale-105"
                  >
                    Logout
                  </Button>
                </div>
              </SignedIn>

              <SignedOut>
                <SignInButton mode="modal">
                  <Button className="orange-gradient text-white hover:orange-gradient-hover rounded-xl transition-transform duration-300 ease-in-out hover:scale-105">
                    Login / Sign Up
                  </Button>
                </SignInButton>
              </SignedOut>
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
                  <SignedIn>
                    <div className="space-y-2">
                      <p className="text-gray-700">Welcome{user?.fullName ? `, ${user.fullName}` : ''}</p>
                      <Button
                        onClick={() => {
                          signOut();
                          setIsMenuOpen(false);
                        }}
                        variant="outline"
                        className="w-full border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white rounded-xl"
                      >
                        Logout
                      </Button>
                    </div>
                  </SignedIn>

                  <SignedOut>
                    <SignInButton mode="modal">
                      <Button
                        onClick={() => setIsMenuOpen(false)}
                        className="w-full orange-gradient text-white hover:orange-gradient-hover rounded-xl"
                      >
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
    </>
  );
};

export default Header;
