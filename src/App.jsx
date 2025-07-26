import React from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
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

const clerkKey = "pk_test_a25vd2luZy1sb2N1c3QtMjguY2xlcmsuYWNjb3VudHMuZGV2JA";

// Create a wrapper component to access useNavigate inside ClerkProvider
function ClerkProviderWithRouter({ children }) {
  const navigate = useNavigate();
  
  return (
    <ClerkProvider 
      publishableKey={clerkKey}
      routerPush={(to) => navigate(to)}
      routerReplace={(to) => navigate(to, { replace: true })}
    >
      {children}
    </ClerkProvider>
  );
}

function AppContent() {
  return (
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
      <Toaster />
    </div>
  );
}

function App() {
  return (
    <Router>
      <ClerkProviderWithRouter>
        <AppContent />
      </ClerkProviderWithRouter>
    </Router>
  );
}

export default App;