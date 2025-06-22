
import { BookOpen, Mail, Phone, MapPin, Code, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import AnimatedSocialLogos from './AnimatedSocialLogos';

const Footer = () => {
  const footerLinks = {
    'Quick Links': [
      { name: 'About Us', href: '/about' },
      { name: 'Courses', href: '/courses' },
      // { name: 'Pricing', href: '#' },
      // { name: 'Blog', href: '#' },
      { name: 'Contact', href: '/contact' }
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
    <footer className="bg-muted/50 dark:bg-gray-900 text-foreground dark:text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Enhanced Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-3 mb-6 group">
              <div className="relative">
                {/* Enhanced Logo Container */}
                <div className="w-12 h-12 bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/25 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 relative overflow-hidden">
                  {/* Animated Background Pattern */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-pulse opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  {/* Primary Icon */}
                  <Code className="w-7 h-7 text-white relative z-10" />
                  
                  {/* Secondary Icon */}
                  <Zap className="w-4 h-4 text-yellow-300 absolute top-1 right-1 animate-bounce opacity-0 group-hover:opacity-100 transition-all duration-300" />
                </div>
                
                {/* Glow Effect */}
                <div className="absolute inset-0 w-12 h-12 bg-gradient-to-br from-purple-600 to-cyan-500 rounded-xl blur-lg opacity-0 group-hover:opacity-30 transition-all duration-500 -z-10"></div>
              </div>
              
              {/* Enhanced Text Logo */}
              <div className="flex flex-col">
                <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-500 bg-clip-text text-transparent group-hover:from-purple-500 group-hover:via-blue-500 group-hover:to-cyan-400 transition-all duration-300">
                  code<span className="text-orange-500 group-hover:text-orange-400 transition-colors duration-300">X</span>Mania
                </span>
              </div>
            </div>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Empowering learners worldwide with high-quality education and innovative learning experiences.
            </p>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-muted-foreground">
                <Mail className="w-5 h-5" />
                <span>support@codexmania.com</span>
              </div>
              <div className="flex items-center space-x-3 text-muted-foreground">
                <Phone className="w-5 h-5" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3 text-muted-foreground">
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
                    {link.href.startsWith('#') ? (
                      <a
                        href={link.href}
                        className="text-muted-foreground hover:text-foreground transition-colors duration-200"
                      >
                        {link.name}
                      </a>
                    ) : (
                      <Link
                        to={link.href}
                        className="text-muted-foreground hover:text-foreground transition-colors duration-200"
                      >
                        {link.name}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="border-t border-border mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-muted-foreground text-center md:text-left">
              © 2025 codeXMania. All rights reserved.
            </p>
            <div className="mt-4 md:mt-0">
              <AnimatedSocialLogos />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
