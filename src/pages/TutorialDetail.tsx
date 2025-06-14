
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  BookOpen, 
  CheckCircle, 
  Clock, 
  Users, 
  Star, 
  ArrowLeft,
  FileText,
  Award,
  Eye
} from 'lucide-react';

const TutorialDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [currentLesson, setCurrentLesson] = useState(0);
  const [completedLessons, setCompletedLessons] = useState(new Set([0]));

  // Mock tutorial data - in a real app, this would come from an API
  const tutorial = {
    id: Number(id),
    title: 'Getting Started with React',
    description: 'Learn the basics of React and component-based development through hands-on exercises and real-world examples.',
    instructor: 'Sarah Johnson',
    duration: '2 hours',
    students: 15420,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=400&fit=crop',
    views: 15420,
    category: 'Programming',
    level: 'Beginner',
    lessons: [
      {
        id: 1,
        title: 'Introduction to React',
        duration: '15 min read',
        type: 'text',
        completed: true,
        content: `
          <h3>What is React?</h3>
          <p>React is a JavaScript library for building user interfaces. It lets you compose complex UIs from small and isolated pieces of code called "components".</p>
          
          <h4>Why Use React?</h4>
          <ul>
            <li><strong>Component-Based:</strong> Build encapsulated components that manage their own state</li>
            <li><strong>Declarative:</strong> React makes it painless to create interactive UIs</li>
            <li><strong>Learn Once, Write Anywhere:</strong> You can develop new features without rewriting existing code</li>
          </ul>
          
          <h4>React Ecosystem</h4>
          <p>React has a rich ecosystem of tools and libraries that make development easier and more efficient.</p>
        `
      },
      {
        id: 2,
        title: 'Setting Up Your Environment',
        duration: '20 min read',
        type: 'text',
        completed: false,
        content: `
          <h3>Development Environment Setup</h3>
          <p>Before we start building React applications, we need to set up our development environment.</p>
          
          <h4>Prerequisites</h4>
          <ul>
            <li>Node.js (version 14 or higher)</li>
            <li>npm or yarn package manager</li>
            <li>Code editor (VS Code recommended)</li>
          </ul>
          
          <h4>Creating a New React App</h4>
          <pre>
npx create-react-app my-app
cd my-app
npm start
          </pre>
          
          <p>This will create a new React application and start the development server.</p>
        `
      },
      {
        id: 3,
        title: 'Your First Component',
        duration: '25 min read',
        type: 'text',
        completed: false,
        content: `
          <h3>Creating React Components</h3>
          <p>Components are the building blocks of any React application. Let's create your first component.</p>
          
          <h4>Function Components</h4>
          <pre>
function Welcome(props) {
  return &lt;h1&gt;Hello, {props.name}&lt;/h1&gt;;
}
          </pre>
          
          <h4>Using Components</h4>
          <pre>
function App() {
  return (
    &lt;div&gt;
      &lt;Welcome name="Sara" /&gt;
      &lt;Welcome name="Cahal" /&gt;
      &lt;Welcome name="Edite" /&gt;
    &lt;/div&gt;
  );
}
          </pre>
        `
      },
      {
        id: 4,
        title: 'React Knowledge Quiz',
        duration: '10 min',
        type: 'quiz',
        completed: false,
        questions: 5
      },
      {
        id: 5,
        title: 'Props and State',
        duration: '30 min read',
        type: 'text',
        completed: false,
        content: `
          <h3>Understanding Props and State</h3>
          <p>Props and state are fundamental concepts in React that help you manage data flow and component behavior.</p>
          
          <h4>Props</h4>
          <p>Props (short for properties) are how you pass data from parent to child components.</p>
          
          <h4>State</h4>
          <p>State is data that can change over time and affects how the component renders.</p>
          
          <pre>
import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    &lt;div&gt;
      &lt;p&gt;You clicked {count} times&lt;/p&gt;
      &lt;button onClick={() =&gt; setCount(count + 1)}&gt;
        Click me
      &lt;/button&gt;
    &lt;/div&gt;
  );
}
          </pre>
        `
      },
      {
        id: 6,
        title: 'Final Project',
        duration: '1 hour',
        type: 'project',
        completed: false
      }
    ]
  };

  const handleLessonComplete = (lessonId: number) => {
    const newCompleted = new Set(completedLessons);
    newCompleted.add(lessonId);
    setCompletedLessons(newCompleted);
  };

  const currentLessonData = tutorial.lessons[currentLesson];
  const completionPercentage = (completedLessons.size / tutorial.lessons.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      {/* Header */}
      <header className="bg-background/95 backdrop-blur-sm border-b border-border sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => navigate('/tutorials')}
                className="flex items-center space-x-2"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Tutorials</span>
              </Button>
              <Separator orientation="vertical" className="h-6" />
              <div>
                <h1 className="text-lg font-semibold text-foreground">{tutorial.title}</h1>
                <p className="text-sm text-muted-foreground">by {tutorial.instructor}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm font-medium">Progress</p>
                <p className="text-xs text-muted-foreground">{Math.round(completionPercentage)}% complete</p>
              </div>
              <Progress value={completionPercentage} className="w-24" />
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Content Area */}
            <Card className="border-none shadow-lg">
              <CardContent className="p-6">
                {currentLessonData.type === 'text' ? (
                  <div className="prose max-w-none">
                    <div className="mb-4">
                      <h2 className="text-2xl font-bold text-foreground mb-2">{currentLessonData.title}</h2>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-6">
                        <div className="flex items-center space-x-1">
                          <Clock className="w-4 h-4" />
                          <span>{currentLessonData.duration}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <FileText className="w-4 h-4" />
                          <span>Reading Material</span>
                        </div>
                      </div>
                    </div>
                    <div 
                      className="text-foreground leading-relaxed"
                      dangerouslySetInnerHTML={{ __html: currentLessonData.content || '' }}
                    />
                  </div>
                ) : currentLessonData.type === 'quiz' ? (
                  <div className="p-8 text-center">
                    <Award className="w-16 h-16 text-primary mx-auto mb-4" />
                    <h3 className="text-2xl font-bold mb-2">{currentLessonData.title}</h3>
                    <p className="text-muted-foreground mb-6">
                      Test your knowledge with {currentLessonData.questions} questions
                    </p>
                    <Button size="lg" className="bg-primary hover:bg-primary/90">
                      Start Quiz
                    </Button>
                  </div>
                ) : (
                  <div className="p-8 text-center">
                    <FileText className="w-16 h-16 text-primary mx-auto mb-4" />
                    <h3 className="text-2xl font-bold mb-2">{currentLessonData.title}</h3>
                    <p className="text-muted-foreground mb-6">
                      Apply your skills in this hands-on project
                    </p>
                    <Button size="lg" className="bg-primary hover:bg-primary/90">
                      Start Project
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Lesson Controls */}
            <Card className="border-none shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-lg">{currentLessonData.title}</h3>
                    <p className="text-muted-foreground">Lesson {currentLesson + 1} of {tutorial.lessons.length}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button 
                      variant="outline"
                      disabled={currentLesson === 0}
                      onClick={() => setCurrentLesson(currentLesson - 1)}
                    >
                      Previous
                    </Button>
                    {!completedLessons.has(currentLesson) && (
                      <Button 
                        onClick={() => handleLessonComplete(currentLesson)}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Mark Complete
                      </Button>
                    )}
                    <Button 
                      disabled={currentLesson === tutorial.lessons.length - 1}
                      onClick={() => setCurrentLesson(currentLesson + 1)}
                    >
                      Next
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Tutorial Info Tabs */}
            <Card className="border-none shadow-lg">
              <CardContent className="p-6">
                <Tabs defaultValue="overview" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="resources">Resources</TabsTrigger>
                    <TabsTrigger value="discussion">Discussion</TabsTrigger>
                  </TabsList>
                  <TabsContent value="overview" className="mt-4">
                    <div className="space-y-4">
                      <h4 className="font-semibold">About this tutorial</h4>
                      <p className="text-muted-foreground">{tutorial.description}</p>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="text-center">
                          <Clock className="w-6 h-6 mx-auto mb-2 text-muted-foreground" />
                          <p className="text-sm font-medium">{tutorial.duration}</p>
                          <p className="text-xs text-muted-foreground">Duration</p>
                        </div>
                        <div className="text-center">
                          <Eye className="w-6 h-6 mx-auto mb-2 text-muted-foreground" />
                          <p className="text-sm font-medium">{tutorial.views.toLocaleString()}</p>
                          <p className="text-xs text-muted-foreground">Views</p>
                        </div>
                        <div className="text-center">
                          <Star className="w-6 h-6 mx-auto mb-2 text-muted-foreground" />
                          <p className="text-sm font-medium">{tutorial.rating}</p>
                          <p className="text-xs text-muted-foreground">Rating</p>
                        </div>
                        <div className="text-center">
                          <Badge variant="secondary">{tutorial.level}</Badge>
                          <p className="text-xs text-muted-foreground mt-1">Level</p>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="resources" className="mt-4">
                    <div className="space-y-3">
                      <h4 className="font-semibold">Tutorial Resources</h4>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2 p-3 bg-muted/50 rounded-lg">
                          <FileText className="w-4 h-4" />
                          <span className="text-sm">React Documentation (PDF)</span>
                        </div>
                        <div className="flex items-center space-x-2 p-3 bg-muted/50 rounded-lg">
                          <FileText className="w-4 h-4" />
                          <span className="text-sm">Code Examples (ZIP)</span>
                        </div>
                        <div className="flex items-center space-x-2 p-3 bg-muted/50 rounded-lg">
                          <FileText className="w-4 h-4" />
                          <span className="text-sm">Practice Exercises</span>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="discussion" className="mt-4">
                    <div className="space-y-4">
                      <h4 className="font-semibold">Tutorial Discussion</h4>
                      <p className="text-muted-foreground">
                        Join the conversation with fellow learners and instructors.
                      </p>
                      <Button variant="outline" className="w-full">
                        Join Discussion Forum
                      </Button>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar - Tutorial Curriculum */}
          <div className="space-y-6">
            <Card className="border-none shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BookOpen className="w-5 h-5" />
                  <span>Tutorial Curriculum</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {tutorial.lessons.map((lesson, index) => (
                  <div
                    key={lesson.id}
                    className={`p-3 rounded-lg cursor-pointer transition-all duration-200 ${
                      currentLesson === index 
                        ? 'bg-primary/10 border border-primary/20' 
                        : 'hover:bg-muted/50'
                    }`}
                    onClick={() => setCurrentLesson(index)}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="flex-shrink-0">
                        {completedLessons.has(index) ? (
                          <CheckCircle className="w-5 h-5 text-green-600" />
                        ) : lesson.type === 'text' ? (
                          <FileText className="w-5 h-5 text-muted-foreground" />
                        ) : lesson.type === 'quiz' ? (
                          <Award className="w-5 h-5 text-muted-foreground" />
                        ) : (
                          <FileText className="w-5 h-5 text-muted-foreground" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground truncate">
                          {lesson.title}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {lesson.duration}
                          {lesson.type === 'quiz' && ` • ${lesson.questions} questions`}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Progress Summary */}
            <Card className="border-none shadow-lg">
              <CardHeader>
                <CardTitle>Your Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Tutorial Completion</span>
                      <span>{Math.round(completionPercentage)}%</span>
                    </div>
                    <Progress value={completionPercentage} className="h-2" />
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div className="p-3 bg-muted/50 rounded-lg">
                      <p className="text-2xl font-bold text-green-600">{completedLessons.size}</p>
                      <p className="text-xs text-muted-foreground">Completed</p>
                    </div>
                    <div className="p-3 bg-muted/50 rounded-lg">
                      <p className="text-2xl font-bold text-blue-600">{tutorial.lessons.length - completedLessons.size}</p>
                      <p className="text-xs text-muted-foreground">Remaining</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TutorialDetail;
