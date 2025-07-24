import React from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { ClerkProvider } from '@clerk/clerk-react';
import { Toaster } from '@/components/ui/toaster';
import Header from '@/components/Header';
import Home from '@/pages/Home';
import StudySection from '@/pages/StudySection';
import Calculator from '@/pages/Calculator';
import FloatingNumbers from '@/components/FloatingNumbers';
import ChatBot from '@/components/ChatBot';

const clerkKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

const ClerkProviderWithRouter = ({ children }) => {
  const navigate = useNavigate();
  
  return (
    <ClerkProvider
      publishableKey={clerkKey}
      navigate={(to) => navigate(to)}
    >
      {children}
    </ClerkProvider>
  );
};

function App() {
  return (
    <Router>
      {/* Move ClerkProviderWithRouter to wrap EVERYTHING */}
      <ClerkProviderWithRouter>
        <div className="min-h-screen relative">
          <FloatingNumbers />
          <Header /> {/* Now properly within ClerkProvider */}
          
          <main className="relative z-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/learn" element={<StudySection />} />
              <Route path="/calculator" element={<Calculator />} />
            </Routes>
          </main>

          <ChatBot />
          <Toaster />
        </div>
      </ClerkProviderWithRouter>
    </Router>
  );
}

export default App;