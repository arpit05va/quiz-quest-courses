
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  ArrowLeft, 
  Play, 
  CheckCircle, 
  Clock, 
  BookOpen,
  Award,
  Download,
  MessageCircle,
  Code2
} from 'lucide-react';
import { useAuthCheck } from '@/hooks/useAuthCheck';
import QuizSection from '@/components/QuizSection';
import ProblemPractice from '@/components/ProblemPractice';

const CourseLearnPage = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthCheck();
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showProblemPractice, setShowProblemPractice] = useState(false);

  // Check enrollment status
  useEffect(() => {
    const enrollments = JSON.parse(localStorage.getItem('enrollments') || '[]');
    const enrollment = enrollments.find((e: any) => e.courseId === parseInt(courseId || '0'));
    if (enrollment) {
      setIsEnrolled(true);
      setProgress(enrollment.progress || 0);
    }
  }, [courseId]);

  // Mock course data
  const courseData = {
    1: {
      id: 1,
      title: 'Introduction to Web Development',
      instructor: 'John Smith',
      duration: '12 weeks',
      lessons: [
        { id: 1, title: 'HTML Basics', duration: '45 min', completed: true },
        { id: 2, title: 'CSS Fundamentals', duration: '60 min', completed: true },
        { id: 3, title: 'JavaScript Introduction', duration: '75 min', completed: false },
        { id: 4, title: 'Responsive Design', duration: '90 min', completed: false },
        { id: 5, title: 'DOM Manipulation', duration: '65 min', completed: false },
        { id: 6, title: 'Async JavaScript', duration: '80 min', completed: false },
      ]
    },
    2: {
      id: 2,
      title: 'Data Science Fundamentals',
      instructor: 'Dr. Michael Chen',
      duration: '16 weeks',
      lessons: [
        { id: 1, title: 'Python Basics', duration: '60 min', completed: false },
        { id: 2, title: 'Data Analysis with Pandas', duration: '90 min', completed: false },
        { id: 3, title: 'Data Visualization', duration: '75 min', completed: false },
        { id: 4, title: 'Machine Learning Intro', duration: '120 min', completed: false },
      ]
    }
  };

  const course = courseData[parseInt(courseId || '1') as keyof typeof courseData];

  // Redirect if not authenticated or not enrolled
  if (!isAuthenticated || !isEnrolled) {
    navigate('/dashboard');
    return null;
  }

  if (!course) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Course Not Found</h1>
          <Button onClick={() => navigate('/dashboard')}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
        </div>
      </div>
    );
  }

  // Show Problem Practice if requested
  if (showProblemPractice) {
    return (
      <ProblemPractice 
        contentType="course" 
        contentId={courseId || '1'} 
        onClose={() => setShowProblemPractice(false)}
      />
    );
  }

  const completedLessons = course.lessons.filter(lesson => lesson.completed).length;
  const totalLessons = course.lessons.length;
  const courseProgress = Math.round((completedLessons / totalLessons) * 100);

  const handleLessonClick = (lessonId: number) => {
    console.log(`Starting lesson ${lessonId}`);
    // In a real app, this would navigate to the lesson content
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      {/* Header */}
      <header className="bg-background/95 backdrop-blur-sm border-b border-border sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Button 
              variant="ghost" 
              onClick={() => navigate('/dashboard')}
              className="flex items-center space-x-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Dashboard</span>
            </Button>
            <div className="text-center">
              <h1 className="text-lg font-semibold text-foreground">Course Learning</h1>
            </div>
            <div></div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Course Header */}
          <div className="mb-8">
            <div className="flex items-center space-x-2 mb-4">
              <Badge className="bg-green-100 text-green-800">
                <CheckCircle className="w-3 h-3 mr-1" />
                Enrolled
              </Badge>
            </div>
            <h1 className="text-4xl font-bold text-foreground mb-2">{course.title}</h1>
            <p className="text-xl text-muted-foreground">By {course.instructor}</p>
            
            {/* Progress Section */}
            <div className="mt-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Course Progress</span>
                <span className="text-sm text-muted-foreground">{completedLessons} of {totalLessons} lessons completed</span>
              </div>
              <Progress value={courseProgress} className="h-3" />
              <p className="text-sm text-muted-foreground mt-1">{courseProgress}% Complete</p>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Course Content */}
            <div className="lg:col-span-2">
              <Tabs defaultValue="lessons" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="lessons">Lessons</TabsTrigger>
                  <TabsTrigger value="quizzes">Quizzes</TabsTrigger>
                  <TabsTrigger value="coding">Coding Practice</TabsTrigger>
                </TabsList>
                
                <TabsContent value="lessons" className="mt-6">
                  <Card className="border-none shadow-lg">
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <BookOpen className="w-5 h-5" />
                        <span>Course Lessons</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {course.lessons.map((lesson, index) => (
                          <div 
                            key={lesson.id}
                            className={`p-4 border rounded-lg cursor-pointer transition-all duration-200 hover:shadow-md ${
                              lesson.completed ? 'bg-green-50 border-green-200' : 'hover:bg-muted/50'
                            }`}
                            onClick={() => handleLessonClick(lesson.id)}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-3">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                                  lesson.completed ? 'bg-green-600 text-white' : 'bg-muted text-muted-foreground'
                                }`}>
                                  {lesson.completed ? (
                                    <CheckCircle className="w-4 h-4" />
                                  ) : (
                                    <span className="text-sm font-medium">{index + 1}</span>
                                  )}
                                </div>
                                <div>
                                  <h3 className="font-medium text-foreground">{lesson.title}</h3>
                                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                                    <Clock className="w-3 h-3" />
                                    <span>{lesson.duration}</span>
                                  </div>
                                </div>
                              </div>
                              <Button variant="ghost" size="sm">
                                <Play className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="quizzes" className="mt-6">
                  <QuizSection 
                    contentType="course" 
                    contentId={courseId || '1'} 
                    contentTitle={course.title} 
                  />
                </TabsContent>
                
                <TabsContent value="coding" className="mt-6">
                  <Card className="border-none shadow-lg">
                    <CardContent className="p-8">
                      <div className="text-center">
                        <div className="p-4 rounded-full bg-primary/10 w-20 h-20 mx-auto mb-6 flex items-center justify-center">
                          <Code2 className="w-10 h-10 text-primary" />
                        </div>
                        <h3 className="text-2xl font-bold mb-4">Interactive Coding Practice</h3>
                        <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                          Practice coding problems that reinforce the concepts you've learned in this course. 
                          Solve real programming challenges with our interactive code editor.
                        </p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                          <div className="text-center p-6 bg-muted/50 rounded-lg">
                            <span className="text-3xl font-bold text-green-600">5</span>
                            <p className="text-sm text-muted-foreground mt-1">Easy Problems</p>
                          </div>
                          <div className="text-center p-6 bg-muted/50 rounded-lg">
                            <span className="text-3xl font-bold text-yellow-600">3</span>
                            <p className="text-sm text-muted-foreground mt-1">Medium Problems</p>
                          </div>
                          <div className="text-center p-6 bg-muted/50 rounded-lg">
                            <span className="text-3xl font-bold text-red-600">2</span>
                            <p className="text-sm text-muted-foreground mt-1">Hard Problems</p>
                          </div>
                        </div>
                        
                        <Button 
                          size="lg" 
                          onClick={() => setShowProblemPractice(true)}
                          className="bg-primary hover:bg-primary/90 px-8 py-3"
                        >
                          <Code2 className="w-5 h-5 mr-2" />
                          Start Coding Practice
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Course Stats */}
              <Card className="border-none shadow-lg">
                <CardHeader>
                  <CardTitle>Your Progress</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Lessons Completed</span>
                      <span className="font-medium">{completedLessons}/{totalLessons}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Total Duration</span>
                      <span className="font-medium">{course.duration}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Completion</span>
                      <span className="font-medium">{courseProgress}%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card className="border-none shadow-lg">
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button variant="outline" className="w-full justify-start">
                    <Download className="w-4 h-4 mr-2" />
                    Download Resources
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Discussion Forum
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Award className="w-4 h-4 mr-2" />
                    View Certificate
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseLearnPage;
