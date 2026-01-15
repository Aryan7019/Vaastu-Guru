import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ConsultationForm } from "@/components/ConsultationForm";
import { Dialog, DialogContent, DialogTrigger, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import jsPDF from 'jspdf';

const personalityCombinations = [
  // 1.x Combinations (Leader, Selfish/Angry)
  {
    numbers: [1, 1],
    traits: [
      "You have strong, natural leadership abilities.",
      "You are decisive and excel at taking charge.",
      "You can have a tendency to be self-focused.",
      "Feelings of anger can arise when plans are disrupted."
    ]
  },
  {
    numbers: [1, 2],
    traits: [
      "You are a natural and inspiring leader.",
      "You possess a deep sense of empathy for others.",
      "There is a potential to be selfish with your focus.",
      "You may be prone to sudden and frequent mood swings."
    ]
  },
  {
    numbers: [1, 3],
    traits: [
      "You have the ability to lead others with your ideas.",
      "You possess a great deal of knowledge on many topics.",
      "At times, you may act in a selfish or self-serving manner.",
      "You might come across as smug or overly self-assured."
    ]
  },
  {
    numbers: [1, 4],
    traits: [
      "You are a very strong and capable leader.",
      "You provide a sense of stability for those around you.",
      "You can sometimes be selfish in pursuing your goals.",
      "There is a tendency to be a little too overconfident."
    ]
  },
  {
    numbers: [1, 5],
    traits: [
      "You lead people effectively through your words.",
      "You are a very gifted and clear communicator.",
      "You may struggle with selfish tendencies at times.",
      "There might be a tendency to be lazy and avoid hard work."
    ]
  },
  {
    numbers: [1, 6],
    traits: [
      "You are a natural leader in your community.",
      "You are a very nurturing and caring individual.",
      "There is a tendency to be focused on your personal needs.",
      "You may have a strong attachment to luxury and comfort."
    ]
  },
  {
    numbers: [1, 7],
    traits: [
      "You have the ability to lead on a spiritual level.",
      "You have a deep and meaningful spiritual side.",
      "It can be a challenge to avoid being self-centered.",
      "You often feel confused when making important decisions."
    ]
  },
  {
    numbers: [1, 8],
    traits: [
      "You are a very powerful and effective leader.",
      "You have a strong sense of personal discipline.",
      "You may sometimes focus heavily on your own ambitions.",
      "There is a potential to be dogmatic or rigid in your views."
    ]
  },
  {
    numbers: [1, 9],
    traits: [
      "You are a leader who inspires others to do good.",
      "You have a deep love and concern for all of humanity.",
      "You might occasionally struggle with selfish impulses.",
      "You have a tendency to experience sudden feelings of anger."
    ]
  },

  // 2.x Combinations (Empath, Mood Swings)
  {
    numbers: [2, 1],
    traits: [
      "You have a natural ability to understand others.",
      "You possess strong and confident leadership skills.",
      "Your emotional state can be quite changeable.",
      "There might be a tendency to focus on your own needs."
    ]
  },
  {
    numbers: [2, 2],
    traits: [
      "You are a deeply empathetic and intuitive person.",
      "You can sense the feelings of others very easily.",
      "You are prone to frequent and sometimes intense mood swings.",
      "Your emotional state can be highly sensitive and reactive."
    ]
  },
  {
    numbers: [2, 3],
    traits: [
      "You have a strong empathy for what others are thinking.",
      "You have a great capacity for acquiring knowledge.",
      "You may experience sudden and unpredictable mood swings.",
      "There is a potential to appear smug because of your knowledge."
    ]
  },
  {
    numbers: [2, 4],
    traits: [
      "You understand people's need for emotional security.",
      "You have a very steady and stable presence.",
      "Your feelings can sometimes be very up and down.",
      "You might be a little too overconfident in your opinions."
    ]
  },
  {
    numbers: [2, 5],
    traits: [
      "You are very empathetic in your conversations.",
      "You are a naturally skilled and fluid communicator.",
      "Your moods can shift without much warning.",
      "You may have a tendency to be lazy and avoid hard work."
    ]
  },
  {
    numbers: [2, 6],
    traits: [
      "You have a deep, empathetic connection with people.",
      "You are a very nurturing and supportive person.",
      "It is common for you to experience emotional highs and lows.",
      "There can be a strong desire for luxurious living."
    ]
  },
  {
    numbers: [2, 7],
    traits: [
      "You can empathize with others on a spiritual level.",
      "You have a very active and profound spiritual life.",
      "Your moods can be very changeable and hard to predict.",
      "You might often feel confused or uncertain about your path."
    ]
  },
  {
    numbers: [2, 8],
    traits: [
      "You are able to feel and understand what drives people.",
      "You are a very disciplined and focused individual.",
      "You may find that your emotions fluctuate a great deal.",
      "There is a tendency to be rigid or dogmatic in your beliefs."
    ]
  },
  {
    numbers: [2, 9],
    traits: [
      "You have a deep empathy for the struggles of humanity.",
      "You care a great deal about the welfare of others.",
      "Your emotional state can be turbulent and change often.",
      "You are prone to feeling angry when confronted with unfairness."
    ]
  },

  // 3.x Combinations (Knowledge, Smug)
  {
    numbers: [3, 1],
    traits: [
      "You are very knowledgeable and well-informed.",
      "You have strong and natural leadership qualities.",
      "You may sometimes come across as being a know-it-all.",
      "There can be a tendency to act in a selfish manner."
    ]
  },
  {
    numbers: [3, 2],
    traits: [
      "You have a great thirst for knowledge and learning.",
      "You are a very empathetic and understanding person.",
      "There is a potential to seem smug about what you know.",
      "You might experience frequent and sudden mood swings."
    ]
  },
  {
    numbers: [3, 3],
    traits: [
      "You possess a deep and extensive base of knowledge.",
      "You are a quick learner who loves to acquire new facts.",
      "You may have a tendency to act overly self-satisfied.",
      "You can sometimes be perceived as smug by other people."
    ]
  },
  {
    numbers: [3, 4],
    traits: [
      "You have a great deal of practical knowledge.",
      "You possess a very stable and grounded nature.",
      "You might sometimes give off an air of being smug.",
      "There is a tendency to be overconfident in your abilities."
    ]
  },
  {
    numbers: [3, 5],
    traits: [
      "You love to share your knowledge with other people.",
      "You are a very skilled and engaging communicator.",
      "You can sometimes appear smug in your conversations.",
      "There might be a tendency to be lazy and avoid effort."
    ]
  },
  {
    numbers: [3, 6],
    traits: [
      "You have a lot of knowledge about how to care for others.",
      "You are a very nurturing and supportive individual.",
      "You can sometimes seem smug about your level of expertise.",
      "You may have a strong desire for luxury and material goods."
    ]
  },
  {
    numbers: [3, 7],
    traits: [
      "You seek knowledge of a deep and spiritual nature.",
      "You have a strong connection to your spiritual side.",
      "You might accidentally come across as smug to others.",
      "You may often feel confused when faced with big decisions."
    ]
  },
  {
    numbers: [3, 8],
    traits: [
      "You have a very structured and disciplined mind.",
      "You acquire knowledge in a very organized way.",
      "There is a potential to be smug about your intelligence.",
      "You may be very dogmatic and rigid in your thinking."
    ]
  },
  {
    numbers: [3, 9],
    traits: [
      "You use your knowledge to think about helping the world.",
      "You have a very strong humanitarian spirit.",
      "You can sometimes be perceived as smug when sharing ideas.",
      "You can get very angry when you see people treated unfairly."
    ]
  },

  // 4.x Combinations (Stability, Overconfident)
  {
    numbers: [4, 1],
    traits: [
      "You have a very stable and grounded presence.",
      "You are a natural and effective leader.",
      "You may sometimes be a little too overconfident.",
      "There is a tendency to be selfish with your time and energy."
    ]
  },
  {
    numbers: [4, 2],
    traits: [
      "You provide a sense of stability to those around you.",
      "You are a very empathetic and caring person.",
      "Your confidence can sometimes border on overconfidence.",
      "You may experience sudden and unpredictable mood swings."
    ]
  },
  {
    numbers: [4, 3],
    traits: [
      "You have a very stable approach to learning.",
      "You possess a great deal of practical knowledge.",
      "There is a tendency to be overconfident in what you know.",
      "You may sometimes come across as being smug or superior."
    ]
  },
  {
    numbers: [4, 4],
    traits: [
      "You are an incredibly stable and reliable person.",
      "You provide a rock-solid foundation for others.",
      "You can be too confident and sure of your own way.",
      "There is a resistance to being flexible or trying new things."
    ]
  },
  {
    numbers: [4, 5],
    traits: [
      "You are a very steady and dependable individual.",
      "You are a very clear and effective communicator.",
      "There is a potential to be overconfident in your ideas.",
      "You might have a tendency to be lazy and avoid challenges."
    ]
  },
  {
    numbers: [4, 6],
    traits: [
      "You bring a sense of stability to your relationships.",
      "You are a very nurturing and supportive person.",
      "You can be overconfident in your ability to help others.",
      "You might have a strong desire for material comforts."
    ]
  },
  {
    numbers: [4, 7],
    traits: [
      "You have a very grounded and stable worldview.",
      "You possess a deep and active spiritual side.",
      "You can be overconfident in your personal beliefs.",
      "You may often feel confused about which path to take in life."
    ]
  },
  {
    numbers: [4, 8],
    traits: [
      "You are a pillar of stability and strength.",
      "You are a very disciplined and focused person.",
      "There is a strong tendency to be overconfident in your plans.",
      "You might be very dogmatic and unwilling to change your mind."
    ]
  },
  {
    numbers: [4, 9],
    traits: [
      "You provide a stable foundation for humanitarian work.",
      "You have a deep desire to help people in practical ways.",
      "You may be overconfident in your solutions for problems.",
      "You are prone to feeling powerful anger towards injustice."
    ]
  },

  // 5.x Combinations (Communication, Lazy)
  {
    numbers: [5, 1],
    traits: [
      "You are a very skilled and persuasive communicator.",
      "You have strong and natural leadership abilities.",
      "There might be a tendency to avoid difficult work.",
      "You can sometimes be selfish with your attention and focus."
    ]
  },
  {
    numbers: [5, 2],
    traits: [
      "You excel at communicating with empathy and understanding.",
      "You are very good at sensing the feelings of others.",
      "You may have a habit of being lazy when faced with challenges.",
      "You might experience frequent and unpredictable mood swings."
    ]
  },
  {
    numbers: [5, 3],
    traits: [
      "You are very good at communicating complex ideas.",
      "You have a great deal of knowledge on many subjects.",
      "There is a potential for you to be lazy in your studies.",
      "You might come across as smug in your conversations."
    ]
  },
  {
    numbers: [5, 4],
    traits: [
      "You communicate in a very clear and steady manner.",
      "You have a very stable and grounded personality.",
      "You may have a tendency to be lazy and avoid physical effort.",
      "You can sometimes be perceived as overconfident when you speak."
    ]
  },
  {
    numbers: [5, 5],
    traits: [
      "You are an exceptionally talented communicator.",
      "You love to socialize and connect with other people.",
      "You have a strong tendency to be lazy and procrastinate.",
      "You may have a deep dislike for engaging in hard work."
    ]
  },
  {
    numbers: [5, 6],
    traits: [
      "You are gifted at communicating in a caring way.",
      "You are a very nurturing and supportive individual.",
      "There can be a tendency to be lazy and seek comfort.",
      "You might have a strong attachment to luxury goods."
    ]
  },
  {
    numbers: [5, 7],
    traits: [
      "You enjoy communicating about deep and spiritual topics.",
      "You have a very active and meaningful spiritual life.",
      "You may be lazy when it comes to practical, everyday tasks.",
      "You often feel confused and uncertain about your direction."
    ]
  },
  {
    numbers: [5, 8],
    traits: [
      "You are a very clear and disciplined communicator.",
      "You are very organized and focused in your approach to life.",
      "There is a strong tendency to be lazy and avoid manual labor.",
      "You can be very dogmatic in how you express your opinions."
    ]
  },
  {
    numbers: [5, 9],
    traits: [
      "You use your communication skills to help humanity.",
      "You care deeply about fairness and justice in the world.",
      "You might have a tendency to be lazy in taking action.",
      "You are prone to anger when communicating about injustice."
    ]
  },

  // 6.x Combinations (Nurturer, Luxury)
  {
    numbers: [6, 1],
    traits: [
      "You are a very nurturing and caring person.",
      "You have strong and effective leadership skills.",
      "You may have a strong desire for a luxurious lifestyle.",
      "There is a tendency to be selfish in getting what you want."
    ]
  },
  {
    numbers: [6, 2],
    traits: [
      "You are a natural nurturer and a deeply empathetic soul.",
      "You are very good at understanding the feelings of others.",
      "You have a great love for luxury and comfortable surroundings.",
      "You may be prone to frequent and sudden mood swings."
    ]
  },
  {
    numbers: [6, 3],
    traits: [
      "You love to nurture others by sharing your knowledge.",
      "You have a great deal of wisdom to offer people.",
      "There can be a strong focus on acquiring luxury items.",
      "You might sometimes come across as being smug or superior."
    ]
  },
  {
    numbers: [6, 4],
    traits: [
      "You provide a very stable and nurturing environment.",
      "You are a very grounded and reliable person.",
      "You may have a weakness for luxury and expensive things.",
      "You can sometimes be perceived as being overconfident."
    ]
  },
  {
    numbers: [6, 5],
    traits: [
      "You show your nurturing side through your communication.",
      "You are a very clear and effective speaker.",
      "There can be a strong desire for a life of luxury.",
      "You might have a tendency to be lazy and avoid effort."
    ]
  },
  {
    numbers: [6, 6],
    traits: [
      "You are an exceptionally nurturing and caring person.",
      "You find great joy in supporting and looking after others.",
      "You may have a very strong attachment to luxury.",
      "You might neglect practical needs in favor of comfort."
    ]
  },
  {
    numbers: [6, 7],
    traits: [
      "You have a gift for nurturing people's spiritual growth.",
      "You have a deep and profound spiritual connection.",
      "You might have a very strong desire for luxury goods.",
      "You may often feel confused about your life's purpose."
    ]
  },
  {
    numbers: [6, 8],
    traits: [
      "You are very disciplined in your nurturing approach.",
      "You are a very focused and organized individual.",
      "There can be a powerful focus on achieving a luxurious life.",
      "You may be very dogmatic in your views on how to care for others."
    ]
  },
  {
    numbers: [6, 9],
    traits: [
      "You feel a deep need to nurture and care for humanity.",
      "You have a very strong sense of compassion for everyone.",
      "You might find yourself very drawn to a luxurious lifestyle.",
      "You are prone to anger when you see people being mistreated."
    ]
  },

  // 7.x Combinations (Spiritual, Confused)
  {
    numbers: [7, 1],
    traits: [
      "You have a deep and active spiritual side.",
      "You are a natural and inspiring leader.",
      "You often feel confused and uncertain about your decisions.",
      "There can be a tendency to be selfish with your time."
    ]
  },
  {
    numbers: [7, 2],
    traits: [
      "You are a very spiritual and empathetic person.",
      "You are gifted at understanding the feelings of others.",
      "You may often find yourself feeling confused and lost.",
      "You might be prone to frequent and unpredictable mood swings."
    ]
  },
  {
    numbers: [7, 3],
    traits: [
      "You have a strong connection to spiritual knowledge.",
      "You have a great love for learning and acquiring wisdom.",
      "It is common for you to feel confused about complex ideas.",
      "You might accidentally come across as smug to other people."
    ]
  },
  {
    numbers: [7, 4],
    traits: [
      "You have a very grounded and stable spiritual practice.",
      "You are a very reliable and dependable person.",
      "You often feel a sense of confusion about the future.",
      "There is a tendency to be overconfident in your beliefs."
    ]
  },
  {
    numbers: [7, 5],
    traits: [
      "You enjoy talking about spiritual and meaningful topics.",
      "You are a very clear and engaging communicator.",
      "You may often feel confused and directionless in life.",
      "There might be a tendency to be lazy and avoid responsibility."
    ]
  },
  {
    numbers: [7, 6],
    traits: [
      "You have a very deep and nurturing spiritual side.",
      "You are a very caring and supportive person.",
      "It is a big challenge for you to overcome feelings of confusion.",
      "You may have a strong desire for a luxurious lifestyle."
    ]
  },
  {
    numbers: [7, 7],
    traits: [
      "You are a deeply spiritual person who seeks the truth.",
      "You have a strong connection to the mystical side of life.",
      "You may live in a frequent state of confusion and uncertainty.",
      "It is very hard for you to make a firm and final decision."
    ]
  },
  {
    numbers: [7, 8],
    traits: [
      "You have a very disciplined approach to your spiritual life.",
      "You are a very focused and organized individual.",
      "You often feel confused despite your organized mind.",
      "There is a potential to be dogmatic about your spiritual views."
    ]
  },
  {
    numbers: [7, 9],
    traits: [
      "You have a spiritual connection to all of humanity.",
      "You have a deep desire to help and serve other people.",
      "You can feel very confused about how to best help the world.",
      "You are prone to anger when you see injustice and suffering."
    ]
  },

  // 8.x Combinations (Discipline, Dogmatic)
  {
    numbers: [8, 1],
    traits: [
      "You are a very disciplined and focused individual.",
      "You are a strong and effective leader.",
      "You might be very dogmatic and rigid in your opinions.",
      "There can be a tendency to act in a selfish manner."
    ]
  },
  {
    numbers: [8, 2],
    traits: [
      "You have the discipline to understand deep emotions.",
      "You are a very empathetic and caring person.",
      "There is a strong tendency to be dogmatic in your beliefs.",
      "You may be prone to frequent and unpredictable mood swings."
    ]
  },
  {
    numbers: [8, 3],
    traits: [
      "You are very disciplined in your pursuit of knowledge.",
      "You are a very intelligent and well-read person.",
      "You can be very dogmatic about the facts you have learned.",
      "You may sometimes come across as being smug or superior."
    ]
  },
  {
    numbers: [8, 4],
    traits: [
      "You have a very disciplined and stable character.",
      "You are a very reliable and grounded individual.",
      "You can be extremely dogmatic and inflexible.",
      "There is a tendency to be overconfident in your methods."
    ]
  },
  {
    numbers: [8, 5],
    traits: [
      "You are a very disciplined and clear communicator.",
      "You are very good at expressing your thoughts.",
      "You may be very dogmatic when you are in a debate.",
      "There might be a tendency to be lazy and avoid physical work."
    ]
  },
  {
    numbers: [8, 6],
    traits: [
      "You are very disciplined in how you care for others.",
      "You are a very nurturing and supportive person.",
      "You can be dogmatic about the 'right' way to help people.",
      "You may have a very strong desire for a luxurious lifestyle."
    ]
  },
  {
    numbers: [8, 7],
    traits: [
      "You have a very disciplined spiritual practice.",
      "You are a deeply spiritual and thoughtful person.",
      "You can be very dogmatic about your spiritual beliefs.",
      "You may often feel confused despite your disciplined mind."
    ]
  },
  {
    numbers: [8, 8],
    traits: [
      "You possess an exceptional amount of self-discipline.",
      "You are a very focused and highly organized person.",
      "You can be extremely dogmatic and rigid in your thinking.",
      "There is a strong resistance to being flexible or changing your mind."
    ]
  },
  {
    numbers: [8, 9],
    traits: [
      "You are very disciplined in your efforts to help others.",
      "You have a deep desire to serve humanity.",
      "You can be very dogmatic about your vision for a better world.",
      "You feel very strong anger when you see systemic injustice."
    ]
  },

  // 9.x Combinations (Humanity, Angry)
  {
    numbers: [9, 1],
    traits: [
      "You have a deep love and concern for humanity.",
      "You are a natural and inspiring leader.",
      "You are prone to feelings of anger and frustration.",
      "There can be a tendency to be selfish with your energy."
    ]
  },
  {
    numbers: [9, 2],
    traits: [
      "You have a humanitarian spirit and a deep sense of empathy.",
      "You can easily understand the feelings of other people.",
      "You can be quick to anger, especially about unfairness.",
      "You may be prone to frequent and intense mood swings."
    ]
  },
  {
    numbers: [9, 3],
    traits: [
      "You are driven to use your knowledge to help humanity.",
      "You are a very intelligent and well-informed person.",
      "Feelings of anger can arise easily for you.",
      "You might sometimes come across as being a smug know-it-all."
    ]
  },
  {
    numbers: [9, 4],
    traits: [
      "You have a stable and practical approach to helping people.",
      "You are a very reliable and grounded individual.",
      "You have a tendency to become angry at instability.",
      "You may be overconfident in your plans to help society."
    ]
  },
  {
    numbers: [9, 5],
    traits: [
      "You love to communicate about humanitarian causes.",
      "You are a very clear and persuasive speaker.",
      "You can become very angry and argumentative in discussions.",
      "There might be a tendency to be lazy about taking action."
    ]
  },
  {
    numbers: [9, 6],
    traits: [
      "You have a deep, nurturing love for all of humanity.",
      "You are a very caring and supportive person.",
      "You are prone to anger when you see a lack of care in the world.",
      "You might have a strong desire for luxury and comfort."
    ]
  },
  {
    numbers: [9, 7],
    traits: [
      "You have a spiritual connection to all of humanity.",
      "You are a very deep and thoughtful individual.",
      "You can feel a lot of anger about the state of the world.",
      "You may often feel confused about the best way to help others."
    ]
  },
  {
    numbers: [9, 8],
    traits: [
      "You want to help humanity in a disciplined way.",
      "You are a very focused and organized person.",
      "You are prone to anger at the lack of order and justice.",
      "You can be very dogmatic in your approach to social change."
    ]
  },
  {
    numbers: [9, 9],
    traits: [
      "You have an immense, all-encompassing love for humanity.",
      "You are a true humanitarian with a powerful vision.",
      "You can be overwhelmed by powerful feelings of anger.",
      "Witnessing any kind of suffering deeply affects you."
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
  1: { compatible: [1, 2, 3, 4, 5, 6, 7, 9], description: "1 works best with 8" },
  2: { compatible: [], description: "2 doesn't have compatible numbers" },
  3: { compatible: [], description: "3 doesn't have compatible numbers" },
  4: { compatible: [], description: "4 doesn't have compatible numbers" },
  5: { compatible: [1, 2, 3, 4, 5, 6, 7, 8, 9], description: "5 works with all numbers" },
  6: { compatible: [1, 2, 4, 5, 6, 7, 8], description: "6 doesnot compatible with 3 and 9" },
  7: { compatible: [], description: "7 doesn't have compatible numbers" },
  8: { compatible: [], description: "8 doesn't have compatible numbers" },
  9: { compatible: [], description: "9 doesn't have compatible numbers" },
  16: { compatible: [1, 2, 3, 4, 5, 6, 7, 8, 9], description: "16 works with all numbers" },
  22: { compatible: [1, 3, 5, 6, 7], description: "22 works worst with 2, 4, 8, and 9" },
  25: { compatible: [1, 2, 3, 4, 5, 6, 7, 8, 9], description: "25 works with all numbers" },
};

const sumToSingleDigit = (num) => {
  // Only keep 16, 22, and 25 as special cases
  if ([16, 22, 25].includes(num)) {
    return num;
  }

  while (num > 9) {
    num = num.toString().split('').reduce((sum, d) => sum + parseInt(d), 0);
  }
  return num;
};

const calculateNameValue = (name) => {
  if (!name || typeof name !== 'string') return 0;

  let sum = 0;
  for (const char of name.toUpperCase()) {
    if (LETTER_VALUES[char]) {
      sum += LETTER_VALUES[char];
    }
  }

  // Always reduce name value to single digit (no special cases for 11, 22, 33)
  while (sum > 9) {
    sum = sum.toString().split('').reduce((s, d) => s + parseInt(d), 0);
  }

  return sum;
};

const checkNameCompatibility = (nameValue, firstNum) => {
  // Handle invalid inputs
  if (!nameValue || !firstNum || nameValue === 0 || firstNum === 0) {
    return {
      compatible: false,
      nameValue: nameValue || 0,
      description: "Unable to calculate compatibility - please check your name and birth date"
    };
  }

  // nameValue is already reduced to single digit in calculateNameValue
  const compatibilityRule = NAME_COMPATIBILITY_RULES[nameValue] ||
  { compatible: [], description: `No specific compatibility rules for ${nameValue}` };

  const isCompatible = compatibilityRule.compatible.length === 0 ?
    false : compatibilityRule.compatible.includes(firstNum);

  return {
    compatible: isCompatible,
    nameValue: nameValue,
    description: isCompatible ?
      `Your name number ${nameValue} is compatible with your birth number ${firstNum}!` :
      `Your name number ${nameValue} is not compatible with your birth number ${firstNum}. ${compatibilityRule.description}`
  };
};

const calculateNumbers = (birthDate) => {
  if (!birthDate || typeof birthDate !== 'string') return { firstNum: 1, secondNum: 1 };

  try {
    const [year, month, day] = birthDate.split('-').map(Number);
    
    // Check if we have valid numbers
    if (isNaN(year) || isNaN(month) || isNaN(day)) {
      return { firstNum: 1, secondNum: 1 };
    }
    
    // Always reduce to single digit (1-9)
    let firstNum = day;
    while (firstNum > 9) {
      firstNum = firstNum.toString().split('').reduce((sum, d) => sum + parseInt(d), 0);
    }
    
    const allDigits = birthDate.replace(/\D/g, '').split('').map(Number);
    let secondNum = allDigits.reduce((sum, d) => sum + d, 0);
    while (secondNum > 9) {
      secondNum = secondNum.toString().split('').reduce((sum, d) => sum + parseInt(d), 0);
    }

    return {
      firstNum: Math.max(1, Math.min(9, firstNum)),
      secondNum: Math.max(1, Math.min(9, secondNum))
    };
  } catch (error) {
    console.error('Calculation error:', error);
    return { firstNum: 1, secondNum: 1 };
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

const calculatePersonalYear = (birthDate) => {
  if (!birthDate) return 0;

  const currentYear = new Date().getFullYear();
  const [year, month, day] = birthDate.split('-').map(Number);

  let sum = day + month + currentYear;

  while (sum > 9) {
    sum = sum.toString().split('').reduce((acc, digit) => acc + parseInt(digit), 0);
  }

  return sum;
};

const getYearFortuneData = (personalYear, firstNum) => {
  // Handle invalid inputs
  if (!personalYear || !firstNum || personalYear < 1 || personalYear > 9 || firstNum < 1 || firstNum > 9) {
    return { percentage: 50, description: "Neutral year with mixed experiences" };
  }

  // Default fortune data for all personal years (declare first)
  const fortuneData = {
    1: {
      percentage: 90,
      description: "This is a fresh start year full of new opportunities. Take initiative on projects you've been putting off - this is the perfect time to begin. Your leadership skills will shine if you step forward confidently."
    },
    2: {
      percentage: 60,
      description: "A sensitive year where decisions feel difficult. You may second-guess yourself often. When confused, pause and reflect before choosing - don't force answers immediately. Relationships need extra patience this year."
    },
    3: {
      percentage: 65,
      description: "You'll face more obstacles than usual this year. When problems arise, tackle them one at a time instead of feeling overwhelmed. Creative solutions work best - think outside the box when stuck."
    },
    4: {
      percentage: 70,
      description: "Progress comes slowly but surely this year. Focus on doing small, consistent actions rather than expecting quick results. Building strong foundations now will help you in future years."
    },
    5: {
      percentage: 95,
      description: "This is your most fortunate year with excellent opportunities. Stay alert for lucky breaks and don't hesitate to take calculated risks. Positive changes happen easily - go with the flow but stay grounded."
    },
    6: {
      percentage: 85,
      description: "Your choices determine everything this year. Think carefully before deciding, as both good and bad options have stronger consequences. Choose wisely - your decisions create lasting effects."
    },
    7: {
      percentage: 55,
      description: "Be extra cautious this year as deception is more likely. Double-check all information and agreements. If something seems too good to be true, it probably is - listen to your gut feelings."
    },
    8: {
      percentage: 50,
      description: "A year requiring much effort for gradual results. Don't get discouraged by slow progress - keep working steadily. Your persistence will eventually be rewarded, even if it takes time."
    },
    9: {
      percentage: 20,
      description: "This challenging year tests your resilience. When facing difficulties, focus on basic needs first - don't overwhelm yourself. Remember tough times are temporary and make you stronger."
    },
  };

  // Special cases based on firstNum and personalYear combinations
  const specialCases = {
    // firstNum: { personalYear: percentage }
    1: { 8: 40 },
    2: { 8: 40, 4: 50 },
    3: { 6: 18 },
    4: { 2: 50 },
    6: { 3: 18 },
    8: {1: 40, 2: 40}
  };

  // Check if there's a special case for this combination
  if (specialCases[firstNum] && specialCases[firstNum][personalYear]) {
    const percentage = specialCases[firstNum][personalYear];
    const baseData = fortuneData[personalYear] || { percentage: 50, description: "Neutral year with mixed experiences" };
    return {
      percentage: percentage,
      description: baseData.description
    };
  }

  return fortuneData[personalYear] || { percentage: 50, description: "Neutral year with mixed experiences" };
};



const CircularMeter = ({ percentage }) => {
  const [progress, setProgress] = useState(0);

  // Function to determine colors based on percentage
  const getMeterColors = (p) => {
    if (p <= 40) { // Low percentage - Red
      return {
        start: '#fca5a5', // red-300
        end: '#ef4444',   // red-500
        text: '#b91c1c',   // red-700
      };
    }
    if (p <= 70) { // Medium percentage - Orange
      return {
        start: '#fb923c', // orange-400
        end: '#ff6b35',   // primary orange
        text: '#c2410c',   // orange-700
      };
    }
    // Good percentage - Green
    return {
      start: '#86efac', // green-300
      end: '#22c55e',   // green-500
      text: '#15803d',   // green-700
    };
  };

  const colors = getMeterColors(percentage);

  useEffect(() => {
    const animationDuration = 2000;
    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progressFraction = Math.min(elapsed / animationDuration, 1);
      setProgress(Math.floor(progressFraction * percentage));

      if (progressFraction < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [percentage]);

  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="relative w-36 h-36 mx-auto mb-4">
      <svg className="w-full h-full" viewBox="0 0 100 100">
        {/* Background circle */}
        <circle
          cx="50"
          cy="50"
          r={radius}
          fill="none"
          stroke="#e2e8f0" // slate-200
          strokeWidth="20"
        />

        {/* Gradient Definition */}
        <defs>
          <linearGradient id="progressGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={colors.start} />
            <stop offset="100%" stopColor={colors.end} />
          </linearGradient>
        </defs>

        {/* Progress circle */}
        <circle
          cx="50"
          cy="50"
          r={radius}
          fill="none"
          stroke="url(#progressGradient)"
          strokeWidth="15"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          transform="rotate(-90 50 50)"
          style={{ transition: 'stroke-dashoffset 0.5s ease-out' }}
        />

        {/* Percentage Text */}
        <text
          x="50"
          y="50"
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize="18"
          fontWeight="bold"
          fill={colors.text}
        >
          {progress}%
        </text>
      </svg>
    </div>
  );
};


const formatTraits = (traits) => {
  if (!traits || !Array.isArray(traits)) return null;
  const positiveTraits = traits.slice(0, 2);
  const negativeTraits = traits.slice(2, 4);

  return (
    <div className="space-y-3">
      <div className="bg-green-50 p-3 rounded-lg border-l-4 border-green-400">
        <h4 className="font-semibold text-green-800 mb-2">✨ Positives:</h4>
        <ul className="list-disc pl-5 space-y-1">
          {positiveTraits.map((trait, index) => (
            <li key={index} className="text-green-700">{trait}</li>
          ))}
        </ul>
      </div>
      <div className="bg-orange-50 p-3 rounded-lg border-l-4 border-orange-400">
        <h4 className="font-semibold text-orange-800 mb-2">🌱 Negatives:</h4>
        <ul className="list-disc pl-5 space-y-1">
          {negativeTraits.map((trait, index) => (
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
  const personalYear = calculatePersonalYear(formData?.birthDate);
  const yearFortune = getYearFortuneData(personalYear, firstNum);


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

        <div className="bg-slate-50 rounded-lg p-5 border border-slate-100 mt-4">
          <h3 className="font-semibold text-lg mb-3 text-slate-600 text-center">
            Your {new Date().getFullYear()} Fortune Meter
          </h3>

          <CircularMeter percentage={yearFortune.percentage} />

          <p className="text-center text-slate-700 font-medium mt-4">
            {yearFortune.description}
          </p>
        </div>

        <div className="mt-4 p-3 bg-orange-50 border-l-4 border-orange-400 rounded">
          <p className="text-sm text-orange-700">
            <span className="font-semibold">Note:</span> This analysis considers basic factors only.
            For complete accuracy, book an appointment with our experts.
          </p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-md p-6">
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
            className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white transition-transform duration-300 ease-in-out hover:scale-105"
            onClick={() => {
              const doc = new jsPDF();
              const pageWidth = doc.internal.pageSize.getWidth();
              const margin = 15;
              const contentWidth = pageWidth - (margin * 2);
              
              // Colors
              const orange = [249, 115, 22];
              const darkOrange = [194, 65, 12];
              const green = [34, 197, 94];
              const red = [239, 68, 68];
              const gray = [100, 116, 139];
              
              // Header Banner
              doc.setFillColor(...orange);
              doc.rect(0, 0, pageWidth, 35, 'F');
              
              doc.setTextColor(255, 255, 255);
              doc.setFontSize(20);
              doc.setFont('helvetica', 'bold');
              doc.text('NumaVaastu', pageWidth / 2, 14, { align: 'center' });
              
              doc.setFontSize(8);
              doc.setFont('helvetica', 'normal');
              doc.text('Ancient Wisdom for Modern Transformation', pageWidth / 2, 21, { align: 'center' });
              
              doc.setFontSize(11);
              doc.setFont('helvetica', 'bold');
              doc.text('Numerology Report', pageWidth / 2, 30, { align: 'center' });
              
              // User Info Box
              let y = 42;
              doc.setFillColor(255, 247, 237);
              doc.roundedRect(margin, y, contentWidth, 20, 3, 3, 'F');
              
              doc.setTextColor(...darkOrange);
              doc.setFontSize(13);
              doc.setFont('helvetica', 'bold');
              const displayName = (formData?.name || 'Guest').length > 35 
                ? (formData?.name || 'Guest').substring(0, 35) + '...' 
                : (formData?.name || 'Guest');
              doc.text(displayName, margin + 6, y + 9);
              
              doc.setTextColor(...gray);
              doc.setFontSize(8);
              doc.setFont('helvetica', 'normal');
              const dobText = 'Date of Birth: ' + new Date(formData?.birthDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });
              doc.text(dobText, margin + 6, y + 16);
              
              y += 26;
              
              // Name Compatibility
              if (formData?.name) {
                const isComp = nameCompatibility.compatible;
                doc.setFillColor(...(isComp ? [220, 252, 231] : [254, 226, 226]));
                doc.roundedRect(margin, y, contentWidth, 12, 2, 2, 'F');
                
                doc.setTextColor(...(isComp ? green : red));
                doc.setFontSize(9);
                doc.setFont('helvetica', 'bold');
                const compText = isComp ? '✓ Your name is compatible with your birth energy' : '✗ Your name needs correction for better alignment';
                doc.text(compText, pageWidth / 2, y + 8, { align: 'center' });
                y += 18;
              }
              
              // Personality Section
              doc.setTextColor(...darkOrange);
              doc.setFontSize(11);
              doc.setFont('helvetica', 'bold');
              doc.text('Personality Analysis', margin, y + 5);
              doc.setDrawColor(...orange);
              doc.setLineWidth(0.5);
              doc.line(margin, y + 8, pageWidth - margin, y + 8);
              y += 14;
              
              personalityTraits.forEach((trait, i) => {
                const isPos = i < 2;
                const traitLines = doc.splitTextToSize(trait, contentWidth - 12);
                const boxHeight = Math.max(10, traitLines.length * 5 + 5);
                
                doc.setFillColor(...(isPos ? [240, 253, 244] : [254, 242, 242]));
                doc.roundedRect(margin, y, contentWidth, boxHeight, 2, 2, 'F');
                
                doc.setDrawColor(...(isPos ? green : red));
                doc.setLineWidth(2);
                doc.line(margin, y, margin, y + boxHeight);
                
                doc.setTextColor(...(isPos ? [22, 101, 52] : [153, 27, 27]));
                doc.setFontSize(8);
                doc.setFont('helvetica', 'normal');
                doc.text(traitLines, margin + 5, y + 6);
                y += boxHeight + 3;
              });
              
              y += 5;
              
              // Fortune Section
              doc.setTextColor(...darkOrange);
              doc.setFontSize(11);
              doc.setFont('helvetica', 'bold');
              doc.text(new Date().getFullYear() + ' Fortune Forecast', margin, y + 5);
              doc.setDrawColor(...orange);
              doc.line(margin, y + 8, pageWidth - margin, y + 8);
              y += 14;
              
              doc.setFillColor(254, 243, 199);
              doc.roundedRect(margin, y, contentWidth, 38, 3, 3, 'F');
              
              doc.setTextColor(...orange);
              doc.setFontSize(28);
              doc.setFont('helvetica', 'bold');
              doc.text(yearFortune.percentage + '%', pageWidth / 2, y + 14, { align: 'center' });
              
              doc.setFontSize(7);
              doc.setFont('helvetica', 'normal');
              doc.text('Fortune Score', pageWidth / 2, y + 20, { align: 'center' });
              
              doc.setTextColor(146, 64, 14);
              doc.setFontSize(7);
              doc.setFont('helvetica', 'normal');
              const descLines = doc.splitTextToSize(yearFortune.description, contentWidth - 16);
              const truncatedDesc = descLines.slice(0, 3);
              doc.text(truncatedDesc, pageWidth / 2, y + 27, { align: 'center', maxWidth: contentWidth - 16 });
              
              y += 45;
              
              // Note
              doc.setFillColor(248, 250, 252);
              doc.roundedRect(margin, y, contentWidth, 18, 2, 2, 'F');
              doc.setTextColor(...gray);
              doc.setFontSize(7);
              doc.setFont('helvetica', 'normal');
              doc.text('For detailed analysis with remedies and personalized guidance, book a consultation.', margin + 4, y + 6);
              doc.text('Contact: vaastuguru12@gmail.com', margin + 4, y + 12);
              
              // Footer
              doc.setFillColor(28, 25, 23);
              doc.rect(0, 280, pageWidth, 17, 'F');
              
              doc.setTextColor(...orange);
              doc.setFontSize(9);
              doc.setFont('helvetica', 'bold');
              doc.text('NumaVaastu', pageWidth / 2, 287, { align: 'center' });
              
              doc.setTextColor(168, 162, 158);
              doc.setFontSize(6);
              doc.setFont('helvetica', 'normal');
              doc.text('Generated: ' + new Date().toLocaleDateString('en-IN') + ' | Ancient Wisdom for Modern Transformation', pageWidth / 2, 293, { align: 'center' });
              
              // Download
              doc.save('NumaVaastu_Report_' + (formData?.name || 'Guest').replace(/\s+/g, '_') + '.pdf');
            }}
          >
            📄 Generate Report
          </Button>

          <Button
            className="bg-orange-500 hover:bg-orange-600 text-white hover:orange-gradient-hover transition-transform duration-300 ease-in-out hover:scale-105"
            onClick={() => setIsDialogOpen(true)}
          >
            Full Report
          </Button>
        </div>
      </div>

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