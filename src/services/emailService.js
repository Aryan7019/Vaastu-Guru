import emailjs from '@emailjs/browser';
import { toast } from '@/components/ui/use-toast';

const SERVICE_ID = 'service_cs2zlx7';
const TEMPLATE_ID_CONSULTATION = 'template_26pllzl';
const PUBLIC_KEY = 'MHJLn1TUuJZRK9NVz';

export const sendConsultationRequest = async ({ name, phone }) => {
  try {
    const templateParams = {
      to_email: 'Rishabhg101@gmail.com',
      from_name: 'NumaVaastu',
      name,
      phone,
      time: new Date().toLocaleString(),
    };

    await emailjs.send(SERVICE_ID, TEMPLATE_ID_CONSULTATION, templateParams, PUBLIC_KEY);
    
    toast({
      title: "Request Sent!",
      description: "Our team will contact you shortly.",
    });
    
    return true;
  } catch (error) {
    console.error('Failed to send email:', error);
    toast({
      title: "Error",
      description: "Could not send the request. Please try again later.",
      variant: "destructive",
    });
    return false;
  }
};