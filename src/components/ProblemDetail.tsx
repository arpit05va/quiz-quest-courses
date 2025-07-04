import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable';
import { toast } from 'sonner';
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
  Copy,
  MoreVertical,
  FileText,
  Trophy,
  Users,
  RotateCcw,
  Plus,
  Type,
  Palette
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
  const [isLiked, setIsLiked] = useState(false);
  const [isDisliked, setIsDisliked] = useState(false);
  const [isStarred, setIsStarred] = useState(false);
  const [activeTestCase, setActiveTestCase] = useState(0);
  const [customTestCases, setCustomTestCases] = useState<string[]>([]);
  const [fontSize, setFontSize] = useState(14);
  const [editorTheme, setEditorTheme] = useState('light');

  // Mock problem data
  const problemData = {
    1: {
      id: 1,
      title: "Two Sum",
      difficulty: "Easy",
      category: "Array",
      topics: ["Array", "Hash Table"],
      companies: ["Amazon", "Google", "Facebook"],
      likes: 1250,
      dislikes: 85,
      solved: true,
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
        },
        {
          input: "nums = [3,3], target = 6",
          output: "[0,1]",
          explanation: "Because nums[0] + nums[1] == 6, we return [0, 1]."
        }
      ],
      constraints: [
        "2 <= nums.length <= 10^4",
        "-10^9 <= nums[i] <= 10^9",
        "-10^9 <= target <= 10^9",
        "Only one valid answer exists."
      ],
      testCases: [
        "nums = [2,7,11,15]\ntarget = 9",
        "nums = [3,2,4]\ntarget = 6",
        "nums = [3,3]\ntarget = 6"
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
      topics: ["Hash Table", "String"],
      companies: ["LinkedIn", "Google"],
      likes: 892,
      dislikes: 156,
      solved: false,
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
      testCases: [
        's = "egg"\nt = "add"',
        's = "foo"\nt = "bar"'
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
  const problemIds = Object.keys(problemData).map(Number).sort((a, b) => a - b);
  const currentIndex = problemIds.indexOf(problem.id);

  const starterCodes = {
    java: `class Solution {
    public int[] twoSum(int[] nums, int target) {
        
    }
}`,
    python: `class Solution:
    def twoSum(self, nums: List[int], target: int) -> List[int]:
        `,
    cpp: `class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        
    }
};`,
    javascript: `/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
    
};`,
    typescript: `function twoSum(nums: number[], target: number): number[] {
    
}`
  };

  React.useEffect(() => {
    setCode(starterCodes[selectedLanguage as keyof typeof starterCodes] || '');
  }, [selectedLanguage]);

  const handleRunCode = () => {
    setIsRunning(true);
    setTimeout(() => {
      setTestResults([
        { input: 'nums = [2,7,11,15], target = 9', expected: '[0,1]', actual: '[0,1]', passed: true },
        { input: 'nums = [3,2,4], target = 6', expected: '[1,2]', actual: '[1,2]', passed: true },
        { input: 'nums = [3,3], target = 6', expected: '[0,1]', actual: '[0,1]', passed: true }
      ]);
      setIsRunning(false);
      toast.success('Code executed successfully!');
    }, 2000);
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success('Solution submitted successfully!');
    }, 3000);
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      const prevId = problemIds[currentIndex - 1];
      navigate(`/problem/${prevId}`);
    } else {
      toast.error('This is the first problem');
    }
  };

  const handleNext = () => {
    if (currentIndex < problemIds.length - 1) {
      const nextId = problemIds[currentIndex + 1];
      navigate(`/problem/${nextId}`);
    } else {
      toast.error('This is the last problem');
    }
  };

  const handleLike = () => {
    if (isDisliked) setIsDisliked(false);
    setIsLiked(!isLiked);
    toast.success(isLiked ? 'Like removed' : 'Problem liked!');
  };

  const handleDislike = () => {
    if (isLiked) setIsLiked(false);
    setIsDisliked(!isDisliked);
    toast.success(isDisliked ? 'Dislike removed' : 'Feedback recorded');
  };

  const handleStar = () => {
    setIsStarred(!isStarred);
    toast.success(isStarred ? 'Removed from favorites' : 'Added to favorites!');
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success('Problem link copied to clipboard!');
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(code);
    toast.success('Code copied to clipboard!');
  };

  const handleResetCode = () => {
    setCode(starterCodes[selectedLanguage as keyof typeof starterCodes] || '');
    toast.success('Code reset to starter template');
  };

  const handleAddTestCase = () => {
    setCustomTestCases([...customTestCases, '']);
    toast.success('New test case added');
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
      case 'Medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300';  
      case 'Hard': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300';
    }
  };

  const allTestCases = [...problem.testCases, ...customTestCases];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-50 backdrop-blur-sm">
        <div className="container mx-auto px-6">
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
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={handlePrevious}
                  disabled={currentIndex === 0}
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span className="ml-1">Prev</span>
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={handleNext}
                  disabled={currentIndex === problemIds.length - 1}
                >
                  <span className="mr-1">Next</span>
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className={`${isLiked ? 'text-green-600' : ''}`}
                  onClick={handleLike}
                >
                  <ThumbsUp className="w-4 h-4" />
                  <span className="ml-1">{problem.likes + (isLiked ? 1 : 0)}</span>
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className={`${isDisliked ? 'text-red-600' : ''}`}
                  onClick={handleDislike}
                >
                  <ThumbsDown className="w-4 h-4" />
                  <span className="ml-1">{problem.dislikes + (isDisliked ? 1 : 0)}</span>
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className={`${isStarred ? 'text-yellow-500' : ''}`}
                  onClick={handleStar}
                >
                  <Star className={`w-4 h-4 ${isStarred ? 'fill-current' : ''}`} />
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={handleShare}
                >
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

              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <Settings className="w-4 h-4" />
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Editor Settings</DialogTitle>
                    <DialogDescription>
                      Customize your coding environment
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="fontSize" className="text-right flex items-center">
                        <Type className="w-4 h-4 mr-2" />
                        Font Size
                      </Label>
                      <div className="col-span-3">
                        <Slider
                          id="fontSize"
                          min={10}
                          max={24}
                          step={1}
                          value={[fontSize]}
                          onValueChange={(value) => setFontSize(value[0])}
                          className="w-full"
                        />
                        <span className="text-sm text-muted-foreground">{fontSize}px</span>
                      </div>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="theme" className="text-right flex items-center">
                        <Palette className="w-4 h-4 mr-2" />
                        Theme
                      </Label>
                      <div className="col-span-3">
                        <Select value={editorTheme} onValueChange={setEditorTheme}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="light">Light</SelectItem>
                            <SelectItem value="dark">Dark</SelectItem>
                            <SelectItem value="monokai">Monokai</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="submit">Save preferences</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-6">
        <ResizablePanelGroup
          direction="horizontal"
          className="h-[calc(100vh-8rem)] rounded-lg border"
        >
          {/* Left Panel - Problem Content */}
          <ResizablePanel defaultSize={50} minSize={30}>
            <div className="h-full flex flex-col">
              {/* Problem Header */}
              <div className="px-6 py-4 border-b bg-card">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <h1 className="text-2xl font-bold">{problem.id}. {problem.title}</h1>
                    {problem.solved && (
                      <div className="flex items-center text-green-600 text-sm font-medium">
                        <CheckCircle className="w-4 h-4 mr-1" />
                        Solved
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex items-center space-x-2 mt-3">
                  <Badge className={getDifficultyColor(problem.difficulty)}>
                    {problem.difficulty}
                  </Badge>
                  {problem.topics.map(topic => (
                    <Badge key={topic} variant="outline" className="text-xs">
                      {topic}
                    </Badge>
                  ))}
                  <div className="flex items-center space-x-1">
                    <Trophy className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Hint</span>
                  </div>
                </div>
              </div>
              
              {/* Tab Content */}
              <div className="flex-1 flex flex-col min-h-0">
                <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full flex flex-col">
                  <div className="px-6 pt-4 pb-2">
                    <TabsList className="grid w-full grid-cols-4 h-11">
                      <TabsTrigger value="description" className="flex items-center space-x-2 text-sm font-medium">
                        <FileText className="w-4 h-4" />
                        <span>Description</span>
                      </TabsTrigger>
                      <TabsTrigger value="editorial" className="flex items-center space-x-2 text-sm font-medium">
                        <BookOpen className="w-4 h-4" />
                        <span>Editorial</span>
                      </TabsTrigger>
                      <TabsTrigger value="solutions" className="flex items-center space-x-2 text-sm font-medium">
                        <Lightbulb className="w-4 h-4" />
                        <span>Solutions</span>
                      </TabsTrigger>
                      <TabsTrigger value="submissions" className="flex items-center space-x-2 text-sm font-medium">
                        <Users className="w-4 h-4" />
                        <span>Submissions</span>
                      </TabsTrigger>
                    </TabsList>
                  </div>
                  
                  <div className="flex-1 px-6 pb-6 min-h-0">
                    <TabsContent value="description" className="h-full m-0">
                      <ScrollArea className="h-full">
                        <div className="space-y-6 pr-4">
                          <div>
                            <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                              {problem.description}
                            </p>
                          </div>

                          <div>
                            <h3 className="font-semibold mb-4 text-lg">Examples</h3>
                            <div className="space-y-4">
                              {problem.examples.map((example, index) => (
                                <div key={index} className="p-4 bg-muted/20 rounded-lg border">
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
                            <h3 className="font-semibold mb-4 text-lg">Constraints</h3>
                            <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                              {problem.constraints.map((constraint, index) => (
                                <li key={index} className="text-sm font-mono">{constraint}</li>
                              ))}
                            </ul>
                          </div>

                          {problem.companies && (
                            <div>
                              <h3 className="font-semibold mb-4 text-lg">Companies</h3>
                              <div className="flex flex-wrap gap-2">
                                {problem.companies.map((company, index) => (
                                  <Badge key={index} variant="secondary" className="text-xs">
                                    {company}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </ScrollArea>
                    </TabsContent>
                    
                    <TabsContent value="editorial" className="h-full m-0">
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
                    
                    <TabsContent value="solutions" className="h-full m-0">
                      <div className="h-full flex items-center justify-center">
                        <div className="text-center text-muted-foreground">
                          <Code className="w-8 h-8 mx-auto mb-2 opacity-50" />
                          <p>Community solutions will appear here</p>
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="submissions" className="h-full m-0">
                      <div className="h-full flex items-center justify-center">
                        <div className="text-center text-muted-foreground">
                          <Users className="w-8 h-8 mx-auto mb-2 opacity-50" />
                          <p>Your submissions will appear here</p>
                        </div>
                      </div>
                    </TabsContent>
                  </div>
                </Tabs>
              </div>
            </div>
          </ResizablePanel>

          <ResizableHandle withHandle />

          {/* Right Panel - Code Editor and Testing */}
          <ResizablePanel defaultSize={50} minSize={30}>
            <ResizablePanelGroup direction="vertical">
              {/* Code Editor */}
              <ResizablePanel defaultSize={70} minSize={40}>
                <div className="h-full flex flex-col">
                  <div className="px-4 py-3 bg-muted/30 border-b flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Code className="w-4 h-4" />
                      <span className="text-sm font-medium">Code</span>
                      <Badge variant="outline" className="text-xs font-mono">
                        {selectedLanguage}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        Auto
                      </Badge>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="sm" className="h-8" onClick={handleResetCode}>
                        <RotateCcw className="w-3 h-3" />
                      </Button>
                      <Button variant="ghost" size="sm" className="h-8" onClick={handleCopyCode}>
                        <Copy className="w-3 h-3" />
                      </Button>
                      <Button variant="ghost" size="sm" className="h-8">
                        <MoreVertical className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="flex-1 relative">
                    <Textarea
                      value={code}
                      onChange={(e) => setCode(e.target.value)}
                      className={`absolute inset-0 w-full h-full resize-none border-0 rounded-none focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 p-4 font-mono ${
                        editorTheme === 'dark' 
                          ? 'bg-gray-900 text-gray-100' 
                          : editorTheme === 'monokai'
                          ? 'bg-gray-800 text-green-400'
                          : 'bg-gray-50 text-gray-900'
                      }`}
                      placeholder="Write your code here..."
                      style={{ 
                        fontSize: `${fontSize}px`,
                        lineHeight: '1.6',
                        fontFamily: 'JetBrains Mono, Consolas, Monaco, "Courier New", monospace'
                      }}
                    />
                    <div className="absolute bottom-2 right-2 text-xs text-muted-foreground bg-background/80 px-2 py-1 rounded">
                      Ln {code.split('\n').length}, Col {code.split('\n').pop()?.length || 0}
                    </div>
                  </div>
                </div>
              </ResizablePanel>

              <ResizableHandle withHandle />

              {/* Test Cases and Console */}
              <ResizablePanel defaultSize={30} minSize={20}>
                <div className="h-full flex flex-col">
                  <Tabs defaultValue="testcase" className="h-full flex flex-col">
                    <div className="flex items-center justify-between px-4 py-3 border-b bg-muted/20">
                      <TabsList className="h-8">
                        <TabsTrigger value="testcase" className="text-xs">Testcase</TabsTrigger>
                        <TabsTrigger value="result" className="text-xs">Test Result</TabsTrigger>
                      </TabsList>
                      <div className="flex items-center space-x-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={handleRunCode}
                          disabled={isRunning}
                          className="flex items-center space-x-2 h-8"
                        >
                          {isRunning ? (
                            <Clock className="w-3 h-3 animate-spin" />
                          ) : (
                            <Play className="w-3 h-3" />
                          )}
                          <span>{isRunning ? 'Running...' : 'Run'}</span>
                        </Button>
                        <Button 
                          onClick={handleSubmit}
                          disabled={isSubmitting}
                          className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 h-8"
                        >
                          {isSubmitting ? (
                            <Clock className="w-3 h-3 animate-spin" />
                          ) : (
                            <Send className="w-3 h-3" />
                          )}
                          <span>{isSubmitting ? 'Submitting...' : 'Submit'}</span>
                        </Button>
                      </div>
                    </div>
                    
                    <div className="flex-1 min-h-0">
                      <TabsContent value="testcase" className="p-4 h-full m-0">
                        <div className="space-y-4 h-full flex flex-col">
                          <div className="flex-1">
                            <label className="text-sm font-medium mb-2 block">
                              Case {activeTestCase + 1}
                            </label>
                            <Textarea
                              value={allTestCases[activeTestCase] || ''}
                              onChange={(e) => {
                                if (activeTestCase >= problem.testCases.length) {
                                  const customIndex = activeTestCase - problem.testCases.length;
                                  const newCustomCases = [...customTestCases];
                                  newCustomCases[customIndex] = e.target.value;
                                  setCustomTestCases(newCustomCases);
                                }
                              }}
                              readOnly={activeTestCase < problem.testCases.length}
                              className={`font-mono text-sm h-20 resize-none ${
                                activeTestCase < problem.testCases.length 
                                  ? 'bg-muted/20 border-muted focus-visible:ring-0' 
                                  : 'bg-background border-input focus-visible:ring-1 focus-visible:ring-ring'
                              }`}
                              placeholder={activeTestCase >= problem.testCases.length ? "Enter your custom test case..." : ""}
                            />
                          </div>
                          
                          <div className="flex space-x-2 overflow-x-auto pb-2">
                            {allTestCases.map((_, index) => (
                              <Button 
                                key={index}
                                variant={activeTestCase === index ? "default" : "outline"} 
                                size="sm" 
                                className={`flex-shrink-0 ${
                                  activeTestCase === index 
                                    ? 'bg-blue-600 text-white' 
                                    : 'hover:bg-muted'
                                }`}
                                onClick={() => setActiveTestCase(index)}
                              >
                                Case {index + 1}
                                {index >= problem.testCases.length && (
                                  <span className="ml-1 text-xs opacity-70">(Custom)</span>
                                )}
                              </Button>
                            ))}
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="flex-shrink-0"
                              onClick={handleAddTestCase}
                            >
                              <Plus className="w-3 h-3" />
                            </Button>
                          </div>
                        </div>
                      </TabsContent>
                      
                      <TabsContent value="result" className="p-4 h-full m-0">
                        {testResults.length > 0 ? (
                          <ScrollArea className="h-full">
                            <div className="space-y-3 pr-4">
                              {testResults.map((result, index) => (
                                <div key={index} className="p-3 border rounded-lg bg-muted/20">
                                  <div className="flex items-center justify-between mb-2">
                                    <span className="text-sm font-medium">Case {index + 1}</span>
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
                                    <div><span className="font-medium">Output:</span> {result.actual}</div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </ScrollArea>
                        ) : (
                          <div className="h-full flex flex-col items-center justify-center text-center text-muted-foreground">
                            <Play className="w-8 h-8 mx-auto mb-2 opacity-50" />
                            <p>You must run your code first</p>
                          </div>
                        )}
                      </TabsContent>
                    </div>
                  </Tabs>
                </div>
              </ResizablePanel>
            </ResizablePanelGroup>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  );
};

export default ProblemDetail;
