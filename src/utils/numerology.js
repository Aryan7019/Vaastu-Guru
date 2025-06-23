export const calculateNumerology = (name, birthDate) => {
  const dateNumbers = birthDate.replace(/-/g, '').split('').map(Number);
  let lifePathSum = dateNumbers.reduce((sum, num) => sum + num, 0);

  while (lifePathSum > 9 && lifePathSum !== 11 && lifePathSum !== 22 && lifePathSum !== 33) {
    lifePathSum = lifePathSum.toString().split('').map(Number).reduce((sum, num) => sum + num, 0);
  }

  const nameValues = {
    'A': 1, 'B': 2, 'C': 3, 'D': 4, 'E': 5, 'F': 8, 'G': 3, 'H': 5, 'I': 1,
    'J': 1, 'K': 2, 'L': 3, 'M': 4, 'N': 5, 'O': 7, 'P': 8, 'Q': 6, 'R': 2,
    'S': 3, 'T': 4, 'U': 6, 'V': 6, 'W': 6, 'X': 5, 'Y': 1, 'Z': 7
  };

  let destinySum = name.toUpperCase().replace(/[^A-Z]/g, '').split('').reduce((sum, char) => {
    return sum + (nameValues[char] || 0);
  }, 0);

  while (destinySum > 9 && destinySum !== 11 && destinySum !== 22 && destinySum !== 33) {
    destinySum = destinySum.toString().split('').map(Number).reduce((sum, num) => sum + num, 0);
  }

  const vowels = 'AEIOU';
  let soulUrgeSum = name.toUpperCase().split('').reduce((sum, char) => {
    return vowels.includes(char) ? sum + (nameValues[char] || 0) : sum;
  }, 0);

  while (soulUrgeSum > 9 && soulUrgeSum !== 11 && soulUrgeSum !== 22 && soulUrgeSum !== 33) {
    soulUrgeSum = soulUrgeSum.toString().split('').map(Number).reduce((sum, num) => sum + num, 0);
  }

  return {
    lifePathNumber: lifePathSum,
    destinyNumber: destinySum,
    soulUrgeNumber: soulUrgeSum
  };
};

export const getNumberMeaning = (number, type) => {
  const meanings = {
    1: {
      lifePath: "You are a natural leader with strong independence and pioneering spirit. Your path involves initiating new projects and leading others.",
      destiny: "Your destiny is to lead and innovate. You're meant to be a trailblazer in your chosen field.",
      soulUrge: "Deep down, you desire to be first, to lead, and to achieve recognition for your unique contributions."
    },
    2: {
      lifePath: "You are a natural diplomat and peacemaker. Your path involves cooperation, partnership, and bringing harmony to situations.",
      destiny: "Your destiny is to work with others and create harmony. You excel in supportive roles and partnerships.",
      soulUrge: "Your soul craves peace, cooperation, and meaningful relationships. You want to help and support others."
    },
    3: {
      lifePath: "You are creative, expressive, and optimistic. Your path involves communication, creativity, and inspiring others through your talents.",
      destiny: "Your destiny is to express yourself creatively and inspire others. You're meant to be an artist, writer, or entertainer.",
      soulUrge: "Your soul desires creative expression and the joy of inspiring others through your artistic abilities."
    },
    4: {
      lifePath: "You are practical, organized, and hardworking. Your path involves building solid foundations and creating lasting structures.",
      destiny: "Your destiny is to build and organize. You're meant to create systems and structures that benefit others.",
      soulUrge: "Your soul craves stability, order, and the satisfaction of building something lasting and meaningful."
    },
    5: {
      lifePath: "You are adventurous, versatile, and freedom-loving. Your path involves exploration, change, and experiencing life's variety.",
      destiny: "Your destiny is to explore and experience freedom. You're meant to travel, learn, and share your experiences.",
      soulUrge: "Your soul desires freedom, adventure, and the excitement of new experiences and discoveries."
    },
    6: {
      lifePath: "You are nurturing, responsible, and family-oriented. Your path involves caring for others and creating harmony in relationships.",
      destiny: "Your destiny is to nurture and heal. You're meant to be a caregiver, counselor, or healer.",
      soulUrge: "Your soul craves the opportunity to care for others and create a loving, harmonious environment."
    },
    7: {
      lifePath: "You are analytical, introspective, and spiritually inclined. Your path involves seeking truth and deeper understanding.",
      destiny: "Your destiny is to seek wisdom and spiritual truth. You're meant to be a researcher, analyst, or spiritual teacher.",
      soulUrge: "Your soul desires knowledge, understanding, and spiritual growth. You seek the deeper meaning of life."
    },
    8: {
      lifePath: "You are ambitious, business-minded, and success-oriented. Your path involves material achievement and leadership in business.",
      destiny: "Your destiny is to achieve material success and lead in business. You're meant to be an executive or entrepreneur.",
      soulUrge: "Your soul desires material success, recognition, and the power to make significant changes in the world."
    },
    9: {
      lifePath: "You are humanitarian, generous, and wise. Your path involves serving humanity and making the world a better place.",
      destiny: "Your destiny is to serve humanity. You're meant to be a humanitarian, teacher, or healer on a global scale.",
      soulUrge: "Your soul desires to help humanity and make a positive impact on the world through compassion and service."
    },
    11: {
      lifePath: "You are highly intuitive and spiritually gifted. Your path involves inspiring others through your psychic abilities and spiritual insights.",
      destiny: "Your destiny is to be a spiritual teacher and inspire others. You have strong intuitive and psychic abilities.",
      soulUrge: "Your soul desires spiritual enlightenment and the ability to inspire others through your intuitive gifts."
    },
    22: {
      lifePath: "You are a master builder with the ability to turn dreams into reality. Your path involves creating something significant for humanity.",
      destiny: "Your destiny is to be a master builder. You can manifest great things and create lasting impact on a large scale.",
      soulUrge: "Your soul desires to build something magnificent that will benefit humanity for generations to come."
    },
    33: {
      lifePath: "You are a master teacher and healer. Your path involves teaching, healing, and uplifting humanity through compassion.",
      destiny: "Your destiny is to be a master teacher and healer. You're meant to guide and heal others with unconditional love.",
      soulUrge: "Your soul desires to teach, heal, and serve humanity with the highest form of love and compassion."
    }
  };

  return meanings[number]?.[type] || "This number carries special significance in your numerological profile.";
};