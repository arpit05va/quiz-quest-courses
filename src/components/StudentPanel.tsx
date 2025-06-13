
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import {
  Search,
  Upload,
  MapPin,
  Calendar,
  DollarSign,
  Star,
  Eye,
  Heart,
  Send,
  FileText,
  User,
  Briefcase,
  Target,
  TrendingUp,
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Play,
  Award,
  BarChart3,
  Building2,
  Code,
  GraduationCap,
  Bot,
  Filter,
  Globe,
  Home,
  Zap,
  GitBranch,
  ExternalLink,
  Settings,
  BookOpen,
  MessageSquare,
  Calendar as CalendarIcon,
  ChevronRight,
  ThumbsUp
} from 'lucide-react';

const StudentPanel = () => {
  const [activeSection, setActiveSection] = useState('discovery');
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    location: '',
    salary: '',
    mode: '',
    company: ''
  });

  // Mock data for jobs
  const jobListings = [
    {
      id: 1,
      title: 'Frontend Developer Intern',
      company: 'Tech Innovate Inc.',
      location: 'Bangalore, India',
      mode: 'Hybrid',
      salary: '₹15,000/month',
      skills: ['React', 'JavaScript', 'CSS', 'HTML'],
      eligibility: 'BE/BTech 2024, Min CGPA: 7.0',
      deadline: '2024-02-15',
      tags: ['Urgent', 'High Stipend', 'Fast Track'],
      matchScore: 92,
      description: 'Join our dynamic team to build cutting-edge web applications...',
      applied: false,
      status: null
    },
    {
      id: 2,
      title: 'Data Science Intern',
      company: 'Analytics Pro',
      location: 'Remote',
      mode: 'Remote',
      salary: '₹12,000/month',
      skills: ['Python', 'Machine Learning', 'SQL', 'Pandas'],
      eligibility: 'BE/BTech/MCA 2024, Min CGPA: 7.5',
      deadline: '2024-02-20',
      tags: ['Remote', 'AI/ML', 'Diversity'],
      matchScore: 85,
      description: 'Work on real-world data problems and build ML models...',
      applied: true,
      status: 'Interview Scheduled'
    },
    {
      id: 3,
      title: 'Full Stack Developer',
      company: 'StartupXYZ',
      location: 'Mumbai, India',
      mode: 'On-site',
      salary: '₹4.5-6 LPA',
      skills: ['React', 'Node.js', 'MongoDB', 'Express'],
      eligibility: 'BE/BTech 2024, Min CGPA: 6.5',
      deadline: '2024-02-25',
      tags: ['Full-time', 'Startup', 'Growth'],
      matchScore: 78,
      description: 'Build end-to-end applications in a fast-paced startup environment...',
      applied: false,
      status: null
    }
  ];

  // Mock profile data
  const profileData = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    college: 'Indian Institute of Technology',
    batch: '2024',
    cgpa: '8.2',
    skills: [
      { name: 'React', score: 8.5 },
      { name: 'JavaScript', score: 9.0 },
      { name: 'Python', score: 7.5 },
      { name: 'SQL', score: 8.0 },
      { name: 'Node.js', score: 7.0 }
    ],
    projects: [
      { name: 'E-commerce Platform', tech: 'React, Node.js', link: 'github.com/john/ecommerce' },
      { name: 'ML Prediction Model', tech: 'Python, TensorFlow', link: 'github.com/john/ml-model' }
    ],
    github: 'github.com/johndoe',
    linkedin: 'linkedin.com/in/johndoe',
    completionScore: 85
  };

  // Mock application data
  const applications = [
    { id: 1, company: 'Tech Corp', position: 'SDE Intern', status: 'Interview Scheduled', appliedDate: '2024-01-15' },
    { id: 2, company: 'Data Inc', position: 'ML Intern', status: 'Shortlisted', appliedDate: '2024-01-12' },
    { id: 3, company: 'Web Solutions', position: 'Frontend Dev', status: 'Applied', appliedDate: '2024-01-10' },
    { id: 4, company: 'AI Startup', position: 'Python Dev', status: 'Rejected', appliedDate: '2024-01-08' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Interview Scheduled': return 'bg-blue-500';
      case 'Shortlisted': return 'bg-green-500';
      case 'Applied': return 'bg-yellow-500';
      case 'Rejected': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Interview Scheduled': return <Calendar className="w-4 h-4" />;
      case 'Shortlisted': return <CheckCircle2 className="w-4 h-4" />;
      case 'Applied': return <Clock className="w-4 h-4" />;
      case 'Rejected': return <XCircle className="w-4 h-4" />;
      default: return <AlertCircle className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-foreground">Student Dashboard</h1>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">
            <Bot className="w-4 h-4 mr-2" />
            Job Copilot
          </Button>
          <Button variant="outline" size="sm">
            <Upload className="w-4 h-4 mr-2" />
            Upload Resume
          </Button>
        </div>
      </div>

      <Tabs value={activeSection} onValueChange={setActiveSection} className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="discovery" className="flex items-center space-x-2">
            <Search className="w-4 h-4" />
            <span>Job Discovery</span>
          </TabsTrigger>
          <TabsTrigger value="applications" className="flex items-center space-x-2">
            <Briefcase className="w-4 h-4" />
            <span>Applications</span>
          </TabsTrigger>
          <TabsTrigger value="profile" className="flex items-center space-x-2">
            <User className="w-4 h-4" />
            <span>Profile</span>
          </TabsTrigger>
          <TabsTrigger value="interview" className="flex items-center space-x-2">
            <Calendar className="w-4 h-4" />
            <span>Interview Prep</span>
          </TabsTrigger>
          <TabsTrigger value="dashboard" className="flex items-center space-x-2">
            <BarChart3 className="w-4 h-4" />
            <span>Career Insights</span>
          </TabsTrigger>
        </TabsList>

        {/* AI-Based Job Discovery */}
        <TabsContent value="discovery" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Bot className="w-5 h-5" />
                <span>AI-Powered Job Discovery</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex space-x-4">
                <div className="flex-1">
                  <Input
                    placeholder="Search jobs or ask Job Copilot (e.g., 'Find AI internships with stipend > 10K')"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full"
                  />
                </div>
                <Button>
                  <Search className="w-4 h-4 mr-2" />
                  Search
                </Button>
              </div>

              <div className="grid grid-cols-4 gap-4">
                <Input placeholder="Location" value={filters.location} onChange={(e) => setFilters({...filters, location: e.target.value})} />
                <Input placeholder="Min Salary" value={filters.salary} onChange={(e) => setFilters({...filters, salary: e.target.value})} />
                <Input placeholder="Work Mode" value={filters.mode} onChange={(e) => setFilters({...filters, mode: e.target.value})} />
                <Input placeholder="Company Type" value={filters.company} onChange={(e) => setFilters({...filters, company: e.target.value})} />
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-6">
            {jobListings.map((job) => (
              <Card key={job.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-xl font-bold">{job.title}</h3>
                        <Badge variant="secondary" className="bg-green-100 text-green-800">
                          {job.matchScore}% Match
                        </Badge>
                      </div>
                      <p className="text-muted-foreground mb-2">{job.company}</p>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <div className="flex items-center space-x-1">
                          <MapPin className="w-4 h-4" />
                          <span>{job.location}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Home className="w-4 h-4" />
                          <span>{job.mode}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <DollarSign className="w-4 h-4" />
                          <span>{job.salary}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-4 h-4" />
                          <span>Deadline: {job.deadline}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      {job.applied ? (
                        <Badge className={getStatusColor(job.status!)}>
                          {getStatusIcon(job.status!)}
                          <span className="ml-1">{job.status}</span>
                        </Badge>
                      ) : (
                        <Button>
                          <Send className="w-4 h-4 mr-2" />
                          Apply Now
                        </Button>
                      )}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <h4 className="font-medium mb-2">Required Skills:</h4>
                      <div className="flex flex-wrap gap-2">
                        {job.skills.map((skill) => (
                          <Badge key={skill} variant="outline">{skill}</Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium mb-2">Tags:</h4>
                      <div className="flex flex-wrap gap-2">
                        {job.tags.map((tag) => (
                          <Badge key={tag} className="bg-blue-100 text-blue-800">{tag}</Badge>
                        ))}
                      </div>
                    </div>

                    <div className="bg-blue-50 p-3 rounded-lg">
                      <h4 className="font-medium text-blue-900 mb-1">🤖 Why this job suits you:</h4>
                      <p className="text-sm text-blue-800">
                        Your React and JavaScript skills (9.0/10) perfectly match this role. Your e-commerce project demonstrates relevant experience.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Job Applications */}
        <TabsContent value="applications" className="space-y-6">
          <div className="grid grid-cols-4 gap-4 mb-6">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <Send className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Total Applied</p>
                    <p className="text-2xl font-bold text-blue-600">12</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Shortlisted</p>
                    <p className="text-2xl font-bold text-green-600">5</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <Calendar className="h-5 w-5 text-purple-600" />
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Interviews</p>
                    <p className="text-2xl font-bold text-purple-600">3</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <Award className="h-5 w-5 text-yellow-600" />
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Offers</p>
                    <p className="text-2xl font-bold text-yellow-600">1</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Application Tracker</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {applications.map((app) => (
                  <div key={app.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className={`w-3 h-3 rounded-full ${getStatusColor(app.status)}`}></div>
                      <div>
                        <h4 className="font-medium">{app.position}</h4>
                        <p className="text-sm text-muted-foreground">{app.company}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className="text-sm text-muted-foreground">Applied: {app.appliedDate}</span>
                      <Badge className={getStatusColor(app.status)}>
                        {getStatusIcon(app.status)}
                        <span className="ml-1">{app.status}</span>
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Profile & Resume Builder */}
        <TabsContent value="profile" className="space-y-6">
          <div className="grid grid-cols-3 gap-6">
            <div className="col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    Profile Completion
                    <Badge variant="secondary">{profileData.completionScore}%</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Progress value={profileData.completionScore} className="mb-4" />
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium">Name</label>
                      <Input value={profileData.name} />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Email</label>
                      <Input value={profileData.email} />
                    </div>
                    <div>
                      <label className="text-sm font-medium">College</label>
                      <Input value={profileData.college} />
                    </div>
                    <div>
                      <label className="text-sm font-medium">CGPA</label>
                      <Input value={profileData.cgpa} />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Skills & Quiz Scores</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {profileData.skills.map((skill) => (
                      <div key={skill.name} className="flex items-center justify-between">
                        <span className="font-medium">{skill.name}</span>
                        <div className="flex items-center space-x-3">
                          <Progress value={skill.score * 10} className="w-32" />
                          <Badge variant="outline">{skill.score}/10</Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Projects</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {profileData.projects.map((project, index) => (
                      <div key={index} className="border rounded-lg p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium">{project.name}</h4>
                            <p className="text-sm text-muted-foreground">{project.tech}</p>
                          </div>
                          <Button variant="outline" size="sm">
                            <ExternalLink className="w-4 h-4 mr-2" />
                            View
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Resume Preview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <Button className="w-full">
                      <FileText className="w-4 h-4 mr-2" />
                      View Resume
                    </Button>
                    <Button variant="outline" className="w-full">
                      <Bot className="w-4 h-4 mr-2" />
                      AI-Enhanced Resume
                    </Button>
                    <Separator />
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <GitBranch className="w-4 h-4" />
                        <span className="text-sm">GitHub: {profileData.github}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Building2 className="w-4 h-4" />
                        <span className="text-sm">LinkedIn: {profileData.linkedin}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>AI Salary Estimation</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-green-600">₹4.5-6.2 LPA</p>
                    <p className="text-sm text-muted-foreground">Based on your skills and projects</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* Interview & Preparation */}
        <TabsContent value="interview" className="space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Calendar className="w-5 h-5" />
                  <span>Upcoming Interviews</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">Tech Corp - SDE Intern</h4>
                      <Badge>Tomorrow 2:00 PM</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">Technical Round - React & JavaScript</p>
                    <div className="flex space-x-2">
                      <Button size="sm">
                        <ExternalLink className="w-4 h-4 mr-1" />
                        Join Meeting
                      </Button>
                      <Button variant="outline" size="sm">
                        <Play className="w-4 h-4 mr-1" />
                        Practice
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Bot className="w-5 h-5" />
                  <span>AI Interview Prep</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Button className="w-full">
                    <Play className="w-4 h-4 mr-2" />
                    Start Mock Interview
                  </Button>
                  <Button variant="outline" className="w-full">
                    <BookOpen className="w-4 h-4 mr-2" />
                    Generate Questions
                  </Button>
                  <Button variant="outline" className="w-full">
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Practice Answers
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Practice Questions Bank</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4">
                <div className="border rounded-lg p-4 text-center">
                  <Code className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                  <h4 className="font-medium">Technical</h4>
                  <p className="text-sm text-muted-foreground">React, JS, DSA</p>
                  <Button variant="outline" size="sm" className="mt-2">
                    Practice (45 Q)
                  </Button>
                </div>
                <div className="border rounded-lg p-4 text-center">
                  <MessageSquare className="w-8 h-8 mx-auto mb-2 text-green-600" />
                  <h4 className="font-medium">Behavioral</h4>
                  <p className="text-sm text-muted-foreground">HR, Situational</p>
                  <Button variant="outline" size="sm" className="mt-2">
                    Practice (20 Q)
                  </Button>
                </div>
                <div className="border rounded-lg p-4 text-center">
                  <Building2 className="w-8 h-8 mx-auto mb-2 text-purple-600" />
                  <h4 className="font-medium">Company Specific</h4>
                  <p className="text-sm text-muted-foreground">Top Companies</p>
                  <Button variant="outline" size="sm" className="mt-2">
                    Practice (30 Q)
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Career Dashboard */}
        <TabsContent value="dashboard" className="space-y-6">
          <div className="grid grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <TrendingUp className="h-5 w-5 text-green-600" />
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Profile Views</p>
                    <p className="text-2xl font-bold text-green-600">156</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <Eye className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Recruiter Views</p>
                    <p className="text-2xl font-bold text-blue-600">23</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <Star className="h-5 w-5 text-yellow-600" />
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Skill Rank</p>
                    <p className="text-2xl font-bold text-yellow-600">Top 15%</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <DollarSign className="h-5 w-5 text-green-600" />
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Avg. Package</p>
                    <p className="text-2xl font-bold text-green-600">₹5.8L</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Skill Market Demand</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>React</span>
                    <div className="flex items-center space-x-2">
                      <Progress value={90} className="w-24" />
                      <span className="text-sm font-medium">High</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>JavaScript</span>
                    <div className="flex items-center space-x-2">
                      <Progress value={85} className="w-24" />
                      <span className="text-sm font-medium">High</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Python</span>
                    <div className="flex items-center space-x-2">
                      <Progress value={80} className="w-24" />
                      <span className="text-sm font-medium">High</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Node.js</span>
                    <div className="flex items-center space-x-2">
                      <Progress value={70} className="w-24" />
                      <span className="text-sm font-medium">Medium</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Salary Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border rounded-lg p-3">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">Frontend Developer</span>
                      <span className="text-green-600 font-bold">₹4-7 LPA</span>
                    </div>
                    <p className="text-sm text-muted-foreground">Your profile range</p>
                  </div>
                  <div className="border rounded-lg p-3">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">Full Stack Developer</span>
                      <span className="text-green-600 font-bold">₹6-10 LPA</span>
                    </div>
                    <p className="text-sm text-muted-foreground">With 1 year exp.</p>
                  </div>
                  <div className="border rounded-lg p-3">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">Senior Developer</span>
                      <span className="text-green-600 font-bold">₹12-18 LPA</span>
                    </div>
                    <p className="text-sm text-muted-foreground">With 3+ years exp.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Top Hiring Companies in Your Domain</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-4 gap-4">
                {['TCS', 'Infosys', 'Wipro', 'Accenture', 'IBM', 'Microsoft', 'Amazon', 'Google'].map((company) => (
                  <div key={company} className="border rounded-lg p-3 text-center">
                    <Building2 className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                    <h4 className="font-medium">{company}</h4>
                    <p className="text-sm text-muted-foreground">Actively Hiring</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default StudentPanel;
