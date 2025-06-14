import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { toast } from '@/components/ui/sonner';
import { 
  Search, 
  Briefcase, 
  User, 
  Calendar, 
  BarChart3, 
  TrendingUp, 
  MapPin, 
  DollarSign, 
  Clock, 
  Building,
  Star,
  Eye,
  Heart,
  CheckCircle,
  XCircle,
  FileText,
  Upload,
  Plus,
  Code,
  Trash2,
  Save,
  ExternalLink,
  Edit,
  X,
  Mail,
  Phone,
  Check
} from 'lucide-react';

const StudentPanel = () => {
  const [activeTab, setActiveTab] = useState('job-discovery');
  const [savedJobs, setSavedJobs] = useState<number[]>([]);
  const [appliedJobs, setAppliedJobs] = useState<number[]>([]);
  
  // Projects Portfolio State (moved from UserProfile)
  const [projects, setProjects] = useState([
    {
      id: 1,
      name: 'E-commerce Website',
      techStack: ['React', 'Node.js', 'MongoDB', 'Express'],
      description: 'A full-stack e-commerce platform with user authentication, product catalog, shopping cart, and payment integration.',
      projectLink: 'https://github.com/johndoe/ecommerce-app',
      liveLink: 'https://ecommerce-demo.netlify.app'
    },
    {
      id: 2,
      name: 'Task Management App',
      techStack: ['Vue.js', 'Firebase', 'Tailwind CSS'],
      description: 'A collaborative task management application with real-time updates, drag-and-drop functionality, and team collaboration features.',
      projectLink: 'https://github.com/johndoe/task-manager',
      liveLink: 'https://taskmanager-demo.vercel.app'
    }
  ]);

  const [showAddProject, setShowAddProject] = useState(false);
  const [newProject, setNewProject] = useState({
    name: '',
    techStack: '',
    description: '',
    projectLink: '',
    liveLink: ''
  });

  // Profile & Resume State
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [uploadedResume, setUploadedResume] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [profileData, setProfileData] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    contact: '+1 (555) 123-4567',
    organization: 'Tech Solutions Inc.',
    linkedinUrl: 'https://linkedin.com/in/johndoe',
    githubUrl: 'https://github.com/johndoe',
    leetcodeUrl: 'https://leetcode.com/johndoe',
    codechefUrl: 'https://codechef.com/users/johndoe',
    codeforcesUrl: 'https://codeforces.com/profile/johndoe',
    profilePhoto: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
  });

  // Mock data for jobs
  const jobListings = [
    {
      id: 1,
      title: 'Frontend Developer',
      company: 'TechCorp Solutions',
      location: 'San Francisco, CA',
      salary: '$80,000 - $120,000',
      type: 'Full-time',
      posted: '2 days ago',
      skills: ['React', 'TypeScript', 'Tailwind CSS'],
      description: 'We are looking for a passionate Frontend Developer to join our growing team...',
      requirements: ['3+ years experience with React', 'Strong TypeScript skills', 'Experience with modern CSS frameworks']
    },
    {
      id: 2,
      title: 'Full Stack Engineer',
      company: 'StartupXYZ',
      location: 'New York, NY',
      salary: '$90,000 - $140,000',
      type: 'Full-time',
      posted: '1 week ago',
      skills: ['Node.js', 'React', 'PostgreSQL'],
      description: 'Join our innovative startup as a Full Stack Engineer and help build the future...',
      requirements: ['5+ years full-stack experience', 'Node.js and React expertise', 'Database design experience']
    },
    {
      id: 3,
      title: 'Software Developer Intern',
      company: 'Big Tech Inc',
      location: 'Seattle, WA',
      salary: '$25 - $35/hour',
      type: 'Internship',
      posted: '3 days ago',
      skills: ['Python', 'JavaScript', 'Git'],
      description: 'Summer internship opportunity for students passionate about software development...',
      requirements: ['Currently pursuing CS degree', 'Strong programming fundamentals', 'Eagerness to learn']
    }
  ];

  const applications = [
    {
      id: 1,
      jobTitle: 'Frontend Developer',
      company: 'TechCorp Solutions',
      appliedDate: '2024-01-15',
      status: 'Interview Scheduled',
      nextStep: 'Technical Interview on Jan 25, 2024'
    },
    {
      id: 2,
      jobTitle: 'Full Stack Engineer',
      company: 'StartupXYZ',
      appliedDate: '2024-01-10',
      status: 'Under Review',
      nextStep: 'Waiting for response'
    },
    {
      id: 3,
      jobTitle: 'Software Developer Intern',
      company: 'Big Tech Inc',
      appliedDate: '2024-01-08',
      status: 'Rejected',
      nextStep: 'Application unsuccessful'
    }
  ];

  const interviews = [
    {
      id: 1,
      company: 'TechCorp Solutions',
      position: 'Frontend Developer',
      date: '2024-01-25',
      time: '2:00 PM',
      type: 'Technical Interview',
      interviewer: 'Sarah Johnson',
      location: 'Video Call'
    },
    {
      id: 2,
      company: 'InnovateLab',
      position: 'React Developer',
      date: '2024-01-28',
      time: '10:00 AM',
      type: 'System Design',
      interviewer: 'Mike Chen',
      location: 'On-site'
    }
  ];

  const handleSaveJob = (jobId: number) => {
    setSavedJobs(prev => prev.includes(jobId) ? prev.filter(id => id !== jobId) : [...prev, jobId]);
    toast.success(savedJobs.includes(jobId) ? 'Job removed from saved list' : 'Job saved successfully!');
  };

  const handleApplyJob = (jobId: number) => {
    setAppliedJobs(prev => [...prev, jobId]);
    toast.success('Application submitted successfully!');
  };

  // Project Management Functions
  const handleAddProject = () => {
    if (!newProject.name || !newProject.techStack || !newProject.description || !newProject.projectLink) {
      toast.error('Please fill in all required fields.');
      return;
    }

    const techStackArray = newProject.techStack.split(',').map(tech => tech.trim()).filter(tech => tech);
    
    const project = {
      id: Date.now(),
      name: newProject.name,
      techStack: techStackArray,
      description: newProject.description,
      projectLink: newProject.projectLink,
      liveLink: newProject.liveLink || undefined
    };

    setProjects(prev => [...prev, project]);
    setNewProject({
      name: '',
      techStack: '',
      description: '',
      projectLink: '',
      liveLink: ''
    });
    setShowAddProject(false);
    toast.success('Project added successfully!');
  };

  const handleDeleteProject = (projectId: number) => {
    setProjects(prev => prev.filter(project => project.id !== projectId));
    toast.success('Project deleted successfully!');
  };

  // Profile Management Functions
  const handleSaveProfile = () => {
    setIsEditingProfile(false);
    toast.success('Profile updated successfully!');
  };

  const handleCancelProfileEdit = () => {
    setIsEditingProfile(false);
  };

  const handleInputChange = (field: string, value: string) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const allowedTypes = ['.pdf', '.doc', '.docx'];
    const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase();
    
    if (!allowedTypes.includes(fileExtension)) {
      toast.error('Invalid file type. Please upload PDF, DOC, or DOCX files only.');
      return;
    }

    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      toast.error('File size too large. Please upload a file smaller than 5MB.');
      return;
    }

    setUploadedResume(file);
    
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    
    toast.success('Resume uploaded successfully!');
  };

  const handleRemoveResume = () => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    setUploadedResume(null);
    setPreviewUrl(null);
    toast.success('Resume removed successfully!');
  };

  const handleSubmitToServer = async () => {
    if (!uploadedResume) {
      toast.error('No file selected to submit.');
      return;
    }

    toast.success('Resume submitted to server successfully!');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Interview Scheduled':
        return 'bg-blue-100 text-blue-800';
      case 'Under Review':
        return 'bg-yellow-100 text-yellow-800';
      case 'Rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-500 bg-clip-text text-transparent">
          Student / Aspirant Panel
        </h1>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="job-discovery">Job Discovery</TabsTrigger>
          <TabsTrigger value="application-tracker">Application Tracker</TabsTrigger>
          <TabsTrigger value="profile-resume">Profile & Resume</TabsTrigger>
          <TabsTrigger value="interview-prep">Interview Prep</TabsTrigger>
          <TabsTrigger value="career-insights">Career Insights</TabsTrigger>
        </TabsList>

        {/* Job Discovery Tab */}
        <TabsContent value="job-discovery" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Search className="w-5 h-5" />
                <span>AI-Powered Job Discovery</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Input placeholder="Job title or keywords" />
                  <Input placeholder="Location" />
                  <Button className="flex items-center space-x-2">
                    <Search className="w-4 h-4" />
                    <span>Search Jobs</span>
                  </Button>
                </div>

                <div className="space-y-4">
                  {jobListings.map((job) => (
                    <Card key={job.id} className="border border-border">
                      <CardContent className="p-6">
                        <div className="flex justify-between items-start mb-4">
                          <div className="flex-1">
                            <h3 className="text-xl font-semibold mb-2">{job.title}</h3>
                            <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-3">
                              <div className="flex items-center space-x-1">
                                <Building className="w-4 h-4" />
                                <span>{job.company}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <MapPin className="w-4 h-4" />
                                <span>{job.location}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <DollarSign className="w-4 h-4" />
                                <span>{job.salary}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Clock className="w-4 h-4" />
                                <span>{job.posted}</span>
                              </div>
                            </div>
                            <div className="flex flex-wrap gap-2 mb-3">
                              {job.skills.map((skill, index) => (
                                <Badge key={index} variant="secondary">{skill}</Badge>
                              ))}
                            </div>
                            <p className="text-muted-foreground mb-3">{job.description}</p>
                          </div>
                          <div className="flex space-x-2 ml-4">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleSaveJob(job.id)}
                              className={savedJobs.includes(job.id) ? 'bg-red-50 text-red-600' : ''}
                            >
                              <Heart className={`w-4 h-4 ${savedJobs.includes(job.id) ? 'fill-current' : ''}`} />
                            </Button>
                            <Button
                              size="sm"
                              onClick={() => handleApplyJob(job.id)}
                              disabled={appliedJobs.includes(job.id)}
                              className="flex items-center space-x-2"
                            >
                              {appliedJobs.includes(job.id) ? <CheckCircle className="w-4 h-4" /> : <Briefcase className="w-4 h-4" />}
                              <span>{appliedJobs.includes(job.id) ? 'Applied' : 'Apply'}</span>
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Application Tracker Tab */}
        <TabsContent value="application-tracker" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Briefcase className="w-5 h-5" />
                <span>Application Tracker</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {applications.map((app) => (
                  <Card key={app.id} className="border border-border">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h4 className="font-semibold text-lg">{app.jobTitle}</h4>
                          <p className="text-muted-foreground">{app.company}</p>
                          <p className="text-sm text-muted-foreground">Applied: {new Date(app.appliedDate).toLocaleDateString()}</p>
                          <p className="text-sm mt-2">{app.nextStep}</p>
                        </div>
                        <Badge className={getStatusColor(app.status)}>
                          {app.status}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Profile & Resume Tab - Enhanced with Projects Portfolio */}
        <TabsContent value="profile-resume" className="space-y-6">
          {/* Profile Information */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center space-x-2">
                  <User className="w-5 h-5" />
                  <span>Profile Information</span>
                </CardTitle>
                <Button
                  variant={isEditingProfile ? "destructive" : "outline"}
                  size="sm"
                  onClick={isEditingProfile ? handleCancelProfileEdit : () => setIsEditingProfile(true)}
                  className="flex items-center space-x-2"
                >
                  {isEditingProfile ? <X className="w-4 h-4" /> : <Edit className="w-4 h-4" />}
                  <span>{isEditingProfile ? 'Cancel' : 'Edit Profile'}</span>
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6">
                <div className="relative">
                  <Avatar className="w-24 h-24">
                    <AvatarImage src={profileData.profilePhoto} alt="Profile" />
                    <AvatarFallback>{profileData.firstName[0]}{profileData.lastName[0]}</AvatarFallback>
                  </Avatar>
                  {isEditingProfile && (
                    <Button
                      size="sm"
                      variant="outline"
                      className="absolute -bottom-2 -right-2 rounded-full w-8 h-8 p-0"
                    >
                      <Upload className="w-4 h-4" />
                    </Button>
                  )}
                </div>
                
                <div className="flex-1 space-y-4 w-full">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">First Name</Label>
                      {isEditingProfile ? (
                        <Input
                          id="firstName"
                          value={profileData.firstName}
                          onChange={(e) => handleInputChange('firstName', e.target.value)}
                        />
                      ) : (
                        <p className="text-lg font-semibold">{profileData.firstName}</p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name</Label>
                      {isEditingProfile ? (
                        <Input
                          id="lastName"
                          value={profileData.lastName}
                          onChange={(e) => handleInputChange('lastName', e.target.value)}
                        />
                      ) : (
                        <p className="text-lg font-semibold">{profileData.lastName}</p>
                      )}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="email" className="flex items-center space-x-1">
                        <Mail className="w-4 h-4" />
                        <span>Email</span>
                      </Label>
                      {isEditingProfile ? (
                        <Input
                          id="email"
                          type="email"
                          value={profileData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                        />
                      ) : (
                        <p>{profileData.email}</p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="contact" className="flex items-center space-x-1">
                        <Phone className="w-4 h-4" />
                        <span>Contact</span>
                      </Label>
                      {isEditingProfile ? (
                        <Input
                          id="contact"
                          value={profileData.contact}
                          onChange={(e) => handleInputChange('contact', e.target.value)}
                        />
                      ) : (
                        <p>{profileData.contact}</p>
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="organization" className="flex items-center space-x-1">
                      <Building className="w-4 h-4" />
                      <span>Organization</span>
                    </Label>
                    {isEditingProfile ? (
                      <Input
                        id="organization"
                        value={profileData.organization}
                        onChange={(e) => handleInputChange('organization', e.target.value)}
                      />
                    ) : (
                      <p>{profileData.organization}</p>
                    )}
                  </div>
                </div>
              </div>

              {isEditingProfile && (
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={handleCancelProfileEdit}>
                    Cancel
                  </Button>
                  <Button onClick={handleSaveProfile} className="flex items-center space-x-2">
                    <Save className="w-4 h-4" />
                    <span>Save Changes</span>
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Social Media & Resume */}
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Social Media Profiles</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { label: 'LinkedIn', key: 'linkedinUrl', icon: ExternalLink },
                  { label: 'GitHub', key: 'githubUrl', icon: ExternalLink },
                  { label: 'LeetCode', key: 'leetcodeUrl', icon: ExternalLink },
                  { label: 'CodeChef', key: 'codechefUrl', icon: ExternalLink },
                  { label: 'Codeforces', key: 'codeforcesUrl', icon: ExternalLink }
                ].map((social) => (
                  <div key={social.key}>
                    <Label htmlFor={social.key} className="flex items-center space-x-1">
                      <social.icon className="w-4 h-4" />
                      <span>{social.label}</span>
                    </Label>
                    {isEditingProfile ? (
                      <Input
                        id={social.key}
                        value={profileData[social.key as keyof typeof profileData]}
                        onChange={(e) => handleInputChange(social.key, e.target.value)}
                        placeholder={`Your ${social.label} URL`}
                      />
                    ) : (
                      <a 
                        href={profileData[social.key as keyof typeof profileData]} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-primary hover:underline flex items-center space-x-1"
                      >
                        <span>{profileData[social.key as keyof typeof profileData] || 'Not provided'}</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Resume & Documents</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {uploadedResume ? (
                  <div className="border border-green-200 rounded-lg p-4 bg-green-50">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <FileText className="w-5 h-5 text-green-600" />
                        <div>
                          <p className="font-medium text-green-800">{uploadedResume.name}</p>
                          <p className="text-sm text-green-600">
                            {(uploadedResume.size / (1024 * 1024)).toFixed(2)} MB
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Check className="w-5 h-5 text-green-600" />
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                            >
                              <Eye className="w-4 h-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-5xl w-[90vw] h-[85vh] flex flex-col">
                            <DialogHeader className="flex-shrink-0">
                              <DialogTitle className="text-center">Document Preview - {uploadedResume.name}</DialogTitle>
                            </DialogHeader>
                            <div className="flex-1 flex items-center justify-center overflow-hidden">
                              {uploadedResume.type === 'application/pdf' && previewUrl ? (
                                <iframe
                                  src={previewUrl}
                                  className="w-full h-full border-0 rounded-lg"
                                  title="Document Preview"
                                />
                              ) : (
                                <div className="text-center py-12">
                                  <FileText className="w-20 h-20 mx-auto mb-6 text-gray-400" />
                                  <h3 className="text-lg font-semibold text-gray-700 mb-2">
                                    Preview not available for {uploadedResume.type.split('/')[1].toUpperCase()} files
                                  </h3>
                                  <p className="text-gray-600 mb-4">
                                    File: {uploadedResume.name}
                                  </p>
                                  <p className="text-sm text-gray-500 mb-6">
                                    Size: {(uploadedResume.size / (1024 * 1024)).toFixed(2)} MB
                                  </p>
                                  <Button
                                    onClick={() => {
                                      const link = document.createElement('a');
                                      link.href = previewUrl || '';
                                      link.download = uploadedResume.name;
                                      link.click();
                                    }}
                                    className="flex items-center space-x-2"
                                  >
                                    <Upload className="w-4 h-4" />
                                    <span>Download to View</span>
                                  </Button>
                                </div>
                              )}
                            </div>
                          </DialogContent>
                        </Dialog>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={handleRemoveResume}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="mt-4 flex justify-end space-x-2">
                      <Button
                        onClick={handleSubmitToServer}
                        className="flex items-center space-x-2"
                      >
                        <Upload className="w-4 h-4" />
                        <span>Submit to Server</span>
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                    <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground mb-2">Upload your resume</p>
                    <input
                      type="file"
                      id="resume-upload"
                      accept=".pdf,.doc,.docx"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => document.getElementById('resume-upload')?.click()}
                    >
                      Choose File
                    </Button>
                  </div>
                )}
                <div className="text-sm text-muted-foreground">
                  <p>Supported formats: PDF, DOC, DOCX (Max 5MB)</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Projects Portfolio - Moved from UserProfile */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center space-x-2">
                  <Code className="w-5 h-5" />
                  <span>Projects Portfolio</span>
                </CardTitle>
                <Button
                  onClick={() => setShowAddProject(true)}
                  className="flex items-center space-x-2"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Project</span>
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {projects.map((project) => (
                  <div key={project.id} className="border border-border rounded-lg p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1">
                        <h4 className="text-xl font-semibold mb-2">{project.name}</h4>
                        <div className="flex flex-wrap gap-2 mb-3">
                          {project.techStack.map((tech, index) => (
                            <Badge key={index} variant="secondary">
                              {tech}
                            </Badge>
                          ))}
                        </div>
                        <p className="text-muted-foreground mb-4">{project.description}</p>
                        <div className="flex flex-wrap gap-3">
                          <a
                            href={project.projectLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary hover:underline flex items-center space-x-1"
                          >
                            <ExternalLink className="w-4 h-4" />
                            <span>View Code</span>
                          </a>
                          {project.liveLink && (
                            <a
                              href={project.liveLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-primary hover:underline flex items-center space-x-1"
                            >
                              <Eye className="w-4 h-4" />
                              <span>Live Demo</span>
                            </a>
                          )}
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteProject(project.id)}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}

                {projects.length === 0 && (
                  <div className="text-center py-12">
                    <Code className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                    <h3 className="text-lg font-semibold mb-2">No Projects Yet</h3>
                    <p className="text-muted-foreground mb-4">Start building your portfolio by adding your first project.</p>
                    <Button onClick={() => setShowAddProject(true)} className="flex items-center space-x-2">
                      <Plus className="w-4 h-4" />
                      <span>Add Your First Project</span>
                    </Button>
                  </div>
                )}
              </div>

              {/* Add Project Form */}
              {showAddProject && (
                <div className="mt-6 border border-border rounded-lg p-6 bg-muted/50">
                  <h3 className="text-lg font-semibold mb-4">Add New Project</h3>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="projectName">Project Name *</Label>
                      <Input
                        id="projectName"
                        value={newProject.name}
                        onChange={(e) => setNewProject(prev => ({ ...prev, name: e.target.value }))}
                        placeholder="Enter project name"
                      />
                    </div>
                    <div>
                      <Label htmlFor="techStack">Technologies Used *</Label>
                      <Input
                        id="techStack"
                        value={newProject.techStack}
                        onChange={(e) => setNewProject(prev => ({ ...prev, techStack: e.target.value }))}
                        placeholder="React, Node.js, MongoDB (comma separated)"
                      />
                    </div>
                    <div>
                      <Label htmlFor="projectDescription">Project Description *</Label>
                      <Textarea
                        id="projectDescription"
                        value={newProject.description}
                        onChange={(e) => setNewProject(prev => ({ ...prev, description: e.target.value }))}
                        placeholder="Describe your project, its features, and what you learned..."
                        rows={4}
                      />
                    </div>
                    <div>
                      <Label htmlFor="projectLink">GitHub/Project Link *</Label>
                      <Input
                        id="projectLink"
                        value={newProject.projectLink}
                        onChange={(e) => setNewProject(prev => ({ ...prev, projectLink: e.target.value }))}
                        placeholder="https://github.com/username/project"
                      />
                    </div>
                    <div>
                      <Label htmlFor="liveLink">Live Demo Link (Optional)</Label>
                      <Input
                        id="liveLink"
                        value={newProject.liveLink}
                        onChange={(e) => setNewProject(prev => ({ ...prev, liveLink: e.target.value }))}
                        placeholder="https://yourproject.netlify.app"
                      />
                    </div>
                    <div className="flex justify-end space-x-2">
                      <Button
                        variant="outline"
                        onClick={() => {
                          setShowAddProject(false);
                          setNewProject({
                            name: '',
                            techStack: '',
                            description: '',
                            projectLink: '',
                            liveLink: ''
                          });
                        }}
                      >
                        Cancel
                      </Button>
                      <Button onClick={handleAddProject} className="flex items-center space-x-2">
                        <Save className="w-4 h-4" />
                        <span>Add Project</span>
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Interview Prep Tab */}
        <TabsContent value="interview-prep" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Calendar className="w-5 h-5" />
                <span>Interview Preparation</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="border border-border">
                    <CardHeader>
                      <CardTitle className="text-lg">Upcoming Interviews</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {interviews.map((interview) => (
                          <div key={interview.id} className="border border-border rounded-lg p-4">
                            <h4 className="font-semibold">{interview.position}</h4>
                            <p className="text-muted-foreground">{interview.company}</p>
                            <div className="text-sm text-muted-foreground mt-2">
                              <p>📅 {new Date(interview.date).toLocaleDateString()}</p>
                              <p>🕐 {interview.time}</p>
                              <p>📍 {interview.location}</p>
                              <p>👤 {interview.interviewer}</p>
                            </div>
                            <Badge variant="outline" className="mt-2">
                              {interview.type}
                            </Badge>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border border-border">
                    <CardHeader>
                      <CardTitle className="text-lg">Practice Resources</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <Button variant="outline" className="w-full justify-start">
                          Technical Questions
                        </Button>
                        <Button variant="outline" className="w-full justify-start">
                          System Design
                        </Button>
                        <Button variant="outline" className="w-full justify-start">
                          Behavioral Questions
                        </Button>
                        <Button variant="outline" className="w-full justify-start">
                          Coding Challenges
                        </Button>
                        <Button variant="outline" className="w-full justify-start">
                          Mock Interviews
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Career Insights Tab */}
        <TabsContent value="career-insights" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BarChart3 className="w-5 h-5" />
                <span>Career Insights & Analytics</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <Card className="border border-border">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-2">
                      <TrendingUp className="w-8 h-8 text-green-600" />
                      <div>
                        <p className="text-2xl font-bold">12</p>
                        <p className="text-sm text-muted-foreground">Applications Sent</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border border-border">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-8 h-8 text-blue-600" />
                      <div>
                        <p className="text-2xl font-bold">3</p>
                        <p className="text-sm text-muted-foreground">Interviews Scheduled</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border border-border">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-2">
                      <Star className="w-8 h-8 text-yellow-600" />
                      <div>
                        <p className="text-2xl font-bold">8</p>
                        <p className="text-sm text-muted-foreground">Jobs Saved</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border border-border">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-2">
                      <TrendingUp className="w-8 h-8 text-purple-600" />
                      <div>
                        <p className="text-2xl font-bold">25%</p>
                        <p className="text-sm text-muted-foreground">Response Rate</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="border border-border">
                  <CardHeader>
                    <CardTitle className="text-lg">Application Status</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span>Applied</span>
                        <div className="flex items-center space-x-2">
                          <Progress value={60} className="w-24" />
                          <span className="text-sm">60%</span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Under Review</span>
                        <div className="flex items-center space-x-2">
                          <Progress value={25} className="w-24" />
                          <span className="text-sm">25%</span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Interview</span>
                        <div className="flex items-center space-x-2">
                          <Progress value={10} className="w-24" />
                          <span className="text-sm">10%</span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Rejected</span>
                        <div className="flex items-center space-x-2">
                          <Progress value={5} className="w-24" />
                          <span className="text-sm">5%</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border border-border">
                  <CardHeader>
                    <CardTitle className="text-lg">Top Skills in Demand</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {['React', 'JavaScript', 'Python', 'Node.js', 'TypeScript'].map((skill, index) => (
                        <div key={skill} className="flex justify-between items-center">
                          <span>{skill}</span>
                          <Badge variant="secondary">{95 - index * 5}%</Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default StudentPanel;
