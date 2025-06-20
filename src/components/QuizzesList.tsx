
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Award, CheckCircle2, Timer, Eye } from 'lucide-react';

const QuizzesList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const quizzes = [
    {
      id: 1,
      title: 'HTML Fundamentals Quiz',
      description: 'Test your knowledge of HTML basics, semantics, and best practices.',
      questions: 15,
      difficulty: 'Beginner',
      timeLimit: '20 min',
      completed: false,
      score: null,
      attempts: 0,
      category: 'Web Development'
    },
    {
      id: 2,
      title: 'CSS Selectors Challenge',
      description: 'Master CSS selectors, specificity rules, and advanced styling techniques.',
      questions: 20,
      difficulty: 'Intermediate',
      timeLimit: '25 min',
      completed: true,
      score: 85,
      attempts: 2,
      category: 'Web Development'
    },
    {
      id: 3,
      title: 'JavaScript Array Methods',
      description: 'Test your understanding of JavaScript array manipulation and functional programming.',
      questions: 12,
      difficulty: 'Intermediate',
      timeLimit: '15 min',
      completed: false,
      score: null,
      attempts: 1,
      category: 'Programming'
    },
    {
      id: 4,
      title: 'React Hooks Deep Dive',
      description: 'Advanced quiz on React hooks, state management, and component lifecycle.',
      questions: 18,
      difficulty: 'Advanced',
      timeLimit: '30 min',
      completed: false,
      score: null,
      attempts: 0,
      category: 'React'
    }
  ];

  const filteredQuizzes = quizzes.filter(quiz =>
    quiz.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    quiz.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleStartQuiz = (quizId: number) => {
    console.log(`Starting quiz ${quizId}`);
    navigate(`/quiz/${quizId}`);
  };

  const handleRetakeQuiz = (quizId: number) => {
    console.log(`Retaking quiz ${quizId}`);
    navigate(`/quiz/${quizId}`);
  };

  const handleViewResult = (quizId: number) => {
    console.log(`Viewing result for quiz ${quizId}`);
    navigate(`/quiz/${quizId}/summary`);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <h2 className="text-3xl font-bold text-foreground mb-4 md:mb-0">
          Practice Quizzes & Assessments
        </h2>
        
        <div className="max-w-md w-full md:w-auto">
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <Input
              type="text"
              placeholder="Search quizzes..."
              className="pl-10 pr-4 py-3 w-full rounded-full border-2"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6">
        {filteredQuizzes.map((quiz, index) => (
          <Card key={quiz.id} className="border-none shadow-lg hover:shadow-xl transition-all duration-300 hover-lift">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg ${quiz.completed ? 'bg-green-100' : 'bg-primary/10'}`}>
                    <Award className={`w-6 h-6 ${quiz.completed ? 'text-green-600' : 'text-primary'}`} />
                  </div>
                  <Badge variant="outline">{quiz.category}</Badge>
                </div>
                {quiz.completed && (
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className="w-5 h-5 text-green-600" />
                    <span className="text-sm font-medium text-green-600">{quiz.score}%</span>
                  </div>
                )}
              </div>
              
              <h3 className="text-xl font-bold text-foreground mb-2">{quiz.title}</h3>
              <p className="text-muted-foreground text-sm mb-4">{quiz.description}</p>
              
              <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Questions:</span>
                  <span className="font-medium">{quiz.questions}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Difficulty:</span>
                  <Badge variant="outline">{quiz.difficulty}</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Time Limit:</span>
                  <div className="flex items-center space-x-1">
                    <Timer className="w-3 h-3" />
                    <span className="font-medium">{quiz.timeLimit}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Attempts:</span>
                  <span className="font-medium">{quiz.attempts}</span>
                </div>
              </div>
              
              <div className="flex flex-col space-y-2">
                <Button 
                  className="w-full" 
                  onClick={() => quiz.completed ? handleRetakeQuiz(quiz.id) : handleStartQuiz(quiz.id)}
                  variant={quiz.completed ? "outline" : "default"}
                >
                  {quiz.completed ? 'Retake Quiz' : 'Start Quiz'}
                </Button>
                {quiz.completed && (
                  <Button 
                    variant="ghost" 
                    className="w-full"
                    onClick={() => handleViewResult(quiz.id)}
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    View Result
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default QuizzesList;
