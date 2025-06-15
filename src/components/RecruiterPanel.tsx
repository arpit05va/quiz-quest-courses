import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import { toast } from '@/components/ui/sonner';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
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
  TrendingUp,
  Linkedin,
  Github,
  Plus,
  Edit,
  Save
} from 'lucide-react';

const RecruiterPanel = () => {
  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState('discovery');
  const [jobDescription, setJobDescription] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Dialog states
  const [profileDialogOpen, setProfileDialogOpen] = useState(false);
  const [resumeDialogOpen, setResumeDialogOpen] = useState(false);
  const [applicationsDialogOpen, setApplicationsDialogOpen] = useState(false);
  const [editJobDialogOpen, setEditJobDialogOpen] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState<any>(null);
  const [selectedJob, setSelectedJob] = useState<any>(null);
  
  // Watchlist and shortlist states
  const [watchlist, setWatchlist] = useState<number[]>([]);
  const [shortlisted, setShortlisted] = useState<number[]>([]);

  // Job posting form states
  const [jobForm, setJobForm] = useState({
    title: '',
    type: '',
    location: '',
    salary: '',
    skills: [] as string[],
    description: '',
    batch: '',
    degree: '',
    cgpa: '',
    deadline: '',
    tags: [] as string[]
  });
  const [skillInput, setSkillInput] = useState('');
  const [jobs, setJobs] = useState([
    {
      id: 1,
      title: 'Senior React Developer',
      type: 'Full-time',
      location: 'Remote',
      salary: '15-20 LPA',
      applicants: 45,
      deadline: '2024-02-15',
      status: 'Active',
      skills: ['React', 'Node.js', 'TypeScript'],
      description: 'We are looking for a senior React developer...',
      batch: '2024',
      degree: 'B.Tech',
      cgpa: '7.0',
      tags: ['Urgent', 'Work From Home']
    },
    {
      id: 2,
      title: 'Python Backend Intern',
      type: 'Internship',
      location: 'Bangalore',
      salary: '25k stipend',
      applicants: 120,
      deadline: '2024-02-10',
      status: 'Active',
      skills: ['Python', 'Django', 'PostgreSQL'],
      description: 'Internship opportunity for Python backend development...',
      batch: '2025',
      degree: 'B.Tech',
      cgpa: '6.5',
      tags: ['Entry Level', 'Diversity']
    }
  ]);

  // Available tags
  const availableTags = ['Urgent', 'Work From Home', 'Diversity', 'Entry Level', 'Remote', 'Full-time', 'Part-time'];

  // Mock applications data
  const mockApplications = [
    {
      id: 1,
      candidateId: 1,
      name: 'John Smith',
      email: 'john.smith@email.com',
      appliedDate: '2024-01-15',
      status: 'Under Review',
      resumeUrl: '#',
      coverLetter: 'I am excited to apply for this position...',
      skills: ['React', 'Node.js', 'TypeScript'],
      experience: '3 years',
      expectedSalary: '12-15 LPA'
    },
    {
      id: 2,
      candidateId: 2,
      name: 'Sarah Wilson',
      email: 'sarah.wilson@email.com',
      appliedDate: '2024-01-14',
      status: 'Shortlisted',
      resumeUrl: '#',
      coverLetter: 'With my background in backend development...',
      skills: ['Python', 'Django', 'PostgreSQL'],
      experience: '2 years',
      expectedSalary: '10-12 LPA'
    },
    {
      id: 3,
      candidateId: 3,
      name: 'Mike Johnson',
      email: 'mike.johnson@email.com',
      appliedDate: '2024-01-13',
      status: 'Applied',
      resumeUrl: '#',
      coverLetter: 'I have been working with React for the past 2 years...',
      skills: ['React', 'JavaScript', 'CSS'],
      experience: '2 years',
      expectedSalary: '8-12 LPA'
    }
  ];

  // New state for interview scheduling
  const [scheduleInterviewDialogOpen, setScheduleInterviewDialogOpen] = useState(false);
  const [selectedCandidateForInterview, setSelectedCandidateForInterview] = useState<any>(null);
  const [interviewForm, setInterviewForm] = useState({
    date: '',
    time: '',
    platform: '',
    notes: ''
  });

  // Set active tab based on URL parameter
  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab) {
      // Map URL parameter values to internal tab values
      const tabMapping: { [key: string]: string } = {
        'ai-discovery': 'discovery',
        'job-posting': 'jobs',
        'candidate-management': 'candidates',
        'interview-management': 'interviews',
        'analytics-dashboard': 'analytics'
      };
      
      const mappedTab = tabMapping[tab] || tab;
      setActiveTab(mappedTab);
    }
  }, [searchParams]);

  // Handle file upload
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Check file type
      const allowedTypes = [
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'text/plain'
      ];
      
      if (!allowedTypes.includes(file.type)) {
        toast.error('Please upload a PDF, Word document, or text file');
        return;
      }

      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error('File size must be less than 5MB');
        return;
      }

      setUploadedFile(file);
      toast.success(`File "${file.name}" uploaded successfully!`);

      // Read file content for text files
      if (file.type === 'text/plain') {
        const reader = new FileReader();
        reader.onload = (e) => {
          const content = e.target?.result as string;
          setJobDescription(content);
        };
        reader.readAsText(file);
      }
    }
  };

  const handleChooseFile = () => {
    fileInputRef.current?.click();
  };

  const handleRemoveFile = () => {
    setUploadedFile(null);
    setJobDescription('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    toast.success('File removed successfully');
  };

  // Job posting form handlers
  const handleJobFormChange = (field: string, value: string) => {
    setJobForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleAddSkill = () => {
    if (skillInput.trim() && !jobForm.skills.includes(skillInput.trim())) {
      setJobForm(prev => ({
        ...prev,
        skills: [...prev.skills, skillInput.trim()]
      }));
      setSkillInput('');
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setJobForm(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill !== skillToRemove)
    }));
  };

  const handleAddTag = (tag: string) => {
    if (!jobForm.tags.includes(tag)) {
      setJobForm(prev => ({
        ...prev,
        tags: [...prev.tags, tag]
      }));
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setJobForm(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handlePostJob = () => {
    // Validate required fields
    if (!jobForm.title || !jobForm.type || !jobForm.location || !jobForm.salary || !jobForm.description) {
      toast.error('Please fill in all required fields');
      return;
    }

    // Create new job
    const newJob = {
      id: Date.now(),
      ...jobForm,
      applicants: 0,
      status: 'Active' as const
    };

    setJobs(prev => [newJob, ...prev]);
    
    // Reset form
    setJobForm({
      title: '',
      type: '',
      location: '',
      salary: '',
      skills: [],
      description: '',
      batch: '',
      degree: '',
      cgpa: '',
      deadline: '',
      tags: []
    });
    setSkillInput('');

    toast.success('Job posted successfully!');
  };

  const handleDeleteJob = (jobId: number) => {
    setJobs(prev => prev.filter(job => job.id !== jobId));
    toast.success('Job deleted successfully');
  };

  // New handlers for View Applications and Edit
  const handleViewApplications = (job: any) => {
    setSelectedJob(job);
    setApplicationsDialogOpen(true);
  };

  const handleEditJob = (job: any) => {
    setSelectedJob(job);
    setJobForm({
      title: job.title,
      type: job.type,
      location: job.location,
      salary: job.salary,
      skills: job.skills || [],
      description: job.description,
      batch: job.batch || '',
      degree: job.degree || '',
      cgpa: job.cgpa || '',
      deadline: job.deadline || '',
      tags: job.tags || []
    });
    setEditJobDialogOpen(true);
  };

  const handleUpdateJob = () => {
    if (!selectedJob) return;

    // Validate required fields
    if (!jobForm.title || !jobForm.type || !jobForm.location || !jobForm.salary || !jobForm.description) {
      toast.error('Please fill in all required fields');
      return;
    }

    setJobs(prev => prev.map(job => 
      job.id === selectedJob.id 
        ? { ...job, ...jobForm }
        : job
    ));

    setEditJobDialogOpen(false);
    setSelectedJob(null);
    toast.success('Job updated successfully!');
  };

  const handleApplicationStatusChange = (applicationId: number, newStatus: string) => {
    // In a real app, this would update the backend
    toast.success(`Application status updated to ${newStatus}`);
  };

  // Handle candidate actions
  const handleViewProfile = (candidate: any) => {
    setSelectedCandidate(candidate);
    setProfileDialogOpen(true);
  };

  const handleViewResume = (candidate: any) => {
    setSelectedCandidate(candidate);
    setResumeDialogOpen(true);
  };

  const handleToggleWatchlist = (candidateId: number) => {
    setWatchlist(prev => {
      const isInWatchlist = prev.includes(candidateId);
      if (isInWatchlist) {
        toast.success('Candidate removed from watchlist');
        return prev.filter(id => id !== candidateId);
      } else {
        toast.success('Candidate added to watchlist');
        return [...prev, candidateId];
      }
    });
  };

  const handleToggleShortlist = (candidateId: number) => {
    setShortlisted(prev => {
      const isShortlisted = prev.includes(candidateId);
      if (isShortlisted) {
        toast.success('Candidate removed from shortlist');
        return prev.filter(id => id !== candidateId);
      } else {
        toast.success('Candidate shortlisted successfully');
        return [...prev, candidateId];
      }
    });
  };

  // New handlers for candidate management buttons
  const handleViewFullProfile = (candidate: any) => {
    setSelectedCandidate(candidate);
    setProfileDialogOpen(true);
  };

  const handleScheduleInterview = (candidate: any) => {
    setSelectedCandidateForInterview(candidate);
    setScheduleInterviewDialogOpen(true);
  };

  const handleInterviewFormChange = (field: string, value: string) => {
    setInterviewForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleScheduleInterviewSubmit = () => {
    if (!interviewForm.date || !interviewForm.time || !interviewForm.platform) {
      toast.error('Please fill in all required fields');
      return;
    }

    // In a real app, this would save to backend
    toast.success(`Interview scheduled with ${selectedCandidateForInterview?.name} on ${interviewForm.date} at ${interviewForm.time}`);
    
    // Reset form
    setInterviewForm({
      date: '',
      time: '',
      platform: '',
      notes: ''
    });
    setScheduleInterviewDialogOpen(false);
    setSelectedCandidateForInterview(null);
  };

  const handleApproveCandidate = (candidateId: number) => {
    toast.success('Candidate approved and moved to next stage');
  };

  const handleRejectCandidate = (candidateId: number) => {
    toast.success('Candidate rejected and notification sent');
  };

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
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".pdf,.doc,.docx,.txt"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                  <div className="border-2 border-dashed border-border rounded-lg p-4 text-center">
                    <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                    {uploadedFile ? (
                      <div className="space-y-2">
                        <p className="text-sm font-medium text-green-600">File uploaded successfully!</p>
                        <p className="text-xs text-muted-foreground">{uploadedFile.name}</p>
                        <div className="flex space-x-2 justify-center">
                          <Button variant="outline" size="sm" onClick={handleChooseFile}>
                            Change File
                          </Button>
                          <Button variant="outline" size="sm" onClick={handleRemoveFile}>
                            <X className="w-4 h-4 mr-1" />
                            Remove
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div>
                        <p className="text-sm text-muted-foreground">Upload JD file or paste content</p>
                        <p className="text-xs text-muted-foreground mt-1">Supports PDF, Word, and Text files (max 5MB)</p>
                        <Button variant="outline" size="sm" className="mt-2" onClick={handleChooseFile}>
                          Choose File
                        </Button>
                      </div>
                    )}
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
                          <p className="font-semibold">{score as number}/10</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex justify-between items-center">
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline" onClick={() => handleViewProfile(candidate)}>
                        <Eye className="w-4 h-4 mr-1" />
                        View Profile
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => handleViewResume(candidate)}>
                        Resume
                      </Button>
                    </div>
                    <div className="flex space-x-2">
                      <Button 
                        size="sm" 
                        variant={watchlist.includes(candidate.id) ? "default" : "outline"}
                        onClick={() => handleToggleWatchlist(candidate.id)}
                      >
                        <Heart className={`w-4 h-4 mr-1 ${watchlist.includes(candidate.id) ? 'fill-current' : ''}`} />
                        {watchlist.includes(candidate.id) ? 'Watchlisted' : 'Watchlist'}
                      </Button>
                      <Button 
                        size="sm"
                        variant={shortlisted.includes(candidate.id) ? "default" : "outline"}
                        onClick={() => handleToggleShortlist(candidate.id)}
                      >
                        <CheckCircle2 className="w-4 h-4 mr-1" />
                        {shortlisted.includes(candidate.id) ? 'Shortlisted' : 'Shortlist'}
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
                  <Label htmlFor="job-title">Job Title *</Label>
                  <Input 
                    id="job-title" 
                    placeholder="e.g., Senior React Developer" 
                    value={jobForm.title}
                    onChange={(e) => handleJobFormChange('title', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="job-type">Job Type *</Label>
                  <Select value={jobForm.type} onValueChange={(value) => handleJobFormChange('type', value)}>
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
                  <Label htmlFor="location">Location *</Label>
                  <Select value={jobForm.location} onValueChange={(value) => handleJobFormChange('location', value)}>
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
                  <Label htmlFor="salary">Salary Range *</Label>
                  <Input 
                    id="salary" 
                    placeholder="e.g., 15-20 LPA" 
                    value={jobForm.salary}
                    onChange={(e) => handleJobFormChange('salary', e.target.value)}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="skills">Required Skills</Label>
                <div className="flex space-x-2">
                  <Input 
                    id="skills" 
                    placeholder="Start typing skills..." 
                    value={skillInput}
                    onChange={(e) => setSkillInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleAddSkill()}
                  />
                  <Button type="button" onClick={handleAddSkill}>
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
                <div className="mt-2 flex flex-wrap gap-2">
                  {jobForm.skills.map((skill) => (
                    <Badge key={skill} variant="secondary" className="cursor-pointer" onClick={() => handleRemoveSkill(skill)}>
                      {skill} <X className="w-3 h-3 ml-1" />
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <Label htmlFor="description">Job Description *</Label>
                <Textarea
                  id="description"
                  placeholder="Detailed job description..."
                  rows={6}
                  value={jobForm.description}
                  onChange={(e) => handleJobFormChange('description', e.target.value)}
                />
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="batch">Batch/Year</Label>
                  <Input 
                    id="batch" 
                    placeholder="e.g., 2024" 
                    value={jobForm.batch}
                    onChange={(e) => handleJobFormChange('batch', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="degree">Degree</Label>
                  <Input 
                    id="degree" 
                    placeholder="e.g., B.Tech, M.Tech" 
                    value={jobForm.degree}
                    onChange={(e) => handleJobFormChange('degree', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="cgpa">Minimum CGPA</Label>
                  <Input 
                    id="cgpa" 
                    placeholder="e.g., 7.0" 
                    value={jobForm.cgpa}
                    onChange={(e) => handleJobFormChange('cgpa', e.target.value)}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="deadline">Application Deadline</Label>
                <Input 
                  id="deadline" 
                  type="date" 
                  value={jobForm.deadline}
                  onChange={(e) => handleJobFormChange('deadline', e.target.value)}
                />
              </div>

              <div>
                <Label>Tags</Label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {availableTags.map((tag) => (
                    <Badge 
                      key={tag} 
                      variant={jobForm.tags.includes(tag) ? "default" : "outline"}
                      className="cursor-pointer"
                      onClick={() => jobForm.tags.includes(tag) ? handleRemoveTag(tag) : handleAddTag(tag)}
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
                {jobForm.tags.length > 0 && (
                  <div className="mt-2">
                    <p className="text-sm text-muted-foreground">Selected tags:</p>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {jobForm.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="cursor-pointer" onClick={() => handleRemoveTag(tag)}>
                          {tag} <X className="w-3 h-3 ml-1" />
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <Button className="w-full" onClick={handlePostJob}>
                <FileText className="w-4 h-4 mr-2" />
                Post Job
              </Button>
            </CardContent>
          </Card>

          {/* Active Jobs */}
          <Card>
            <CardHeader>
              <CardTitle>Active Job Postings ({jobs.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {jobs.map((job) => (
                  <div key={job.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="font-semibold">{job.title}</h4>
                        <p className="text-sm text-muted-foreground">
                          {job.type} • {job.location} • {job.salary}
                        </p>
                        {job.deadline && (
                          <p className="text-sm text-muted-foreground">
                            Deadline: {job.deadline}
                          </p>
                        )}
                      </div>
                      <div className="text-right">
                        <Badge variant="secondary">{job.status}</Badge>
                        <p className="text-sm font-medium mt-1">{job.applicants} applicants</p>
                      </div>
                    </div>
                    
                    {job.skills && job.skills.length > 0 && (
                      <div className="mb-3">
                        <p className="text-sm font-medium mb-1">Required Skills:</p>
                        <div className="flex flex-wrap gap-1">
                          {job.skills.map((skill) => (
                            <Badge key={skill} variant="outline" className="text-xs">{skill}</Badge>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {job.tags && job.tags.length > 0 && (
                      <div className="mb-3">
                        <div className="flex flex-wrap gap-1">
                          {job.tags.map((tag) => (
                            <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="flex justify-between items-center">
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline" onClick={() => handleViewApplications(job)}>
                          <Eye className="w-4 h-4 mr-1" />
                          View Applications
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => handleEditJob(job)}>
                          <Edit className="w-4 h-4 mr-1" />
                          Edit
                        </Button>
                      </div>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        onClick={() => handleDeleteJob(job.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <X className="w-4 h-4 mr-1" />
                        Delete
                      </Button>
                    </div>
                  </div>
                ))}
                
                {jobs.length === 0 && (
                  <div className="text-center py-8">
                    <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">No job postings yet. Create your first job posting above.</p>
                  </div>
                )}
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
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => window.open(candidate.linkedin, '_blank')}
                              className="flex items-center space-x-1"
                            >
                              <Linkedin className="w-3 h-3 text-blue-600" />
                              <span className="text-xs">LinkedIn</span>
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => window.open(candidate.github, '_blank')}
                              className="flex items-center space-x-1"
                            >
                              <Github className="w-3 h-3 text-gray-800" />
                              <span className="text-xs">GitHub</span>
                            </Button>
                          </div>
                          <p className="text-sm">Expected: {candidate.expectedSalary}</p>
                          <p className="text-sm">Location: {candidate.location}</p>
                          <p className="text-sm">Experience: {candidate.experience}</p>
                        </div>
                      </div>

                      {/* Skills & Scores */}
                      <div>
                        <p className="text-sm font-medium mb-2">Quiz Scores</p>
                        {Object.entries(candidate.quizScores).map(([topic, score]) => (
                          <div key={topic} className="flex justify-between items-center mb-1">
                            <span className="text-sm capitalize">{topic}</span>
                            <Progress value={(score as number) * 10} className="w-16 h-2" />
                            <span className="text-sm font-medium">{score as number}/10</span>
                          </div>
                        ))}
                        <div className="mt-2">
                          <p className="text-sm font-medium">Skills:</p>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {candidate.skills.slice(0, 3).map((skill) => (
                              <Badge key={skill} variant="outline" className="text-xs">{skill}</Badge>
                            ))}
                            {candidate.skills.length > 3 && (
                              <Badge variant="outline" className="text-xs">+{candidate.skills.length - 3}</Badge>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="space-y-2">
                        <Button 
                          size="sm" 
                          className="w-full"
                          onClick={() => handleViewFullProfile(candidate)}
                        >
                          <Eye className="w-4 h-4 mr-2" />
                          View Full Profile
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="w-full"
                          onClick={() => handleScheduleInterview(candidate)}
                        >
                          <Calendar className="w-4 h-4 mr-2" />
                          Schedule Interview
                        </Button>
                        <div className="flex space-x-2">
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="flex-1 text-green-600 hover:text-green-700 hover:bg-green-50"
                            onClick={() => handleApproveCandidate(candidate.id)}
                            title="Approve Candidate"
                          >
                            <CheckCircle2 className="w-4 h-4" />
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="flex-1 text-red-600 hover:text-red-700 hover:bg-red-50"
                            onClick={() => handleRejectCandidate(candidate.id)}
                            title="Reject Candidate"
                          >
                            <X className="w-4 h-4" />
                          </Button>
                          <Button 
                            size="sm" 
                            variant={watchlist.includes(candidate.id) ? "default" : "outline"}
                            className="flex-1"
                            onClick={() => handleToggleWatchlist(candidate.id)}
                            title={watchlist.includes(candidate.id) ? "Remove from Watchlist" : "Add to Watchlist"}
                          >
                            <Heart className={`w-4 h-4 ${watchlist.includes(candidate.id) ? 'fill-current' : ''}`} />
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

      {/* Schedule Interview Dialog */}
      <Dialog open={scheduleInterviewDialogOpen} onOpenChange={setScheduleInterviewDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Schedule Interview</DialogTitle>
            <DialogDescription>
              Schedule an interview with {selectedCandidateForInterview?.name}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="interview-date">Date *</Label>
                <Input 
                  id="interview-date" 
                  type="date" 
                  value={interviewForm.date}
                  onChange={(e) => handleInterviewFormChange('date', e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>
              <div>
                <Label htmlFor="interview-time">Time *</Label>
                <Input 
                  id="interview-time" 
                  type="time" 
                  value={interviewForm.time}
                  onChange={(e) => handleInterviewFormChange('time', e.target.value)}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="interview-platform">Platform *</Label>
              <Select value={interviewForm.platform} onValueChange={(value) => handleInterviewFormChange('platform', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select platform" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="zoom">Zoom</SelectItem>
                  <SelectItem value="meet">Google Meet</SelectItem>
                  <SelectItem value="teams">MS Teams</SelectItem>
                  <SelectItem value="phone">Phone Call</SelectItem>
                  <SelectItem value="inperson">In Person</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="interview-notes">Notes (Optional)</Label>
              <Textarea 
                id="interview-notes" 
                placeholder="Add any notes or special instructions..."
                value={interviewForm.notes}
                onChange={(e) => handleInterviewFormChange('notes', e.target.value)}
                rows={3}
              />
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setScheduleInterviewDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleScheduleInterviewSubmit}>
                <Calendar className="w-4 h-4 mr-2" />
                Schedule Interview
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Applications Dialog */}
      <Dialog open={applicationsDialogOpen} onOpenChange={setApplicationsDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Applications - {selectedJob?.title}</DialogTitle>
            <DialogDescription>
              View and manage applications for this position
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                Total Applications: {mockApplications.length}
              </p>
              <div className="flex space-x-2">
                <Badge variant="outline">Under Review: 1</Badge>
                <Badge variant="outline">Shortlisted: 1</Badge>
                <Badge variant="outline">Applied: 1</Badge>
              </div>
            </div>
            
            <div className="space-y-4">
              {mockApplications.map((application) => (
                <div key={application.id} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="font-semibold">{application.name}</h4>
                      <p className="text-sm text-muted-foreground">{application.email}</p>
                      <p className="text-sm text-muted-foreground">Applied: {application.appliedDate}</p>
                      <p className="text-sm text-muted-foreground">Experience: {application.experience}</p>
                      <p className="text-sm text-muted-foreground">Expected: {application.expectedSalary}</p>
                    </div>
                    <div className="text-right">
                      <Badge 
                        variant={
                          application.status === 'Shortlisted' ? 'default' :
                          application.status === 'Under Review' ? 'secondary' : 'outline'
                        }
                      >
                        {application.status}
                      </Badge>
                    </div>
                  </div>

                  <div className="mb-3">
                    <p className="text-sm font-medium mb-1">Skills:</p>
                    <div className="flex flex-wrap gap-1">
                      {application.skills.map((skill) => (
                        <Badge key={skill} variant="outline" className="text-xs">{skill}</Badge>
                      ))}
                    </div>
                  </div>

                  <div className="mb-3">
                    <p className="text-sm font-medium mb-1">Cover Letter:</p>
                    <p className="text-sm text-muted-foreground">{application.coverLetter}</p>
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline">
                        <Eye className="w-4 h-4 mr-1" />
                        View Resume
                      </Button>
                      <Button size="sm" variant="outline">
                        <Calendar className="w-4 h-4 mr-1" />
                        Schedule Interview
                      </Button>
                    </div>
                    <div className="flex space-x-2">
                      <Select 
                        defaultValue={application.status}
                        onValueChange={(value) => handleApplicationStatusChange(application.id, value)}
                      >
                        <SelectTrigger className="w-32">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Applied">Applied</SelectItem>
                          <SelectItem value="Under Review">Under Review</SelectItem>
                          <SelectItem value="Shortlisted">Shortlisted</SelectItem>
                          <SelectItem value="Interviewed">Interviewed</SelectItem>
                          <SelectItem value="Rejected">Rejected</SelectItem>
                          <SelectItem value="Hired">Hired</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Edit Job Dialog */}
      <Dialog open={editJobDialogOpen} onOpenChange={setEditJobDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Job Posting</DialogTitle>
            <DialogDescription>
              Update the job posting details
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="edit-job-title">Job Title *</Label>
                <Input 
                  id="edit-job-title" 
                  placeholder="e.g., Senior React Developer" 
                  value={jobForm.title}
                  onChange={(e) => handleJobFormChange('title', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="edit-job-type">Job Type *</Label>
                <Select value={jobForm.type} onValueChange={(value) => handleJobFormChange('type', value)}>
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
                <Label htmlFor="edit-location">Location *</Label>
                <Select value={jobForm.location} onValueChange={(value) => handleJobFormChange('location', value)}>
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
                <Label htmlFor="edit-salary">Salary Range *</Label>
                <Input 
                  id="edit-salary" 
                  placeholder="e.g., 15-20 LPA" 
                  value={jobForm.salary}
                  onChange={(e) => handleJobFormChange('salary', e.target.value)}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="edit-skills">Required Skills</Label>
              <div className="flex space-x-2">
                <Input 
                  id="edit-skills" 
                  placeholder="Start typing skills..." 
                  value={skillInput}
                  onChange={(e) => setSkillInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleAddSkill()}
                />
                <Button type="button" onClick={handleAddSkill}>
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              <div className="mt-2 flex flex-wrap gap-2">
                {jobForm.skills.map((skill) => (
                  <Badge key={skill} variant="secondary" className="cursor-pointer" onClick={() => handleRemoveSkill(skill)}>
                    {skill} <X className="w-3 h-3 ml-1" />
                  </Badge>
                ))}
              </div>
            </div>

            <div>
              <Label htmlFor="edit-description">Job Description *</Label>
              <Textarea
                id="edit-description"
                placeholder="Detailed job description..."
                rows={6}
                value={jobForm.description}
                onChange={(e) => handleJobFormChange('description', e.target.value)}
              />
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="edit-batch">Batch/Year</Label>
                <Input 
                  id="edit-batch" 
                  placeholder="e.g., 2024" 
                  value={jobForm.batch}
                  onChange={(e) => handleJobFormChange('batch', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="edit-degree">Degree</Label>
                <Input 
                  id="edit-degree" 
                  placeholder="e.g., B.Tech, M.Tech" 
                  value={jobForm.degree}
                  onChange={(e) => handleJobFormChange('degree', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="edit-cgpa">Minimum CGPA</Label>
                <Input 
                  id="edit-cgpa" 
                  placeholder="e.g., 7.0" 
                  value={jobForm.cgpa}
                  onChange={(e) => handleJobFormChange('cgpa', e.target.value)}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="edit-deadline">Application Deadline</Label>
              <Input 
                id="edit-deadline" 
                type="date" 
                value={jobForm.deadline}
                onChange={(e) => handleJobFormChange('deadline', e.target.value)}
              />
            </div>

            <div>
              <Label>Tags</Label>
              <div className="flex flex-wrap gap-2 mt-2">
                {availableTags.map((tag) => (
                  <Badge 
                    key={tag} 
                    variant={jobForm.tags.includes(tag) ? "default" : "outline"}
                    className="cursor-pointer"
                    onClick={() => jobForm.tags.includes(tag) ? handleRemoveTag(tag) : handleAddTag(tag)}
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setEditJobDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleUpdateJob}>
                <Save className="w-4 h-4 mr-2" />
                Update Job
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Profile Dialog */}
      <Dialog open={profileDialogOpen} onOpenChange={setProfileDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Candidate Profile</DialogTitle>
            <DialogDescription>
              Detailed profile information for {selectedCandidate?.name}
            </DialogDescription>
          </DialogHeader>
          {selectedCandidate && (
            <div className="space-y-6">
              {/* Basic Information */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold mb-2">Personal Information</h4>
                  <div className="space-y-2 text-sm">
                    <p><strong>Name:</strong> {selectedCandidate.name}</p>
                    <p><strong>Email:</strong> {selectedCandidate.email}</p>
                    <p><strong>Location:</strong> {selectedCandidate.location}</p>
                    <p><strong>Availability:</strong> {selectedCandidate.availability}</p>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Education</h4>
                  <div className="space-y-2 text-sm">
                    <p><strong>College:</strong> {selectedCandidate.college}</p>
                    <p><strong>CGPA:</strong> {selectedCandidate.cgpa}</p>
                    <p><strong>Experience:</strong> {selectedCandidate.experience}</p>
                    <p><strong>Expected Salary:</strong> {selectedCandidate.expectedSalary}</p>
                  </div>
                </div>
              </div>

              {/* Skills */}
              <div>
                <h4 className="font-semibold mb-2">Skills & Technologies</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedCandidate.skills.map((skill: string) => (
                    <Badge key={skill} variant="secondary">{skill}</Badge>
                  ))}
                </div>
              </div>

              {/* Quiz Scores */}
              <div>
                <h4 className="font-semibold mb-2">Quiz Performance</h4>
                <div className="grid grid-cols-3 gap-4">
                  {Object.entries(selectedCandidate.quizScores).map(([topic, score]) => (
                    <div key={topic} className="text-center p-3 border rounded">
                      <p className="text-sm text-muted-foreground capitalize">{topic}</p>
                      <p className="text-2xl font-bold">{score as number}/10</p>
                      <Progress value={(score as number) * 10} className="mt-2" />
                    </div>
                  ))}
                </div>
              </div>

              {/* AI Pitch */}
              <div>
                <h4 className="font-semibold mb-2">AI Assessment</h4>
                <div className="bg-blue-50 dark:bg-blue-950/30 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
                  <p className="text-sm text-blue-900 dark:text-blue-100">{selectedCandidate.aiPitch}</p>
                  <div className="mt-2">
                    <span className="text-sm font-medium text-blue-800 dark:text-blue-200">Overall Score: </span>
                    <span className="text-lg font-bold text-green-600 dark:text-green-400">{selectedCandidate.overallScore}/10</span>
                  </div>
                </div>
              </div>

              {/* Links */}
              <div>
                <h4 className="font-semibold mb-2">Professional Links</h4>
                <div className="flex space-x-4">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => window.open(selectedCandidate.linkedin, '_blank')}
                    className="flex items-center space-x-2"
                  >
                    <Linkedin className="w-4 h-4 text-blue-600" />
                    <span>LinkedIn</span>
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => window.open(selectedCandidate.github, '_blank')}
                    className="flex items-center space-x-2"
                  >
                    <Github className="w-4 h-4 text-gray-800" />
                    <span>GitHub</span>
                  </Button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Resume Dialog */}
      <Dialog open={resumeDialogOpen} onOpenChange={setResumeDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh]">
          <DialogHeader>
            <DialogTitle>Resume - {selectedCandidate?.name}</DialogTitle>
            <DialogDescription>
              Candidate resume and portfolio
            </DialogDescription>
          </DialogHeader>
          {selectedCandidate && (
            <div className="space-y-4">
              <div className="bg-gray-100 p-4 rounded-lg text-center">
                <FileText className="w-12 h-12 mx-auto mb-2 text-gray-500" />
                <p className="text-sm text-gray-600 mb-4">Resume preview would be displayed here</p>
                <div className="flex justify-center space-x-2">
                  <Button variant="outline" size="sm">
                    Download PDF
                  </Button>
                  <Button variant="outline" size="sm">
                    View Full Screen
                  </Button>
                </div>
              </div>
              
              {/* Resume Summary */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold mb-2">Key Highlights</h4>
                  <ul className="text-sm space-y-1 list-disc list-inside">
                    <li>{selectedCandidate.experience} of relevant experience</li>
                    <li>Strong background in {selectedCandidate.skills.slice(0, 2).join(', ')}</li>
                    <li>Graduated from {selectedCandidate.college}</li>
                    <li>Available for {selectedCandidate.availability}</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Contact Information</h4>
                  <div className="text-sm space-y-1">
                    <p>{selectedCandidate.email}</p>
                    <p>{selectedCandidate.location}</p>
                    <p>Expected: {selectedCandidate.expectedSalary}</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default RecruiterPanel;
