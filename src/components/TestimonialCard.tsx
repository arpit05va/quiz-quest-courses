
import { Card, CardContent } from '@/components/ui/card';
import { Star } from 'lucide-react';

interface Testimonial {
  name: string;
  role: string;
  content: string;
  avatar: string;
  rating: number;
}

interface TestimonialCardProps {
  testimonial: Testimonial;
  index: number;
}

const TestimonialCard = ({ testimonial, index }: TestimonialCardProps) => {
  return (
    <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300 animate-fade-in" style={{ animationDelay: `${index * 0.2}s` }}>
      <CardContent className="p-6">
        <div className="flex items-center mb-4">
          {[...Array(testimonial.rating)].map((_, i) => (
            <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
          ))}
        </div>
        
        <blockquote className="text-muted-foreground mb-6 leading-relaxed">
          "{testimonial.content}"
        </blockquote>
        
        <div className="flex items-center">
          <img
            src={testimonial.avatar}
            alt={testimonial.name}
            className="w-12 h-12 rounded-full object-cover mr-4"
          />
          <div>
            <p className="font-semibold text-foreground">{testimonial.name}</p>
            <p className="text-sm text-muted-foreground">{testimonial.role}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TestimonialCard;
