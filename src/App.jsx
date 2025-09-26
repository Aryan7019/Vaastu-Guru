import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ClerkProvider } from '@clerk/clerk-react';
import { Toaster } from '@/components/ui/toaster';
import Header from '@/components/Header';
import Home from '@/pages/Home';
import StudySection from '@/pages/StudySection';
import Calculator from '@/pages/Calculator';
import TherapySection from '@/pages/TherapySection';
import Services from './pages/services';
import FloatingNumbers from '@/components/FloatingNumbers';
import ChatBot from '@/components/ChatBot';
import CallConsultation from '@/components/CallConsultation'; 

// Use environment variable with fallback
const clerkKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY || "pk_test_a25vd2luZy1sb2N1c3QtMjguY2xlcmsuYWNjb3VudHMuZGV2JA";

function App() {
  return (
    <ClerkProvider 
      publishableKey={clerkKey}
      appearance={{
        baseTheme: undefined,
        variables: {
          colorPrimary: "#f97316" // Orange color to match your theme
        }
      }}
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
            </Routes>
          </main>
          
          <ChatBot />
          <CallConsultation /> 
          <Toaster />
        </div>
      </Router>
    </ClerkProvider>
  );
}

export default App;