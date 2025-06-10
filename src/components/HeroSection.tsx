
import { Button } from '@/components/ui/button';
import { Users, Star, BookOpen } from 'lucide-react';

const HeroSection = () => {
  return (
    <section className="relative py-20 px-4 overflow-hidden bg-gradient-to-br from-background via-background/90 to-muted/30">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-primary to-secondary rounded-full animate-pulse-glow animate-float"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-secondary to-primary rounded-full animate-pulse-glow animate-float" style={{ animationDelay: '1s' }}></div>
      </div>
      
      <div className="container mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left animate-fade-in">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight animate-bounce-in">
              Learn Skills That
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary animate-gradient mt-2">
                Shape Your Future
              </span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-xl animate-fade-in leading-relaxed" style={{ animationDelay: '0.3s' }}>
              Access thousands of courses taught by industry experts. Learn at your own pace with interactive content, quizzes, and hands-on projects.
            </p>
            
            {/* Animated Stats */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-6 md:gap-8 mb-8">
              {[
                { icon: Users, text: '50K+ Students', delay: '0.4s' },
                { icon: BookOpen, text: '200+ Courses', delay: '0.5s' },
                { icon: Star, text: '4.8 Rating', delay: '0.6s' }
              ].map((stat, index) => (
                <div 
                  key={index}
                  className="flex items-center space-x-2 animate-bounce-in hover-lift cursor-pointer bg-background/50 backdrop-blur-sm px-4 py-2 rounded-full border border-border/50"
                  style={{ animationDelay: stat.delay }}
                >
                  <stat.icon className="w-5 h-5 text-primary animate-pulse" />
                  <span className="text-foreground font-medium">{stat.text}</span>
                </div>
              ))}
            </div>

            {/* Animated CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white px-8 py-4 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 animate-bounce-in hover-lift group relative overflow-hidden"
                style={{ animationDelay: '0.7s' }}
              >
                <span className="relative z-10">Start Learning Today</span>
                <div className="absolute inset-0 animate-shimmer"></div>
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="border-2 border-border hover:border-primary bg-background/80 backdrop-blur-sm hover:bg-primary hover:text-primary-foreground px-8 py-4 text-lg font-semibold rounded-full transition-all duration-300 animate-bounce-in hover-lift group"
                style={{ animationDelay: '0.8s' }}
              >
                <BookOpen className="w-5 h-5 mr-2 group-hover:animate-pulse" />
                Explore Courses
              </Button>
            </div>
          </div>

          {/* Right Visual with enhanced animations */}
          <div className="relative animate-scale-in" style={{ animationDelay: '0.2s' }}>
            <div className="relative hover-lift">
              <img
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=400&fit=crop"
                alt="Students learning online"
                className="rounded-2xl shadow-2xl w-full transition-all duration-500 hover:shadow-3xl border border-border/20"
              />
              
              {/* Enhanced Floating Cards */}
              <div className="absolute -top-6 -left-6 bg-card/90 backdrop-blur-sm rounded-xl shadow-lg p-4 animate-slide-in hover-lift group cursor-pointer border border-border">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center animate-pulse-glow group-hover:animate-bounce">
                    <BookOpen className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-card-foreground">New Course</p>
                    <p className="text-sm text-muted-foreground">Just Added</p>
                  </div>
                </div>
              </div>
              
              <div className="absolute -bottom-6 -right-6 bg-card/90 backdrop-blur-sm rounded-xl shadow-lg p-4 animate-slide-in hover-lift group cursor-pointer border border-border" style={{ animationDelay: '0.4s' }}>
                <div className="text-center">
                  <p className="text-2xl font-bold text-card-foreground group-hover:animate-pulse">98%</p>
                  <p className="text-sm text-muted-foreground">Success Rate</p>
                </div>
              </div>

              {/* Additional floating element */}
              <div className="absolute top-1/2 -right-8 bg-gradient-to-r from-secondary to-primary text-white rounded-full p-3 shadow-lg animate-float hover-lift cursor-pointer border-2 border-white/20" style={{ animationDelay: '1s' }}>
                <Star className="w-6 h-6 animate-spin" style={{ animationDuration: '3s' }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
