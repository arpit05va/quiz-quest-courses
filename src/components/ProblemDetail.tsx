
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  ArrowLeft, 
  Play, 
  Send, 
  Settings, 
  ChevronLeft, 
  ChevronRight,
  CheckCircle,
  XCircle,
  Clock,
  Star,
  Code,
  BookOpen,
  Lightbulb,
  MessageSquare,
  ThumbsUp,
  ThumbsDown,
  Share2,
  Copy
} from 'lucide-react';

interface ProblemDetailProps {
  problemId: string;
}

const ProblemDetail: React.FC<ProblemDetailProps> = ({ problemId }) => {
  const navigate = useNavigate();
  const [selectedLanguage, setSelectedLanguage] = useState('java');
  const [code, setCode] = useState('');
  const [customInput, setCustomInput] = useState('');
  const [testResults, setTestResults] = useState<any[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState('description');

  // Mock problem data
  const problemData = {
    1: {
      id: 1,
      title: "Two Sum",
      difficulty: "Easy",
      category: "Array",
      likes: 1250,
      dislikes: 85,
      description: `Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.

You may assume that each input would have exactly one solution, and you may not use the same element twice.

You can return the answer in any order.`,
      examples: [
        {
          input: "nums = [2,7,11,15], target = 9",
          output: "[0,1]",
          explanation: "Because nums[0] + nums[1] == 9, we return [0, 1]."
        },
        {
          input: "nums = [3,2,4], target = 6",
          output: "[1,2]",
          explanation: "Because nums[1] + nums[2] == 6, we return [1, 2]."
        }
      ],
      constraints: [
        "2 <= nums.length <= 10^4",
        "-10^9 <= nums[i] <= 10^9",
        "-10^9 <= target <= 10^9",
        "Only one valid answer exists."
      ],
      solution: `The brute force approach would be to check every pair of numbers, but that would be O(n²).

A better approach is to use a hash map to store the numbers we've seen and their indices. For each number, we check if its complement (target - current number) exists in the hash map.

**Time Complexity:** O(n)
**Space Complexity:** O(n)`,
      discussions: [
        {
          id: 1,
          author: "developer123",
          content: "Great problem for beginners! The hash map approach is elegant.",
          likes: 45,
          replies: 3,
          time: "2 hours ago"
        },
        {
          id: 2,
          author: "codemaster",
          content: "Can we solve this without extra space? What about sorting first?",
          likes: 12,
          replies: 1,
          time: "5 hours ago"
        }
      ]
    },
    205: {
      id: 205,
      title: "Isomorphic Strings",
      difficulty: "Easy", 
      category: "String",
      likes: 892,
      dislikes: 156,
      description: `Given two strings s and t, determine if they are isomorphic.

Two strings s and t are isomorphic if the characters in s can be replaced to get t.

All occurrences of a character must be replaced with another character while preserving the order of characters. No two characters may map to the same character, but a character may map to itself.`,
      examples: [
        {
          input: 's = "egg", t = "add"',
          output: "true",
          explanation: "The strings s and t can be made identical by: 'e' -> 'a', 'g' -> 'd'."
        },
        {
          input: 's = "foo", t = "bar"',
          output: "false",
          explanation: "The strings s and t can not be made identical as 'o' needs to be mapped to both 'a' and 'r'."
        }
      ],
      constraints: [
        "1 <= s.length <= 5 * 10^4",
        "t.length == s.length",
        "s and t consist of any valid ascii character."
      ],
      solution: `We need to track the mapping between characters in both directions.

Use two hash maps:
1. One for mapping characters from s to t
2. One for mapping characters from t to s

**Time Complexity:** O(n)
**Space Complexity:** O(1) since we have at most 256 ASCII characters`,
      discussions: [
        {
          id: 1,
          author: "stringexpert",
          content: "Two hash maps are essential here to check bidirectional mapping.",
          likes: 28,
          replies: 2,
          time: "1 hour ago"
        }
      ]
    }
  };

  const languages = [
    { value: 'java', label: 'Java' },
    { value: 'python', label: 'Python' },
    { value: 'cpp', label: 'C++' },
    { value: 'javascript', label: 'JavaScript' },
    { value: 'typescript', label: 'TypeScript' }
  ];

  const problem = problemData[parseInt(problemId) as keyof typeof problemData] || problemData[1];

  const starterCodes = {
    java: `class Solution {
    public boolean isIsomorphic(String s, String t) {
        
    }
}`,
    python: `class Solution:
    def isIsomorphic(self, s: str, t: str) -> bool:
        `,
    cpp: `class Solution {
public:
    bool isIsomorphic(string s, string t) {
        
    }
};`,
    javascript: `/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var isIsomorphic = function(s, t) {
    
};`,
    typescript: `function isIsomorphic(s: string, t: string): boolean {
    
}`
  };

  React.useEffect(() => {
    setCode(starterCodes[selectedLanguage as keyof typeof starterCodes] || '');
  }, [selectedLanguage]);

  const handleRunCode = () => {
    setIsRunning(true);
    setTimeout(() => {
      setTestResults([
        { input: 's = "egg", t = "add"', expected: 'true', actual: 'true', passed: true },
        { input: 's = "foo", t = "bar"', expected: 'false', actual: 'false', passed: true },
        { input: 's = "paper", t = "title"', expected: 'true', actual: 'true', passed: true }
      ]);
      setIsRunning(false);
    }, 2000);
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
    }, 3000);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'Medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';  
      case 'Hard': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Enhanced Header */}
      <header className="bg-card border-b border-border sticky top-0 z-50 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                onClick={() => navigate('/problems')}
                className="flex items-center space-x-2 hover:bg-muted"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Problems</span>
              </Button>
              
              <div className="h-6 w-px bg-border" />
              
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="sm" className="hover:bg-muted">
                  <ChevronLeft className="w-4 h-4" />
                  <span className="ml-1">Prev</span>
                </Button>
                <Button variant="ghost" size="sm" className="hover:bg-muted">
                  <span className="mr-1">Next</span>
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="sm" className="hover:bg-muted">
                  <ThumbsUp className="w-4 h-4" />
                  <span className="ml-1">{problem.likes}</span>
                </Button>
                <Button variant="ghost" size="sm" className="hover:bg-muted">
                  <ThumbsDown className="w-4 h-4" />
                  <span className="ml-1">{problem.dislikes}</span>
                </Button>
                <Button variant="ghost" size="sm" className="hover:bg-muted">
                  <Star className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm" className="hover:bg-muted">
                  <Share2 className="w-4 h-4" />
                </Button>
              </div>
              
              <div className="h-6 w-px bg-border" />
              
              <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {languages.map(lang => (
                    <SelectItem key={lang.value} value={lang.value}>
                      {lang.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Button variant="ghost" size="sm" className="hover:bg-muted">
                <Settings className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-2 gap-6 h-[calc(100vh-8rem)]">
          {/* Left Panel - Problem Content */}
          <div className="flex flex-col">
            <Card className="flex-1 border-border">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <h1 className="text-2xl font-bold">{problem.id}. {problem.title}</h1>
                    <Badge className={getDifficultyColor(problem.difficulty)}>
                      {problem.difficulty}
                    </Badge>
                    <Badge variant="outline">{problem.category}</Badge>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="flex-1 p-0">
                <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full flex flex-col">
                  <TabsList className="grid w-full grid-cols-3 mx-6">
                    <TabsTrigger value="description" className="flex items-center space-x-2">
                      <BookOpen className="w-4 h-4" />
                      <span>Description</span>
                    </TabsTrigger>
                    <TabsTrigger value="solution" className="flex items-center space-x-2">
                      <Lightbulb className="w-4 h-4" />
                      <span>Solution</span>
                    </TabsTrigger>
                    <TabsTrigger value="discussion" className="flex items-center space-x-2">
                      <MessageSquare className="w-4 h-4" />
                      <span>Discussion</span>
                    </TabsTrigger>
                  </TabsList>
                  
                  <div className="flex-1 px-6 pb-6">
                    <TabsContent value="description" className="h-full mt-4">
                      <ScrollArea className="h-full">
                        <div className="space-y-6 pr-4">
                          <div>
                            <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                              {problem.description}
                            </p>
                          </div>

                          <div>
                            <h3 className="font-semibold mb-3 text-lg">Examples</h3>
                            <div className="space-y-4">
                              {problem.examples.map((example, index) => (
                                <div key={index} className="p-4 bg-muted/30 rounded-lg border">
                                  <p className="font-medium mb-3">Example {index + 1}:</p>
                                  <div className="space-y-2 text-sm">
                                    <div className="grid gap-2">
                                      <div>
                                        <span className="font-medium text-foreground">Input: </span>
                                        <code className="bg-muted px-2 py-1 rounded text-xs font-mono">
                                          {example.input}
                                        </code>
                                      </div>
                                      <div>
                                        <span className="font-medium text-foreground">Output: </span>
                                        <code className="bg-muted px-2 py-1 rounded text-xs font-mono">
                                          {example.output}
                                        </code>
                                      </div>
                                      {example.explanation && (
                                        <div>
                                          <span className="font-medium text-foreground">Explanation: </span>
                                          <span className="text-muted-foreground">{example.explanation}</span>
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>

                          <div>
                            <h3 className="font-semibold mb-3 text-lg">Constraints</h3>
                            <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                              {problem.constraints.map((constraint, index) => (
                                <li key={index} className="text-sm font-mono">{constraint}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </ScrollArea>
                    </TabsContent>
                    
                    <TabsContent value="solution" className="h-full mt-4">
                      <ScrollArea className="h-full">
                        <div className="space-y-4 pr-4">
                          <div className="p-6 bg-muted/30 rounded-lg border">
                            <h3 className="font-semibold mb-3 text-lg flex items-center">
                              <Lightbulb className="w-5 h-5 mr-2 text-yellow-500" />
                              Solution Approach
                            </h3>
                            <div className="text-muted-foreground leading-relaxed whitespace-pre-line">
                              {problem.solution}
                            </div>
                          </div>
                          
                          <div className="p-4 bg-blue-50 dark:bg-blue-950/30 rounded-lg border border-blue-200 dark:border-blue-800">
                            <p className="text-sm text-blue-800 dark:text-blue-300">
                              💡 <strong>Hint:</strong> Try to think about what data structure would help you 
                              look up values efficiently.
                            </p>
                          </div>
                        </div>
                      </ScrollArea>
                    </TabsContent>
                    
                    <TabsContent value="discussion" className="h-full mt-4">
                      <ScrollArea className="h-full">
                        <div className="space-y-4 pr-4">
                          {problem.discussions.map((discussion) => (
                            <div key={discussion.id} className="p-4 border rounded-lg bg-card">
                              <div className="flex items-start justify-between mb-2">
                                <div className="flex items-center space-x-2">
                                  <span className="font-medium">{discussion.author}</span>
                                  <span className="text-xs text-muted-foreground">{discussion.time}</span>
                                </div>
                              </div>
                              <p className="text-sm text-muted-foreground mb-3">{discussion.content}</p>
                              <div className="flex items-center space-x-4">
                                <Button variant="ghost" size="sm" className="h-8">
                                  <ThumbsUp className="w-3 h-3 mr-1" />
                                  {discussion.likes}
                                </Button>
                                <Button variant="ghost" size="sm" className="h-8">
                                  <MessageSquare className="w-3 h-3 mr-1" />
                                  {discussion.replies} replies
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </ScrollArea>
                    </TabsContent>
                  </div>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* Right Panel - Code Editor and Testing */}
          <div className="flex flex-col space-y-4">
            {/* Code Editor */}
            <Card className="flex-1 border-border">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center space-x-2">
                    <Code className="w-5 h-5" />
                    <span>Code Editor</span>
                  </CardTitle>
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="sm" className="hover:bg-muted">
                      <Copy className="w-4 h-4" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={handleRunCode}
                      disabled={isRunning}
                      className="flex items-center space-x-2"
                    >
                      {isRunning ? (
                        <Clock className="w-4 h-4 animate-spin" />
                      ) : (
                        <Play className="w-4 h-4" />
                      )}
                      <span>{isRunning ? 'Running...' : 'Run'}</span>
                    </Button>
                    <Button 
                      onClick={handleSubmit}
                      disabled={isSubmitting}
                      className="flex items-center space-x-2 bg-green-600 hover:bg-green-700"
                    >
                      {isSubmitting ? (
                        <Clock className="w-4 h-4 animate-spin" />
                      ) : (
                        <Send className="w-4 h-4" />
                      )}
                      <span>{isSubmitting ? 'Submitting...' : 'Submit'}</span>
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="flex-1 p-4">
                <Textarea
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="font-mono text-sm h-full min-h-[350px] resize-none bg-muted/20 border-muted"
                  placeholder="Write your code here..."
                />
              </CardContent>
            </Card>

            {/* Test Cases Panel */}
            <Card className="border-border">
              <CardContent className="p-4">
                <Tabs defaultValue="testcase" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="testcase">Test Cases</TabsTrigger>
                    <TabsTrigger value="result">Results</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="testcase" className="mt-4">
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium mb-2 block">Custom Input</label>
                        <Textarea
                          value={customInput}
                          onChange={(e) => setCustomInput(e.target.value)}
                          placeholder='s = "egg"\nt = "add"'
                          className="font-mono text-sm h-20 bg-muted/20 border-muted"
                        />
                      </div>
                      
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm" className="flex-1">
                          Case 1
                        </Button>
                        <Button variant="outline" size="sm" className="flex-1">
                          Case 2
                        </Button>
                        <Button variant="outline" size="sm" className="flex-1">
                          Case 3
                        </Button>
                        <Button variant="outline" size="sm">+</Button>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="result" className="mt-4">
                    {testResults.length > 0 ? (
                      <div className="space-y-3 max-h-48 overflow-y-auto">
                        {testResults.map((result, index) => (
                          <div key={index} className="p-3 border rounded-lg bg-muted/20">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-sm font-medium">Test Case {index + 1}</span>
                              <div className="flex items-center space-x-2">
                                {result.passed ? (
                                  <CheckCircle className="w-4 h-4 text-green-600" />
                                ) : (
                                  <XCircle className="w-4 h-4 text-red-600" />
                                )}
                                <span className={`text-sm font-medium ${result.passed ? 'text-green-600' : 'text-red-600'}`}>
                                  {result.passed ? 'Passed' : 'Failed'}
                                </span>
                              </div>
                            </div>
                            <div className="text-xs space-y-1 font-mono">
                              <div><span className="font-medium">Input:</span> {result.input}</div>
                              <div><span className="font-medium">Expected:</span> {result.expected}</div>
                              <div><span className="font-medium">Actual:</span> {result.actual}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center text-muted-foreground py-8">
                        <Play className="w-8 h-8 mx-auto mb-2 opacity-50" />
                        <p>Run your code to see test results</p>
                      </div>
                    )}
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProblemDetail;
