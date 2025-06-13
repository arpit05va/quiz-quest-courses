
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import {
  Search,
  Upload,
  Users,
  FileText,
  Calendar,
  BarChart3,
  Star,
  MapPin,
  DollarSign,
  Clock,
  Eye,
  Heart,
  X,
  CheckCircle2,
  Brain,
  Target,
  TrendingUp
} from 'lucide-react';

const RecruiterPanel = () => {
  const [activeTab, setActiveTab] = useState('discovery');
  const [jobDescription, setJobDescription] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  // Mock data for demonstration
  const mockCandidates = [
    {
      id: 1,
      name: 'John Smith',
      email: 'john.smith@email.com',
      skills: ['React', 'Node.js', 'TypeScript', 'AWS'],
      experience: '3 years',
      location: 'Bangalore',
      college: 'IIT Delhi',
      cgpa: 8.5,
      quizScores: { react: 9, javascript: 8, nodejs: 7 },
      overallScore: 8.2,
      expectedSalary: '12-15 LPA',
      aiPitch: 'Strong full-stack developer with proven React expertise and excellent problem-solving skills.',
      linkedin: 'https://linkedin.com/in/johnsmith',
      github: 'https://github.com/johnsmith',
      availability: 'Immediate'
    },
    {
      id: 2,
      name: 'Sarah Wilson',
      email: 'sarah.wilson@email.com',
      skills: ['Python', 'Django', 'PostgreSQL', 'Docker'],
      experience: '2 years',
      location: 'Mumbai',
      college: 'BITS Pilani',
      cgpa: 9.1,
      quizScores: { python: 9, sql: 8, django: 8 },
      overallScore: 8.5,
      expectedSalary: '10-12 LPA',
      aiPitch: 'Backend specialist with exceptional database skills and clean coding practices.',
      linkedin: 'https://linkedin.com/in/sarahwilson',
      github: 'https://github.com/sarahwilson',
      availability: '30 days notice'
    }
  ];

  const mockJobs = [
    {
      id: 1,
      title: 'Senior React Developer',
      type: 'Full-time',
      location: 'Remote',
      salary: '15-20 LPA',
      applicants: 45,
      deadline: '2024-02-15',
      status: 'Active'
    },
    {
      id: 2,
      title: 'Python Backend Intern',
      type: 'Internship',
      location: 'Bangalore',
      salary: '25k stipend',
      applicants: 120,
      deadline: '2024-02-10',
      status: 'Active'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold">Recruiter / HR Panel</h2>
        <Badge variant="secondary" className="px-3 py-1">
          <Users className="w-4 h-4 mr-1" />
          Recruitment Suite
        </Badge>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="discovery">AI Discovery</TabsTrigger>
          <TabsTrigger value="jobs">Job Posting</TabsTrigger>
          <TabsTrigger value="candidates">Candidates</TabsTrigger>
          <TabsTrigger value="interviews">Interviews</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        {/* AI-Based Candidate Discovery */}
        <TabsContent value="discovery" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Brain className="w-5 h-5" />
                <span>AI-Powered Candidate Discovery</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="jd-upload">Upload Job Description</Label>
                  <div className="border-2 border-dashed border-border rounded-lg p-4 text-center">
                    <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">Upload JD file or paste content</p>
                    <Button variant="outline" size="sm" className="mt-2">
                      Choose File
                    </Button>
                  </div>
                </div>
                <div>
                  <Label htmlFor="jd-text">Or Enter Keywords</Label>
                  <Textarea
                    id="jd-text"
                    placeholder="Enter job requirements, skills, experience..."
                    value={jobDescription}
                    onChange={(e) => setJobDescription(e.target.value)}
                    rows={4}
                  />
                </div>
              </div>

              <div className="flex space-x-2">
                <Input
                  placeholder="Recruiter Copilot: Ask in natural language..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1"
                />
                <Button>
                  <Search className="w-4 h-4 mr-2" />
                  Find Candidates
                </Button>
              </div>

              {/* Smart Filters */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="College" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="iit">IIT</SelectItem>
                    <SelectItem value="nit">NIT</SelectItem>
                    <SelectItem value="bits">BITS</SelectItem>
                  </SelectContent>
                </Select>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Location" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bangalore">Bangalore</SelectItem>
                    <SelectItem value="mumbai">Mumbai</SelectItem>
                    <SelectItem value="delhi">Delhi</SelectItem>
                  </SelectContent>
                </Select>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Availability" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="immediate">Immediate</SelectItem>
                    <SelectItem value="30days">30 days</SelectItem>
                    <SelectItem value="60days">60 days</SelectItem>
                  </SelectContent>
                </Select>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Quiz Score" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="8+">8+ Score</SelectItem>
                    <SelectItem value="7+">7+ Score</SelectItem>
                    <SelectItem value="6+">6+ Score</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Candidate Results */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Top Matching Candidates</h3>
            {mockCandidates.map((candidate) => (
              <Card key={candidate.id} className="hover:shadow-lg transition-all">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h4 className="text-lg font-semibold">{candidate.name}</h4>
                      <p className="text-muted-foreground">{candidate.email}</p>
                      <div className="flex items-center space-x-2 mt-1">
                        <MapPin className="w-4 h-4" />
                        <span className="text-sm">{candidate.location}</span>
                        <span className="text-sm">• {candidate.college}</span>
                        <span className="text-sm">• CGPA: {candidate.cgpa}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center space-x-2 mb-2">
                        <Target className="w-4 h-4 text-green-600" />
                        <span className="font-semibold text-green-600">{candidate.overallScore}/10</span>
                      </div>
                      <Badge variant="outline">{candidate.availability}</Badge>
                    </div>
                  </div>

                  {/* AI Pitch */}
                  <div className="bg-blue-50 p-3 rounded-lg mb-4">
                    <div className="flex items-start space-x-2">
                      <Brain className="w-4 h-4 text-blue-600 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-blue-900">AI Smart Pitch</p>
                        <p className="text-sm text-blue-800">{candidate.aiPitch}</p>
                      </div>
                    </div>
                  </div>

                  {/* Skills */}
                  <div className="mb-4">
                    <p className="text-sm font-medium mb-2">Skills & Tech Stack</p>
                    <div className="flex flex-wrap gap-2">
                      {candidate.skills.map((skill) => (
                        <Badge key={skill} variant="secondary">{skill}</Badge>
                      ))}
                    </div>
                  </div>

                  {/* Quiz Scores */}
                  <div className="mb-4">
                    <p className="text-sm font-medium mb-2">Quiz Competency Scores</p>
                    <div className="grid grid-cols-3 gap-3">
                      {Object.entries(candidate.quizScores).map(([topic, score]) => (
                        <div key={topic} className="text-center">
                          <p className="text-xs text-muted-foreground capitalize">{topic}</p>
                          <p className="font-semibold">{score}/10</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex justify-between items-center">
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline">
                        <Eye className="w-4 h-4 mr-1" />
                        View Profile
                      </Button>
                      <Button size="sm" variant="outline">
                        Resume
                      </Button>
                    </div>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline">
                        <Heart className="w-4 h-4 mr-1" />
                        Watchlist
                      </Button>
                      <Button size="sm">
                        <CheckCircle2 className="w-4 h-4 mr-1" />
                        Shortlist
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Job Posting Module */}
        <TabsContent value="jobs" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <FileText className="w-5 h-5" />
                <span>Create New Job Posting</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="job-title">Job Title</Label>
                  <Input id="job-title" placeholder="e.g., Senior React Developer" />
                </div>
                <div>
                  <Label htmlFor="job-type">Job Type</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select job type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fulltime">Full-time</SelectItem>
                      <SelectItem value="internship">Internship</SelectItem>
                      <SelectItem value="freelance">Freelance</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="location">Location</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select location type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="remote">Remote</SelectItem>
                      <SelectItem value="onsite">On-site</SelectItem>
                      <SelectItem value="hybrid">Hybrid</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="salary">Salary Range</Label>
                  <Input id="salary" placeholder="e.g., 15-20 LPA" />
                </div>
              </div>

              <div>
                <Label htmlFor="skills">Required Skills (Auto-suggested)</Label>
                <Input id="skills" placeholder="Start typing skills..." />
                <div className="mt-2 flex flex-wrap gap-2">
                  <Badge variant="secondary">React <X className="w-3 h-3 ml-1" /></Badge>
                  <Badge variant="secondary">Node.js <X className="w-3 h-3 ml-1" /></Badge>
                  <Badge variant="secondary">TypeScript <X className="w-3 h-3 ml-1" /></Badge>
                </div>
              </div>

              <div>
                <Label htmlFor="description">Job Description</Label>
                <Textarea
                  id="description"
                  placeholder="Detailed job description..."
                  rows={6}
                />
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="batch">Batch/Year</Label>
                  <Input id="batch" placeholder="e.g., 2024" />
                </div>
                <div>
                  <Label htmlFor="degree">Degree</Label>
                  <Input id="degree" placeholder="e.g., B.Tech, M.Tech" />
                </div>
                <div>
                  <Label htmlFor="cgpa">Minimum CGPA</Label>
                  <Input id="cgpa" placeholder="e.g., 7.0" />
                </div>
              </div>

              <div>
                <Label htmlFor="deadline">Application Deadline</Label>
                <Input id="deadline" type="date" />
              </div>

              <div>
                <Label>Tags</Label>
                <div className="flex flex-wrap gap-2 mt-2">
                  <Badge variant="outline">Urgent</Badge>
                  <Badge variant="outline">Work From Home</Badge>
                  <Badge variant="outline">Diversity</Badge>
                  <Badge variant="outline">Entry Level</Badge>
                </div>
              </div>

              <Button className="w-full">
                <FileText className="w-4 h-4 mr-2" />
                Post Job
              </Button>
            </CardContent>
          </Card>

          {/* Active Jobs */}
          <Card>
            <CardHeader>
              <CardTitle>Active Job Postings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockJobs.map((job) => (
                  <div key={job.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-semibold">{job.title}</h4>
                        <p className="text-sm text-muted-foreground">
                          {job.type} • {job.location} • {job.salary}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Deadline: {job.deadline}
                        </p>
                      </div>
                      <div className="text-right">
                        <Badge variant="secondary">{job.status}</Badge>
                        <p className="text-sm font-medium mt-1">{job.applicants} applicants</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Candidate Preview Panel */}
        <TabsContent value="candidates" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Candidate Management</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockCandidates.map((candidate) => (
                  <div key={candidate.id} className="border rounded-lg p-4">
                    <div className="grid md:grid-cols-3 gap-4">
                      {/* Basic Info */}
                      <div>
                        <h4 className="font-semibold">{candidate.name}</h4>
                        <p className="text-sm text-muted-foreground">{candidate.email}</p>
                        <div className="mt-2 space-y-1">
                          <div className="flex items-center space-x-2">
                            <Badge variant="outline">LinkedIn</Badge>
                            <Badge variant="outline">GitHub</Badge>
                          </div>
                          <p className="text-sm">Expected: {candidate.expectedSalary}</p>
                        </div>
                      </div>

                      {/* Skills & Scores */}
                      <div>
                        <p className="text-sm font-medium mb-2">Quiz Scores</p>
                        {Object.entries(candidate.quizScores).map(([topic, score]) => (
                          <div key={topic} className="flex justify-between items-center mb-1">
                            <span className="text-sm capitalize">{topic}</span>
                            <Progress value={score * 10} className="w-16 h-2" />
                            <span className="text-sm font-medium">{score}/10</span>
                          </div>
                        ))}
                      </div>

                      {/* Actions */}
                      <div className="space-y-2">
                        <Button size="sm" className="w-full">
                          <Eye className="w-4 h-4 mr-2" />
                          View Full Profile
                        </Button>
                        <Button size="sm" variant="outline" className="w-full">
                          <Calendar className="w-4 h-4 mr-2" />
                          Schedule Interview
                        </Button>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline">
                            <CheckCircle2 className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <X className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Heart className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Interview & Shortlisting Tools */}
        <TabsContent value="interviews" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Calendar className="w-5 h-5" />
                <span>Interview Management</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3">Schedule Interview</h4>
                  <div className="space-y-3">
                    <Input placeholder="Candidate name" />
                    <Input type="datetime-local" />
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Platform" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="zoom">Zoom</SelectItem>
                        <SelectItem value="meet">Google Meet</SelectItem>
                        <SelectItem value="teams">MS Teams</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button className="w-full">Schedule Interview</Button>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-3">AI Interview Questions</h4>
                  <div className="space-y-3">
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="frontend">Frontend Developer</SelectItem>
                        <SelectItem value="backend">Backend Developer</SelectItem>
                        <SelectItem value="fullstack">Full Stack Developer</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Difficulty" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="beginner">Beginner</SelectItem>
                        <SelectItem value="intermediate">Intermediate</SelectItem>
                        <SelectItem value="advanced">Advanced</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button variant="outline" className="w-full">
                      <Brain className="w-4 h-4 mr-2" />
                      Generate Questions
                    </Button>
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <h4 className="font-semibold mb-3">Candidate Comparison Tool</h4>
                <div className="grid md:grid-cols-3 gap-4">
                  {mockCandidates.slice(0, 2).map((candidate) => (
                    <Card key={candidate.id} className="p-4">
                      <h5 className="font-medium">{candidate.name}</h5>
                      <div className="mt-2 space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm">Overall Score</span>
                          <span className="font-medium">{candidate.overallScore}/10</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">Experience</span>
                          <span className="font-medium">{candidate.experience}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">Expected Salary</span>
                          <span className="font-medium">{candidate.expectedSalary}</span>
                        </div>
                      </div>
                    </Card>
                  ))}
                  <div className="flex items-center justify-center border-2 border-dashed border-border rounded-lg p-4">
                    <Button variant="outline">
                      Add Candidate
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Analytics Dashboard */}
        <TabsContent value="analytics" className="space-y-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <Users className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Total Applicants</p>
                    <p className="text-2xl font-bold text-blue-600">234</p>
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
                    <p className="text-2xl font-bold text-green-600">45</p>
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
                    <p className="text-2xl font-bold text-purple-600">18</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <TrendingUp className="h-5 w-5 text-orange-600" />
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Hired</p>
                    <p className="text-2xl font-bold text-orange-600">8</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Top Performing Colleges</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {['IIT Delhi', 'BITS Pilani', 'NIT Trichy'].map((college, index) => (
                    <div key={college} className="flex justify-between items-center">
                      <span>{college}</span>
                      <Badge variant="secondary">{25 - index * 5} applicants</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Skill Demand Heatmap</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { skill: 'React', demand: 90, supply: 70 },
                    { skill: 'Python', demand: 80, supply: 85 },
                    { skill: 'Node.js', demand: 75, supply: 60 }
                  ].map((item) => (
                    <div key={item.skill} className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>{item.skill}</span>
                        <span>Demand: {item.demand}% | Supply: {item.supply}%</span>
                      </div>
                      <div className="flex space-x-2">
                        <Progress value={item.demand} className="flex-1 h-2" />
                        <Progress value={item.supply} className="flex-1 h-2" />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Salary Benchmarks</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4">
                {[
                  { role: 'Frontend Developer', city: 'Bangalore', salary: '12-18 LPA' },
                  { role: 'Backend Developer', city: 'Mumbai', salary: '14-20 LPA' },
                  { role: 'Full Stack Developer', city: 'Delhi', salary: '15-22 LPA' }
                ].map((item, index) => (
                  <div key={index} className="border rounded-lg p-3">
                    <h5 className="font-medium">{item.role}</h5>
                    <p className="text-sm text-muted-foreground">{item.city}</p>
                    <p className="text-lg font-semibold text-green-600">{item.salary}</p>
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

export default RecruiterPanel;
