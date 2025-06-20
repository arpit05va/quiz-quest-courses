
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { CheckCircle2, XCircle, Award, RotateCcw, ArrowLeft, ChevronDown } from 'lucide-react';
import DashboardWrapper from '@/components/DashboardWrapper';

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

interface QuizResult {
  quizId: number;
  quizTitle: string;
  answers: { [key: number]: number };
  questions: Question[];
  submittedAt: string;
}

const QuizSummaryPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [result, setResult] = useState<QuizResult | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const storedResult = localStorage.getItem(`quiz-result-${id}`);
    if (storedResult) {
      setResult(JSON.parse(storedResult));
    } else {
      navigate('/quizzes');
    }
  }, [id, navigate]);

  if (!result) {
    return <DashboardWrapper title="Loading..."><div>Loading results...</div></DashboardWrapper>;
  }

  const correctAnswers = result.questions.filter(
    question => result.answers[question.id] === question.correctAnswer
  ).length;
  const totalQuestions = result.questions.length;
  const score = Math.round((correctAnswers / totalQuestions) * 100);

  const handleRetakeQuiz = () => {
    navigate(`/quiz/${id}`);
  };

  const handleBackToQuizzes = () => {
    navigate('/quizzes');
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600 dark:text-green-400';
    if (score >= 60) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-red-600 dark:text-red-400';
  };

  const getScoreBadgeVariant = (score: number) => {
    if (score >= 80) return 'default';
    if (score >= 60) return 'secondary';
    return 'destructive';
  };

  const getScoreBackgroundColor = (score: number) => {
    if (score >= 80) return 'bg-green-100 dark:bg-green-900/30';
    if (score >= 60) return 'bg-yellow-100 dark:bg-yellow-900/30';
    return 'bg-red-100 dark:bg-red-900/30';
  };

  return (
    <DashboardWrapper title="Quiz Results">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Compact Header with Score */}
        <Card className="text-center">
          <CardContent className="p-4">
            <div className="flex items-center justify-center space-x-4">
              <div className={`p-3 rounded-full ${getScoreBackgroundColor(score)}`}>
                <Award className={`w-8 h-8 ${getScoreColor(score)}`} />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">{result.quizTitle}</h1>
                <div className="flex items-center justify-center space-x-4 mt-2">
                  <h2 className={`text-2xl font-bold ${getScoreColor(score)}`}>
                    {score}%
                  </h2>
                  <Badge variant={getScoreBadgeVariant(score)}>
                    {score >= 80 ? 'Excellent!' : score >= 60 ? 'Good Job!' : 'Keep Practicing!'}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  {correctAnswers} out of {totalQuestions} questions correct
                </p>
              </div>
            </div>

            <div className="flex justify-center space-x-4 mt-4">
              <Button onClick={handleRetakeQuiz} variant="outline" size="sm">
                <RotateCcw className="w-4 h-4 mr-2" />
                Retake Quiz
              </Button>
              <Button onClick={handleBackToQuizzes} size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Quizzes
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Collapsible Detailed Results */}
        <Collapsible open={isOpen} onOpenChange={setIsOpen}>
          <Card>
            <CollapsibleTrigger asChild>
              <CardHeader className="cursor-pointer hover:bg-accent/50 transition-colors">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Detailed Results</CardTitle>
                  <ChevronDown className={`w-5 h-5 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                </div>
              </CardHeader>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <CardContent className="space-y-4 pt-0">
                {result.questions.map((question, index) => {
                  const userAnswer = result.answers[question.id];
                  const isCorrect = userAnswer === question.correctAnswer;
                  const wasAnswered = userAnswer !== undefined;

                  return (
                    <Card key={question.id} className={`border-l-4 ${isCorrect ? 'border-l-green-500 dark:border-l-green-400' : wasAnswered ? 'border-l-red-500 dark:border-l-red-400' : 'border-l-gray-300 dark:border-l-gray-600'}`}>
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between">
                          <CardTitle className="text-base flex items-center">
                            <span className="mr-3">Question {index + 1}</span>
                            {isCorrect ? (
                              <CheckCircle2 className="w-4 h-4 text-green-600 dark:text-green-400" />
                            ) : wasAnswered ? (
                              <XCircle className="w-4 h-4 text-red-600 dark:text-red-400" />
                            ) : (
                              <Badge variant="secondary" className="text-xs">Skipped</Badge>
                            )}
                          </CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-3 pt-0">
                        <p className="font-medium text-sm">{question.question}</p>
                        
                        <div className="space-y-2">
                          {question.options.map((option, optionIndex) => (
                            <div
                              key={optionIndex}
                              className={`p-2 rounded-lg border text-sm ${
                                optionIndex === question.correctAnswer
                                  ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800 text-green-800 dark:text-green-200'
                                  : optionIndex === userAnswer && userAnswer !== question.correctAnswer
                                  ? 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800 text-red-800 dark:text-red-200'
                                  : 'bg-gray-50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700'
                              }`}
                            >
                              <div className="flex items-center justify-between">
                                <span>{option}</span>
                                <div className="flex items-center space-x-2">
                                  {optionIndex === question.correctAnswer && (
                                    <Badge variant="default" className="text-xs">Correct</Badge>
                                  )}
                                  {optionIndex === userAnswer && userAnswer !== question.correctAnswer && (
                                    <Badge variant="destructive" className="text-xs">Your Answer</Badge>
                                  )}
                                  {optionIndex === userAnswer && userAnswer === question.correctAnswer && (
                                    <Badge variant="default" className="text-xs">Your Answer</Badge>
                                  )}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>

                        {question.explanation && (
                          <div className="p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                            <p className="text-xs">
                              <strong>Explanation:</strong> {question.explanation}
                            </p>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  );
                })}
              </CardContent>
            </CollapsibleContent>
          </Card>
        </Collapsible>
      </div>
    </DashboardWrapper>
  );
};

export default QuizSummaryPage;
