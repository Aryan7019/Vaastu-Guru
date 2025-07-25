import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ClerkProvider, SignIn, SignUp } from '@clerk/clerk-react';
import { Toaster } from '@/components/ui/toaster';
import Header from '@/components/Header';
import Home from '@/pages/Home';
import StudySection from '@/pages/StudySection';
import Calculator from '@/pages/Calculator';
import TherapySection from '@/pages/TherapySection';
import Services from './pages/services';
import FloatingNumbers from '@/components/FloatingNumbers';
import ChatBot from '@/components/ChatBot';

const clerkKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!clerkKey) {
  throw new Error("Missing Clerk publishable key. Add VITE_CLERK_PUBLISHABLE_KEY to .env");
}

function App() {
  return (
    <ClerkProvider
      publishableKey={clerkKey}
      afterSignInUrl="/calculator"
      afterSignUpUrl="/calculator"
      signInUrl="/sign-in"
      signUpUrl="/sign-up"
    >
      <Router>
        <div className="min-h-screen relative">
          <FloatingNumbers />
          <Header />

          <main className="relative z-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/learn" element={<StudySection />} />
              <Route path="/calculator" element={<Calculator />} />
              <Route path="/therapy" element={<TherapySection />} />
              <Route path="/services" element={<Services />} />
              {/* Auth pages - only needed if NOT using modal auth */}
              <Route
                path="/sign-in"
                element={
                  <div className="flex justify-center items-center min-h-screen">
                    <SignIn routing="path" path="/sign-in" />
                  </div>
                }
              />
              <Route
                path="/sign-up"
                element={
                  <div className="flex justify-center items-center min-h-screen">
                    <SignUp routing="path" path="/sign-up" />
                  </div>
                }
              />
            </Routes>
          </main>

          <ChatBot />
          <Toaster />
        </div>
      </Router>
    </ClerkProvider>
  );
}

export default App;