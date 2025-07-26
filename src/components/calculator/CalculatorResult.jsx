import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ConsultationForm } from "@/components/ConsultationForm";
import { Dialog, DialogContent, DialogTrigger, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

const personalityCombinations = [
  // 1.x Combinations
  {
    numbers: [1, 1],
    description: "Your strong leadership drives bold new ideas with complete independence. While your natural power inspires others, being selfish may push teammates away. Use your commanding presence to work with others, balancing strong direction with including everyone in decisions to make the biggest impact."
  },
  {
    numbers: [1, 2],
    description: "You mix firm leadership with amazing sensitivity and creative new ideas. Your emotional ups and downs can weaken your strong presence, creating unsteady team relationships. Use your pioneering spirit alongside your caring insights to create breakthrough solutions while giving steady, reliable guidance."
  },
  {
    numbers: [1, 3],
    description: "Your confident leadership shines through creative knowledge sharing and new thinking. However, selfish attitudes mixed with intellectual showing-off may keep others away from your vision. Turn your natural authority and sharp mind into inspiring teaching that lifts everyone around you."
  },
  {
    numbers: [1, 4],
    description: "You lead with practical steadiness, building reliable systems through disciplined hard work. While your step-by-step approach gets results, selfish decisions and overconfident thinking can create rigid structures. Balance your natural authority with team input to create flexible, lasting solutions."
  },
  {
    numbers: [1, 5],
    description: "Your energetic leadership thrives on change, mixing authority with excellent communication skills. Selfish impulses and lazy communication may weaken your ability to influence others. Channel your pioneering energy and flexible nature into long-term projects that inspire lasting change."
  },
  {
    numbers: [1, 6],
    description: "You lead with caring authority, creating nurturing environments through kind guidance. While naturally protective, selfish tendencies and love of luxury may hurt your supportive intentions. Balance your leadership strength with genuine service to build peaceful, lasting communities."
  },
  {
    numbers: [1, 7],
    description: "Your thoughtful leadership combines spiritual depth with analytical decision-making. Selfish reasons can clash with your natural wisdom, creating inner confusion about your true direction. Combine your strong presence with deep insights to guide others with real, meaningful vision."
  },
  {
    numbers: [1, 8],
    description: "You lead with disciplined authority, creating highly organized systems through determined focus. While impressively structured, selfish goals and stubborn rigidity may limit team potential. Channel your natural leadership and systematic approach into flexible frameworks that empower others."
  },
  {
    numbers: [1, 9],
    description: "Your humanitarian leadership combines caring authority with kind wisdom. Though naturally generous, selfish impulses can trigger frustrating anger when others don't meet your idealistic expectations. Transform your influential presence and caring nature into patient support for meaningful change."
  },

  // 2.x Combinations
  {
    numbers: [2, 1],
    description: "Your sensitive leadership blends gut feelings with pioneering determination. Emotional ups and downs can weaken your natural authority, creating unpredictable team relationships. Balance your caring understanding with steady direction to create new solutions that honor both feelings and results."
  },
  {
    numbers: [2, 2],
    description: "Your exceptional sensitivity creates deep gut connections with profound creative potential. However, intense mood swings may overwhelm your natural empathy, making relationships unpredictable. Build emotional stability to use your remarkable intuitive gifts for consistent, meaningful impact."
  },
  {
    numbers: [2, 3],
    description: "You combine emotional sensitivity with intellectual knowledge, creating creative understanding through gut-feeling learning. Mood swings paired with intellectual showing-off can create confusing communication patterns. Channel your caring insights and sharp mind into humble teaching that connects hearts and minds."
  },
  {
    numbers: [2, 4],
    description: "Your gut sensitivity builds stable systems through emotionally-aware organization. While naturally disciplined, mood swings and overconfident thinking may destabilize your otherwise reliable approach. Combine your caring understanding with practical stability for lasting, caring solutions."
  },
  {
    numbers: [2, 5],
    description: "Your sensitive communication blends emotional intuition with adaptable creativity. Mood swings combined with lazy communication can create inconsistent relationship patterns. Transform your natural empathy and flexible nature into sustained, real connections that inspire mutual growth."
  },
  {
    numbers: [2, 6],
    description: "You nurture others through sensitive caring, combining gut understanding with kind support. While naturally loving, mood swings and luxury tendencies may create emotionally unstable giving patterns. Channel your caring gifts and nurturing nature into consistent, sustainable support."
  },
  {
    numbers: [2, 7],
    description: "Your spiritual sensitivity combines gut wisdom with profound analytical depth. Emotional mood swings can conflict with your natural thinking clarity, creating confusing inner guidance. Combine your caring insights with spiritual understanding for real, grounded wisdom."
  },
  {
    numbers: [2, 8],
    description: "You organize with gut sensitivity, creating emotionally-aware systems through disciplined empathy. Mood swings paired with stubborn tendencies can create rigid emotional structures. Balance your natural understanding with systematic approaches that honor both feelings and efficiency."
  },
  {
    numbers: [2, 9],
    description: "Your caring sensitivity extends humanitarian care through gut kindness. While naturally generous, mood swings and angry reactions to unfairness can overwhelm your caring intentions. Transform your caring gifts and creative spirit into patient, sustained support."
  },

  // 3.x Combinations
  {
    numbers: [3, 1],
    description: "Your intellectual leadership combines creative knowledge with pioneering creativity. While naturally authoritative, showing-off paired with selfish tendencies may push away potential partners. Channel your sharp mind and natural leadership into humble teaching that inspires group growth."
  },
  {
    numbers: [3, 2],
    description: "You blend intellectual creativity with sensitive intuition, creating emotionally-smart understanding. Knowledge-based showing-off can clash with natural empathy, creating confusing communication patterns. Combine your analytical gifts with emotional wisdom for real, accessible teaching."
  },
  {
    numbers: [3, 3],
    description: "Your exceptional knowledge creates creative solutions through intellectual creativity and sharp analysis. However, widespread showing-off may limit your teaching effectiveness and team potential. Transform your brilliant mind into humble wisdom-sharing that lifts others rather than intimidating them."
  },
  {
    numbers: [3, 4],
    description: "You build stable knowledge systems through practical creativity and disciplined learning. While intellectually reliable, showing-off combined with overconfident thinking can create inflexible educational approaches. Balance your analytical gifts with humble curiosity for continuous growth."
  },
  {
    numbers: [3, 5],
    description: "Your communicative knowledge spreads creative ideas through adaptable teaching and intellectual flexibility. Showing-off paired with lazy communication may limit your educational impact. Channel your brilliant mind and natural adaptability into sustained, engaging knowledge-sharing."
  },
  {
    numbers: [3, 6],
    description: "You share knowledge through caring creativity, combining intellectual gifts with nurturing support. While naturally helpful, showing-off and luxury tendencies may create condescending help patterns. Transform your analytical abilities and caring nature into humble, accessible guidance."
  },
  {
    numbers: [3, 7],
    description: "Your spiritual knowledge combines creative thinking with profound analytical depth. Intellectual showing-off can conflict with natural wisdom, creating confusing inner guidance about your own understanding. Combine your brilliant mind with thinking humility for real insight."
  },
  {
    numbers: [3, 8],
    description: "You organize knowledge through disciplined creativity, creating systematic learning approaches. Showing-off paired with stubborn rigidity can create inflexible educational systems. Balance your intellectual gifts with structured humility that welcomes different perspectives."
  },
  {
    numbers: [3, 9],
    description: "Your humanitarian knowledge serves others through creative teaching and caring wisdom-sharing. While naturally generous with insights, showing-off and angry reactions to ignorance may limit your educational impact. Channel your brilliant mind and kind heart into patient support."
  },

  // 4.x Combinations
  {
    numbers: [4, 1],
    description: "Your stable leadership builds reliable systems through disciplined authority and practical determination. While naturally commanding, overconfidence paired with selfish decisions may create inflexible structures. Channel your organizational strength and leadership presence into team-based, adaptable frameworks."
  },
  {
    numbers: [4, 2],
    description: "You create emotionally-stable systems through gut organization and sensitive discipline. Overconfident thinking can clash with natural empathy, creating rigid emotional structures. Combine your practical reliability with gut understanding for flexible, caring solutions."
  },
  {
    numbers: [4, 3],
    description: "Your practical knowledge builds creative systems through disciplined learning and stable creativity. Overconfidence combined with intellectual showing-off can create inflexible educational approaches. Balance your organizational gifts with humble curiosity for continuous improvement."
  },
  {
    numbers: [4, 4],
    description: "Your exceptional stability creates reliable systems through disciplined organization and unwavering determination. However, widespread overconfidence may limit flexibility and team input. Transform your natural reliability into flexible frameworks that welcome growth and change."
  },
  {
    numbers: [4, 5],
    description: "You implement adaptable systems through stable communication and disciplined flexibility. Overconfidence paired with lazy communication can create rigid interaction patterns. Channel your organizational strength and natural adaptability into sustained, engaging teamwork."
  },
  {
    numbers: [4, 6],
    description: "Your caring stability provides reliable support through disciplined nurturing and organized kindness. While naturally dependable, overconfidence and luxury tendencies may create rigid help patterns. Balance your practical care with flexible responsiveness to others' needs."
  },
  {
    numbers: [4, 7],
    description: "You build thinking systems through stable spirituality and disciplined wisdom. Overconfident thinking can conflict with natural depth, creating confusing inner guidance about your methodical approach. Combine practical organization with spiritual openness."
  },
  {
    numbers: [4, 8],
    description: "Your disciplined stability creates highly organized systems through methodical determination. While impressively structured, overconfidence paired with stubborn rigidity may limit team flexibility. Channel your systematic gifts into frameworks that empower others."
  },
  {
    numbers: [4, 9],
    description: "Your humanitarian stability provides reliable caring service through disciplined kindness. While naturally dependable, overconfidence and angry reactions to inefficiency may hurt your supportive intentions. Transform your organizational gifts and caring nature into patient help."
  },

  // 5.x Combinations
  {
    numbers: [5, 1],
    description: "Your communicative leadership adapts quickly through flexible authority and creative determination. While naturally influential, laziness paired with selfish tendencies may weaken your team potential. Channel your dynamic energy and leadership presence into sustained, inclusive projects."
  },
  {
    numbers: [5, 2],
    description: "You communicate with sensitive adaptability, combining gut flexibility with emotionally-aware creativity. Lazy communication can clash with natural empathy, creating inconsistent relationship patterns. Combine your adaptive gifts with emotional consistency for real, sustained connections."
  },
  {
    numbers: [5, 3],
    description: "Your creative communication spreads knowledge through adaptable teaching and flexible creativity. Laziness combined with intellectual showing-off can limit your educational engagement. Transform your natural adaptability and sharp mind into consistent, humble knowledge-sharing."
  },
  {
    numbers: [5, 4],
    description: "You adapt stable systems through communicative discipline and flexible organization. Laziness paired with overconfident thinking can create inconsistent implementation patterns. Balance your natural adaptability with disciplined follow-through for reliable results."
  },
  {
    numbers: [5, 5],
    description: "Your exceptional communication creates adaptable connections through flexible creativity and dynamic engagement. However, widespread laziness may limit your team effectiveness and sustained impact. Transform your natural versatility into focused, consistent relationship-building."
  },
  {
    numbers: [5, 6],
    description: "Your caring communication nurtures others through adaptable support and flexible kindness. While naturally responsive, laziness and luxury tendencies may create inconsistent help patterns. Channel your communication gifts and caring nature into sustained, reliable support."
  },
  {
    numbers: [5, 7],
    description: "You explore spiritual communication through adaptable wisdom and flexible thinking. Lazy communication can conflict with natural depth, creating confusing inner guidance about your exploratory approach. Combine dynamic learning with focused spiritual practice."
  },
  {
    numbers: [5, 8],
    description: "Your systematic communication implements adaptable organization through flexible discipline. Laziness paired with stubborn tendencies can create inconsistent structural approaches. Balance your natural adaptability with systematic consistency for effective results."
  },
  {
    numbers: [5, 9],
    description: "Your humanitarian communication serves others through adaptable kindness and flexible caring. While naturally generous, laziness and angry reactions to inefficiency may limit your service effectiveness. Transform your communication gifts and caring nature into patient support."
  },

  // 6.x Combinations
  {
    numbers: [6, 1],
    description: "Your caring leadership creates nurturing authority through kind determination and protective guidance. While naturally supportive, luxury indulgences paired with selfish tendencies may hurt your service intentions. Channel your leadership strength and caring nature into humble community building."
  },
  {
    numbers: [6, 2],
    description: "You nurture with sensitive caring, combining gut kindness with emotionally-responsive support. Luxury tendencies can clash with natural empathy, creating inconsistent giving patterns. Combine your caring gifts with emotional stability for sustainable, real help."
  },
  {
    numbers: [6, 3],
    description: "Your knowledgeable caring supports others through creative kindness and creative nurturing. Luxury indulgences combined with intellectual showing-off can create condescending help patterns. Transform your caring nature and analytical gifts into humble, accessible support."
  },
  {
    numbers: [6, 4],
    description: "You provide stable caring through disciplined kindness and organized nurturing. Luxury tendencies paired with overconfident thinking can create rigid help patterns. Balance your natural care with practical flexibility that honors others' independence."
  },
  {
    numbers: [6, 5],
    description: "Your adaptable caring nurtures others through flexible kindness and communicative support. Luxury indulgences paired with lazy communication can create inconsistent relationship patterns. Channel your caring gifts and natural adaptability into sustained, engaged help."
  },
  {
    numbers: [6, 6],
    description: "Your exceptional caring creates nurturing environments through kind support and generous love. However, widespread luxury indulgences may hurt the realness of your help. Transform your natural generosity into sustainable, humble service that truly empowers others."
  },
  {
    numbers: [6, 7],
    description: "You provide thinking caring through spiritual kindness and wise nurturing. Luxury tendencies can conflict with natural wisdom, creating confusing inner guidance about your supportive approach. Combine caring presence with spiritual realness."
  },
  {
    numbers: [6, 8],
    description: "Your systematic caring provides organized support through disciplined kindness. Luxury indulgences paired with stubborn rigidity can create inflexible help patterns. Balance your natural care with structured flexibility that respects others' needs."
  },
  {
    numbers: [6, 9],
    description: "Your humanitarian caring extends kind service through nurturing caring. While naturally generous, luxury tendencies and angry reactions to suffering may limit your service effectiveness. Transform your caring gifts and humanitarian spirit into patient, sustainable help."
  },

  // 7.x Combinations
  {
    numbers: [7, 1],
    description: "Your spiritual leadership combines thinking authority with profound determination. While naturally wise, inner confusion paired with selfish tendencies may weaken your guidance effectiveness. Channel your spiritual depth and leadership presence into clear, real direction."
  },
  {
    numbers: [7, 2],
    description: "You provide gut spirituality through sensitive thinking and emotionally-aware wisdom. Confusion about your own decisions can clash with natural empathy, creating uncertain guidance patterns. Combine your spiritual gifts with emotional clarity for real insight."
  },
  {
    numbers: [7, 3],
    description: "Your analytical spirituality combines profound knowledge with thinking creativity. Inner confusion combined with intellectual showing-off can create contradictory wisdom-sharing. Transform your spiritual depth and analytical gifts into humble, clear guidance."
  },
  {
    numbers: [7, 4],
    description: "You build thinking systems through spiritual discipline and organized wisdom. Confusion about your own decisions paired with overconfident thinking can create inconsistent guidance patterns. Balance your natural depth with practical clarity for reliable insight."
  },
  {
    numbers: [7, 5],
    description: "Your adaptable spirituality explores wisdom through flexible thinking and communicative depth. Inner confusion paired with lazy communication can create inconsistent spiritual guidance. Channel your thinking gifts and natural adaptability into sustained spiritual practice."
  },
  {
    numbers: [7, 6],
    description: "You provide caring spirituality through kind thinking and nurturing wisdom. Confusion about your own decisions and luxury tendencies may create uncertain help patterns. Combine your spiritual depth with caring consistency for real support."
  },
  {
    numbers: [7, 7],
    description: "Your exceptional spirituality creates profound thinking through deep wisdom and analytical insight. However, widespread confusion about your own decisions may limit your guidance effectiveness. Transform your natural depth into clear, practical spiritual direction."
  },
  {
    numbers: [7, 8],
    description: "Your systematic spirituality provides organized thinking through disciplined wisdom. Inner confusion paired with stubborn rigidity can create contradictory spiritual approaches. Balance your thinking gifts with structured clarity for consistent guidance."
  },
  {
    numbers: [7, 9],
    description: "Your humanitarian spirituality serves others through kind thinking and wise caring. While naturally profound, confusion about your own decisions and angry reactions to suffering may limit your spiritual service. Transform your thinking gifts into patient guidance."
  },

  // 8.x Combinations
  {
    numbers: [8, 1],
    description: "Your disciplined leadership creates systematic authority through organized determination. While naturally commanding, stubborn rigidity paired with selfish tendencies may limit team potential. Channel your systematic strength and leadership presence into flexible, inclusive frameworks."
  },
  {
    numbers: [8, 2],
    description: "You organize with sensitive discipline, combining gut systems with emotionally-aware structure. Stubborn approaches can clash with natural empathy, creating rigid emotional frameworks. Combine your systematic gifts with emotional flexibility for caring, effective organization."
  },
  {
    numbers: [8, 3],
    description: "Your systematic knowledge creates organized learning through disciplined creativity. Stubborn rigidity combined with intellectual showing-off can create inflexible educational approaches. Transform your systematic gifts and analytical abilities into humble, accessible knowledge-sharing."
  },
  {
    numbers: [8, 4],
    description: "You build disciplined systems through organized stability and methodical determination. While impressively structured, stubborn rigidity paired with overconfident thinking may limit adaptability. Balance your systematic strength with flexible responsiveness to changing needs."
  },
  {
    numbers: [8, 5],
    description: "Your adaptive systems implement organized flexibility through disciplined communication. Stubborn approaches paired with lazy communication can create rigid interaction patterns. Channel your systematic gifts and natural adaptability into sustained, engaging teamwork."
  },
  {
    numbers: [8, 6],
    description: "You provide systematic caring through organized kindness and disciplined support. Stubborn rigidity and luxury tendencies may create inflexible help patterns. Balance your systematic approach with caring flexibility that honors others' unique needs."
  },
  {
    numbers: [8, 7],
    description: "Your thinking systems combine organized spirituality with disciplined wisdom. Stubborn rigidity can conflict with natural depth, creating contradictory inner guidance. Combine systematic structure with spiritual openness for real, practical wisdom."
  },
  {
    numbers: [8, 8],
    description: "Your exceptional discipline creates highly organized systems through systematic determination. However, widespread stubborn rigidity may limit team input and adaptive potential. Transform your natural organization into flexible frameworks that empower others."
  },
  {
    numbers: [8, 9],
    description: "Your humanitarian discipline provides organized caring service through systematic kindness. While naturally structured, stubborn approaches and angry reactions to inefficiency may hurt your help effectiveness. Transform your systematic gifts into patient, flexible service."
  },

  // 9.x Combinations
  {
    numbers: [9, 1],
    description: "Your humanitarian leadership champions caring causes through kind authority and determined service. While naturally generous, angry reactions paired with selfish tendencies may weaken your support effectiveness. Channel your humanitarian spirit and leadership presence into patient, sustainable change."
  },
  {
    numbers: [9, 2],
    description: "You serve with sensitive kindness, combining gut caring with emotionally-aware humanity. Angry reactions can clash with natural empathy, creating inconsistent service patterns. Combine your humanitarian gifts with emotional stability for sustained, real help."
  },
  {
    numbers: [9, 3],
    description: "Your knowledgeable kindness serves others through creative caring and creative humanity. Angry reactions combined with intellectual showing-off can create condescending service patterns. Transform your humanitarian spirit and analytical gifts into humble, accessible support."
  },
  {
    numbers: [9, 4],
    description: "You provide stable kindness through disciplined caring and organized humanity. Angry reactions paired with overconfident thinking can create rigid service patterns. Balance your humanitarian gifts with practical flexibility that honors others' dignity."
  },
  {
    numbers: [9, 5],
    description: "Your adaptable kindness serves others through flexible caring and communicative humanity. Angry reactions paired with lazy communication can create inconsistent support patterns. Channel your humanitarian spirit and natural adaptability into sustained, engaged service."
  },
  {
    numbers: [9, 6],
    description: "You provide caring kindness through nurturing caring and supportive humanity. Angry reactions and luxury tendencies may create inconsistent help patterns. Combine your humanitarian gifts with caring consistency for real, sustainable support."
  },
  {
    numbers: [9, 7],
    description: "Your spiritual kindness serves others through thinking caring and wise humanity. Angry reactions can conflict with natural wisdom, creating confusing inner guidance about your service approach. Transform your humanitarian depth into patient, clear support."
  },
  {
    numbers: [9, 8],
    description: "Your systematic kindness provides organized humanitarian service through disciplined caring. Angry reactions paired with stubborn rigidity can create inflexible service approaches. Balance your humanitarian gifts with structured flexibility that respects others' independence."
  },
  {
    numbers: [9, 9],
    description: "Your exceptional kindness creates universal humanitarian service through profound caring. However, widespread angry reactions to unfairness may limit your support effectiveness and personal wellbeing. Transform your natural generosity into patient, sustainable service that creates lasting change."
  }
];

const LETTER_VALUES = {
  'A': 1, 'B': 2, 'C': 3, 'D': 4, 'E': 5, 'F': 8,
  'G': 3, 'H': 5, 'I': 1, 'J': 1, 'K': 2, 'L': 3,
  'M': 4, 'N': 5, 'O': 7, 'P': 8, 'Q': 1, 'R': 2,
  'S': 3, 'T': 4, 'U': 6, 'V': 6, 'W': 6, 'X': 5,
  'Y': 1, 'Z': 7
};

const NAME_COMPATIBILITY_RULES = {
  1: { compatible: [1,2,3,4,5,6,7,9], description: "1 works best with 8" },
  2: { compatible: [], description: "2 doesn't have compatible numbers" },
  3: { compatible: [], description: "3 doesn't have compatible numbers" },
  4: { compatible: [], description: "4 doesn't have compatible numbers" },
  5: { compatible: [1,2,3,4,5,6,7,8,9], description: "5 works with all numbers" },
  6: { compatible: [1,2,4,5,6,7,8], description: "6 works best with 3 and 9" },
  7: { compatible: [], description: "7 doesn't have compatible numbers" },
  8: { compatible: [], description: "8 doesn't have compatible numbers" },
  9: { compatible: [], description: "9 doesn't have compatible numbers" },
  16: { compatible: [1,2,3,4,5,6,7,8,9], description: "16 works with all numbers" },
  22: { compatible: [1,3,5,6,7], description: "22 works best with 2, 4, 8, and 9" },
  25: { compatible: [1,2,3,4,5,6,7,8,9], description: "25 works with all numbers" }
};

const sumToSingleDigit = (num) => {
  while (num > 9) {
    num = num.toString().split('').reduce((sum, d) => sum + parseInt(d), 0);
  }
  return num;
};

const calculateNameValue = (name) => {
  if (!name) return 0;
  
  let sum = 0;
  for (const char of name.toUpperCase()) {
    if (LETTER_VALUES[char]) {
      sum += LETTER_VALUES[char];
    }
  }
  
  return sum;
};

const checkNameCompatibility = (nameValue, firstNum) => {
  const reducedNameValue = sumToSingleDigit(nameValue);
  const compatibilityRule = NAME_COMPATIBILITY_RULES[reducedNameValue] || 
    { compatible: [], description: `No specific compatibility rules for ${reducedNameValue}` };
  
  const isCompatible = compatibilityRule.compatible.length === 0 ? 
    false : compatibilityRule.compatible.includes(firstNum);
  
  return {
    compatible: isCompatible,
    nameValue: reducedNameValue,
    description: isCompatible ? 
      `Your name number ${reducedNameValue} is compatible with your birth number ${firstNum}!` :
      `Your name number ${reducedNameValue} is not compatible with your birth number ${firstNum}. ${compatibilityRule.description}`
  };
};

const calculateNumbers = (birthDate) => {
  if (!birthDate) return { firstNum: 0, secondNum: 0 };

  try {
    const [year, month, day] = birthDate.split('-').map(Number);
    let firstNum = sumToSingleDigit(day);
    const allDigits = birthDate.replace(/\D/g, '').split('').map(Number);
    let secondNum = sumToSingleDigit(allDigits.reduce((sum, d) => sum + d, 0));

    return { 
      firstNum: Math.max(1, Math.min(9, firstNum)),
      secondNum: Math.max(1, Math.min(9, secondNum))
    };
  } catch (error) {
    console.error('Calculation error:', error);
    return { firstNum: 0, secondNum: 0 };
  }
};

const getPersonalityDescription = (firstNum, secondNum) => {
  try {
    const exactMatch = personalityCombinations.find(
      c => c.numbers[0] === firstNum && c.numbers[1] === secondNum
    );
    
    if (exactMatch) return exactMatch.description;
    
    const firstNumMatch = personalityCombinations.find(
      c => c.numbers[0] === firstNum
    );
    
    const secondNumMatch = personalityCombinations.find(
      c => c.numbers[1] === secondNum
    );
    
    if (firstNumMatch && secondNumMatch) {
      return `${firstNumMatch.description.split('. ')[0]}. ${secondNumMatch.description.split('. ')[1]}. This unique combination blends these qualities in ways that make you truly distinctive.`;
    }
    
    return "Your unique numerical combination reveals special qualities that make you wonderfully distinctive. This rare blend suggests you have an unconventional path with valuable lessons to both learn and teach.";
  } catch (error) {
    console.error('Description error:', error);
    return "We're unable to generate your personality profile at this time. Please try again later.";
  }
};

const formatDescription = (text) => {
  if (!text) return null;

  const sentences = text.split('. ').filter(s => s.trim().length > 0);
  const positivePoints = [];
  const negativePoints = [];
  
  sentences.forEach(sentence => {
    const isNegative = /(challenge|avoid|beware|caution|tendency|risk|difficulty|may|however|while)/i.test(sentence);
    if (isNegative && negativePoints.length < 2) {
      negativePoints.push(sentence);
    } else if (!isNegative && positivePoints.length < 2) {
      positivePoints.push(sentence);
    }
  });

  const points = [...positivePoints, ...negativePoints].slice(0, 4);

  return (
    <ul className="list-disc pl-5 space-y-2">
      {points.map((point, index) => (
        <li key={index} className="text-gray-700">
          {point.replace(/^(however|while|though)\s+/i, '').replace(/\.$/, '')}
        </li>
      ))}
    </ul>
  );
};

const CalculatorResult = ({ formData = {}, onReset = () => {} }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isNameCorrectionDialogOpen, setIsNameCorrectionDialogOpen] = useState(false);
  
  const { firstNum, secondNum } = calculateNumbers(formData?.birthDate);
  const personalityDescription = getPersonalityDescription(firstNum, secondNum);
  const nameValue = calculateNameValue(formData?.name);
  const nameCompatibility = checkNameCompatibility(nameValue, firstNum);

  if (!formData?.birthDate) {
    return (
      <div className="text-center p-8 bg-white rounded-lg shadow-md">
        <h3 className="text-xl font-semibold text-red-500 mb-4">
          Birth Date Required
        </h3>
        <Button 
          onClick={onReset}
          className="bg-orange-500 hover:bg-orange-600 text-white"
        >
          Enter Birth Date
        </Button>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6 max-w-3xl mx-auto"
    >
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-2xl font-bold text-center text-orange-600 mb-3">
          Your Numerology Profile
        </h2>
        
        <div className="text-center mb-4">
          <p className="text-gray-600">
            For: <span className="font-medium text-orange-600">{formData?.name || 'Unknown'}</span>
          </p>
          <p className="text-gray-600">
            Born: <span className="font-medium text-orange-600">
              {new Date(formData.birthDate).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </span>
          </p>
        </div>

        {formData?.name && (
  <div className={`flex items-center justify-center mb-2 ${
    nameCompatibility.compatible ? 'text-green-600' : 'text-red-600'
  }`}>
    <span className="text-xl mr-2">
      {nameCompatibility.compatible ? '✓' : '✗'}
    </span>
    <span className="font-medium">
      {nameCompatibility.compatible 
        ? "Your name value is compatible with you" 
        : "Your name value is not compatible with you"}
    </span>
  </div>
)}

{formData?.name && !nameCompatibility.compatible && (
  <div className="text-center mb-4">
    <Dialog>
      <DialogTrigger asChild>
        <Button 
          variant="outline" 
          className="bg-orange-500 hover:bg-orange-600 text-white hover:orange-gradient-hover transition-transform duration-300 ease-in-out hover:scale-105"
        >
          Book Consultation for Name Correction
        </Button>
      </DialogTrigger>
      <DialogContent className="rounded-lg max-w-[90vw] sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-orange-600">
            Name Correction Consultation
          </DialogTitle>
          <DialogDescription className="text-orange-500">
            Our experts will analyze your name and suggest improvements for better compatibility
          </DialogDescription>
        </DialogHeader>
        <ConsultationForm 
          onSuccess={() => setIsDialogOpen(false)}
          defaultName={formData?.name || ''}
          defaultBirthDate={formData?.birthDate || ''}
          isNameCorrection={true}
        />
      </DialogContent>
    </Dialog>
  </div>
)}
        
        <div className="bg-orange-50 rounded-lg p-5 border border-orange-100">
          <h3 className="font-semibold text-lg mb-3 text-orange-600">Key Traits:</h3>
          {formatDescription(personalityDescription)}
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="bg-white rounded-xl shadow-md p-6"
      >
        <h3 className="text-xl font-semibold text-center text-orange-600 mb-3">
          Want Deeper Insights?
        </h3>
        
        <div className="flex flex-wrap justify-center gap-3">
          <Button
            onClick={onReset}
            variant="outline"
            className="border-orange-500 text-orange-500 hover:bg-orange-50"
          >
            New Analysis
          </Button>
          
          <Button 
            className="bg-orange-500 hover:bg-orange-600 text-white hover:orange-gradient-hover transition-transform duration-300 ease-in-out hover:scale-105"
            onClick={() => setIsDialogOpen(true)}
          >
            Full Report
          </Button>
        </div>
      </motion.div>

      {/* Full Report Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="rounded-lg max-w-[90vw] sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-orange-600">
              Complete Numerology Reading
            </DialogTitle>
            <DialogDescription className="text-orange-500">
              Includes detailed analysis of your core numbers and cycles
            </DialogDescription>
          </DialogHeader>
          <ConsultationForm 
            onSuccess={() => setIsDialogOpen(false)}
            defaultName={formData?.name || ''}
            defaultBirthDate={formData?.birthDate || ''}
          />
        </DialogContent>
      </Dialog>

      {/* Name Correction Dialog */}
      <Dialog open={isNameCorrectionDialogOpen} onOpenChange={setIsNameCorrectionDialogOpen}>
        <DialogContent className="rounded-lg max-w-[90vw] sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-orange-600">
              Name Correction Consultation
            </DialogTitle>
            <DialogDescription className="text-orange-500">
              Our experts will analyze your name and suggest improvements for better compatibility
            </DialogDescription>
          </DialogHeader>
          <ConsultationForm 
            onSuccess={() => setIsNameCorrectionDialogOpen(false)}
            defaultName={formData?.name || ''}
            defaultBirthDate={formData?.birthDate || ''}
            isNameCorrection={true}
          />
        </DialogContent>
      </Dialog>
    </motion.div>
  );
};

export default CalculatorResult;