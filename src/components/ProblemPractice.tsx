
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { 
  Play, 
  Send, 
  ChevronLeft, 
  ChevronRight, 
  Copy, 
  Check, 
  X,
  Sun,
  Moon,
  Code,
  Terminal
} from 'lucide-react';

interface ProblemPracticeProps {
  contentType: 'course' | 'tutorial';
  contentId: string;
  onClose?: () => void;
}

const ProblemPractice = ({ contentType, contentId, onClose }: ProblemPracticeProps) => {
  const [selectedLanguage, setSelectedLanguage] = useState('python');
  const [theme, setTheme] = useState('light');
  const [code, setCode] = useState('');
  const [customInput, setCustomInput] = useState('');
  const [testResults, setTestResults] = useState<any[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentProblemIndex, setCurrentProblemIndex] = useState(0);

  // Mock problem data
  const problems = [
    {
      id: 1,
      title: "205. Isomorphic Strings",
      difficulty: "Easy",
      description: `Given two strings s and t, determine if they are isomorphic.

Two strings s and t are isomorphic if the characters in s can be replaced to get t.

All occurrences of a character must be replaced with the same character while preserving the order of characters. No two characters may map to the same character, but a character may map to itself.`,
      examples: [
        {
          input: 's = "egg", t = "add"',
          output: 'true',
          explanation: 'The strings are isomorphic because e -> a, g -> d.'
        },
        {
          input: 's = "foo", t = "bar"',
          output: 'false',
          explanation: 'The strings are not isomorphic because o cannot map to both a and r.'
        }
      ],
      constraints: [
        '1 <= s.length <= 5 * 10^4',
        't.length == s.length',
        's and t consist of any valid ascii character.'
      ],
      testCases: [
        { input: '"egg", "add"', output: 'true' },
        { input: '"foo", "bar"', output: 'false' },
        { input: '"paper", "title"', output: 'true' }
      ]
    },
    {
      id: 2,
      title: "1. Two Sum",
      difficulty: "Easy",
      description: `Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.

You may assume that each input would have exactly one solution, and you may not use the same element twice.

You can return the answer in any order.`,
      examples: [
        {
          input: 'nums = [2,7,11,15], target = 9',
          output: '[0,1]',
          explanation: 'Because nums[0] + nums[1] == 9, we return [0, 1].'
        },
        {
          input: 'nums = [3,2,4], target = 6',
          output: '[1,2]',
          explanation: 'Because nums[1] + nums[2] == 6, we return [1, 2].'
        }
      ],
      constraints: [
        '2 <= nums.length <= 10^4',
        '-10^9 <= nums[i] <= 10^9',
        '-10^9 <= target <= 10^9',
        'Only one valid answer exists.'
      ],
      testCases: [
        { input: '[2,7,11,15], 9', output: '[0,1]' },
        { input: '[3,2,4], 6', output: '[1,2]' },
        { input: '[3,3], 6', output: '[0,1]' }
      ]
    }
  ];

  const languages = [
    { value: 'python', label: 'Python' },
    { value: 'java', label: 'Java' },
    { value: 'cpp', label: 'C++' },
    { value: 'javascript', label: 'JavaScript' },
    { value: 'go', label: 'Go' }
  ];

  const codeTemplates = {
    python: `def solution():
    # Write your code here
    pass

# Test your solution
result = solution()
print(result)`,
    java: `public class Solution {
    public void solution() {
        // Write your code here
    }
    
    public static void main(String[] args) {
        Solution sol = new Solution();
        // Test your solution
        System.out.println(sol.solution());
    }
}`,
    cpp: `#include <iostream>
#include <vector>
using namespace std;

class Solution {
public:
    void solution() {
        // Write your code here
    }
};

int main() {
    Solution sol;
    // Test your solution
    cout << sol.solution() << endl;
    return 0;
}`,
    javascript: `function solution() {
    // Write your code here
}

// Test your solution
console.log(solution());`,
    go: `package main

import "fmt"

func solution() {
    // Write your code here
}

func main() {
    // Test your solution
    fmt.Println(solution())
}`
  };

  const currentProblem = problems[currentProblemIndex];

  useEffect(() => {
    setCode(codeTemplates[selectedLanguage as keyof typeof codeTemplates]);
  }, [selectedLanguage]);

  const handleRunCode = async () => {
    setIsRunning(true);
    // Simulate API call
    setTimeout(() => {
      setTestResults([
        { input: currentProblem.testCases[0].input, expected: currentProblem.testCases[0].output, actual: 'true', passed: true, time: '2ms', memory: '14.2MB' },
        { input: currentProblem.testCases[1].input, expected: currentProblem.testCases[1].output, actual: 'false', passed: true, time: '1ms', memory: '14.1MB' },
        { input: currentProblem.testCases[2].input, expected: currentProblem.testCases[2].output, actual: 'true', passed: true, time: '3ms', memory: '14.3MB' }
      ]);
      setIsRunning(false);
    }, 2000);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    // Simulate submission
    setTimeout(() => {
      alert('Solution submitted successfully! All test cases passed.');
      setIsSubmitting(false);
    }, 3000);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'easy': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'hard': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            {/* Problem Navigation */}
            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentProblemIndex(Math.max(0, currentProblemIndex - 1))}
                disabled={currentProblemIndex === 0}
              >
                <ChevronLeft className="w-4 h-4 mr-1" />
                Previous
              </Button>
              <div className="text-center">
                <h1 className="font-semibold text-lg">{currentProblem.title}</h1>
                <p className="text-sm text-muted-foreground">Problem {currentProblemIndex + 1} of {problems.length}</p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentProblemIndex(Math.min(problems.length - 1, currentProblemIndex + 1))}
                disabled={currentProblemIndex === problems.length - 1}
              >
                Next
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </div>

            {/* Controls */}
            <div className="flex items-center space-x-2">
              <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {languages.map((lang) => (
                    <SelectItem key={lang.value} value={lang.value}>
                      {lang.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
              >
                {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
              </Button>
              
              {onClose && (
                <Button variant="outline" size="sm" onClick={onClose}>
                  Back to Course
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-2 gap-6 h-[calc(100vh-200px)]">
          {/* Problem Description Panel */}
          <Card className="border-none shadow-lg">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl">{currentProblem.title}</CardTitle>
                <Badge className={getDifficultyColor(currentProblem.difficulty)}>
                  {currentProblem.difficulty}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-96">
                <div className="space-y-6">
                  {/* Description */}
                  <div>
                    <h4 className="font-semibold mb-2">Problem Description</h4>
                    <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                      {currentProblem.description}
                    </p>
                  </div>

                  {/* Examples */}
                  <div>
                    <h4 className="font-semibold mb-3">Examples</h4>
                    <div className="space-y-4">
                      {currentProblem.examples.map((example, index) => (
                        <div key={index} className="bg-muted/50 p-4 rounded-lg">
                          <div className="space-y-2">
                            <div>
                              <span className="font-medium">Input: </span>
                              <code className="bg-muted px-2 py-1 rounded text-sm">{example.input}</code>
                            </div>
                            <div>
                              <span className="font-medium">Output: </span>
                              <code className="bg-muted px-2 py-1 rounded text-sm">{example.output}</code>
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

                  {/* Constraints */}
                  <div>
                    <h4 className="font-semibold mb-2">Constraints</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      {currentProblem.constraints.map((constraint, index) => (
                        <li key={index} className="flex items-start">
                          <span className="mr-2">•</span>
                          <code className="text-xs">{constraint}</code>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </ScrollArea>
            </CardContent>
          </Card>

          {/* Code Editor Panel */}
          <div className="space-y-4">
            <Card className="border-none shadow-lg flex-1">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg flex items-center">
                    <Code className="w-5 h-5 mr-2" />
                    Code Editor
                  </CardTitle>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm">
                      <Copy className="w-4 h-4 mr-1" />
                      Copy
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className={`border rounded-lg ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
                  <Textarea
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    className={`min-h-72 font-mono text-sm border-none resize-none ${
                      theme === 'dark' ? 'bg-gray-900 text-gray-100' : 'bg-gray-50'
                    }`}
                    placeholder="Write your solution here..."
                  />
                </div>
                <div className="flex justify-between mt-4">
                  <Button 
                    variant="outline" 
                    onClick={handleRunCode}
                    disabled={isRunning}
                    className="flex items-center"
                  >
                    <Play className="w-4 h-4 mr-2" />
                    {isRunning ? 'Running...' : 'Run Code'}
                  </Button>
                  <Button 
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="bg-green-600 hover:bg-green-700 flex items-center"
                  >
                    <Send className="w-4 h-4 mr-2" />
                    {isSubmitting ? 'Submitting...' : 'Submit'}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Test Cases Panel */}
            <Card className="border-none shadow-lg">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center">
                  <Terminal className="w-5 h-5 mr-2" />
                  Test Cases
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="results" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="results">Test Results</TabsTrigger>
                    <TabsTrigger value="custom">Custom Input</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="results" className="mt-4">
                    {testResults.length > 0 ? (
                      <ScrollArea className="h-40">
                        <div className="space-y-2">
                          {testResults.map((result, index) => (
                            <div key={index} className="border rounded-lg p-3">
                              <div className="flex items-center justify-between mb-2">
                                <span className="text-sm font-medium">Test Case {index + 1}</span>
                                <div className="flex items-center space-x-2">
                                  {result.passed ? (
                                    <Badge className="bg-green-100 text-green-800">
                                      <Check className="w-3 h-3 mr-1" />
                                      Passed
                                    </Badge>
                                  ) : (
                                    <Badge className="bg-red-100 text-red-800">
                                      <X className="w-3 h-3 mr-1" />
                                      Failed
                                    </Badge>
                                  )}
                                  <span className="text-xs text-muted-foreground">{result.time}</span>
                                </div>
                              </div>
                              <div className="text-sm space-y-1">
                                <div><strong>Input:</strong> <code>{result.input}</code></div>
                                <div><strong>Expected:</strong> <code>{result.expected}</code></div>
                                <div><strong>Actual:</strong> <code>{result.actual}</code></div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </ScrollArea>
                    ) : (
                      <div className="text-center py-8 text-muted-foreground">
                        <Terminal className="w-12 h-12 mx-auto mb-2 opacity-50" />
                        <p>Run your code to see test results</p>
                      </div>
                    )}
                  </TabsContent>
                  
                  <TabsContent value="custom" className="mt-4">
                    <div className="space-y-3">
                      <Textarea
                        value={customInput}
                        onChange={(e) => setCustomInput(e.target.value)}
                        placeholder="Enter custom test input..."
                        className="h-24 text-sm font-mono"
                      />
                      <Button size="sm" onClick={handleRunCode} className="w-full">
                        <Play className="w-4 h-4 mr-2" />
                        Run with Custom Input
                      </Button>
                    </div>
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

export default ProblemPractice;
