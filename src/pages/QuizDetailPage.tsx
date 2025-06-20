
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { ChevronLeft, ChevronRight, SkipForward, Send } from 'lucide-react';
import DashboardWrapper from '@/components/DashboardWrapper';

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
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
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<{ [key: number]: number }>({});
  const [quiz, setQuiz] = useState<Quiz | null>(null);

  // Mock quiz data
  useEffect(() => {
    const mockQuiz: Quiz = {
      id: parseInt(id || '1'),
      title: 'HTML Fundamentals Quiz',
      description: 'Test your knowledge of HTML basics, semantics, and best practices.',
      category: 'Web Development',
      difficulty: 'Beginner',
      questions: [
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
          explanation: 'HTML stands for Hyper Text Markup Language, which is the standard markup language for creating web pages.'
        },
        {
          id: 2,
          question: 'Which HTML element is used for the largest heading?',
          options: ['<h6>', '<heading>', '<h1>', '<header>'],
          correctAnswer: 2,
          explanation: 'The <h1> element represents the largest heading in HTML, typically used for main page titles.'
        },
        {
          id: 3,
          question: 'What is the correct HTML element for inserting a line break?',
          options: ['<break>', '<br>', '<lb>', '<line>'],
          correctAnswer: 1,
          explanation: 'The <br> element creates a line break in HTML content.'
        }
      ]
    };
    setQuiz(mockQuiz);
  }, [id]);

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
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSkip = () => {
    handleNext();
  };

  const handleSubmit = () => {
    // Store quiz results in localStorage for the summary page
    const results = {
      quizId: quiz.id,
      quizTitle: quiz.title,
      answers,
      questions: quiz.questions,
      submittedAt: new Date().toISOString()
    };
    localStorage.setItem(`quiz-result-${quiz.id}`, JSON.stringify(results));
    navigate(`/quiz/${quiz.id}/summary`);
  };

  const isLastQuestion = currentQuestionIndex === quiz.questions.length - 1;
  const answeredQuestions = Object.keys(answers).length;

  return (
    <DashboardWrapper title={quiz.title}>
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header Section */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-foreground">{quiz.title}</h1>
          <p className="text-muted-foreground">{quiz.description}</p>
          <div className="flex justify-center items-center space-x-4 text-sm">
            <span className="px-3 py-1 bg-primary/10 rounded-full">{quiz.category}</span>
            <span className="px-3 py-1 bg-secondary rounded-full">{quiz.difficulty}</span>
          </div>
        </div>

        {/* Progress Bar */}
        <Card>
          <CardContent className="p-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium">Progress</span>
              <span className="text-sm text-muted-foreground">
                Question {currentQuestionIndex + 1} of {quiz.questions.length}
              </span>
            </div>
            <Progress value={progress} className="h-2" />
            <div className="flex justify-between text-xs text-muted-foreground mt-2">
              <span>Answered: {answeredQuestions}/{quiz.questions.length}</span>
              <span>{Math.round(progress)}% Complete</span>
            </div>
          </CardContent>
        </Card>

        {/* Question Card */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">
              Question {currentQuestionIndex + 1}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <h3 className="text-lg font-medium">{currentQuestion.question}</h3>
            
            <RadioGroup
              value={answers[currentQuestion.id]?.toString() || ''}
              onValueChange={handleAnswerChange}
              className="space-y-3"
            >
              {currentQuestion.options.map((option, index) => (
                <div key={index} className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-accent/50 transition-colors">
                  <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                  <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer">
                    {option}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </CardContent>
        </Card>

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentQuestionIndex === 0}
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            Previous
          </Button>

          <div className="flex space-x-2">
            {!isLastQuestion && (
              <Button variant="ghost" onClick={handleSkip}>
                <SkipForward className="w-4 h-4 mr-2" />
                Skip
              </Button>
            )}
            
            {isLastQuestion ? (
              <Button onClick={handleSubmit}>
                <Send className="w-4 h-4 mr-2" />
                Submit Quiz
              </Button>
            ) : (
              <Button onClick={handleNext}>
                Next
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </DashboardWrapper>
  );
};

export default QuizDetailPage;
