
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Users, Clock, Star } from 'lucide-react';

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
}

interface CourseCardProps {
  course: Course;
  index: number;
}

const CourseCard = ({ course, index }: CourseCardProps) => {
  return (
    <Card className="group hover:shadow-xl transition-all duration-300 border-none shadow-lg animate-fade-in overflow-hidden" style={{ animationDelay: `${index * 0.1}s` }}>
      <div className="relative overflow-hidden">
        <img
          src={course.image}
          alt={course.title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-4 left-4">
          <Badge className="bg-white/90 text-gray-800 hover:bg-white">
            {course.category}
          </Badge>
        </div>
        <div className="absolute top-4 right-4">
          <Badge variant="secondary" className="bg-secondary-500 text-white">
            {course.level}
          </Badge>
        </div>
      </div>
      
      <CardHeader className="pb-2">
        <h3 className="text-xl font-semibold text-gray-900 group-hover:text-primary-600 transition-colors line-clamp-2">
          {course.title}
        </h3>
        <p className="text-gray-600 text-sm line-clamp-2">{course.description}</p>
      </CardHeader>
      
      <CardContent>
        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
          <div className="flex items-center space-x-1">
            <Users className="w-4 h-4" />
            <span>{course.students.toLocaleString()} students</span>
          </div>
          <div className="flex items-center space-x-1">
            <Clock className="w-4 h-4" />
            <span>{course.duration}</span>
          </div>
        </div>
        
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-1">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="font-medium">{course.rating}</span>
            <span className="text-gray-500 text-sm">({course.students} reviews)</span>
          </div>
          <span className="text-2xl font-bold text-primary-600">{course.price}</span>
        </div>
        
        <Button className="w-full bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 text-white font-semibold">
          Enroll Now
        </Button>
      </CardContent>
    </Card>
  );
};

export default CourseCard;
