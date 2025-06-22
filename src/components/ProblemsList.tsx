
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Search, 
  Filter, 
  CheckCircle, 
  Star,
  Code,
  Clock,
  Trophy
} from 'lucide-react';

interface Problem {
  id: number;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  category: string;
  acceptanceRate: number;
  solved: boolean;
  starred: boolean;
  timeComplexity?: string;
  spaceComplexity?: string;
}

const ProblemsList = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');

  // Mock problems data
  const problems: Problem[] = [
    {
      id: 1,
      title: "Two Sum",
      difficulty: "Easy",
      category: "Array",
      acceptanceRate: 55.8,
      solved: true,
      starred: true,
      timeComplexity: "O(n)",
      spaceComplexity: "O(n)"
    },
    {
      id: 2,
      title: "Add Two Numbers",
      difficulty: "Medium",
      category: "Linked List",
      acceptanceRate: 46.2,
      solved: true,
      starred: true,
      timeComplexity: "O(max(m,n))",
      spaceComplexity: "O(max(m,n))"
    },
    {
      id: 3,
      title: "Longest Substring Without Repeating Characters",
      difficulty: "Medium",
      category: "String",
      acceptanceRate: 37.0,
      solved: true,
      starred: true,
      timeComplexity: "O(n)",
      spaceComplexity: "O(min(m,n))"
    },
    {
      id: 4,
      title: "Median of Two Sorted Arrays",
      difficulty: "Hard",
      category: "Array",
      acceptanceRate: 43.8,
      solved: true,
      starred: true,
      timeComplexity: "O(log(min(x,y)))",
      spaceComplexity: "O(1)"
    },
    {
      id: 5,
      title: "Longest Palindromic Substring",
      difficulty: "Medium",
      category: "String",
      acceptanceRate: 35.9,
      solved: true,
      starred: true,
      timeComplexity: "O(n²)",
      spaceComplexity: "O(1)"
    },
    {
      id: 205,
      title: "Isomorphic Strings",
      difficulty: "Easy",
      category: "String",
      acceptanceRate: 74.0,
      solved: false,
      starred: false,
      timeComplexity: "O(n)",
      spaceComplexity: "O(1)"
    },
    {
      id: 2138,
      title: "Divide a String Into Groups of Size k",
      difficulty: "Easy",
      category: "String",
      acceptanceRate: 74.0,
      solved: false,
      starred: false,
      timeComplexity: "O(n)",
      spaceComplexity: "O(n)"
    }
  ];

  const categories = ['Array', 'String', 'Hash Table', 'Dynamic Programming', 'Math', 'Sorting', 'Greedy', 'Depth-First Search', 'Binary Search', 'Linked List'];

  const filteredProblems = problems.filter(problem => {
    const matchesSearch = problem.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDifficulty = difficultyFilter === 'all' || problem.difficulty === difficultyFilter;
    const matchesCategory = categoryFilter === 'all' || problem.category === categoryFilter;
    return matchesSearch && matchesDifficulty && matchesCategory;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-100 text-green-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleProblemClick = (problemId: number) => {
    navigate(`/problem/${problemId}`);
  };

  const solvedCount = problems.filter(p => p.solved).length;

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-none shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-green-600">{solvedCount}</p>
                <p className="text-sm text-muted-foreground">Problems Solved</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-none shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Code className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-blue-600">{problems.length}</p>
                <p className="text-sm text-muted-foreground">Total Problems</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Trophy className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-purple-600">{Math.round((solvedCount / problems.length) * 100)}%</p>
                <p className="text-sm text-muted-foreground">Success Rate</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="border-none shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Code className="w-5 h-5" />
            <span>Coding Problems</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search problems..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={difficultyFilter} onValueChange={setDifficultyFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Difficulty" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Difficulties</SelectItem>
                <SelectItem value="Easy">Easy</SelectItem>
                <SelectItem value="Medium">Medium</SelectItem>
                <SelectItem value="Hard">Hard</SelectItem>
              </SelectContent>
            </Select>

            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map(category => (
                  <SelectItem key={category} value={category}>{category}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Category Tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            {categories.slice(0, 10).map(category => (
              <Badge key={category} variant="outline" className="cursor-pointer hover:bg-muted">
                {category}
              </Badge>
            ))}
          </div>

          {/* Problems List */}
          <div className="space-y-3">
            {filteredProblems.map((problem) => (
              <div
                key={problem.id}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors"
                onClick={() => handleProblemClick(problem.id)}
              >
                <div className="flex items-center space-x-4 flex-1">
                  <div className="flex items-center space-x-2">
                    {problem.solved && <CheckCircle className="w-5 h-5 text-green-600" />}
                    {problem.starred && <Star className="w-4 h-4 text-yellow-500 fill-current" />}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center space-x-3">
                      <h3 className="font-medium text-foreground">
                        {problem.id}. {problem.title}
                      </h3>
                      <Badge className={getDifficultyColor(problem.difficulty)}>
                        {problem.difficulty}
                      </Badge>
                      <Badge variant="outline">{problem.category}</Badge>
                    </div>
                    {problem.timeComplexity && (
                      <div className="flex items-center space-x-4 mt-1 text-sm text-muted-foreground">
                        <span>Time: {problem.timeComplexity}</span>
                        <span>Space: {problem.spaceComplexity}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <p className="text-sm font-medium">{problem.acceptanceRate}%</p>
                    <p className="text-xs text-muted-foreground">Acceptance</p>
                  </div>
                  <Button variant="ghost" size="sm">
                    <Code className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProblemsList;
