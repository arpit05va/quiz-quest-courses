
import React from 'react';

const AnimatedSocialLogos = () => {
  return (
    <div className="flex space-x-6">
      {/* Facebook Logo */}
      <div className="social-logo facebook-logo group cursor-pointer">
        <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:rotate-12 group-hover:shadow-lg group-hover:shadow-blue-500/50">
          <svg className="w-6 h-6 text-white group-hover:animate-bounce" fill="currentColor" viewBox="0 0 24 24">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
          </svg>
        </div>
      </div>

      {/* LinkedIn Logo */}
      <div className="social-logo linkedin-logo group cursor-pointer">
        <div className="w-10 h-10 bg-blue-700 rounded-lg flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:rotate-12 group-hover:shadow-lg group-hover:shadow-blue-700/50">
          <svg className="w-6 h-6 text-white group-hover:animate-pulse" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
          </svg>
        </div>
      </div>

      {/* Instagram Logo */}
      <div className="social-logo instagram-logo group cursor-pointer">
        <div className="w-10 h-10 bg-gradient-to-br from-purple-600 via-pink-600 to-orange-600 rounded-lg flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:rotate-12 group-hover:shadow-lg group-hover:shadow-pink-500/50 animate-gradient-slow">
          <svg className="w-6 h-6 text-white group-hover:animate-spin" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12.017 0C8.396 0 7.896.011 7.781.048 2.021.252 0 2.273 0 8.032v7.936c0 5.76 2.021 7.781 7.781 7.984.115.037.615.048 4.236.048 3.622 0 4.122-.011 4.236-.048 5.76-.203 7.781-2.224 7.781-7.984V8.032c0-5.759-2.021-7.78-7.781-7.984C16.138.011 15.638 0 12.017 0zm0 2.165c3.557 0 3.981.011 5.386.064 2.799.127 4.312 1.64 4.439 4.439.053 1.405.064 1.829.064 5.386 0 3.557-.011 3.981-.064 5.386-.127 2.799-1.64 4.312-4.439 4.439-1.405.053-1.829.064-5.386.064-3.557 0-3.981-.011-5.386-.064-2.799-.127-4.312-1.64-4.439-4.439-.053-1.405-.064-1.829-.064-5.386 0-3.557.011-3.981.064-5.386.127-2.799 1.64-4.312 4.439-4.439 1.405-.053 1.829-.064 5.386-.064zm0 3.67c-3.315 0-6.002 2.687-6.002 6.002 0 3.315 2.687 6.002 6.002 6.002 3.315 0 6.002-2.687 6.002-6.002 0-3.315-2.687-6.002-6.002-6.002zm0 9.903c-2.154 0-3.901-1.747-3.901-3.901s1.747-3.901 3.901-3.901 3.901 1.747 3.901 3.901-1.747 3.901-3.901 3.901zm7.618-10.094c0 .775-.631 1.406-1.406 1.406-.775 0-1.406-.631-1.406-1.406s.631-1.406 1.406-1.406 1.406.631 1.406 1.406z"/>
          </svg>
        </div>
      </div>

      {/* YouTube Logo */}
      <div className="social-logo youtube-logo group cursor-pointer">
        <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:rotate-12 group-hover:shadow-lg group-hover:shadow-red-500/50">
          <svg className="w-6 h-6 text-white group-hover:animate-pulse" fill="currentColor" viewBox="0 0 24 24">
            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default AnimatedSocialLogos;
