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
import { Progress } from '@/components/ui/progress';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';
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
  Palette,
  Zap,
  Timer,
  Target,
  Award,
  TrendingUp,
  Activity,
  Gauge,
  Calendar,
  Flame,
  Shield,
  Brain,
  Code2,
  Database,
  GitBranch,
  Sparkles,
  ChevronDown,
  ChevronUp,
  Eye,
  EyeOff,
  Volume2,
  VolumeX,
  Bookmark,
  Flag,
  HelpCircle,
  RefreshCw,
  Briefcase
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
  const [showHints, setShowHints] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [timer, setTimer] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  const [problemStats, setProblemStats] = useState({
    difficulty: 'Easy',
    acceptance: 67,
    submissions: 561,
    solved: true
  });

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
      acceptance: 67.3,
      submissions: 561,
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
      hints: [
        "Think about what data structure would help you look up values efficiently.",
        "For each number, you need to find its complement (target - current number).",
        "A hash map can store numbers and their indices for O(1) lookup time."
      ],
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
      acceptance: 45.2,
      submissions: 892,
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
      hints: [
        "Two hash maps are essential here to check bidirectional mapping.",
        "Make sure each character maps to exactly one other character.",
        "Check both directions: s to t and t to s."
      ],
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

  // Timer effect
  React.useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTimerRunning) {
      interval = setInterval(() => {
        setTimer(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

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

  const toggleTimer = () => {
    setIsTimerRunning(!isTimerRunning);
    if (!isTimerRunning) {
      toast.success('Timer started');
    } else {
      toast.success('Timer paused');
    }
  };

  const resetTimer = () => {
    setTimer(0);
    setIsTimerRunning(false);
    toast.success('Timer reset');
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
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      {/* Enhanced Header with Gradient */}
      <motion.header 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-gradient-to-r from-card via-card to-card/90 border-b border-border/50 sticky top-0 z-50 backdrop-blur-xl shadow-lg"
      >
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button 
                  variant="ghost" 
                  onClick={() => navigate('/problems')}
                  className="flex items-center space-x-2 hover:bg-muted/80 transition-all duration-200"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Problems</span>
                </Button>
              </motion.div>
              
              <div className="h-6 w-px bg-gradient-to-b from-transparent via-border to-transparent" />
              
              <div className="flex items-center space-x-2">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={handlePrevious}
                    disabled={currentIndex === 0}
                    className="hover:bg-muted/80"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span className="ml-1">Prev</span>
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={handleNext}
                    disabled={currentIndex === problemIds.length - 1}
                    className="hover:bg-muted/80"
                  >
                    <span className="mr-1">Next</span>
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </motion.div>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {/* Enhanced Timer */}
              <motion.div 
                className="flex items-center space-x-2 bg-muted/30 rounded-lg px-3 py-1.5"
                whileHover={{ scale: 1.02 }}
              >
                <Timer className="w-4 h-4 text-primary" />
                <span className="font-mono text-sm font-medium">{formatTime(timer)}</span>
                <Button variant="ghost" size="sm" onClick={toggleTimer} className="h-6 w-6 p-0">
                  {isTimerRunning ? <Timer className="w-3 h-3" /> : <Play className="w-3 h-3" />}
                </Button>
                <Button variant="ghost" size="sm" onClick={resetTimer} className="h-6 w-6 p-0">
                  <RotateCcw className="w-3 h-3" />
                </Button>
              </motion.div>

              {/* Enhanced Action Buttons */}
              <div className="flex items-center space-x-2">
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className={`${isLiked ? 'text-green-600 bg-green-50 dark:bg-green-900/20' : 'hover:bg-muted/80'}`}
                    onClick={handleLike}
                  >
                    <ThumbsUp className="w-4 h-4" />
                    <span className="ml-1">{problem.likes + (isLiked ? 1 : 0)}</span>
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className={`${isDisliked ? 'text-red-600 bg-red-50 dark:bg-red-900/20' : 'hover:bg-muted/80'}`}
                    onClick={handleDislike}
                  >
                    <ThumbsDown className="w-4 h-4" />
                    <span className="ml-1">{problem.dislikes + (isDisliked ? 1 : 0)}</span>
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className={`${isStarred ? 'text-yellow-500 bg-yellow-50 dark:bg-yellow-900/20' : 'hover:bg-muted/80'}`}
                    onClick={handleStar}
                  >
                    <Star className={`w-4 h-4 ${isStarred ? 'fill-current' : ''}`} />
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={handleShare}
                    className="hover:bg-muted/80"
                  >
                    <Share2 className="w-4 h-4" />
                  </Button>
                </motion.div>
              </div>
              
              <div className="h-6 w-px bg-gradient-to-b from-transparent via-border to-transparent" />
              
              <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                <SelectTrigger className="w-32 bg-muted/30 border-border/50">
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
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button variant="ghost" size="sm" className="hover:bg-muted/80">
                      <Settings className="w-4 h-4" />
                    </Button>
                  </motion.div>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle className="flex items-center space-x-2">
                      <Settings className="w-5 h-5" />
                      <span>Editor Settings</span>
                    </DialogTitle>
                    <DialogDescription>
                      Customize your coding environment for better productivity
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-6 py-4">
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
                    <Button type="submit" className="bg-primary hover:bg-primary/90">
                      <Sparkles className="w-4 h-4 mr-2" />
                      Save preferences
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      </motion.header>

      <div className="container mx-auto px-6 py-6">
        <ResizablePanelGroup
          direction="horizontal"
          className="h-[calc(100vh-8rem)] rounded-xl border border-border/50 shadow-2xl overflow-hidden bg-card/50 backdrop-blur-sm"
        >
          {/* Enhanced Left Panel - Problem Content */}
          <ResizablePanel defaultSize={50} minSize={30}>
            <div className="h-full flex flex-col">
              {/* Enhanced Problem Header with Stats */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="px-6 py-4 border-b bg-gradient-to-r from-card via-card to-muted/10"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                      {problem.id}. {problem.title}
                    </h1>
                    {problem.solved && (
                      <motion.div 
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="flex items-center text-green-600 text-sm font-medium bg-green-50 dark:bg-green-900/20 px-3 py-1 rounded-full"
                      >
                        <CheckCircle className="w-4 h-4 mr-1" />
                        Solved
                      </motion.div>
                    )}
                  </div>
                </div>

                {/* Enhanced Stats Cards */}
                <div className="grid grid-cols-4 gap-4 mb-4">
                  <motion.div 
                    whileHover={{ scale: 1.02 }}
                    className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 p-3 rounded-lg border border-green-200 dark:border-green-800"
                  >
                    <div className="flex items-center space-x-2">
                      <Gauge className="w-5 h-5 text-green-600" />
                      <div>
                        <div className="text-lg font-bold text-green-700 dark:text-green-300">{problem.acceptance}%</div>
                        <div className="text-xs text-green-600">Acceptance</div>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div 
                    whileHover={{ scale: 1.02 }}
                    className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 p-3 rounded-lg border border-blue-200 dark:border-blue-800"
                  >
                    <div className="flex items-center space-x-2">
                      <Activity className="w-5 h-5 text-blue-600" />
                      <div>
                        <div className="text-lg font-bold text-blue-700 dark:text-blue-300">{problem.submissions}</div>
                        <div className="text-xs text-blue-600">Submissions</div>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div 
                    whileHover={{ scale: 1.02 }}
                    className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 p-3 rounded-lg border border-purple-200 dark:border-purple-800"
                  >
                    <div className="flex items-center space-x-2">
                      <Users className="w-5 h-5 text-purple-600" />
                      <div>
                        <div className="text-lg font-bold text-purple-700 dark:text-purple-300">{problem.likes}</div>
                        <div className="text-xs text-purple-600">Likes</div>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div 
                    whileHover={{ scale: 1.02 }}
                    className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 p-3 rounded-lg border border-orange-200 dark:border-orange-800"
                  >
                    <div className="flex items-center space-x-2">
                      <Trophy className="w-5 h-5 text-orange-600" />
                      <div>
                        <div className="text-lg font-bold text-orange-700 dark:text-orange-300">#{problem.id}</div>
                        <div className="text-xs text-orange-600">Problem</div>
                      </div>
                    </div>
                  </motion.div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Badge className={getDifficultyColor(problem.difficulty)}>
                      {problem.difficulty}
                    </Badge>
                    {problem.topics.map(topic => (
                      <Badge key={topic} variant="outline" className="text-xs hover:bg-muted/50">
                        {topic}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowHints(!showHints)}
                      className="text-yellow-600 hover:bg-yellow-50 dark:hover:bg-yellow-900/20"
                    >
                      <Lightbulb className="w-4 h-4 mr-1" />
                      Hints
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setIsBookmarked(!isBookmarked)}
                      className={isBookmarked ? 'text-blue-600 bg-blue-50 dark:bg-blue-900/20' : ''}
                    >
                      <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
                    </Button>
                  </div>
                </div>
              </motion.div>
              
              {/* Enhanced Tab Content */}
              <div className="flex-1 flex flex-col min-h-0">
                <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full flex flex-col">
                  <div className="px-6 pt-4 pb-2">
                    <TabsList className="grid w-full grid-cols-4 bg-muted/30">
                      <TabsTrigger value="description" className="flex items-center space-x-2 text-sm font-medium data-[state=active]:bg-background">
                        <FileText className="w-4 h-4" />
                        <span>Description</span>
                      </TabsTrigger>
                      <TabsTrigger value="editorial" className="flex items-center space-x-2 text-sm font-medium data-[state=active]:bg-background">
                        <BookOpen className="w-4 h-4" />
                        <span>Editorial</span>
                      </TabsTrigger>
                      <TabsTrigger value="solutions" className="flex items-center space-x-2 text-sm font-medium data-[state=active]:bg-background">
                        <Code2 className="w-4 h-4" />
                        <span>Solutions</span>
                      </TabsTrigger>
                      <TabsTrigger value="submissions" className="flex items-center space-x-2 text-sm font-medium data-[state=active]:bg-background">
                        <TrendingUp className="w-4 h-4" />
                        <span>Submissions</span>
                      </TabsTrigger>
                    </TabsList>
                  </div>
                  
                  <div className="flex-1 px-6 pb-6 min-h-0">
                    <TabsContent value="description" className="h-full m-0">
                      <ScrollArea className="h-full">
                        <div className="space-y-6 pr-4">
                          {/* Hints Section */}
                          <AnimatePresence>
                            {showHints && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 p-4 rounded-lg border border-yellow-200 dark:border-yellow-800"
                              >
                                <h3 className="font-semibold mb-3 text-lg flex items-center">
                                  <Lightbulb className="w-5 h-5 mr-2" />
                                  Hints
                                </h3>
                                <div className="space-y-2">
                                  {problem.hints?.map((hint, index) => (
                                    <motion.div
                                      key={index}
                                      initial={{ opacity: 0, x: -20 }}
                                      animate={{ opacity: 1, x: 0 }}
                                      transition={{ delay: index * 0.1 }}
                                      className="flex items-start space-x-2"
                                    >
                                      <span className="text-yellow-600 font-bold">{index + 1}.</span>
                                      <span className="text-yellow-700 dark:text-yellow-300">{hint}</span>
                                    </motion.div>
                                  ))}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>

                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                          >
                            <p className="text-muted-foreground leading-relaxed whitespace-pre-line text-base">
                              {problem.description}
                            </p>
                          </motion.div>

                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                          >
                            <h3 className="font-semibold mb-4 text-lg flex items-center">
                              <Code className="w-5 h-5 mr-2 text-primary" />
                              Examples
                            </h3>
                            <div className="space-y-4">
                              {problem.examples.map((example, index) => (
                                <motion.div
                                  key={index}
                                  initial={{ opacity: 0, x: -20 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: 0.1 + index * 0.05 }}
                                  whileHover={{ scale: 1.01 }}
                                  className="p-4 bg-gradient-to-br from-muted/30 to-muted/10 rounded-lg border border-border/50 hover:border-border shadow-sm hover:shadow-md transition-all duration-200"
                                >
                                  <p className="font-medium mb-3 flex items-center">
                                    <span className="bg-primary/10 text-primary px-2 py-1 rounded text-sm mr-2">
                                      Example {index + 1}
                                    </span>
                                  </p>
                                  <div className="space-y-3 text-sm">
                                    <div className="grid gap-3">
                                      <div className="flex items-start space-x-2">
                                        <span className="font-medium text-blue-600 dark:text-blue-400 min-w-[60px]">Input:</span>
                                        <code className="bg-blue-50 dark:bg-blue-900/20 px-3 py-1.5 rounded text-xs font-mono border flex-1">
                                          {example.input}
                                        </code>
                                      </div>
                                      <div className="flex items-start space-x-2">
                                        <span className="font-medium text-green-600 dark:text-green-400 min-w-[60px]">Output:</span>
                                        <code className="bg-green-50 dark:bg-green-900/20 px-3 py-1.5 rounded text-xs font-mono border flex-1">
                                          {example.output}
                                        </code>
                                      </div>
                                      {example.explanation && (
                                        <div className="flex items-start space-x-2">
                                          <span className="font-medium text-purple-600 dark:text-purple-400 min-w-[60px]">Explain:</span>
                                          <span className="text-muted-foreground flex-1">{example.explanation}</span>
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                </motion.div>
                              ))}
                            </div>
                          </motion.div>

                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                          >
                            <h3 className="font-semibold mb-4 text-lg flex items-center">
                              <Shield className="w-5 h-5 text-orange-600" />
                              Constraints
                            </h3>
                            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                              {problem.constraints.map((constraint, index) => (
                                <motion.li 
                                  key={index} 
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: 0.2 + index * 0.05 }}
                                  className="text-sm font-mono bg-muted/20 p-2 rounded border-l-2 border-orange-300 dark:border-orange-600"
                                >
                                  {constraint}
                                </motion.li>
                              ))}
                            </ul>
                          </motion.div>

                          {problem.companies && (
                            <motion.div
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.3 }}
                            >
                              <h3 className="font-semibold mb-4 text-lg flex items-center">
                                <Briefcase className="w-5 h-5 text-indigo-600" />
                                Companies
                              </h3>
                              <div className="flex flex-wrap gap-2">
                                {problem.companies.map((company, index) => (
                                  <motion.div
                                    key={index}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.3 + index * 0.05 }}
                                    whileHover={{ scale: 1.05 }}
                                  >
                                    <Badge variant="secondary" className="text-xs bg-indigo-50 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800">
                                      {company}
                                    </Badge>
                                  </motion.div>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </div>
                      </ScrollArea>
                    </TabsContent>
                    
                    <TabsContent value="editorial" className="h-full m-0">
                      <ScrollArea className="h-full">
                        <div className="space-y-4 pr-4">
                          <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="p-6 bg-gradient-to-br from-muted/30 to-muted/10 rounded-lg border border-border/50"
                          >
                            <h3 className="font-semibold mb-3 text-lg flex items-center">
                              <Brain className="w-5 h-5 mr-2 text-purple-600" />
                              Solution Approach
                            </h3>
                            <div className="text-muted-foreground leading-relaxed whitespace-pre-line">
                              {problem.solution}
                            </div>
                          </motion.div>
                          
                          <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="p-4 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-cyan-950/30 rounded-lg border border-blue-200 dark:border-blue-800"
                          >
                            <p className="text-sm text-blue-800 dark:text-blue-300 flex items-start space-x-2">
                              <Lightbulb className="w-4 h-4 mt-0.5 text-yellow-500" />
                              <span>
                                <strong>Hint:</strong> Try to think about what data structure would help you 
                                look up values efficiently.
                              </span>
                            </p>
                          </motion.div>
                        </div>
                      </ScrollArea>
                    </TabsContent>
                    
                    <TabsContent value="solutions" className="h-full m-0">
                      <div className="h-full flex items-center justify-center">
                        <motion.div 
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="text-center text-muted-foreground"
                        >
                          <Code2 className="w-12 h-12 mx-auto mb-4 opacity-50" />
                          <p className="text-lg font-medium">Community Solutions</p>
                          <p className="text-sm">Explore different approaches from the community</p>
                        </motion.div>
                      </div>
                    </TabsContent>

                    <TabsContent value="submissions" className="h-full m-0">
                      <div className="h-full flex items-center justify-center">
                        <motion.div 
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="text-center text-muted-foreground"
                        >
                          <TrendingUp className="w-12 h-12 mx-auto mb-4 opacity-50" />
                          <p className="text-lg font-medium">Your Submissions</p>
                          <p className="text-sm">Track your submission history and progress</p>
                        </motion.div>
                      </div>
                    </TabsContent>
                  </div>
                </Tabs>
              </div>
            </div>
          </ResizablePanel>

          <ResizableHandle withHandle className="bg-border/50 hover:bg-border transition-colors" />

          {/* Enhanced Right Panel - Code Editor and Testing */}
          <ResizablePanel defaultSize={50} minSize={30}>
            <ResizablePanelGroup direction="vertical">
              {/* Enhanced Code Editor */}
              <ResizablePanel defaultSize={70} minSize={40}>
                <div className="h-full flex flex-col">
                  <motion.div 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="px-4 py-3 bg-gradient-to-r from-muted/30 to-muted/20 border-b border-border/50 flex items-center justify-between"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center space-x-2">
                        <motion.div 
                          whileHover={{ rotate: 180 }}
                          transition={{ duration: 0.3 }}
                        >
                          <Code className="w-4 h-4 text-primary" />
                        </motion.div>
                        <span className="text-sm font-medium">Code Editor</span>
                      </div>
                      <Badge variant="outline" className="text-xs font-mono bg-primary/5 border-primary/20">
                        {selectedLanguage}
                      </Badge>
                      <Badge variant="outline" className="text-xs bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 border-green-200 dark:border-green-800">
                        Auto-Complete
                      </Badge>
                    </div>
                    <div className="flex items-center space-x-2">
                      <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                        <Button variant="ghost" size="sm" className="h-8 hover:bg-muted/80" onClick={handleResetCode}>
                          <RotateCcw className="w-3 h-3" />
                        </Button>
                      </motion.div>
                      <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                        <Button variant="ghost" size="sm" className="h-8 hover:bg-muted/80" onClick={handleCopyCode}>
                          <Copy className="w-3 h-3" />
                        </Button>
                      </motion.div>
                      <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                        <Button variant="ghost" size="sm" className="h-8 hover:bg-muted/80">
                          <MoreVertical className="w-3 h-3" />
                        </Button>
                      </motion.div>
                    </div>
                  </motion.div>
                  
                  <div className="flex-1 relative overflow-hidden">
                    <Textarea
                      value={code}
                      onChange={(e) => setCode(e.target.value)}
                      className={`absolute inset-0 w-full h-full resize-none border-0 rounded-none focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 p-4 font-mono transition-all duration-200 ${
                        editorTheme === 'dark' 
                          ? 'bg-gray-900 text-gray-100' 
                          : editorTheme === 'monokai'
                          ? 'bg-gray-800 text-green-400'
                          : 'bg-gradient-to-br from-gray-50 to-white text-gray-900'
                      }`}
                      placeholder="Write your solution here... 💡"
                      style={{ 
                        fontSize: `${fontSize}px`,
                        lineHeight: '1.6',
                        fontFamily: 'JetBrains Mono, Consolas, Monaco, "Courier New", monospace'
                      }}
                    />
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="absolute bottom-2 right-2 text-xs text-muted-foreground bg-background/90 backdrop-blur-sm px-3 py-1.5 rounded-full border border-border/50"
                    >
                      Ln {code.split('\n').length}, Col {code.split('\n').pop()?.length || 0}
                    </motion.div>
                  </div>
                </div>
              </ResizablePanel>

              <ResizableHandle withHandle className="bg-border/50 hover:bg-border transition-colors" />

              {/* Enhanced Test Cases and Console */}
              <ResizablePanel defaultSize={30} minSize={20}>
                <div className="h-full flex flex-col">
                  <Tabs defaultValue="testcase" className="h-full flex flex-col">
                    <div className="flex items-center justify-between px-4 py-3 border-b bg-gradient-to-r from-muted/20 to-muted/10">
                      <TabsList className="bg-muted/50">
                        <TabsTrigger value="testcase" className="text-xs data-[state=active]:bg-background">Test Cases</TabsTrigger>
                        <TabsTrigger value="result" className="text-xs data-[state=active]:bg-background">Results</TabsTrigger>
                      </TabsList>
                      <div className="flex items-center space-x-2">
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={handleRunCode}
                            disabled={isRunning}
                            className="flex items-center space-x-2 h-8 bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800 hover:bg-blue-100 dark:hover:bg-blue-900/30"
                          >
                            {isRunning ? (
                              <RefreshCw className="w-3 h-3 animate-spin" />
                            ) : (
                              <Play className="w-3 h-3" />
                            )}
                            <span>{isRunning ? 'Running...' : 'Run'}</span>
                          </Button>
                        </motion.div>
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                          <Button 
                            onClick={handleSubmit}
                            disabled={isSubmitting}
                            className="flex items-center space-x-2 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 h-8 shadow-lg"
                          >
                            {isSubmitting ? (
                              <RefreshCw className="w-3 h-3 animate-spin" />
                            ) : (
                              <Send className="w-3 h-3" />
                            )}
                            <span>{isSubmitting ? 'Submitting...' : 'Submit'}</span>
                          </Button>
                        </motion.div>
                      </div>
                    </div>
                    
                    <div className="flex-1 min-h-0">
                      <TabsContent value="testcase" className="p-4 h-full m-0">
                        <div className="space-y-4 h-full flex flex-col">
                          <div className="flex-1">
                            <label className="text-sm font-medium mb-2 block flex items-center">
                              <Target className="w-4 h-4 mr-2 text-primary" />
                              Test Case {activeTestCase + 1}
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
                              className={`font-mono text-sm h-20 resize-none transition-all duration-200 ${
                                activeTestCase < problem.testCases.length 
                                  ? 'bg-muted/20 border-muted focus-visible:ring-0' 
                                  : 'bg-background border-input focus-visible:ring-1 focus-visible:ring-primary'
                              }`}
                              placeholder={activeTestCase >= problem.testCases.length ? "Enter your custom test case..." : ""}
                            />
                          </div>
                          
                          <div className="flex space-x-2 overflow-x-auto pb-2">
                            {allTestCases.map((_, index) => (
                              <motion.div
                                key={index}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                              >
                                <Button 
                                  variant={activeTestCase === index ? "default" : "outline"} 
                                  size="sm" 
                                  className={`flex-shrink-0 transition-all duration-200 ${
                                    activeTestCase === index 
                                      ? 'bg-gradient-to-r from-primary to-primary/80 text-white shadow-lg' 
                                      : 'hover:bg-muted/80'
                                  }`}
                                  onClick={() => setActiveTestCase(index)}
                                >
                                  Case {index + 1}
                                  {index >= problem.testCases.length && (
                                    <span className="ml-1 text-xs opacity-70">(Custom)</span>
                                  )}
                                </Button>
                              </motion.div>
                            ))}
                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                              <Button 
                                variant="outline" 
                                size="sm" 
                                className="flex-shrink-0 border-dashed hover:bg-muted/80"
                                onClick={handleAddTestCase}
                              >
                                <Plus className="w-3 h-3" />
                              </Button>
                            </motion.div>
                          </div>
                        </div>
                      </TabsContent>
                      
                      <TabsContent value="result" className="p-4 h-full m-0">
                        {testResults.length > 0 ? (
                          <ScrollArea className="h-full">
                            <div className="space-y-3 pr-4">
                              {testResults.map((result, index) => (
                                <motion.div
                                  key={index}
                                  initial={{ opacity: 0, y: 10 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{ delay: index * 0.1 }}
                                  className={`p-3 border rounded-lg transition-all duration-200 ${
                                    result.passed 
                                      ? 'bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-green-200 dark:border-green-800' 
                                      : 'bg-gradient-to-r from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20 border-red-200 dark:border-red-800'
                                  }`}
                                >
                                  <div className="flex items-center justify-between mb-2">
                                    <span className="text-sm font-medium flex items-center">
                                      <span className="mr-2">Test Case {index + 1}</span>
                                    </span>
                                    <div className="flex items-center space-x-2">
                                      {result.passed ? (
                                        <motion.div
                                          initial={{ scale: 0 }}
                                          animate={{ scale: 1 }}
                                          className="flex items-center space-x-1"
                                        >
                                          <CheckCircle className="w-4 h-4 text-green-600" />
                                          <span className="text-sm font-medium text-green-600">Passed</span>
                                        </motion.div>
                                      ) : (
                                        <motion.div
                                          initial={{ scale: 0 }}
                                          animate={{ scale: 1 }}
                                          className="flex items-center space-x-1"
                                        >
                                          <XCircle className="w-4 h-4 text-red-600" />
                                          <span className="text-sm font-medium text-red-600">Failed</span>
                                        </motion.div>
                                      )}
                                    </div>
                                  </div>
                                  <div className="text-xs space-y-2 font-mono">
                                    <div className="flex items-start space-x-2">
                                      <span className="font-medium text-blue-600 min-w-[60px]">Input:</span>
                                      <code className="bg-blue-50 dark:bg-blue-900/20 px-2 py-1 rounded flex-1">{result.input}</code>
                                    </div>
                                    <div className="flex items-start space-x-2">
                                      <span className="font-medium text-purple-600 min-w-[60px]">Expected:</span>
                                      <code className="bg-purple-50 dark:bg-purple-900/20 px-2 py-1 rounded flex-1">{result.expected}</code>
                                    </div>
                                    <div className="flex items-start space-x-2">
                                      <span className="font-medium text-orange-600 min-w-[60px]">Output:</span>
                                      <code className="bg-orange-50 dark:bg-orange-900/20 px-2 py-1 rounded flex-1">{result.actual}</code>
                                    </div>
                                  </div>
                                </motion.div>
                              ))}
                            </div>
                          </ScrollArea>
                        ) : (
                          <motion.div 
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="h-full flex flex-col items-center justify-center text-center text-muted-foreground"
                          >
                            <div className="bg-muted/20 rounded-full p-4 mb-4">
                              <Play className="w-8 h-8 opacity-50" />
                            </div>
                            <p className="font-medium mb-1">Ready to test your solution?</p>
                            <p className="text-sm">Run your code to see the results</p>
                          </motion.div>
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
