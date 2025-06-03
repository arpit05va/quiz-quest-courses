
import { BookOpen, Mail, Phone, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Footer = () => {
  const footerLinks = {
    'Quick Links': [
      { name: 'About Us', href: '#' },
      { name: 'Courses', href: '#' },
      { name: 'Pricing', href: '#' },
      { name: 'Blog', href: '#' },
      { name: 'Contact', href: '#' }
    ],
    'Support': [
      { name: 'Help Center', href: '#' },
      { name: 'FAQs', href: '#' },
      { name: 'Community', href: '#' },
      { name: 'Terms of Service', href: '#' },
      { name: 'Privacy Policy', href: '#' }
    ],
    'Categories': [
      { name: 'Programming', href: '#' },
      { name: 'Data Science', href: '#' },
      { name: 'Design', href: '#' },
      { name: 'Business', href: '#' },
      { name: 'Marketing', href: '#' }
    ]
  };

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold">EduPlatform</span>
            </div>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Empowering learners worldwide with high-quality education and innovative learning experiences.
            </p>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-gray-400">
                <Mail className="w-5 h-5" />
                <span>hello@eduplatform.com</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-400">
                <Phone className="w-5 h-5" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-400">
                <MapPin className="w-5 h-5" />
                <span>123 Education St, Learning City</span>
              </div>
            </div>
          </div>

          {/* Links Sections */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="text-lg font-semibold mb-6">{title}</h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors duration-200"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-center md:text-left">
              © 2024 EduPlatform. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                Facebook
              </Button>
              <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                Twitter
              </Button>
              <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                LinkedIn
              </Button>
              <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                Instagram
              </Button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
