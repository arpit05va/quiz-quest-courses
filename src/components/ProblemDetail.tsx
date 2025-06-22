
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
  ArrowRight, 
  Play, 
  Send, 
  Settings, 
  ChevronLeft, 
  ChevronRight,
  CheckCircle,
  XCircle,
  Clock,
  Star,
  Code
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

  // Mock problem data
  const problemData = {
    1: {
      id: 1,
      title: "Two Sum",
      difficulty: "Easy",
      category: "Array",
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
      ]
    },
    205: {
      id: 205,
      title: "Isomorphic Strings",
      difficulty: "Easy", 
      category: "String",
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
    // Simulate API call
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
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      // Navigate to submission result or show success message
    }, 3000);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-100 text-green-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';  
      case 'Hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      {/* Header */}
      <header className="bg-background/95 backdrop-blur-sm border-b border-border sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                onClick={() => navigate('/problems')}
                className="flex items-center space-x-2"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Problem List</span>
              </Button>
              
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="sm">
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div className="flex items-center space-x-4">
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

              <Button variant="outline" size="sm">
                <Settings className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-2 gap-6 h-[calc(100vh-8rem)]">
          {/* Problem Description Panel */}
          <div className="flex flex-col">
            <Card className="border-none shadow-lg flex-1">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <h1 className="text-2xl font-bold">{problem.id}. {problem.title}</h1>
                    <Badge className={getDifficultyColor(problem.difficulty)}>
                      {problem.difficulty}
                    </Badge>
                    <Badge variant="outline">{problem.category}</Badge>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="sm">
                      <Star className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="flex-1">
                <ScrollArea className="h-full">
                  <div className="space-y-6 pr-4">
                    <div>
                      <h3 className="font-semibold mb-3">Description</h3>
                      <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                        {problem.description}
                      </p>
                    </div>

                    <div>
                      <h3 className="font-semibold mb-3">Examples</h3>
                      <div className="space-y-4">
                        {problem.examples.map((example, index) => (
                          <div key={index} className="p-4 bg-muted/50 rounded-lg">
                            <p className="font-medium mb-2">Example {index + 1}:</p>
                            <div className="space-y-2 text-sm">
                              <div>
                                <span className="font-medium">Input: </span>
                                <code className="bg-muted px-2 py-1 rounded">{example.input}</code>
                              </div>
                              <div>
                                <span className="font-medium">Output: </span>
                                <code className="bg-muted px-2 py-1 rounded">{example.output}</code>
                              </div>
                              {example.explanation && (
                                <div>
                                  <span className="font-medium">Explanation: </span>
                                  <span className="text-muted-foreground">{example.explanation}</span>
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="font-semibold mb-3">Constraints</h3>
                      <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                        {problem.constraints.map((constraint, index) => (
                          <li key={index} className="text-sm">{constraint}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>

          {/* Code Editor and Test Panel */}
          <div className="flex flex-col space-y-4">
            {/* Code Editor */}
            <Card className="border-none shadow-lg flex-1">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center space-x-2">
                    <Code className="w-5 h-5" />
                    <span>Code</span>
                  </CardTitle>
                  <div className="flex items-center space-x-2">
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
              <CardContent className="flex-1">
                <Textarea
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="font-mono text-sm h-full min-h-[300px] resize-none"
                  placeholder="Write your code here..."
                />
              </CardContent>
            </Card>

            {/* Test Cases Panel */}
            <Card className="border-none shadow-lg">
              <CardContent className="p-4">
                <Tabs defaultValue="testcase" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="testcase">Testcase</TabsTrigger>
                    <TabsTrigger value="result">Test Result</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="testcase" className="mt-4">
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium mb-2 block">Custom Input</label>
                        <Textarea
                          value={customInput}
                          onChange={(e) => setCustomInput(e.target.value)}
                          placeholder='s = "egg"\nt = "add"'
                          className="font-mono text-sm h-20"
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
                      <div className="space-y-3">
                        {testResults.map((result, index) => (
                          <div key={index} className="p-3 border rounded-lg">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-sm font-medium">Test Case {index + 1}</span>
                              <div className="flex items-center space-x-2">
                                {result.passed ? (
                                  <CheckCircle className="w-4 h-4 text-green-600" />
                                ) : (
                                  <XCircle className="w-4 h-4 text-red-600" />
                                )}
                                <span className={`text-sm ${result.passed ? 'text-green-600' : 'text-red-600'}`}>
                                  {result.passed ? 'Passed' : 'Failed'}
                                </span>
                              </div>
                            </div>
                            <div className="text-xs space-y-1">
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
