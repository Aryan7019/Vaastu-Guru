import emailjs from '@emailjs/browser';
import { toast } from '@/components/ui/use-toast';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';

// ✅ EmailJS credentials
const SERVICE_ID = 'service_cs2zlx7';
const TEMPLATE_ID_SIGNUP = 'template_rhyzirc';
const TEMPLATE_ID_CONSULTATION = 'template_26pllzl';
const PUBLIC_KEY = 'MHJLn1TUuJZRK9NVz';

/**
 * 🔄 Reusable EmailJS function
 */
const sendEmail = async (templateId, templateParams) => {
  try {
    await emailjs.send(SERVICE_ID, templateId, templateParams, PUBLIC_KEY);
    console.log('✅ Email sent successfully');
    return true;
  } catch (error) {
    console.error('❌ Failed to send email:', error);

    const errorMessage = error?.text || '';

    if (errorMessage.includes("template_id")) {
      toast({
        title: "EmailJS Error",
        description: "Invalid Template ID. Check your EmailJS template settings.",
        variant: "destructive",
      });
    } else if (errorMessage.includes("public_key")) {
      toast({
        title: "EmailJS Error",
        description: "Invalid Public Key. Check your EmailJS credentials.",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Email Sending Error",
        description: "Could not send the email. Please check your internet or EmailJS config.",
        variant: "destructive",
      });
    }

    return false;
  }
};

/**
 * 📩 Signup Notification Email
 */
export const sendSignupNotification = async ({ name, email, phone }) => {
  const templateParams = {
    to_email: 'Rishabhg101@gmail.com',
    from_name: 'Bhaggya Darshhan Website',
    name,
    email,
    mobile: phone,
  };

  return await sendEmail(TEMPLATE_ID_SIGNUP, templateParams);
};

/**
 * 📩 Consultation Request Email (Auto fetch user data)
 */
export const sendConsultationRequest = async () => {
  const auth = getAuth();
  const db = getFirestore();
  const user = auth.currentUser;

  if (!user) {
    toast({
      title: 'Authentication Required',
      description: 'You must be logged in to book a consultation.',
      variant: 'destructive',
    });
    return false;
  }

  try {
    const docRef = doc(db, 'users', user.uid);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      toast({
        title: 'User Data Missing',
        description: 'User record not found in Firestore.',
        variant: 'destructive',
      });
      return false;
    }

    const userData = docSnap.data();

    const templateParams = {
      to_email: 'Rishabhg101@gmail.com',
      from_name: 'Bhaggya Darshhan Website',
      name: userData.name || 'Unknown',
      email: userData.email || user.email,
      phone: userData.phone || 'Not provided',
      time: new Date().toLocaleString(),
      message: `The user wants to book a consultation.`,
    };

    return await sendEmail(TEMPLATE_ID_CONSULTATION, templateParams);

  } catch (err) {
    console.error('🔥 Firestore fetch error:', err);
    toast({
      title: 'Consultation Error',
      description: 'Could not fetch user data. Please try again later.',
      variant: 'destructive',
    });
    return false;
  }
};
