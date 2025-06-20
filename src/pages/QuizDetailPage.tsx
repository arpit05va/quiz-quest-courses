
import { useState, useEffect } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { ChevronLeft, ChevronRight, SkipForward, Send, Clock, Brain } from 'lucide-react';
import DashboardWrapper from '@/components/DashboardWrapper';

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  difficulty: string;
}

interface Quiz {
  id: number;
  title: string;
  description: string;
  questions: Question[];
  category: string;
  difficulty: string;
}

const QuizDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const selectedDifficulty = searchParams.get('difficulty') || 'Beginner';
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<{ [key: number]: number }>({});
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [animationClass, setAnimationClass] = useState('animate-fade-in');

  // Enhanced mock quiz data with difficulty-based questions
  useEffect(() => {
    const allQuestions = [
      // Beginner questions
      {
        id: 1,
        question: 'What does HTML stand for?',
        options: [
          'Hyper Text Markup Language',
          'Home Tool Markup Language',
          'Hyperlinks and Text Markup Language',
          'Hyperlinking Text Marking Language'
        ],
        correctAnswer: 0,
        explanation: 'HTML stands for Hyper Text Markup Language, which is the standard markup language for creating web pages.',
        difficulty: 'Beginner'
      },
      {
        id: 2,
        question: 'Which HTML element is used for the largest heading?',
        options: ['<h6>', '<heading>', '<h1>', '<header>'],
        correctAnswer: 2,
        explanation: 'The <h1> element represents the largest heading in HTML, typically used for main page titles.',
        difficulty: 'Beginner'
      },
      // Intermediate questions
      {
        id: 3,
        question: 'What is the CSS property used to control the spacing between elements?',
        options: ['margin', 'padding', 'border', 'spacing'],
        correctAnswer: 0,
        explanation: 'The margin property controls the spacing outside an element, while padding controls the spacing inside.',
        difficulty: 'Intermediate'
      },
      {
        id: 4,
        question: 'Which CSS selector has the highest specificity?',
        options: ['Class selector', 'ID selector', 'Element selector', 'Universal selector'],
        correctAnswer: 1,
        explanation: 'ID selectors have higher specificity than class selectors, element selectors, and universal selectors.',
        difficulty: 'Intermediate'
      },
      // Advanced questions
      {
        id: 5,
        question: 'What is a closure in JavaScript?',
        options: [
          'A way to close browser windows',
          'A function that has access to variables in its outer scope',
          'A method to close file handles',
          'A CSS property for hiding elements'
        ],
        correctAnswer: 1,
        explanation: 'A closure is a function that has access to variables in its outer (enclosing) scope even after the outer function has returned.',
        difficulty: 'Advanced'
      },
      {
        id: 6,
        question: 'What is the purpose of the "use strict" directive in JavaScript?',
        options: [
          'To enable strict typing',
          'To enforce stricter parsing and error handling',
          'To compress the code',
          'To enable ES6 features'
        ],
        correctAnswer: 1,
        explanation: '"use strict" enables strict mode, which catches common coding mistakes and prevents the use of certain error-prone features.',
        difficulty: 'Advanced'
      },
      // Expert questions
      {
        id: 7,
        question: 'What is the time complexity of searching in a balanced binary search tree?',
        options: ['O(1)', 'O(log n)', 'O(n)', 'O(n log n)'],
        correctAnswer: 1,
        explanation: 'In a balanced BST, the height is O(log n), so search operations take O(log n) time.',
        difficulty: 'Expert'
      },
      {
        id: 8,
        question: 'Which design pattern is used in React\'s Context API?',
        options: ['Singleton', 'Observer', 'Provider', 'Factory'],
        correctAnswer: 2,
        explanation: 'React\'s Context API uses the Provider pattern to share data across component trees.',
        difficulty: 'Expert'
      }
    ];

    // Filter questions based on selected difficulty
    const getQuestionsByDifficulty = (difficulty: string) => {
      const difficultyMap: { [key: string]: string[] } = {
        'Beginner': ['Beginner'],
        'Intermediate': ['Beginner', 'Intermediate'],
        'Advanced': ['Beginner', 'Intermediate', 'Advanced'],
        'Expert': ['Beginner', 'Intermediate', 'Advanced', 'Expert']
      };
      
      const allowedDifficulties = difficultyMap[difficulty] || ['Beginner'];
      return allQuestions.filter(q => allowedDifficulties.includes(q.difficulty));
    };

    const filteredQuestions = getQuestionsByDifficulty(selectedDifficulty);

    const mockQuiz: Quiz = {
      id: parseInt(id || '1'),
      title: 'Web Development Fundamentals',
      description: `Test your knowledge with ${selectedDifficulty.toLowerCase()} level questions.`,
      category: 'Web Development',
      difficulty: selectedDifficulty,
      questions: filteredQuestions
    };
    setQuiz(mockQuiz);
  }, [id, selectedDifficulty]);

  if (!quiz) {
    return <DashboardWrapper title="Loading..."><div>Loading quiz...</div></DashboardWrapper>;
  }

  const currentQuestion = quiz.questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / quiz.questions.length) * 100;

  const handleAnswerChange = (value: string) => {
    setAnswers({
      ...answers,
      [currentQuestion.id]: parseInt(value)
    });
  };

  const handleNext = () => {
    if (currentQuestionIndex < quiz.questions.length - 1) {
      setAnimationClass('animate-scale-out');
      setTimeout(() => {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setAnimationClass('animate-scale-in');
      }, 200);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setAnimationClass('animate-scale-out');
      setTimeout(() => {
        setCurrentQuestionIndex(currentQuestionIndex - 1);
        setAnimationClass('animate-scale-in');
      }, 200);
    }
  };

  const handleSkip = () => {
    handleNext();
  };

  const handleSubmit = () => {
    const results = {
      quizId: quiz.id,
      quizTitle: quiz.title,
      answers,
      questions: quiz.questions,
      submittedAt: new Date().toISOString(),
      difficulty: selectedDifficulty
    };
    localStorage.setItem(`quiz-result-${quiz.id}`, JSON.stringify(results));
    navigate(`/quiz/${quiz.id}/summary`);
  };

  const isLastQuestion = currentQuestionIndex === quiz.questions.length - 1;
  const answeredQuestions = Object.keys(answers).length;

  const getDifficultyColor = (difficulty: string) => {
    const colors = {
      'Beginner': 'bg-green-100 text-green-800 border-green-300',
      'Intermediate': 'bg-blue-100 text-blue-800 border-blue-300',
      'Advanced': 'bg-purple-100 text-purple-800 border-purple-300',
      'Expert': 'bg-red-100 text-red-800 border-red-300'
    };
    return colors[difficulty as keyof typeof colors] || colors.Beginner;
  };

  return (
    <DashboardWrapper title={quiz.title}>
      <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
        {/* Enhanced Header Section */}
        <div className="text-center space-y-4 animate-fade-in">
          <div className="flex justify-center items-center space-x-4">
            <div className="p-3 rounded-full bg-primary/10">
              <Brain className="w-8 h-8 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">{quiz.title}</h1>
              <p className="text-muted-foreground">{quiz.description}</p>
            </div>
          </div>
          <div className="flex justify-center items-center space-x-4 text-sm">
            <Badge variant="outline" className="animate-pulse">{quiz.category}</Badge>
            <Badge className={`border ${getDifficultyColor(quiz.difficulty)} animate-pulse`}>
              {quiz.difficulty} Level
            </Badge>
            <div className="flex items-center space-x-1 px-3 py-1 bg-secondary rounded-full">
              <Clock className="w-4 h-4" />
              <span>{quiz.questions.length} Questions</span>
            </div>
          </div>
        </div>

        {/* Enhanced Progress Bar */}
        <Card className="animate-fade-in hover:shadow-lg transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex justify-between items-center mb-4">
              <span className="text-lg font-semibold">Progress</span>
              <span className="text-sm text-muted-foreground">
                Question {currentQuestionIndex + 1} of {quiz.questions.length}
              </span>
            </div>
            <Progress value={progress} className="h-3 animate-pulse" />
            <div className="flex justify-between text-sm text-muted-foreground mt-3">
              <span>Answered: {answeredQuestions}/{quiz.questions.length}</span>
              <span className="font-semibold">{Math.round(progress)}% Complete</span>
            </div>
          </CardContent>
        </Card>

        {/* Enhanced Question Card */}
        <Card className={`${animationClass} hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1`}>
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-2xl flex items-center space-x-3">
                <span className="bg-primary text-primary-foreground w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">
                  {currentQuestionIndex + 1}
                </span>
                <span>Question {currentQuestionIndex + 1}</span>
              </CardTitle>
              <Badge className={getDifficultyColor(currentQuestion.difficulty)}>
                {currentQuestion.difficulty}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-8">
            <h3 className="text-xl font-medium leading-relaxed">{currentQuestion.question}</h3>
            
            <RadioGroup
              value={answers[currentQuestion.id]?.toString() || ''}
              onValueChange={handleAnswerChange}
              className="space-y-4"
            >
              {currentQuestion.options.map((option, index) => (
                <div 
                  key={index} 
                  className="group flex items-center space-x-4 p-4 border-2 rounded-xl hover:bg-accent/50 hover:border-primary/50 transition-all duration-300 hover:scale-105 cursor-pointer"
                >
                  <RadioGroupItem value={index.toString()} id={`option-${index}`} className="w-5 h-5" />
                  <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer text-base font-medium">
                    {option}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </CardContent>
        </Card>

        {/* Enhanced Navigation Buttons */}
        <div className="flex justify-between items-center animate-fade-in">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentQuestionIndex === 0}
            className="px-6 py-3 transition-all duration-300 hover:scale-105"
          >
            <ChevronLeft className="w-5 h-5 mr-2" />
            Previous
          </Button>

          <div className="flex space-x-3">
            {!isLastQuestion && (
              <Button 
                variant="ghost" 
                onClick={handleSkip}
                className="px-6 py-3 transition-all duration-300 hover:scale-105"
              >
                <SkipForward className="w-5 h-5 mr-2" />
                Skip
              </Button>
            )}
            
            {isLastQuestion ? (
              <Button 
                onClick={handleSubmit}
                className="px-8 py-3 text-lg font-semibold transition-all duration-300 hover:scale-105 animate-pulse"
              >
                <Send className="w-5 h-5 mr-2" />
                Submit Quiz
              </Button>
            ) : (
              <Button 
                onClick={handleNext}
                className="px-6 py-3 transition-all duration-300 hover:scale-105"
              >
                Next
                <ChevronRight className="w-5 h-5 ml-2" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </DashboardWrapper>
  );
};

export default QuizDetailPage;
