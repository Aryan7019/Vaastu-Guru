import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import CalculatorResultCard from '@/components/calculator/CalculatorResultCard';
import { TrendingUp, Star, User } from 'lucide-react';
import { getNumberMeaning } from '@/utils/numerology';
import { ConsultationForm } from "@/components/ConsultationForm";
import { Dialog, DialogContent, DialogTrigger, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

const CalculatorResult = ({ results, formData, onReset }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="space-y-8"
    >
      {/* ───── Profile Card ───── */}
      <div className="bg-white rounded-lg shadow-xl p-8 text-center card-shadow">
        <h2 className="text-3xl font-bold gradient-text mb-4">
          Your Numerology Profile
        </h2>
        <p className="text-gray-600 mb-2">
          Generated for: <strong>{formData.name}</strong>
        </p>
        <p className="text-gray-600">
          Birth Date: <strong>{new Date(formData.birthDate).toLocaleDateString()}</strong>
        </p>
      </div>

      {/* ───── Number Cards ───── */}
      <div className="grid md:grid-cols-3 gap-8">
        <CalculatorResultCard
          icon={TrendingUp}
          title="Life Path Number"
          number={results.lifePathNumber}
          description={getNumberMeaning(results.lifePathNumber, 'lifePath')}
          delay={0.1}
        />
        <CalculatorResultCard
          icon={Star}
          title="Destiny Number"
          number={results.destinyNumber}
          description={getNumberMeaning(results.destinyNumber, 'destiny')}
          delay={0.2}
        />
        <CalculatorResultCard
          icon={User}
          title="Soul Urge Number"
          number={results.soulUrgeNumber}
          description={getNumberMeaning(results.soulUrgeNumber, 'soulUrge')}
          delay={0.3}
        />
      </div>

      {/* ───── CTA ───── */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="bg-white rounded-lg shadow-xl p-8 text-center card-shadow"
      >
        <h3 className="text-2xl font-bold gradient-text mb-4">
          Want Deeper Insights?
        </h3>
        <p className="text-gray-600 mb-6">
          Our expert consultants will contact you soon for a detailed analysis
          and personalized guidance based on your unique numerology profile.
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          <Button
            onClick={onReset}
            variant="outline"
            className="border-orange-500 text-orange-500 transition-transform duration-300 ease-in-out hover:scale-105 hover:bg-orange-500 hover:text-white"
          >
            Calculate Again
          </Button>
          
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button
                className="orange-gradient text-white transition-transform duration-300 ease-in-out hover:scale-105 hover:orange-gradient-hover"
              >
                Book Consultation
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold text-orange-600">
                  Book Consultation
                </DialogTitle>
                <DialogDescription className="text-orange-500">
                  We'll contact you shortly to discuss your numerology profile
                </DialogDescription>
              </DialogHeader>
              <ConsultationForm 
                onSuccess={() => setIsDialogOpen(false)}
                defaultName={formData.name} // Pre-fill the name from calculator
              />
            </DialogContent>
          </Dialog>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default CalculatorResult;