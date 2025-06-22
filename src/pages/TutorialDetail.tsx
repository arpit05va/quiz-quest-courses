import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  BookOpen, 
  CheckCircle, 
  Clock, 
  Users, 
  Star, 
  ArrowLeft,
  FileText,
  Award,
  Maximize,
  ChevronLeft,
  ChevronRight,
  Code2
} from 'lucide-react';
import DashboardWrapper from '@/components/DashboardWrapper';
import QuizSection from '@/components/QuizSection';
import ProblemPractice from '@/components/ProblemPractice';

const TutorialDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [currentSection, setCurrentSection] = useState(0);
  const [completedSections, setCompletedSections] = useState(new Set([0]));
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showProblemPractice, setShowProblemPractice] = useState(false);

  // Mock tutorial data with sections structure similar to course lessons
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
    progress: 20,
    sections: [
      {
        id: 1,
        title: 'Introduction to Advanced React Hooks',
        duration: '8 min read',
        type: 'text',
        completed: true,
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
        `
      },
      {
        id: 2,
        title: 'Prerequisites and Setup',
        duration: '5 min read',
        type: 'text',
        completed: false,
        content: `
          <h3>Prerequisites</h3>
          <p>Before starting this tutorial, you should have:</p>
          <ul>
            <li>Basic knowledge of React and useState/useEffect</li>
            <li>Understanding of JavaScript ES6+ features</li>
            <li>Familiarity with component lifecycle</li>
          </ul>
          
          <h3>Development Environment Setup</h3>
          <p>Make sure you have the following installed:</p>
          <ul>
            <li>Node.js (version 14 or higher)</li>
            <li>A code editor (VS Code recommended)</li>
            <li>React Developer Tools browser extension</li>
          </ul>
        `
      },
      {
        id: 3,
        title: 'Custom Hooks Deep Dive',
        duration: '12 min read',
        type: 'text',
        completed: false,
        content: `
          <h3>Custom Hooks</h3>
          <p>Custom hooks allow you to extract component logic into reusable functions. They must start with "use" and can call other hooks.</p>
          
          <h4>Example: useCounter Hook</h4>
          <pre>
function useCounter(initialValue = 0) {
  const [count, setCount] = useState(initialValue);
  
  const increment = useCallback(() => {
    setCount(prev => prev + 1);
  }, []);
  
  const decrement = useCallback(() => {
    setCount(prev => prev - 1);
  }, []);
  
  const reset = useCallback(() => {
    setCount(initialValue);
  }, [initialValue]);
  
  return { count, increment, decrement, reset };
}
          </pre>
        `
      },
      {
        id: 4,
        title: 'React Hooks Knowledge Check',
        duration: '10 min',
        type: 'quiz',
        completed: false,
        questions: 6
      },
      {
        id: 5,
        title: 'useContext and State Management',
        duration: '15 min read',
        type: 'text',
        completed: false,
        content: `
          <h3>useContext for State Management</h3>
          <p>useContext provides a way to pass data through the component tree without having to pass props down manually at every level.</p>
          
          <h4>Creating a Context</h4>
          <pre>
const ThemeContext = createContext();

function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');
  
  return (
    &lt;ThemeContext.Provider value={{ theme, setTheme }}&gt;
      {children}
    &lt;/ThemeContext.Provider&gt;
  );
}
          </pre>
          
          <h4>Using the Context</h4>
          <pre>
function ThemedButton() {
  const { theme, setTheme } = useContext(ThemeContext);
  
  return (
    &lt;button 
      style={{ 
        backgroundColor: theme === 'light' ? '#fff' : '#333',
        color: theme === 'light' ? '#333' : '#fff'
      }}
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
    &gt;
      Toggle Theme
    &lt;/button&gt;
  );
}
          </pre>
        `
      },
      {
        id: 6,
        title: 'Performance Optimization with useMemo and useCallback',
        duration: '12 min read',
        type: 'text',
        completed: false,
        content: `
          <h3>Performance Optimization</h3>
          <p>useMemo and useCallback are essential for preventing unnecessary re-renders and expensive calculations.</p>
          
          <h4>useMemo Example</h4>
          <pre>
function ExpensiveComponent({ items, filter }) {
  const filteredItems = useMemo(() => {
    return items.filter(item => 
      item.name.toLowerCase().includes(filter.toLowerCase())
    );
  }, [items, filter]);
  
  return (
    &lt;ul&gt;
      {filteredItems.map(item => (
        &lt;li key={item.id}&gt;{item.name}&lt;/li&gt;
      ))}
    &lt;/ul&gt;
  );
}
          </pre>
        `
      },
      {
        id: 7,
        title: 'Final Quiz and Assessment',
        duration: '15 min',
        type: 'quiz',
        completed: false,
        questions: 10
      }
    ]
  };

  const handleSectionComplete = (sectionId: number) => {
    const newCompleted = new Set(completedSections);
    newCompleted.add(sectionId);
    setCompletedSections(newCompleted);
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const currentSectionData = tutorial.sections[currentSection];
  const completionPercentage = (completedSections.size / tutorial.sections.length) * 100;

  // Show Problem Practice if requested
  if (showProblemPractice) {
    return (
      <ProblemPractice 
        contentType="tutorial" 
        contentId={id || '1'} 
        onClose={() => setShowProblemPractice(false)}
      />
    );
  }

  if (isFullscreen) {
    return (
      <div className="fixed inset-0 bg-background z-50 flex flex-col">
        {/* Fullscreen Header */}
        <header className="bg-background/95 backdrop-blur-sm border-b border-border">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center space-x-4">
                <h1 className="text-lg font-semibold text-foreground">{currentSectionData.title}</h1>
                <Badge variant="outline">Section {currentSection + 1} of {tutorial.sections.length}</Badge>
              </div>
              <div className="flex items-center space-x-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  disabled={currentSection === 0}
                  onClick={() => setCurrentSection(currentSection - 1)}
                  className="flex items-center space-x-2"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Previous</span>
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  disabled={currentSection === tutorial.sections.length - 1}
                  onClick={() => setCurrentSection(currentSection + 1)}
                  className="flex items-center space-x-2"
                >
                  <span>Next</span>
                  <ChevronRight className="w-4 h-4" />
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={toggleFullscreen}
                  className="flex items-center space-x-2"
                >
                  <Maximize className="w-4 h-4" />
                  <span>Exit Fullscreen</span>
                </Button>
              </div>
            </div>
          </div>
        </header>

        {/* Fullscreen Content */}
        <div className="flex-1 overflow-hidden">
          <ScrollArea className="h-full">
            <div className="container mx-auto px-4 py-6">
              <Card className="border-none shadow-lg max-w-4xl mx-auto">
                <CardContent className="p-8">
                  {currentSectionData.type === 'text' ? (
                    <div className="prose max-w-none pr-4">
                      <div className="mb-6">
                        <h2 className="text-3xl font-bold text-foreground mb-4">{currentSectionData.title}</h2>
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-8">
                          <div className="flex items-center space-x-1">
                            <Clock className="w-4 h-4" />
                            <span>{currentSectionData.duration}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <FileText className="w-4 h-4" />
                            <span>Reading Material</span>
                          </div>
                        </div>
                      </div>
                      <div 
                        className="text-foreground leading-relaxed text-lg"
                        dangerouslySetInnerHTML={{ __html: currentSectionData.content || '' }}
                      />
                    </div>
                  ) : (
                    <div className="p-12 text-center">
                      <Award className="w-20 h-20 text-primary mx-auto mb-6" />
                      <h3 className="text-3xl font-bold mb-4">{currentSectionData.title}</h3>
                      <p className="text-muted-foreground mb-8 text-lg">
                        Test your knowledge with {currentSectionData.questions} questions
                      </p>
                      <Button size="lg" className="bg-primary hover:bg-primary/90 text-lg px-8 py-3">
                        Start Quiz
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </ScrollArea>
        </div>
      </div>
    );
  }

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
                onClick={() => navigate('/dashboard')}
                className="flex items-center space-x-2"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Dashboard</span>
              </Button>
              <Separator orientation="vertical" className="h-6" />
              <div>
                <h1 className="text-lg font-semibold text-foreground">{tutorial.title}</h1>
                <p className="text-sm text-muted-foreground">by {tutorial.author}</p>
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
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-bold text-foreground">{currentSectionData.title}</h2>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={toggleFullscreen}
                    className="flex items-center space-x-2"
                  >
                    <Maximize className="w-4 h-4" />
                    <span>Fullscreen</span>
                  </Button>
                </div>
                
                <ScrollArea className="h-96">
                  {currentSectionData.type === 'text' ? (
                    <div className="prose max-w-none pr-4">
                      <div className="mb-4">
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-6">
                          <div className="flex items-center space-x-1">
                            <Clock className="w-4 h-4" />
                            <span>{currentSectionData.duration}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <FileText className="w-4 h-4" />
                            <span>Reading Material</span>
                          </div>
                        </div>
                      </div>
                      <div 
                        className="text-foreground leading-relaxed"
                        dangerouslySetInnerHTML={{ __html: currentSectionData.content || '' }}
                      />
                    </div>
                  ) : (
                    <div className="p-8 text-center">
                      <Award className="w-16 h-16 text-primary mx-auto mb-4" />
                      <h3 className="text-2xl font-bold mb-2">{currentSectionData.title}</h3>
                      <p className="text-muted-foreground mb-6">
                        Test your knowledge with {currentSectionData.questions} questions
                      </p>
                      <Button size="lg" className="bg-primary hover:bg-primary/90">
                        Start Quiz
                      </Button>
                    </div>
                  )}
                </ScrollArea>
              </CardContent>
            </Card>

            {/* Section Controls */}
            <Card className="border-none shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-lg">{currentSectionData.title}</h3>
                    <p className="text-muted-foreground">Section {currentSection + 1} of {tutorial.sections.length}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button 
                      variant="outline"
                      disabled={currentSection === 0}
                      onClick={() => setCurrentSection(currentSection - 1)}
                    >
                      Previous
                    </Button>
                    {!completedSections.has(currentSection) && (
                      <Button 
                        onClick={() => handleSectionComplete(currentSection)}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Mark Complete
                      </Button>
                    )}
                    <Button 
                      disabled={currentSection === tutorial.sections.length - 1}
                      onClick={() => setCurrentSection(currentSection + 1)}
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
                  <TabsList className="grid w-full grid-cols-5">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="quizzes">Practice Quizzes</TabsTrigger>
                    <TabsTrigger value="coding">Coding Practice</TabsTrigger>
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
                          <Users className="w-6 h-6 mx-auto mb-2 text-muted-foreground" />
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
                  <TabsContent value="quizzes" className="mt-4">
                    <QuizSection 
                      contentType="tutorial" 
                      contentId={id || '1'} 
                      contentTitle={tutorial.title} 
                    />
                  </TabsContent>
                  <TabsContent value="coding" className="mt-4">
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3 mb-4">
                        <div className="p-2 rounded-lg bg-primary/10">
                          <Code2 className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold">Coding Practice</h3>
                          <p className="text-muted-foreground">Practice coding problems related to this tutorial</p>
                        </div>
                      </div>
                      
                      <Card className="border-none shadow-lg">
                        <CardContent className="p-6">
                          <div className="text-center">
                            <Code2 className="w-16 h-16 text-primary mx-auto mb-4" />
                            <h4 className="text-xl font-semibold mb-2">Interactive Coding Environment</h4>
                            <p className="text-muted-foreground mb-6">
                              Practice with real coding problems that reinforce the concepts you've learned in this tutorial.
                            </p>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                              <div className="text-center p-4 bg-muted/50 rounded-lg">
                                <span className="text-2xl font-bold text-green-600">2</span>
                                <p className="text-sm text-muted-foreground">Easy Problems</p>
                              </div>
                              <div className="text-center p-4 bg-muted/50 rounded-lg">
                                <span className="text-2xl font-bold text-yellow-600">1</span>
                                <p className="text-sm text-muted-foreground">Medium Problems</p>
                              </div>
                              <div className="text-center p-4 bg-muted/50 rounded-lg">
                                <span className="text-2xl font-bold text-red-600">1</span>
                                <p className="text-sm text-muted-foreground">Hard Problems</p>
                              </div>
                            </div>
                            <Button 
                              size="lg" 
                              onClick={() => setShowProblemPractice(true)}
                              className="bg-primary hover:bg-primary/90"
                            >
                              <Code2 className="w-5 h-5 mr-2" />
                              Start Coding Practice
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>
                  <TabsContent value="resources" className="mt-4">
                    <div className="space-y-3">
                      <h4 className="font-semibold">Tutorial Resources</h4>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2 p-3 bg-muted/50 rounded-lg">
                          <FileText className="w-4 h-4" />
                          <span className="text-sm">Code Examples (GitHub)</span>
                        </div>
                        <div className="flex items-center space-x-2 p-3 bg-muted/50 rounded-lg">
                          <FileText className="w-4 h-4" />
                          <span className="text-sm">React Hooks Cheat Sheet</span>
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

          {/* Sidebar - Tutorial Curriculum */}
          <div className="space-y-6">
            <Card className="border-none shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BookOpen className="w-5 h-5" />
                  <span>Tutorial Sections</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <ScrollArea className="h-96">
                  {tutorial.sections.map((section, index) => (
                    <div
                      key={section.id}
                      className={`p-3 rounded-lg cursor-pointer transition-all duration-200 mb-2 ${
                        currentSection === index 
                          ? 'bg-primary/10 border border-primary/20' 
                          : 'hover:bg-muted/50'
                      }`}
                      onClick={() => setCurrentSection(index)}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="flex-shrink-0">
                          {completedSections.has(index) ? (
                            <CheckCircle className="w-5 h-5 text-green-600" />
                          ) : section.type === 'text' ? (
                            <FileText className="w-5 h-5 text-muted-foreground" />
                          ) : (
                            <Award className="w-5 h-5 text-muted-foreground" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-foreground truncate">
                            {section.title}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {section.duration}
                            {section.type === 'quiz' && ` • ${section.questions} questions`}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </ScrollArea>
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
                      <p className="text-2xl font-bold text-green-600">{completedSections.size}</p>
                      <p className="text-xs text-muted-foreground">Completed</p>
                    </div>
                    <div className="p-3 bg-muted/50 rounded-lg">
                      <p className="text-2xl font-bold text-blue-600">{tutorial.sections.length - completedSections.size}</p>
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
