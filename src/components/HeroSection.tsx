
import { Button } from '@/components/ui/button';
import { Users, Star, BookOpen } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const HeroSection = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const floatingVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        delay: 0.8
      }
    }
  };

  return (
    <section ref={ref} className="relative py-20 px-4 overflow-hidden bg-gradient-to-br from-background via-background/90 to-muted/30">
      {/* Animated background elements with parallax */}
      <motion.div 
        style={{ y }}
        className="absolute inset-0 opacity-5"
      >
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-primary to-secondary rounded-full animate-pulse-glow animate-float"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-secondary to-primary rounded-full animate-pulse-glow animate-float" style={{ animationDelay: '1s' }}></div>
      </motion.div>
      
      <div className="container mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div 
            className="text-center lg:text-left"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.h1 
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight"
              variants={itemVariants}
            >
              Learn Skills That
              <motion.span 
                className="block text-primary font-bold mt-2"
                variants={itemVariants}
              >
                Shape Your Future
              </motion.span>
            </motion.h1>
            
            <motion.p 
              className="text-lg md:text-xl text-muted-foreground mb-8 max-w-xl leading-relaxed"
              variants={itemVariants}
            >
              Access thousands of courses taught by industry experts. Learn at your own pace with interactive content, quizzes, and hands-on projects.
            </motion.p>
            
            {/* Animated Stats */}
            <motion.div 
              className="flex flex-wrap justify-center lg:justify-start gap-6 md:gap-8 mb-8"
              variants={containerVariants}
            >
              {[
                { icon: Users, text: '50K+ Students' },
                { icon: BookOpen, text: '200+ Courses' },
                { icon: Star, text: '4.8 Rating' }
              ].map((stat, index) => (
                <motion.div 
                  key={index}
                  className="flex items-center space-x-2 cursor-pointer bg-background/50 backdrop-blur-sm px-4 py-2 rounded-full border border-border/50 transition-all duration-300"
                  variants={floatingVariants}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <stat.icon className="w-5 h-5 text-primary animate-pulse" />
                  <span className="text-foreground font-medium">{stat.text}</span>
                </motion.div>
              ))}
            </motion.div>

            {/* Animated CTA Buttons */}
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              variants={containerVariants}
            >
              <motion.div variants={itemVariants}>
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white px-8 py-4 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group relative overflow-hidden"
                >
                  <span className="relative z-10">Start Learning Today</span>
                  <div className="absolute inset-0 animate-shimmer"></div>
                </Button>
              </motion.div>
              
              <motion.div variants={itemVariants}>
                <Button 
                  variant="outline" 
                  size="lg"
                  className="border-2 border-border hover:border-primary bg-background/80 backdrop-blur-sm hover:bg-primary hover:text-primary-foreground px-8 py-4 text-lg font-semibold rounded-full transition-all duration-300 group"
                >
                  <BookOpen className="w-5 h-5 mr-2 group-hover:animate-pulse" />
                  Explore Courses
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Right Visual with enhanced animations */}
          <motion.div 
            className="relative"
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <motion.div 
              className="relative"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <motion.img
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=400&fit=crop"
                alt="Students learning online"
                className="rounded-2xl shadow-2xl w-full transition-all duration-500 border border-border/20"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              />
              
              {/* Enhanced Floating Cards */}
              <motion.div 
                className="absolute -top-6 -left-6 bg-card/90 backdrop-blur-sm rounded-xl shadow-lg p-4 group cursor-pointer border border-border"
                initial={{ scale: 0, rotate: -10 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ duration: 0.5, delay: 1.0 }}
                whileHover={{ scale: 1.05, rotate: 2 }}
              >
                <div className="flex items-center space-x-3">
                  <motion.div 
                    className="w-12 h-12 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center"
                    whileHover={{ rotate: 180 }}
                    transition={{ duration: 0.5 }}
                  >
                    <BookOpen className="w-6 h-6 text-white" />
                  </motion.div>
                  <div>
                    <p className="font-semibold text-card-foreground">New Course</p>
                    <p className="text-sm text-muted-foreground">Just Added</p>
                  </div>
                </div>
              </motion.div>
              
              <motion.div 
                className="absolute -bottom-6 -right-6 bg-card/90 backdrop-blur-sm rounded-xl shadow-lg p-4 group cursor-pointer border border-border"
                initial={{ scale: 0, rotate: 10 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ duration: 0.5, delay: 1.2 }}
                whileHover={{ scale: 1.05, rotate: -2 }}
              >
                <div className="text-center">
                  <motion.p 
                    className="text-2xl font-bold text-card-foreground"
                    whileHover={{ scale: 1.1 }}
                  >
                    98%
                  </motion.p>
                  <p className="text-sm text-muted-foreground">Success Rate</p>
                </div>
              </motion.div>

              {/* Additional floating element */}
              <motion.div 
                className="absolute top-1/2 -right-8 bg-gradient-to-r from-secondary to-primary text-white rounded-full p-3 shadow-lg cursor-pointer border-2 border-white/20"
                initial={{ scale: 0, rotate: 0 }}
                animate={{ 
                  scale: 1, 
                  rotate: [0, 360],
                  y: [0, -10, 0]
                }}
                transition={{
                  scale: { duration: 0.8, delay: 1.4 },
                  rotate: { duration: 10, repeat: Infinity, ease: "linear" },
                  y: { duration: 3, repeat: Infinity, ease: "easeInOut" }
                }}
                whileHover={{ scale: 1.1 }}
              >
                <Star className="w-6 h-6" />
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
