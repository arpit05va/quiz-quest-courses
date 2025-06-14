
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Play, Clock, Eye, Star, CheckCircle2 } from 'lucide-react';

const TutorialsList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const tutorials = [
    {
      id: 1,
      title: 'Getting Started with React',
      description: 'Learn the basics of React and component-based development through hands-on exercises and real-world examples.',
      duration: '30 min',
      difficulty: 'Beginner',
      image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=250&fit=crop',
      views: 15420,
      rating: 4.7,
      completed: false,
      category: 'Programming',
      level: 'Beginner'
    },
    {
      id: 2,
      title: 'CSS Grid Layout Mastery',
      description: 'Master CSS Grid for creating responsive layouts with practical examples and advanced techniques.',
      duration: '45 min',
      difficulty: 'Intermediate',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=250&fit=crop',
      views: 12380,
      rating: 4.8,
      completed: true,
      category: 'Web Development',
      level: 'Intermediate'
    },
    {
      id: 3,
      title: 'JavaScript ES6+ Features',
      description: 'Explore modern JavaScript features and best practices including arrow functions, destructuring, and async/await.',
      duration: '60 min',
      difficulty: 'Intermediate',
      image: 'https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=400&h=250&fit=crop',
      views: 18950,
      rating: 4.9,
      completed: false,
      category: 'Programming',
      level: 'Intermediate'
    },
    {
      id: 4,
      title: 'Node.js Backend Development',
      description: 'Build scalable backend applications with Node.js and Express, including REST APIs and database integration.',
      duration: '75 min',
      difficulty: 'Advanced',
      image: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=400&h=250&fit=crop',
      views: 9876,
      rating: 4.6,
      completed: false,
      category: 'Backend',
      level: 'Advanced'
    }
  ];

  const filteredTutorials = tutorials.filter(tutorial =>
    tutorial.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tutorial.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleStartTutorial = (tutorialId: number) => {
    navigate(`/tutorial/${tutorialId}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <h2 className="text-3xl font-bold text-foreground mb-4 md:mb-0">
          Interactive Tutorials
        </h2>
        
        <div className="max-w-md w-full md:w-auto">
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <Input
              type="text"
              placeholder="Search tutorials..."
              className="pl-10 pr-4 py-3 w-full rounded-full border-2"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTutorials.map((tutorial, index) => (
          <Card key={tutorial.id} className="border-none shadow-lg hover:shadow-xl transition-all duration-300 group hover-lift">
            <div className="relative overflow-hidden rounded-t-lg">
              <img 
                src={tutorial.image} 
                alt={tutorial.title}
                className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute top-4 left-4">
                <Badge variant="secondary" className="bg-white/20 backdrop-blur-sm text-white border-white/20">
                  {tutorial.category}
                </Badge>
              </div>
              <div className="absolute top-4 right-4">
                <Badge variant="secondary" className="bg-white/20 backdrop-blur-sm text-white border-white/20">
                  {tutorial.level}
                </Badge>
              </div>
              {tutorial.completed && (
                <div className="absolute bottom-4 right-4">
                  <Badge className="bg-green-500 text-white">
                    <CheckCircle2 className="w-3 h-3 mr-1" />
                    Completed
                  </Badge>
                </div>
              )}
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center">
                <Play className="w-12 h-12 text-white opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300" />
              </div>
            </div>
            
            <CardContent className="p-6">
              <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
                {tutorial.title}
              </h3>
              <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                {tutorial.description}
              </p>
              
              <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                <div className="flex items-center space-x-1">
                  <Clock className="w-4 h-4" />
                  <span>{tutorial.duration}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Eye className="w-4 h-4" />
                  <span>{(tutorial.views / 1000).toFixed(1)}k views</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span>{tutorial.rating}</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <Badge variant="outline" className="text-sm">
                  {tutorial.difficulty}
                </Badge>
                <Button 
                  onClick={() => handleStartTutorial(tutorial.id)}
                  className="bg-primary hover:bg-primary/90"
                  variant={tutorial.completed ? "outline" : "default"}
                >
                  <Play className="w-4 h-4 mr-2" />
                  {tutorial.completed ? 'Watch Again' : 'Start Tutorial'}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TutorialsList;
