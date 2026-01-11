import { useState, useCallback, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/components/ui/use-toast';
import { sendConsultationRequest } from '@/services/emailService';

// Static data moved outside component
const CONSULTATION_TYPES = ['Numerology', 'Vaastu', 'Color Therapy', 'Pyramid Therapy'];
const TIME_SLOTS = ['Morning (9 AM - 12 PM)', 'Afternoon (12 PM - 4 PM)', 'Evening (4 PM - 8 PM)'];
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const ConsultationForm = ({ onSuccess }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    consultationType: '',
    preferredDate: '',
    timeSlot: '',
    concern: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  // Get today's date for min date
  const today = useMemo(() => new Date().toISOString().split('T')[0], []);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'phone' ? value.replace(/\D/g, '') : value
    }));
  }, []);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    
    // Validate all fields
    if (!formData.name || !formData.phone || !formData.email || 
        !formData.consultationType || !formData.preferredDate || 
        !formData.timeSlot || !formData.concern) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    if (formData.phone.length !== 10) {
      toast({
        title: "Invalid Phone",
        description: "Please enter a 10-digit phone number",
        variant: "destructive",
      });
      return;
    }

    if (!EMAIL_REGEX.test(formData.email)) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const success = await sendConsultationRequest(formData);
      if (success) {
        toast({
          title: "Success!",
          description: "Your consultation request has been submitted. We'll contact you soon!",
        });
        onSuccess?.();
      }
    } catch (error) {
      console.error("Submission Error:", error);
      toast({
        title: "Error",
        description: "Failed to submit request. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }, [formData, onSuccess]);

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-h-[70vh] overflow-y-auto pr-2">
      {/* Name */}
      <div className="space-y-1">
        <Label htmlFor="name" className="text-gray-700 font-medium text-sm">
          Name <span className="text-red-500">*</span>
        </Label>
        <Input
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter your full name"
          className="border-gray-300 focus:border-orange-500 focus:ring-orange-500 rounded-lg"
          required
        />
      </div>

      {/* Phone */}
      <div className="space-y-1">
        <Label htmlFor="phone" className="text-gray-700 font-medium text-sm">
          Phone Number <span className="text-red-500">*</span>
        </Label>
        <Input
          id="phone"
          name="phone"
          type="tel"
          value={formData.phone}
          onChange={handleChange}
          placeholder="10-digit mobile number"
          className="border-gray-300 focus:border-orange-500 focus:ring-orange-500 rounded-lg"
          maxLength={10}
          required
        />
      </div>

      {/* Email */}
      <div className="space-y-1">
        <Label htmlFor="email" className="text-gray-700 font-medium text-sm">
          Email <span className="text-red-500">*</span>
        </Label>
        <Input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="your@email.com"
          className="border-gray-300 focus:border-orange-500 focus:ring-orange-500 rounded-lg"
          required
        />
      </div>

      {/* Consultation Type */}
      <div className="space-y-1">
        <Label htmlFor="consultationType" className="text-gray-700 font-medium text-sm">
          Consultation Type <span className="text-red-500">*</span>
        </Label>
        <select
          id="consultationType"
          name="consultationType"
          value={formData.consultationType}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-orange-500 focus:ring-orange-500 focus:outline-none bg-white text-gray-700"
          required
        >
          <option value="">Select consultation type</option>
          {CONSULTATION_TYPES.map(type => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
      </div>

      {/* Preferred Date */}
      <div className="space-y-1">
        <Label htmlFor="preferredDate" className="text-gray-700 font-medium text-sm">
          Preferred Date <span className="text-red-500">*</span>
        </Label>
        <Input
          id="preferredDate"
          name="preferredDate"
          type="date"
          value={formData.preferredDate}
          onChange={handleChange}
          min={today}
          className="border-gray-300 focus:border-orange-500 focus:ring-orange-500 rounded-lg"
          required
        />
      </div>

      {/* Time Slot */}
      <div className="space-y-1">
        <Label htmlFor="timeSlot" className="text-gray-700 font-medium text-sm">
          Preferred Time Slot <span className="text-red-500">*</span>
        </Label>
        <select
          id="timeSlot"
          name="timeSlot"
          value={formData.timeSlot}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-orange-500 focus:ring-orange-500 focus:outline-none bg-white text-gray-700"
          required
        >
          <option value="">Select time slot</option>
          {TIME_SLOTS.map(slot => (
            <option key={slot} value={slot}>{slot}</option>
          ))}
        </select>
      </div>

      {/* Concern */}
      <div className="space-y-1">
        <Label htmlFor="concern" className="text-gray-700 font-medium text-sm">
          Brief Description of Concern <span className="text-red-500">*</span>
        </Label>
        <textarea
          id="concern"
          name="concern"
          value={formData.concern}
          onChange={handleChange}
          placeholder="Briefly describe what you'd like to discuss..."
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-orange-500 focus:ring-orange-500 focus:outline-none resize-none min-h-[80px] bg-white text-gray-700"
          required
        />
      </div>

      {/* Submit Button */}
      <div className="pt-2">
        <Button
          type="submit"
          className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-medium py-3 px-6 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg"
          disabled={isLoading}
        >
          {isLoading ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Submitting...
            </span>
          ) : (
            "Submit Request"
          )}
        </Button>
      </div>
    </form>
  );
};
