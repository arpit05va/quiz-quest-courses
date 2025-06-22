
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Users, Clock, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuthCheck } from '@/hooks/useAuthCheck';

interface Course {
  id: number;
  title: string;
  description: string;
  duration: string;
  students: number;
  rating: number;
  image: string;
  price: string;
  category: string;
  level: string;
  instructor?: string;
}

interface CourseCardProps {
  course: Course;
  index: number;
  isEnrolled?: boolean;
}

const CourseCard = ({ course, index, isEnrolled = false }: CourseCardProps) => {
  const navigate = useNavigate();
  const { isAuthenticated, setShowLoginDialog } = useAuthCheck();

  const handleEnrollClick = () => {
    if (!isAuthenticated) {
      setShowLoginDialog(true);
      return;
    }
    // Navigate to course details page for enrollment
    navigate(`/course/${course.id}/details`);
  };

  const handleContinueClick = () => {
    // Navigate directly to course content for enrolled courses
    navigate(`/course/${course.id}`);
  };

  return (
    <Card className="group hover:shadow-xl transition-all duration-500 border-none shadow-lg animate-fade-in overflow-hidden hover-lift relative" style={{ animationDelay: `${index * 0.1}s` }}>
      {/* Shimmer effect overlay */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div className="absolute inset-0 animate-shimmer"></div>
      </div>
      
      <div className="relative overflow-hidden">
        <img
          src={course.image}
          alt={course.title}
          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-4 left-4 animate-bounce-in" style={{ animationDelay: `${index * 0.1 + 0.2}s` }}>
          <Badge className="bg-white/90 text-gray-800 hover:bg-white transition-all duration-300 hover:scale-105">
            {course.category}
          </Badge>
        </div>
        <div className="absolute top-4 right-4 animate-bounce-in" style={{ animationDelay: `${index * 0.1 + 0.3}s` }}>
          <Badge variant="secondary" className="bg-secondary-500 text-white hover:scale-105 transition-transform duration-300">
            {course.level}
          </Badge>
        </div>
        
        {isEnrolled && (
          <div className="absolute bottom-4 right-4">
            <Badge className="bg-green-600 text-white">
              Enrolled
            </Badge>
          </div>
        )}
        
        {/* Gradient overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>
      
      <CardHeader className="pb-2 relative z-10">
        <h3 className="text-xl font-semibold text-foreground group-hover:text-primary-600 transition-colors duration-300 line-clamp-2">
          {course.title}
        </h3>
        <p className="text-muted-foreground text-sm line-clamp-2">{course.description}</p>
        {course.instructor && (
          <p className="text-muted-foreground text-xs">By {course.instructor}</p>
        )}
      </CardHeader>
      
      <CardContent className="relative z-10">
        <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
          <div className="flex items-center space-x-1 group-hover:text-primary-500 transition-colors duration-300">
            <Users className="w-4 h-4 group-hover:animate-pulse" />
            <span>{course.students.toLocaleString()} students</span>
          </div>
          <div className="flex items-center space-x-1 group-hover:text-primary-500 transition-colors duration-300">
            <Clock className="w-4 h-4 group-hover:animate-pulse" />
            <span>{course.duration}</span>
          </div>
        </div>
        
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-1">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 group-hover:animate-bounce" />
            <span className="font-medium">{course.rating}</span>
            <span className="text-muted-foreground text-sm">({course.students} reviews)</span>
          </div>
          <span className="text-2xl font-bold text-primary-600 group-hover:animate-pulse">{course.price}</span>
        </div>
        
        <Button 
          onClick={isEnrolled ? handleContinueClick : handleEnrollClick}
          className={`w-full font-semibold transition-all duration-300 hover:shadow-lg rounded-full relative overflow-hidden group ${
            isEnrolled 
              ? 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white'
              : 'bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 text-white'
          }`}
        >
          <span className="relative z-10">
            {isEnrolled ? 'Continue Learning' : 'Enroll Now'}
          </span>
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 animate-shimmer transition-opacity duration-300"></div>
        </Button>
      </CardContent>
    </Card>
  );
};

export default CourseCard;
