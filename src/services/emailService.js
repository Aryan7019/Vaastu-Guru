import emailjs from '@emailjs/browser';
import { toast } from '@/components/ui/use-toast';

const SERVICE_ID = 'service_cs2zlx7';
const TEMPLATE_ID_CONSULTATION = 'template_26pllzl';
const PUBLIC_KEY = 'MHJLn1TUuJZRK9NVz';

export const sendConsultationRequest = async (formData) => {
  try {
    const { name, phone, email, consultationType, preferredDate, timeSlot, concern } = formData;
    
    // Format the date nicely
    const formattedDate = new Date(preferredDate).toLocaleDateString('en-IN', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    const templateParams = {
      to_email: 'Rishabhg101@gmail.com',
      from_name: 'NumaVaastu',
      name: name,
      phone: phone,
      email: email,
      consultation_type: consultationType,
      preferred_date: formattedDate,
      time_slot: timeSlot,
      concern: concern,
      time: new Date().toLocaleString('en-IN'),
      // Combined message for email template
      message: `
📋 NEW CONSULTATION REQUEST

👤 Name: ${name}
📞 Phone: ${phone}
📧 Email: ${email}

🔮 Consultation Type: ${consultationType}
📅 Preferred Date: ${formattedDate}
⏰ Time Slot: ${timeSlot}

💬 Concern:
${concern}

---
Submitted on: ${new Date().toLocaleString('en-IN')}
      `.trim()
    };

    await emailjs.send(SERVICE_ID, TEMPLATE_ID_CONSULTATION, templateParams, PUBLIC_KEY);
    
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
