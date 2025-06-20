
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, XCircle, Award, RotateCcw, ArrowLeft } from 'lucide-react';
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
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBadgeVariant = (score: number) => {
    if (score >= 80) return 'default';
    if (score >= 60) return 'secondary';
    return 'destructive';
  };

  return (
    <DashboardWrapper title="Quiz Results">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header with Score */}
        <Card className="text-center">
          <CardHeader>
            <div className="flex justify-center mb-4">
              <div className={`p-4 rounded-full ${score >= 80 ? 'bg-green-100' : score >= 60 ? 'bg-yellow-100' : 'bg-red-100'}`}>
                <Award className={`w-12 h-12 ${getScoreColor(score)}`} />
              </div>
            </div>
            <CardTitle className="text-2xl">{result.quizTitle}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <h2 className={`text-4xl font-bold ${getScoreColor(score)}`}>
                {score}%
              </h2>
              <p className="text-muted-foreground">
                You got {correctAnswers} out of {totalQuestions} questions correct
              </p>
            </div>
            
            <div className="flex justify-center space-x-2">
              <Badge variant={getScoreBadgeVariant(score)}>
                {score >= 80 ? 'Excellent!' : score >= 60 ? 'Good Job!' : 'Keep Practicing!'}
              </Badge>
            </div>

            <div className="flex justify-center space-x-4 pt-4">
              <Button onClick={handleRetakeQuiz} variant="outline">
                <RotateCcw className="w-4 h-4 mr-2" />
                Retake Quiz
              </Button>
              <Button onClick={handleBackToQuizzes}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Quizzes
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Detailed Results */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Detailed Results</h3>
          
          {result.questions.map((question, index) => {
            const userAnswer = result.answers[question.id];
            const isCorrect = userAnswer === question.correctAnswer;
            const wasAnswered = userAnswer !== undefined;

            return (
              <Card key={question.id} className={`border-l-4 ${isCorrect ? 'border-l-green-500' : wasAnswered ? 'border-l-red-500' : 'border-l-gray-300'}`}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-lg flex items-center">
                      <span className="mr-3">Question {index + 1}</span>
                      {isCorrect ? (
                        <CheckCircle2 className="w-5 h-5 text-green-600" />
                      ) : wasAnswered ? (
                        <XCircle className="w-5 h-5 text-red-600" />
                      ) : (
                        <Badge variant="secondary">Skipped</Badge>
                      )}
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="font-medium">{question.question}</p>
                  
                  <div className="space-y-2">
                    {question.options.map((option, optionIndex) => (
                      <div
                        key={optionIndex}
                        className={`p-3 rounded-lg border ${
                          optionIndex === question.correctAnswer
                            ? 'bg-green-50 border-green-200 text-green-800'
                            : optionIndex === userAnswer && userAnswer !== question.correctAnswer
                            ? 'bg-red-50 border-red-200 text-red-800'
                            : 'bg-gray-50 border-gray-200'
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
                    <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                      <p className="text-sm">
                        <strong>Explanation:</strong> {question.explanation}
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </DashboardWrapper>
  );
};

export default QuizSummaryPage;
