
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Brain, Award, Clock, CheckCircle2 } from 'lucide-react';
import DifficultySelectionDialog from './DifficultySelectionDialog';
import { useAuthCheck } from '@/hooks/useAuthCheck';

interface QuizSectionProps {
  contentType: 'course' | 'tutorial';
  contentId: string;
  contentTitle: string;
}

const QuizSection = ({ contentType, contentId, contentTitle }: QuizSectionProps) => {
  const [difficultyDialogOpen, setDifficultyDialogOpen] = useState(false);
  const [selectedQuiz, setSelectedQuiz] = useState<any>(null);
  const navigate = useNavigate();
  const { checkAuthAndExecute, AuthDialog } = useAuthCheck();

  // Mock quiz data related to the content
  const relatedQuizzes = [
    {
      id: parseInt(contentId) * 10 + 1,
      title: `${contentTitle} - Knowledge Check`,
      description: `Test your understanding of the concepts covered in this ${contentType}.`,
      questions: 10,
      difficulty: 'Beginner',
      timeLimit: '15 min',
      completed: false,
      score: null,
      attempts: 0
    },
    {
      id: parseInt(contentId) * 10 + 2,
      title: `${contentTitle} - Advanced Quiz`,
      description: `Challenge yourself with advanced questions about this ${contentType}.`,
      questions: 15,
      difficulty: 'Advanced',
      timeLimit: '25 min',
      completed: true,
      score: 85,
      attempts: 1
    }
  ];

  const handleStartQuiz = (quiz: any) => {
    checkAuthAndExecute(() => {
      setSelectedQuiz(quiz);
      setDifficultyDialogOpen(true);
    });
  };

  const handleDifficultySelect = (difficulty: string) => {
    navigate(`/quiz/${selectedQuiz.id}?difficulty=${difficulty}`);
  };

  const handleViewResult = (quizId: number) => {
    checkAuthAndExecute(() => {
      // Create mock result data
      const mockResult = {
        quizId: quizId,
        quizTitle: `${contentTitle} - Advanced Quiz`,
        answers: { 1: 0, 2: 2, 3: 1, 4: 3 },
        questions: [
          {
            id: 1,
            question: 'What is the main concept covered in this content?',
            options: ['Option A', 'Option B', 'Option C', 'Option D'],
            correctAnswer: 0,
            explanation: 'This is the main concept as explained in the content.'
          },
          {
            id: 2,
            question: 'Which technique is most effective?',
            options: ['Technique A', 'Technique B', 'Technique C', 'Technique D'],
            correctAnswer: 1,
            explanation: 'This technique is most effective as demonstrated.'
          }
        ],
        submittedAt: new Date().toISOString(),
        difficulty: 'Advanced',
        score: 85
      };
      localStorage.setItem(`quiz-result-${quizId}`, JSON.stringify(mockResult));
      navigate(`/quiz/${quizId}/summary`);
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3 mb-4">
        <div className="p-2 rounded-lg bg-primary/10">
          <Brain className="w-6 h-6 text-primary" />
        </div>
        <div>
          <h3 className="text-xl font-bold">Practice Quizzes</h3>
          <p className="text-muted-foreground">Test your knowledge with these related quizzes</p>
        </div>
      </div>

      <div className="grid gap-4">
        {relatedQuizzes.map((quiz) => (
          <Card key={quiz.id} className="border-none shadow-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg ${quiz.completed ? 'bg-green-100 dark:bg-green-900/20' : 'bg-primary/10'}`}>
                    <Award className={`w-5 h-5 ${quiz.completed ? 'text-green-600 dark:text-green-400' : 'text-primary'}`} />
                  </div>
                  <Badge variant="outline">{quiz.difficulty}</Badge>
                </div>
                {quiz.completed && (
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600 dark:text-green-400" />
                    <span className="text-sm font-medium text-green-600 dark:text-green-400">{quiz.score}%</span>
                  </div>
                )}
              </div>
              
              <h4 className="text-lg font-semibold mb-2">{quiz.title}</h4>
              <p className="text-muted-foreground text-sm mb-4">{quiz.description}</p>
              
              <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Questions:</span>
                  <span className="font-medium">{quiz.questions}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Time Limit:</span>
                  <div className="flex items-center space-x-1">
                    <Clock className="w-3 h-3" />
                    <span className="font-medium">{quiz.timeLimit}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex space-x-2">
                <Button 
                  className="flex-1 transition-all duration-300 hover:scale-105" 
                  onClick={() => handleStartQuiz(quiz)}
                  variant={quiz.completed ? "outline" : "default"}
                >
                  {quiz.completed ? 'Retake Quiz' : 'Start Quiz'}
                </Button>
                {quiz.completed && (
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => handleViewResult(quiz.id)}
                    className="transition-all duration-300 hover:scale-105"
                  >
                    View Result
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <DifficultySelectionDialog
        open={difficultyDialogOpen}
        onOpenChange={setDifficultyDialogOpen}
        onDifficultySelect={handleDifficultySelect}
        quizTitle={selectedQuiz?.title || ''}
      />
      <AuthDialog />
    </div>
  );
};

export default QuizSection;
