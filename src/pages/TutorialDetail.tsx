
import { useParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Clock, Users, Star, BookOpen } from 'lucide-react';
import DashboardWrapper from '@/components/DashboardWrapper';
import QuizSection from '@/components/QuizSection';

const TutorialDetail = () => {
  const { id } = useParams();

  // Mock tutorial data
  const tutorial = {
    id: parseInt(id || '1'),
    title: 'Advanced React Hooks Tutorial',
    description: 'Master React Hooks with practical examples and best practices.',
    author: 'Jane Smith',
    duration: '45 min',
    views: 2500,
    rating: 4.9,
    category: 'React',
    level: 'Advanced',
    content: `
      <h3>Introduction to Advanced React Hooks</h3>
      <p>In this comprehensive tutorial, we'll explore advanced React hooks that will take your React development to the next level.</p>
      
      <h4>What You'll Learn</h4>
      <ul>
        <li>Custom hooks creation and best practices</li>
        <li>useContext for state management</li>
        <li>useReducer for complex state logic</li>
        <li>useMemo and useCallback for performance optimization</li>
        <li>useRef for accessing DOM elements</li>
      </ul>
      
      <h4>Prerequisites</h4>
      <p>Before starting this tutorial, you should have:</p>
      <ul>
        <li>Basic knowledge of React and useState/useEffect</li>
        <li>Understanding of JavaScript ES6+ features</li>
        <li>Familiarity with component lifecycle</li>
      </ul>
      
      <h4>Custom Hooks</h4>
      <p>Custom hooks allow you to extract component logic into reusable functions...</p>
    `
  };

  return (
    <DashboardWrapper title={tutorial.title}>
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Tutorial Header */}
        <Card className="border-none shadow-lg">
          <CardHeader>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <BookOpen className="w-6 h-6 text-primary" />
                </div>
                <Badge variant="outline">{tutorial.category}</Badge>
                <Badge variant="secondary">{tutorial.level}</Badge>
              </div>
              <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                <div className="flex items-center space-x-1">
                  <Clock className="w-4 h-4" />
                  <span>{tutorial.duration}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Users className="w-4 h-4" />
                  <span>{tutorial.views.toLocaleString()} views</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span>{tutorial.rating}</span>
                </div>
              </div>
            </div>
            <CardTitle className="text-3xl font-bold">{tutorial.title}</CardTitle>
            <p className="text-muted-foreground text-lg">{tutorial.description}</p>
            <p className="text-sm text-muted-foreground">by {tutorial.author}</p>
          </CardHeader>
        </Card>

        {/* Tutorial Content */}
        <Card className="border-none shadow-lg">
          <CardContent className="p-6">
            <Tabs defaultValue="content" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="content">Tutorial Content</TabsTrigger>
                <TabsTrigger value="quizzes">Practice Quizzes</TabsTrigger>
                <TabsTrigger value="discussion">Discussion</TabsTrigger>
              </TabsList>
              
              <TabsContent value="content" className="mt-6">
                <div 
                  className="prose max-w-none text-foreground"
                  dangerouslySetInnerHTML={{ __html: tutorial.content }}
                />
              </TabsContent>
              
              <TabsContent value="quizzes" className="mt-6">
                <QuizSection 
                  contentType="tutorial" 
                  contentId={id || '1'} 
                  contentTitle={tutorial.title} 
                />
              </TabsContent>
              
              <TabsContent value="discussion" className="mt-6">
                <div className="space-y-4">
                  <h4 className="font-semibold">Tutorial Discussion</h4>
                  <p className="text-muted-foreground">
                    Share your thoughts and ask questions about this tutorial.
                  </p>
                  <div className="space-y-3">
                    <div className="p-4 bg-muted/50 rounded-lg">
                      <div className="font-medium text-sm mb-1">Sarah Johnson</div>
                      <p className="text-sm text-muted-foreground">Great tutorial! The useReducer examples were really helpful.</p>
                    </div>
                    <div className="p-4 bg-muted/50 rounded-lg">
                      <div className="font-medium text-sm mb-1">Mike Chen</div>
                      <p className="text-sm text-muted-foreground">Could you add more examples for custom hooks?</p>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </DashboardWrapper>
  );
};

export default TutorialDetail;
