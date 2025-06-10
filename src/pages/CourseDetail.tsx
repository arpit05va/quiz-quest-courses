
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Play, 
  BookOpen, 
  CheckCircle, 
  Clock, 
  Users, 
  Star, 
  ArrowLeft,
  PlayCircle,
  FileText,
  Award
} from 'lucide-react';

const CourseDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [currentLesson, setCurrentLesson] = useState(0);
  const [completedLessons, setCompletedLessons] = useState(new Set([0, 1]));

  // Mock course data - in real app, this would come from API
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
        duration: '15 min',
        type: 'video',
        completed: true,
        videoUrl: 'https://example.com/video1'
      },
      {
        id: 2,
        title: 'HTML Elements and Structure',
        duration: '20 min',
        type: 'video',
        completed: true,
        videoUrl: 'https://example.com/video2'
      },
      {
        id: 3,
        title: 'CSS Basics',
        duration: '25 min',
        type: 'video',
        completed: false,
        videoUrl: 'https://example.com/video3'
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
        duration: '30 min',
        type: 'video',
        completed: false,
        videoUrl: 'https://example.com/video4'
      },
      {
        id: 6,
        title: 'Variables and Functions',
        duration: '35 min',
        type: 'video',
        completed: false,
        videoUrl: 'https://example.com/video5'
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

  const currentLessonData = course.lessons[currentLesson];
  const completionPercentage = (completedLessons.size / course.lessons.length) * 100;

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
            {/* Video Player / Content Area */}
            <Card className="border-none shadow-lg">
              <CardContent className="p-0">
                {currentLessonData.type === 'video' ? (
                  <div className="aspect-video bg-black rounded-t-lg relative group">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Button 
                        size="lg"
                        className="bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full w-16 h-16"
                      >
                        <Play className="w-8 h-8 text-white ml-1" />
                      </Button>
                    </div>
                    <div className="absolute bottom-4 left-4 text-white">
                      <h3 className="text-lg font-semibold">{currentLessonData.title}</h3>
                      <p className="text-sm opacity-80">{currentLessonData.duration}</p>
                    </div>
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
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
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
                {course.lessons.map((lesson, index) => (
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
                        ) : lesson.type === 'video' ? (
                          <PlayCircle className="w-5 h-5 text-muted-foreground" />
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
