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
  ArrowRight,
  FileText,
  Award,
  Maximize,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import QuizSection from '@/components/QuizSection';

const CourseDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [currentLesson, setCurrentLesson] = useState(0);
  const [completedLessons, setCompletedLessons] = useState(new Set([0, 1]));
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Mock course data - this will be replaced with backend data
  const course = {
    id: parseInt(id || '1'),
    title: 'Introduction to Web Development',
    description: 'Learn HTML, CSS, and JavaScript from scratch with hands-on projects.',
    instructor: 'John Smith',
    duration: '12 weeks',
    students: 1250,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=800&h=400&fit=crop',
    price: '$99',
    category: 'Programming',
    level: 'Beginner',
    progress: 25,
    lessons: [
      {
        id: 1,
        title: 'Introduction to HTML',
        duration: '15 min read',
        type: 'text',
        completed: true,
        content: `
          <h3>What is HTML?</h3>
          <p>HTML (HyperText Markup Language) is the standard markup language for creating web pages. It describes the structure of a web page using markup.</p>
          
          <h4>Basic HTML Structure</h4>
          <p>Every HTML document follows a basic structure:</p>
          <pre>
&lt;!DOCTYPE html&gt;
&lt;html&gt;
  &lt;head&gt;
    &lt;title&gt;Page Title&lt;/title&gt;
  &lt;/head&gt;
  &lt;body&gt;
    &lt;h1&gt;This is a Heading&lt;/h1&gt;
    &lt;p&gt;This is a paragraph.&lt;/p&gt;
  &lt;/body&gt;
&lt;/html&gt;
          </pre>
          
          <h4>HTML Elements</h4>
          <p>HTML elements are the building blocks of HTML pages. An HTML element is defined by a start tag, some content, and an end tag.</p>
        `
      },
      {
        id: 2,
        title: 'HTML Elements and Structure',
        duration: '20 min read',
        type: 'text',
        completed: true,
        content: `
          <h3>Common HTML Elements</h3>
          <p>Here are some of the most commonly used HTML elements:</p>
          
          <h4>Headings</h4>
          <p>HTML headings are defined with the &lt;h1&gt; to &lt;h6&gt; tags:</p>
          <pre>
&lt;h1&gt;This is heading 1&lt;/h1&gt;
&lt;h2&gt;This is heading 2&lt;/h2&gt;
&lt;h3&gt;This is heading 3&lt;/h3&gt;
          </pre>
          
          <h4>Paragraphs</h4>
          <p>HTML paragraphs are defined with the &lt;p&gt; tag:</p>
          <pre>&lt;p&gt;This is a paragraph.&lt;/p&gt;</pre>
          
          <h4>Links</h4>
          <p>HTML links are defined with the &lt;a&gt; tag:</p>
          <pre>&lt;a href="https://www.example.com"&gt;This is a link&lt;/a&gt;</pre>
        `
      },
      {
        id: 3,
        title: 'CSS Basics',
        duration: '25 min read',
        type: 'text',
        completed: false,
        content: `
          <h3>Introduction to CSS</h3>
          <p>CSS (Cascading Style Sheets) is used to style and layout web pages. It describes how HTML elements should be displayed.</p>
          
          <h4>CSS Syntax</h4>
          <p>CSS is made up of style rules. Here's the basic syntax:</p>
          <pre>
selector {
  property: value;
}
          </pre>
          
          <h4>Adding CSS to HTML</h4>
          <p>There are three ways to add CSS to HTML:</p>
          <ul>
            <li><strong>Inline:</strong> Using the style attribute inside HTML elements</li>
            <li><strong>Internal:</strong> Using a &lt;style&gt; element in the HTML head</li>
            <li><strong>External:</strong> Using an external CSS file</li>
          </ul>
        `
      },
      {
        id: 4,
        title: 'CSS Styling Quiz',
        duration: '10 min',
        type: 'quiz',
        completed: false,
        questions: 5
      },
      {
        id: 5,
        title: 'JavaScript Introduction',
        duration: '30 min read',
        type: 'text',
        completed: false,
        content: `
          <h3>What is JavaScript?</h3>
          <p>JavaScript is a programming language that enables interactive web pages. It's an essential part of web applications.</p>
          
          <h4>JavaScript Syntax</h4>
          <p>JavaScript statements are composed of values, operators, expressions, keywords, and comments:</p>
          <pre>
// This is a comment
let message = "Hello, World!";
console.log(message);
          </pre>
          
          <h4>Variables</h4>
          <p>Variables are containers for storing data values. In JavaScript, you can create variables using var, let, or const:</p>
          <pre>
let name = "John";
const age = 30;
var city = "New York";
          </pre>
        `
      },
      {
        id: 6,
        title: 'Variables and Functions',
        duration: '35 min read',
        type: 'text',
        completed: false,
        content: `
          <h3>JavaScript Functions</h3>
          <p>A JavaScript function is a block of code designed to perform a particular task. A JavaScript function is executed when "something" invokes it (calls it).</p>
          
          <h4>Function Syntax</h4>
          <pre>
function functionName(parameters) {
  // code to be executed
  return value;
}
          </pre>
          
          <h4>Example Function</h4>
          <pre>
function greet(name) {
  return "Hello, " + name + "!";
}

let greeting = greet("Alice");
console.log(greeting); // Output: Hello, Alice!
          </pre>
        `
      },
      {
        id: 7,
        title: 'JavaScript Fundamentals Quiz',
        duration: '15 min',
        type: 'quiz',
        completed: false,
        questions: 8
      },
      {
        id: 8,
        title: 'Final Project',
        duration: '2 hours',
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

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const currentLessonData = course.lessons[currentLesson];
  const completionPercentage = (completedLessons.size / course.lessons.length) * 100;

  if (isFullscreen) {
    return (
      <div className="fixed inset-0 bg-background z-50 flex flex-col">
        {/* Fullscreen Header */}
        <header className="bg-background/95 backdrop-blur-sm border-b border-border">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center space-x-4">
                <h1 className="text-lg font-semibold text-foreground">{currentLessonData.title}</h1>
                <Badge variant="outline">Lesson {currentLesson + 1} of {course.lessons.length}</Badge>
              </div>
              <div className="flex items-center space-x-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  disabled={currentLesson === 0}
                  onClick={() => setCurrentLesson(currentLesson - 1)}
                  className="flex items-center space-x-2"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Previous</span>
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  disabled={currentLesson === course.lessons.length - 1}
                  onClick={() => setCurrentLesson(currentLesson + 1)}
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
                  {currentLessonData.type === 'text' ? (
                    <div className="prose max-w-none pr-4">
                      <div className="mb-6">
                        <h2 className="text-3xl font-bold text-foreground mb-4">{currentLessonData.title}</h2>
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-8">
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
                        className="text-foreground leading-relaxed text-lg"
                        dangerouslySetInnerHTML={{ __html: currentLessonData.content || '' }}
                      />
                    </div>
                  ) : currentLessonData.type === 'quiz' ? (
                    <div className="p-12 text-center">
                      <Award className="w-20 h-20 text-primary mx-auto mb-6" />
                      <h3 className="text-3xl font-bold mb-4">{currentLessonData.title}</h3>
                      <p className="text-muted-foreground mb-8 text-lg">
                        Test your knowledge with {currentLessonData.questions} questions
                      </p>
                      <Button size="lg" className="bg-primary hover:bg-primary/90 text-lg px-8 py-3">
                        Start Quiz
                      </Button>
                    </div>
                  ) : (
                    <div className="p-12 text-center">
                      <FileText className="w-20 h-20 text-primary mx-auto mb-6" />
                      <h3 className="text-3xl font-bold mb-4">{currentLessonData.title}</h3>
                      <p className="text-muted-foreground mb-8 text-lg">
                        Apply your skills in this hands-on project
                      </p>
                      <Button size="lg" className="bg-primary hover:bg-primary/90 text-lg px-8 py-3">
                        Start Project
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
                <h1 className="text-lg font-semibold text-foreground">{course.title}</h1>
                <p className="text-sm text-muted-foreground">by {course.instructor}</p>
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
                  <h2 className="text-2xl font-bold text-foreground">{currentLessonData.title}</h2>
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
                  {currentLessonData.type === 'text' ? (
                    <div className="prose max-w-none pr-4">
                      <div className="mb-4">
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
                </ScrollArea>
              </CardContent>
            </Card>

            {/* Lesson Controls */}
            <Card className="border-none shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-lg">{currentLessonData.title}</h3>
                    <p className="text-muted-foreground">Lesson {currentLesson + 1} of {course.lessons.length}</p>
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
                      disabled={currentLesson === course.lessons.length - 1}
                      onClick={() => setCurrentLesson(currentLesson + 1)}
                    >
                      Next
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Course Info Tabs */}
            <Card className="border-none shadow-lg">
              <CardContent className="p-6">
                <Tabs defaultValue="overview" className="w-full">
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="quizzes">Quizzes</TabsTrigger>
                    <TabsTrigger value="resources">Resources</TabsTrigger>
                    <TabsTrigger value="discussion">Discussion</TabsTrigger>
                  </TabsList>
                  <TabsContent value="overview" className="mt-4">
                    <div className="space-y-4">
                      <h4 className="font-semibold">About this course</h4>
                      <p className="text-muted-foreground">{course.description}</p>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="text-center">
                          <Clock className="w-6 h-6 mx-auto mb-2 text-muted-foreground" />
                          <p className="text-sm font-medium">{course.duration}</p>
                          <p className="text-xs text-muted-foreground">Duration</p>
                        </div>
                        <div className="text-center">
                          <Users className="w-6 h-6 mx-auto mb-2 text-muted-foreground" />
                          <p className="text-sm font-medium">{course.students.toLocaleString()}</p>
                          <p className="text-xs text-muted-foreground">Students</p>
                        </div>
                        <div className="text-center">
                          <Star className="w-6 h-6 mx-auto mb-2 text-muted-foreground" />
                          <p className="text-sm font-medium">{course.rating}</p>
                          <p className="text-xs text-muted-foreground">Rating</p>
                        </div>
                        <div className="text-center">
                          <Badge variant="secondary">{course.level}</Badge>
                          <p className="text-xs text-muted-foreground mt-1">Level</p>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="quizzes" className="mt-4">
                    <QuizSection 
                      contentType="course" 
                      contentId={id || '1'} 
                      contentTitle={course.title} 
                    />
                  </TabsContent>
                  <TabsContent value="resources" className="mt-4">
                    <div className="space-y-3">
                      <h4 className="font-semibold">Course Resources</h4>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2 p-3 bg-muted/50 rounded-lg">
                          <FileText className="w-4 h-4" />
                          <span className="text-sm">Course Handbook (PDF)</span>
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
                      <h4 className="font-semibold">Course Discussion</h4>
                      <p className="text-muted-foreground">
                        Join the conversation with fellow students and instructors.
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

          {/* Sidebar - Course Curriculum */}
          <div className="space-y-6">
            <Card className="border-none shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BookOpen className="w-5 h-5" />
                  <span>Course Curriculum</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <ScrollArea className="h-96">
                  {course.lessons.map((lesson, index) => (
                    <div
                      key={lesson.id}
                      className={`p-3 rounded-lg cursor-pointer transition-all duration-200 mb-2 ${
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
                      <span>Course Completion</span>
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
                      <p className="text-2xl font-bold text-blue-600">{course.lessons.length - completedLessons.size}</p>
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

export default CourseDetail;
