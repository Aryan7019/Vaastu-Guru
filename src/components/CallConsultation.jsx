import { useState } from 'react';
import { Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { useUser, SignInButton } from '@clerk/clerk-react';
import { toast } from '@/components/ui/use-toast';

const UPI_QR_CODE_IMAGE_URL = '/images/QRcode.jpg'; 

const CallConsultation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isCalling, setIsCalling] = useState(false);
  const [dialogStep, setDialogStep] = useState(1);
  const { isLoaded, isSignedIn } = useUser();

  const CONSULTATION_FEE = 499;
  const ORIGINAL_FEE = 2099;
  const CONSULTANT_NUMBER = "+919650189822";

  const handleCallInitiation = () => {
    setIsCalling(true);
    
    toast({
      title: "Connecting to Consultant",
      description: "Please wait while we connect your call...",
    });

    setTimeout(() => {
      window.location.href = `tel:${CONSULTANT_NUMBER}`;
      setIsCalling(false);
      setIsOpen(false);
      setDialogStep(1); 
    }, 2000);
  };

  const handleOpenChange = (open) => {
    setIsOpen(open);
    if (!open) {
      setDialogStep(1);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="z-50 w-12 h-12 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full shadow-xl flex items-center justify-center text-white hover:from-orange-600 hover:to-orange-700 transition-colors duration-300"
        style={{ 
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          boxShadow: '0 4px 20px rgba(249, 115, 22, 0.5)'
        }}
        title="Call Consultant"
      >
        <Phone className="h-5 w-5" />
      </button>

      <Dialog open={isOpen} onOpenChange={handleOpenChange}>
        <DialogContent className="max-w-[95vw] sm:max-w-md rounded-xl mx-2">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-orange-600">
              <Phone className="h-5 w-5" />
              Call Consultation
            </DialogTitle>
            <DialogDescription>
              Connect directly with our expert consultant.
            </DialogDescription>
          </DialogHeader>

          <div className="py-4">
            {!isLoaded ? (
              <div className="text-center py-4">Loading...</div>
            ) : !isSignedIn ? (
              <div className="text-center py-4">
                <p className="mb-4">Please sign in to book a call consultation.</p>
                <SignInButton mode="modal">
                  <Button className="orange-gradient text-white hover:orange-gradient-hover px-6 py-2 text-md rounded-xl">
                    Sign In
                  </Button>
                </SignInButton>
              </div>
            ) : (
              <>
                {/* Step 1: Show consultation details and price */}
                {dialogStep === 1 && (
                  <div className="space-y-4">
                    <div className="bg-orange-50 p-4 rounded-xl border border-orange-200">
                      <h3 className="font-semibold text-orange-800 mb-2">Call Consultation Details</h3>
                      <ul className="text-sm text-orange-700 space-y-1">
                        <li>• Direct call with Consultant</li>
                        <li>• Accepts one DOB</li>
                        <li>• Personalized guidance</li>
                        <li>• Immediate connection after payment</li>
                      </ul>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-xl">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium">Consultation Fee:</span>
                        <div className="flex flex-col items-end">
                          <span className="text-sm text-gray-500 line-through">₹{ORIGINAL_FEE}</span>
                          <span className="text-2xl font-bold text-orange-600">₹{CONSULTATION_FEE}</span>
                        </div>
                      </div>
                      <div className="mt-2 text-xs text-green-600 font-medium text-center">
                        Special discount applied! Save ₹{ORIGINAL_FEE - CONSULTATION_FEE}
                      </div>
                      <Button 
                        onClick={() => setDialogStep(2)}
                        className="orange-gradient text-white hover:orange-gradient-hover w-full mt-4 py-3 text-lg rounded-xl"
                      >
                        Pay ₹{CONSULTATION_FEE} & Proceed to Call
                      </Button>
                    </div>
                  </div>
                )}

                {/* Step 2: Show QR code and the final call button */}
                {dialogStep === 2 && (
                    <div className="text-center space-y-4 animate-in fade-in-50">
                      <img 
                        src={UPI_QR_CODE_IMAGE_URL} 
                        alt="UPI Payment QR Code" 
                        className="w-48 h-48 mx-auto rounded-lg border p-1 bg-white"
                      />
                      <div className="font-bold text-3xl text-gray-800">
                        Pay ₹{CONSULTATION_FEE}
                      </div>
                      <p className="text-sm text-gray-500 px-4">
                        You can scan this QR to pay fee before connecting to our consultant.
                      </p>
                      <Button 
                        onClick={handleCallInitiation}
                        disabled={isCalling}
                        className="w-full py-3 text-lg rounded-xl bg-green-600 hover:bg-green-700 text-white flex items-center justify-center gap-2"
                      >
                        <Phone className="h-5 w-5" />
                        {isCalling ? "Connecting..." : `Call Now`}
                      </Button>
                    </div>
                )}
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CallConsultation;
