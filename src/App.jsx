import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import Header from '@/components/Header';
import Home from '@/pages/Home';
import StudySection from '@/pages/StudySection';
import Calculator from '@/pages/Calculator';
import FloatingNumbers from '@/components/FloatingNumbers';
import ChatBot from '@/components/ChatBot';
import { AuthProvider } from '@/contexts/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen relative">
          <FloatingNumbers />
          <Header />
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
      </Router>
    </AuthProvider>
  );
}

export default App;