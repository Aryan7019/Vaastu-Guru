import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ConsultationForm } from "@/components/ConsultationForm";
import { Dialog, DialogContent, DialogTrigger, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

const personalityCombinations = [
  // 1.x Combinations
  {
    numbers: [1, 1],
    traits: [
      "You naturally take charge and lead others",
      "People look up to you for guidance",
      "You sometimes focus too much on your own needs",
      "You can get upset when things don't go your way"
    ]
  },
  {
    numbers: [1, 2],
    traits: [
      "You're good at taking the lead in groups",
      "You understand people's feelings easily",
      "You sometimes put yourself first too much",
      "Your mood changes can affect people around you"
    ]
  },
  {
    numbers: [1, 3],
    traits: [
      "You're a natural leader in learning situations",
      "You pick up new knowledge very quickly",
      "You sometimes focus too much on your own way",
      "You can act like you know more than others"
    ]
  },
  {
    numbers: [1, 4],
    traits: [
      "You lead with steady and reliable methods",
      "You bring calmness to stressful situations",
      "You sometimes insist on your own methods too much",
      "You might trust your ways more than you should"
    ]
  },
  {
    numbers: [1, 5],
    traits: [
      "You lead through good communication",
      "You connect well with all kinds of people",
      "You sometimes focus on your needs first",
      "You avoid hard work when possible"
    ]
  },
  {
    numbers: [1, 6],
    traits: [
      "You lead with care for others",
      "You naturally look after people's needs",
      "You sometimes think of yourself first",
      "You really like nice and expensive things"
    ]
  },
  {
    numbers: [1, 7],
    traits: [
      "You lead with deep thinking",
      "You look for meaning in everything",
      "You sometimes focus on your own path too much",
      "You get unsure about your choices"
    ]
  },
  {
    numbers: [1, 8],
    traits: [
      "You lead with strong organization",
      "You keep things neat and in order",
      "You sometimes insist on your own way",
      "You don't like changing your methods"
    ]
  },
  {
    numbers: [1, 9],
    traits: [
      "You lead with kindness to all",
      "You care about fairness for everyone",
      "You sometimes think of yourself first",
      "You get mad when things seem unfair"
    ]
  },

  // 2.x Combinations
  {
    numbers: [2, 1],
    traits: [
      "You sense people's feelings well",
      "You can take charge when needed",
      "Your moods change often",
      "You sometimes focus on your needs first"
    ]
  },
  {
    numbers: [2, 2],
    traits: [
      "You're very good at understanding feelings",
      "You know what people need without words",
      "Your emotions go up and down a lot",
      "Your mood can change very quickly"
    ]
  },
  {
    numbers: [2, 3],
    traits: [
      "You feel what others are feeling",
      "You learn new things easily",
      "Your emotions change often",
      "You can act like you know more than others"
    ]
  },
  {
    numbers: [2, 4],
    traits: [
      "You sense people's needs deeply",
      "You bring calm to any situation",
      "Your feelings change often",
      "You might trust your ways too much"
    ]
  },
  {
    numbers: [2, 5],
    traits: [
      "You understand people's emotions",
      "You talk well with everyone",
      "Your moods go up and down",
      "You avoid hard work sometimes"
    ]
  },
  {
    numbers: [2, 6],
    traits: [
      "You feel others' needs strongly",
      "You take good care of people",
      "Your emotions change often",
      "You really enjoy fancy things"
    ]
  },
  {
    numbers: [2, 7],
    traits: [
      "You sense deeper meanings easily",
      "You think about life's big questions",
      "Your feelings change a lot",
      "You get confused about choices"
    ]
  },
  {
    numbers: [2, 8],
    traits: [
      "You understand people's emotions",
      "You keep things well organized",
      "Your moods change often",
      "You don't like changing your ways"
    ]
  },
  {
    numbers: [2, 9],
    traits: [
      "You feel others' pain deeply",
      "You care about everyone equally",
      "Your emotions go up and down",
      "You get angry at unfair things"
    ]
  },

  // 3.x Combinations
  {
    numbers: [3, 1],
    traits: [
      "You learn things very quickly",
      "You can lead in learning situations",
      "You might act like you know more",
      "You sometimes focus on your needs first"
    ]
  },
  {
    numbers: [3, 2],
    traits: [
      "You pick up knowledge easily",
      "You understand feelings well",
      "You can seem to know it all",
      "Your moods change often"
    ]
  },
  {
    numbers: [3, 3],
    traits: [
      "You're very smart and love learning",
      "You grasp new ideas quickly",
      "You might show off your smarts",
      "You let people know how much you know"
    ]
  },
  {
    numbers: [3, 4],
    traits: [
      "You understand things fast",
      "You bring steady learning methods",
      "You can act like you know more",
      "You trust your ways too much"
    ]
  },
  {
    numbers: [3, 5],
    traits: [
      "You learn through talking to people",
      "You communicate ideas well",
      "You might act like you know more",
      "You avoid hard work sometimes"
    ]
  },
  {
    numbers: [3, 6],
    traits: [
      "You learn about caring for others",
      "You understand people's needs",
      "You can seem to know it all",
      "You really like luxury items"
    ]
  },
  {
    numbers: [3, 7],
    traits: [
      "You learn deep spiritual ideas",
      "You think about life's meaning",
      "You might act like you know more",
      "You get unsure about choices"
    ]
  },
  {
    numbers: [3, 8],
    traits: [
      "You learn organized methods well",
      "You keep knowledge neatly arranged",
      "You can seem to know it all",
      "You don't like changing your ways"
    ]
  },
  {
    numbers: [3, 9],
    traits: [
      "You learn about helping humanity",
      "You care about everyone's good",
      "You might act like you know more",
      "You get mad at unfair treatment"
    ]
  },

  // 4.x Combinations
  {
    numbers: [4, 1],
    traits: [
      "You bring steadiness to leadership",
      "You lead in reliable ways",
      "You might trust your methods too much",
      "You sometimes focus on your needs first"
    ]
  },
  {
    numbers: [4, 2],
    traits: [
      "You provide stable emotional support",
      "You understand feelings deeply",
      "You might be too sure of your ways",
      "Your moods change often"
    ]
  },
  {
    numbers: [4, 3],
    traits: [
      "You learn in steady, reliable ways",
      "You pick up knowledge well",
      "You might trust your methods too much",
      "You can act like you know more"
    ]
  },
  {
    numbers: [4, 4],
    traits: [
      "You're very steady in everything",
      "People can always count on you",
      "You might be too sure of yourself",
      "You trust your ways more than needed"
    ]
  },
  {
    numbers: [4, 5],
    traits: [
      "You communicate in reliable ways",
      "You talk with steady methods",
      "You might trust your ways too much",
      "You avoid hard work sometimes"
    ]
  },
  {
    numbers: [4, 6],
    traits: [
      "You care for others steadily",
      "You provide reliable support",
      "You might be too sure of your ways",
      "You really enjoy nice things"
    ]
  },
  {
    numbers: [4, 7],
    traits: [
      "You seek truth in steady ways",
      "You think deeply with reliability",
      "You might trust your methods too much",
      "You get confused about choices"
    ]
  },
  {
    numbers: [4, 8],
    traits: [
      "You organize things very reliably",
      "You keep everything in perfect order",
      "You might be too sure of your ways",
      "You don't like changing methods"
    ]
  },
  {
    numbers: [4, 9],
    traits: [
      "You help humanity in steady ways",
      "You care about all people equally",
      "You might trust your methods too much",
      "You get angry at unfairness"
    ]
  },

  // 5.x Combinations
  {
    numbers: [5, 1],
    traits: [
      "You talk well as a leader",
      "You communicate directions clearly",
      "You avoid hard work sometimes",
      "You sometimes focus on your needs first"
    ]
  },
  {
    numbers: [5, 2],
    traits: [
      "You talk about feelings well",
      "You understand emotional needs",
      "You skip hard work when possible",
      "Your moods change often"
    ]
  },
  {
    numbers: [5, 3],
    traits: [
      "You explain ideas clearly",
      "You share knowledge easily",
      "You avoid difficult tasks",
      "You can act like you know more"
    ]
  },
  {
    numbers: [5, 4],
    traits: [
      "You communicate reliably",
      "You talk in steady ways",
      "You skip hard work sometimes",
      "You might trust your ways too much"
    ]
  },
  {
    numbers: [5, 5],
    traits: [
      "You're excellent at conversations",
      "You connect with all kinds of people",
      "You avoid difficult tasks",
      "You don't like doing hard work"
    ]
  },
  {
    numbers: [5, 6],
    traits: [
      "You talk about caring well",
      "You communicate about people's needs",
      "You skip hard work sometimes",
      "You really enjoy luxury items"
    ]
  },
  {
    numbers: [5, 7],
    traits: [
      "You discuss deep ideas well",
      "You talk about life's meaning",
      "You avoid difficult tasks",
      "You get unsure about choices"
    ]
  },
  {
    numbers: [5, 8],
    traits: [
      "You explain organized plans well",
      "You communicate clear systems",
      "You skip hard work sometimes",
      "You don't like changing methods"
    ]
  },
  {
    numbers: [5, 9],
    traits: [
      "You talk about helping others well",
      "You communicate about fairness",
      "You avoid difficult tasks",
      "You get mad at unfair treatment"
    ]
  },

  // 6.x Combinations
  {
    numbers: [6, 1],
    traits: [
      "You care for others as a leader",
      "You look after people's needs well",
      "You really enjoy nice things",
      "You sometimes focus on your needs first"
    ]
  },
  {
    numbers: [6, 2],
    traits: [
      "You deeply care about feelings",
      "You understand emotional needs",
      "You love luxury items",
      "Your moods change often"
    ]
  },
  {
    numbers: [6, 3],
    traits: [
      "You care through sharing knowledge",
      "You teach others what you know",
      "You enjoy expensive things",
      "You can act like you know more"
    ]
  },
  {
    numbers: [6, 4],
    traits: [
      "You provide reliable care",
      "You support others steadily",
      "You love nice possessions",
      "You might trust your ways too much"
    ]
  },
  {
    numbers: [6, 5],
    traits: [
      "You care through good communication",
      "You talk about helping well",
      "You enjoy luxury items",
      "You avoid hard work sometimes"
    ]
  },
  {
    numbers: [6, 6],
    traits: [
      "You're naturally very caring",
      "You nurture people beautifully",
      "You love comfort and luxury",
      "You enjoy nice things more than most"
    ]
  },
  {
    numbers: [6, 7],
    traits: [
      "You care with spiritual depth",
      "You think about helping deeply",
      "You enjoy expensive things",
      "You get unsure about choices"
    ]
  },
  {
    numbers: [6, 8],
    traits: [
      "You care in organized ways",
      "You systemize helping others",
      "You love luxury items",
      "You don't like changing methods"
    ]
  },
  {
    numbers: [6, 9],
    traits: [
      "You care about all humanity",
      "You want fairness for everyone",
      "You enjoy nice things",
      "You get angry at unfairness"
    ]
  },

  // 7.x Combinations
  {
    numbers: [7, 1],
    traits: [
      "You think deeply as a leader",
      "You lead with spiritual insight",
      "You get confused about choices",
      "You sometimes focus on your needs first"
    ]
  },
  {
    numbers: [7, 2],
    traits: [
      "You sense spiritual meanings",
      "You understand deep feelings",
      "You feel unsure about decisions",
      "Your moods change often"
    ]
  },
  {
    numbers: [7, 3],
    traits: [
      "You seek knowledge deeply",
      "You learn with spiritual insight",
      "You get confused about choices",
      "You can act like you know more"
    ]
  },
  {
    numbers: [7, 4],
    traits: [
      "You think about truth steadily",
      "You seek meaning reliably",
      "You feel unsure about decisions",
      "You might trust your ways too much"
    ]
  },
  {
    numbers: [7, 5],
    traits: [
      "You talk about deep ideas",
      "You communicate spiritual thoughts",
      "You get confused about choices",
      "You avoid hard work sometimes"
    ]
  },
  {
    numbers: [7, 6],
    traits: [
      "You care with spiritual depth",
      "You nurture with deep meaning",
      "You feel unsure about decisions",
      "You really enjoy luxury items"
    ]
  },
  {
    numbers: [7, 7],
    traits: [
      "You're very spiritually deep",
      "You always seek life's truths",
      "You get confused about choices",
      "You often don't know what to do"
    ]
  },
  {
    numbers: [7, 8],
    traits: [
      "You organize spiritual systems",
      "You arrange deep knowledge neatly",
      "You get confused about choices",
      "You don't like changing methods"
    ]
  },
  {
    numbers: [7, 9],
    traits: [
      "You think about helping deeply",
      "You seek meaning in service",
      "You feel unsure about decisions",
      "You get angry at unfairness"
    ]
  },

  // 8.x Combinations
  {
    numbers: [8, 1],
    traits: [
      "You organize as a leader",
      "You lead with clear systems",
      "You don't like changing ways",
      "You sometimes focus on your needs first"
    ]
  },
  {
    numbers: [8, 2],
    traits: [
      "You systemize emotional support",
      "You organize care for feelings",
      "You resist changing methods",
      "Your moods change often"
    ]
  },
  {
    numbers: [8, 3],
    traits: [
      "You arrange knowledge neatly",
      "You organize learning well",
      "You don't like changing ways",
      "You can act like you know more"
    ]
  },
  {
    numbers: [8, 4],
    traits: [
      "You create reliable systems",
      "You organize steady methods",
      "You resist changing ways",
      "You might trust your ways too much"
    ]
  },
  {
    numbers: [8, 5],
    traits: [
      "You systemize communication",
      "You organize talking points well",
      "You don't like changing methods",
      "You avoid hard work sometimes"
    ]
  },
  {
    numbers: [8, 6],
    traits: [
      "You organize caring systems",
      "You arrange help for others neatly",
      "You resist changing ways",
      "You really enjoy luxury items"
    ]
  },
  {
    numbers: [8, 7],
    traits: [
      "You arrange spiritual knowledge",
      "You organize deep thinking",
      "You don't like changing methods",
      "You get confused about choices"
    ]
  },
  {
    numbers: [8, 8],
    traits: [
      "You're extremely well-organized",
      "You keep everything in perfect order",
      "You resist changing ways",
      "You always want things your way"
    ]
  },
  {
    numbers: [8, 9],
    traits: [
      "You systemize helping others",
      "You organize care for humanity",
      "You don't like changing methods",
      "You get angry at unfairness"
    ]
  },

  // 9.x Combinations
  {
    numbers: [9, 1],
    traits: [
      "You care for all as a leader",
      "You lead with kindness to everyone",
      "You get mad at unfair things",
      "You sometimes focus on your needs first"
    ]
  },
  {
    numbers: [9, 2],
    traits: [
      "You feel for all people deeply",
      "You understand everyone's pain",
      "You get angry at unfairness",
      "Your moods change often"
    ]
  },
  {
    numbers: [9, 3],
    traits: [
      "You learn to help humanity",
      "You gain knowledge to serve others",
      "You get mad at unfair treatment",
      "You can act like you know more"
    ]
  },
  {
    numbers: [9, 4],
    traits: [
      "You steadily help all people",
      "You reliably care for humanity",
      "You get angry at unfairness",
      "You might trust your ways too much"
    ]
  },
  {
    numbers: [9, 5],
    traits: [
      "You talk about helping all",
      "You communicate about fairness",
      "You get mad at unfair things",
      "You avoid hard work sometimes"
    ]
  },
  {
    numbers: [9, 6],
    traits: [
      "You deeply care for everyone",
      "You nurture all people equally",
      "You get angry at unfairness",
      "You really enjoy luxury items"
    ]
  },
  {
    numbers: [9, 7],
    traits: [
      "You think about helping deeply",
      "You seek meaning in service",
      "You get mad at unfair treatment",
      "You get confused about choices"
    ]
  },
  {
    numbers: [9, 8],
    traits: [
      "You organize help for all",
      "You systemize care for humanity",
      "You get angry at unfairness",
      "You don't like changing methods"
    ]
  },
  {
    numbers: [9, 9],
    traits: [
      "You deeply care about all people",
      "You want to make the world better",
      "You get very mad at unfairness",
      "You hate seeing suffering"
    ]
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
   if ([22, 16, 25].includes(num)) {
    return num;
  }

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

const getPersonalityTraits = (firstNum, secondNum) => {
  try {
    const exactMatch = personalityCombinations.find(
      c => c.numbers[0] === firstNum && c.numbers[1] === secondNum
    );
    
    if (exactMatch) return exactMatch.traits;
    
    return [
      "You have unique leadership qualities that inspire others",
      "You possess special talents that make you stand out",
      "Sometimes you need to work on balancing your strong personality",
      "Your unique combination requires patience to fully develop"
    ];
  } catch (error) {
    console.error('Traits error:', error);
    return [
      "You have special qualities that make you unique",
      "Your personality has wonderful potential for growth",
      "Like everyone, you have areas that need gentle attention",
      "Your journey of self-discovery is ongoing and valuable"
    ];
  }
};

const formatTraits = (traits) => {
  if (!traits || !Array.isArray(traits)) return null;

  const positiveTraits = traits.slice(0, 2);
  const constructiveTraits = traits.slice(2, 4);

  return (
    <div className="space-y-3">
      <div className="bg-green-50 p-3 rounded-lg border-l-4 border-green-400">
        <h4 className="font-semibold text-green-800 mb-2">✨ Your Strengths:</h4>
        <ul className="list-disc pl-5 space-y-1">
          {positiveTraits.map((trait, index) => (
            <li key={index} className="text-green-700">{trait}</li>
          ))}
        </ul>
      </div>
      
      <div className="bg-orange-50 p-3 rounded-lg border-l-4 border-orange-400">
        <h4 className="font-semibold text-orange-800 mb-2">🌱 Areas for Growth:</h4>
        <ul className="list-disc pl-5 space-y-1">
          {constructiveTraits.map((trait, index) => (
            <li key={index} className="text-orange-700">{trait}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const CalculatorResult = ({ formData = {}, onReset = () => {} }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isNameCorrectionDialogOpen, setIsNameCorrectionDialogOpen] = useState(false);
  
  const { firstNum, secondNum } = calculateNumbers(formData?.birthDate);
  const personalityTraits = getPersonalityTraits(firstNum, secondNum);
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
          <h3 className="font-semibold text-lg mb-3 text-orange-600">Your Personality Traits:</h3>
          {formatTraits(personalityTraits)}
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