
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Play, Clock, Eye, Star, CheckCircle2 } from 'lucide-react';

const TutorialDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Mock tutorial data - in a real app, this would come from an API
  const tutorial = {
    id: Number(id),
    title: 'Getting Started with React',
    description: 'Learn the basics of React and component-based development through hands-on exercises and real-world examples.',
    duration: '30 min',
    difficulty: 'Beginner',
    image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=400&fit=crop',
    views: 15420,
    rating: 4.7,
    completed: false,
    videoUrl: 'https://example.com/video',
    content: `
      In this tutorial, you'll learn:
      
      1. What is React and why use it?
      2. Setting up your development environment
      3. Creating your first React component
      4. Understanding JSX syntax
      5. Managing component state
      6. Handling events in React
      7. Best practices and common patterns
      
      By the end of this tutorial, you'll have a solid foundation in React development.
    `,
    tags: ['React', 'JavaScript', 'Frontend', 'Beginner']
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Button 
          variant="ghost" 
          onClick={() => navigate('/dashboard')}
          className="mb-6 flex items-center space-x-2"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Dashboard</span>
        </Button>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <Card className="border-none shadow-lg">
              <div className="relative overflow-hidden rounded-t-lg">
                <img 
                  src={tutorial.image} 
                  alt={tutorial.title}
                  className="w-full h-64 object-cover"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <Button size="lg" className="bg-white/20 backdrop-blur-sm text-white border-white/20 hover:bg-white/30">
                    <Play className="w-6 h-6 mr-2" />
                    Start Tutorial
                  </Button>
                </div>
              </div>
              
              <CardContent className="p-6">
                <div className="flex flex-wrap gap-2 mb-4">
                  {tutorial.tags.map((tag) => (
                    <Badge key={tag} variant="outline">
                      {tag}
                    </Badge>
                  ))}
                </div>
                
                <h1 className="text-3xl font-bold text-foreground mb-4">{tutorial.title}</h1>
                <p className="text-lg text-muted-foreground mb-6">{tutorial.description}</p>
                
                <div className="prose prose-sm max-w-none">
                  <pre className="whitespace-pre-wrap text-sm">{tutorial.content}</pre>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Tutorial Info */}
            <Card className="border-none shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg">Tutorial Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Duration:</span>
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span className="font-medium">{tutorial.duration}</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Difficulty:</span>
                  <Badge variant="outline">{tutorial.difficulty}</Badge>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Views:</span>
                  <div className="flex items-center space-x-1">
                    <Eye className="w-4 h-4" />
                    <span className="font-medium">{tutorial.views.toLocaleString()}</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Rating:</span>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium">{tutorial.rating}</span>
                  </div>
                </div>
                
                {tutorial.completed && (
                  <div className="flex items-center space-x-2 text-green-600">
                    <CheckCircle2 className="w-4 h-4" />
                    <span className="font-medium">Completed</span>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Actions */}
            <Card className="border-none shadow-lg">
              <CardContent className="p-6 space-y-4">
                <Button className="w-full" size="lg">
                  <Play className="w-4 h-4 mr-2" />
                  {tutorial.completed ? 'Watch Again' : 'Start Tutorial'}
                </Button>
                
                <Button variant="outline" className="w-full">
                  Save for Later
                </Button>
                
                <Button variant="outline" className="w-full">
                  Share Tutorial
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TutorialDetail;
