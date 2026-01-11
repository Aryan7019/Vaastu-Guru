import { memo } from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Facebook, Instagram, Twitter, Youtube } from 'lucide-react';

// Static data moved outside component
const QUICK_LINKS = [
  { name: 'Home', path: '/' },
  { name: 'About Us', path: '/learn' },
  { name: 'Services', path: '/services' },
  { name: 'Calculator', path: '/calculator' },
  { name: 'Therapy', path: '/therapy' }
];

const SERVICE_LINKS = [
  { name: 'Numerology', path: '/services' },
  { name: 'Vaastu Consultation', path: '/services' },
  { name: 'Name Correction', path: '/services' },
  { name: 'Color Therapy', path: '/therapy' },
  { name: 'Pyramid Therapy', path: '/therapy' }
];

const SOCIAL_LINKS = [
  { icon: Facebook, href: 'https://www.facebook.com/yashrajguruji', label: 'Facebook' },
  { icon: Instagram, href: 'https://www.instagram.com/yashrajguruji', label: 'Instagram' },
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Youtube, href: '#', label: 'Youtube' }
];

const Footer = memo(() => {
  return (
    <footer className="bg-[#2a2118] text-gray-300 relative z-20">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-8 sm:py-12">
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {/* Brand Section */}
          <div className="col-span-2 sm:col-span-2 lg:col-span-1 space-y-3 sm:space-y-4">
            <div className="flex items-center gap-2 sm:gap-3">
              <img 
                src="/images/bhaggya darshhan.png" 
                alt="NumaVaastu Logo" 
                className="w-10 h-10 sm:w-14 sm:h-14 object-contain"
              />
              <span className="text-lg sm:text-xl font-bold text-white">NumaVaastu</span>
            </div>
            <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">
              Combining ancient wisdom of Numerology and Vaastu Shastra for your complete life transformation.
            </p>
            {/* Social Icons */}
            <div className="flex gap-2 sm:gap-3 pt-2">
              {SOCIAL_LINKS.map(({ icon: Icon, href, label }) => (
                <a 
                  key={label}
                  href={href} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-8 h-8 sm:w-9 sm:h-9 bg-[#3d3028] hover:bg-orange-500 rounded-full flex items-center justify-center transition-all duration-300"
                >
                  <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-orange-400 font-semibold text-base sm:text-lg mb-3 sm:mb-4">Quick Links</h3>
            <ul className="space-y-2 sm:space-y-3">
              {QUICK_LINKS.map(({ name, path }) => (
                <li key={name}>
                  <Link to={path} className="text-gray-400 hover:text-orange-400 transition-colors duration-300 text-xs sm:text-sm">
                    {name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-orange-400 font-semibold text-base sm:text-lg mb-3 sm:mb-4">Services</h3>
            <ul className="space-y-2 sm:space-y-3">
              {SERVICE_LINKS.map(({ name, path }) => (
                <li key={name}>
                  <Link to={path} className="text-gray-400 hover:text-orange-400 transition-colors duration-300 text-xs sm:text-sm">
                    {name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Us */}
          <div className="col-span-2 sm:col-span-1">
            <h3 className="text-orange-400 font-semibold text-base sm:text-lg mb-3 sm:mb-4">Contact Us</h3>
            <ul className="space-y-3 sm:space-y-4">
              <li className="flex items-center gap-2 sm:gap-3">
                <Phone className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-orange-400 flex-shrink-0" />
                <a href="tel:+919650881509" className="text-gray-400 hover:text-orange-400 transition-colors duration-300 text-xs sm:text-sm">
                  +91 96508 81509
                </a>
              </li>
              <li className="flex items-center gap-2 sm:gap-3">
                <Mail className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-orange-400 flex-shrink-0" />
                <a href="mailto:vaastuguru12@gmail.com" className="text-gray-400 hover:text-orange-400 transition-colors duration-300 text-xs sm:text-sm break-all">
                  vaastuguru12@gmail.com
                </a>
              </li>
              <li className="flex items-start gap-2 sm:gap-3">
                <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-orange-400 flex-shrink-0 mt-0.5" />
                <span className="text-gray-400 text-xs sm:text-sm">
                  C1, Yamuna Vihar,<br />New Delhi, India - 110053
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-[#3d3028]">
        <div className="container mx-auto px-4 py-3 sm:py-4">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4">
            <p className="text-gray-500 text-xs sm:text-sm text-center sm:text-left">
              © {new Date().getFullYear()} NumaVaastu. All rights reserved.
            </p>
            <div className="flex gap-4 sm:gap-6">
              <a href="#" className="text-gray-500 hover:text-orange-400 transition-colors duration-300 text-xs sm:text-sm">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-500 hover:text-orange-400 transition-colors duration-300 text-xs sm:text-sm">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
});

export default Footer;