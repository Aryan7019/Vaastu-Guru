import React from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { ClerkProvider, RedirectToSignIn, SignedIn, SignedOut } from '@clerk/clerk-react';
import { Toaster } from '@/components/ui/toaster';
import Header from '@/components/Header';
import Home from '@/pages/Home';
import StudySection from '@/pages/StudySection';
import Calculator from '@/pages/Calculator';
import TherapySection from '@/pages/TherapySection';
import Services from './pages/services';
import FloatingNumbers from '@/components/FloatingNumbers';
import ChatBot from '@/components/ChatBot';

const clerkKey = process.env.REACT_APP_CLERK_PUBLISHABLE_KEY;

function ClerkProviderWithRoutes() {
  const navigate = useNavigate();

  return (
    <ClerkProvider
      publishableKey={clerkKey}
      navigate={(to) => navigate(to)}
      afterSignInUrl="/calculator"
      afterSignUpUrl="/calculator"
    >
      <div className="min-h-screen relative">
        <FloatingNumbers />
        <Header />

        <main className="relative z-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/learn" element={<StudySection />} />
            <Route 
              path="/calculator" 
              element={
                <>
                  <SignedIn>
                    <Calculator />
                  </SignedIn>
                  <SignedOut>
                    <RedirectToSignIn />
                  </SignedOut>
                </>
              } 
            />
            <Route path="/therapy" element={<TherapySection />} />
            <Route path="/services" element={<Services />} />
            <Route path="*" element={<div>404 Not Found</div>} />
          </Routes>
        </main>

        <ChatBot />
        <Toaster />
      </div>
    </ClerkProvider>
  );
}

function App() {
  return (
    <Router>
      <ClerkProviderWithRoutes />
    </Router>
  );
}

export default App;