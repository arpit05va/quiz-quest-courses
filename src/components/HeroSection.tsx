
import { Button } from '@/components/ui/button';
import { Play, Users, Star, BookOpen } from 'lucide-react';

const HeroSection = () => {
  return (
    <section className="relative py-20 px-4 overflow-hidden">
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left animate-fade-in">
            <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Learn Skills That
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-secondary-500">
                Shape Your Future
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-xl">
              Access thousands of courses taught by industry experts. Learn at your own pace with interactive content, quizzes, and hands-on projects.
            </p>
            
            {/* Stats */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-8 mb-8">
              <div className="flex items-center space-x-2">
                <Users className="w-5 h-5 text-primary-500" />
                <span className="text-gray-700 font-medium">50K+ Students</span>
              </div>
              <div className="flex items-center space-x-2">
                <BookOpen className="w-5 h-5 text-primary-500" />
                <span className="text-gray-700 font-medium">200+ Courses</span>
              </div>
              <div className="flex items-center space-x-2">
                <Star className="w-5 h-5 text-yellow-500" />
                <span className="text-gray-700 font-medium">4.8 Rating</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 text-white px-8 py-4 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Start Learning Today
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="border-2 border-gray-300 hover:border-primary-500 px-8 py-4 text-lg font-semibold rounded-full transition-all duration-300"
              >
                <Play className="w-5 h-5 mr-2" />
                Watch Demo
              </Button>
            </div>
          </div>

          {/* Right Visual */}
          <div className="relative animate-scale-in">
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=400&fit=crop"
                alt="Students learning online"
                className="rounded-2xl shadow-2xl w-full"
              />
              {/* Floating Cards */}
              <div className="absolute -top-6 -left-6 bg-white rounded-xl shadow-lg p-4 animate-slide-in">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center">
                    <Play className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Live Session</p>
                    <p className="text-sm text-gray-600">Starting in 10 min</p>
                  </div>
                </div>
              </div>
              
              <div className="absolute -bottom-6 -right-6 bg-white rounded-xl shadow-lg p-4 animate-slide-in" style={{ animationDelay: '0.2s' }}>
                <div className="text-center">
                  <p className="text-2xl font-bold text-gray-900">98%</p>
                  <p className="text-sm text-gray-600">Success Rate</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
