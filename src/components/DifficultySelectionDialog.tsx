
import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Brain, Star, Zap, Award } from 'lucide-react';

interface DifficultySelectionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onDifficultySelect: (difficulty: string) => void;
  quizTitle: string;
}

const DifficultySelectionDialog = ({
  open,
  onOpenChange,
  onDifficultySelect,
  quizTitle
}: DifficultySelectionDialogProps) => {
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('');

  const difficulties = [
    {
      level: 'Beginner',
      icon: Brain,
      description: 'Perfect for those new to the topic',
      color: 'bg-green-100 hover:bg-green-200 text-green-800 border-green-300',
      questions: '8-10 questions',
      time: '15 minutes'
    },
    {
      level: 'Intermediate',
      icon: Star,
      description: 'For those with some experience',
      color: 'bg-blue-100 hover:bg-blue-200 text-blue-800 border-blue-300',
      questions: '12-15 questions',
      time: '20 minutes'
    },
    {
      level: 'Advanced',
      icon: Zap,
      description: 'Challenge yourself with complex topics',
      color: 'bg-purple-100 hover:bg-purple-200 text-purple-800 border-purple-300',
      questions: '15-20 questions',
      time: '25 minutes'
    },
    {
      level: 'Expert',
      icon: Award,
      description: 'For true masters of the subject',
      color: 'bg-red-100 hover:bg-red-200 text-red-800 border-red-300',
      questions: '20-25 questions',
      time: '30 minutes'
    }
  ];

  const handleStart = () => {
    if (selectedDifficulty) {
      onDifficultySelect(selectedDifficulty);
      onOpenChange(false);
      setSelectedDifficulty('');
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">
            Select Difficulty Level
          </DialogTitle>
          <DialogDescription className="text-center text-lg">
            Choose your challenge level for: <span className="font-semibold">{quizTitle}</span>
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          {difficulties.map((diff) => (
            <div
              key={diff.level}
              className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-300 transform hover:scale-105 ${
                selectedDifficulty === diff.level
                  ? `${diff.color} ring-2 ring-primary scale-105 shadow-lg`
                  : 'bg-gray-50 hover:bg-gray-100 border-gray-200'
              }`}
              onClick={() => setSelectedDifficulty(diff.level)}
            >
              <div className="flex items-center space-x-3 mb-3">
                <div className={`p-2 rounded-full ${selectedDifficulty === diff.level ? 'bg-white/20' : 'bg-primary/10'}`}>
                  <diff.icon className={`w-5 h-5 ${selectedDifficulty === diff.level ? 'text-current' : 'text-primary'}`} />
                </div>
                <div>
                  <h3 className="font-bold text-lg">{diff.level}</h3>
                  <Badge variant="outline" className="text-xs">
                    {diff.questions}
                  </Badge>
                </div>
              </div>
              <p className="text-sm mb-2">{diff.description}</p>
              <div className="text-xs text-muted-foreground">
                Estimated time: {diff.time}
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-6">
          <Button
            onClick={handleStart}
            disabled={!selectedDifficulty}
            className="px-8 py-3 text-lg font-semibold transition-all duration-300 hover:scale-105"
          >
            Start Quiz
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DifficultySelectionDialog;
