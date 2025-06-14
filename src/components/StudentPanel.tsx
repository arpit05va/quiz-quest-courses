import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Users, 
  Search, 
  FileText, 
  MoreHorizontal, 
  BookOpen, 
  GraduationCap, 
  Award, 
  Clock, 
  Calendar, 
  CheckCircle, 
  XCircle, 
  AlertCircle, 
  BarChart, 
  PieChart, 
  TrendingUp, 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Briefcase, 
  Plus
} from 'lucide-react';

interface Student {
  id: number;
  name: string;
  email: string;
  avatar: string;
  status: 'Active' | 'Inactive' | 'Graduated';
  coursesEnrolled: number;
  overallProgress: number;
  joinDate: string;
  lastActive: string;
  location: string;
  phone: string;
  interests: string[];
  skills: string[];
}

const StudentPanel = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [activeTab, setActiveTab] = useState('overview');
  const [showAddProjectDialog, setShowAddProjectDialog] = useState(false);
  const [showAddCourseDialog, setShowAddCourseDialog] = useState(false);
  const [showAddSkillDialog, setShowAddSkillDialog] = useState(false);

  // Add state for resume preview
  const [showResumePreview, setShowResumePreview] = useState(false);
  const [selectedStudentResume, setSelectedStudentResume] = useState<{
    name: string;
    url: string;
    type: string;
  } | null>(null);

  // Sample student data
  const students: Student[] = [
    {
      id: 1,
      name: 'Alex Johnson',
      email: 'alex.johnson@example.com',
      avatar: 'https://i.pravatar.cc/150?img=1',
      status: 'Active',
      coursesEnrolled: 3,
      overallProgress: 68,
      joinDate: '2023-09-15',
      lastActive: '2024-04-01',
      location: 'New York, USA',
      phone: '+1 (555) 123-4567',
      interests: ['Web Development', 'UI/UX Design', 'Mobile Apps'],
      skills: ['JavaScript', 'React', 'Node.js', 'HTML/CSS']
    },
    {
      id: 2,
      name: 'Samantha Lee',
      email: 'samantha.lee@example.com',
      avatar: 'https://i.pravatar.cc/150?img=5',
      status: 'Graduated',
      coursesEnrolled: 5,
      overallProgress: 100,
      joinDate: '2023-06-10',
      lastActive: '2024-03-28',
      location: 'San Francisco, USA',
      phone: '+1 (555) 987-6543',
      interests: ['Data Science', 'Machine Learning', 'Python'],
      skills: ['Python', 'TensorFlow', 'Pandas', 'SQL']
    },
    {
      id: 3,
      name: 'Michael Chen',
      email: 'michael.chen@example.com',
      avatar: 'https://i.pravatar.cc/150?img=3',
      status: 'Active',
      coursesEnrolled: 2,
      overallProgress: 45,
      joinDate: '2024-01-05',
      lastActive: '2024-04-02',
      location: 'Toronto, Canada',
      phone: '+1 (555) 234-5678',
      interests: ['Cloud Computing', 'DevOps', 'Cybersecurity'],
      skills: ['AWS', 'Docker', 'Kubernetes', 'Linux']
    },
    {
      id: 4,
      name: 'Emily Rodriguez',
      email: 'emily.rodriguez@example.com',
      avatar: 'https://i.pravatar.cc/150?img=9',
      status: 'Inactive',
      coursesEnrolled: 1,
      overallProgress: 20,
      joinDate: '2023-11-20',
      lastActive: '2024-02-15',
      location: 'Miami, USA',
      phone: '+1 (555) 876-5432',
      interests: ['Digital Marketing', 'SEO', 'Content Creation'],
      skills: ['Google Analytics', 'SEO Tools', 'Content Management']
    }
  ];

  // Filter students based on search query and status filter
  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          student.email.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = filterStatus === 'all' || 
                          student.status.toLowerCase() === filterStatus.toLowerCase();
    
    return matchesSearch && matchesStatus;
  });

  // Stats calculations
  const totalStudents = students.length;
  const activeStudents = students.filter(s => s.status === 'Active').length;
  const graduatedStudents = students.filter(s => s.status === 'Graduated').length;
  const inactiveStudents = students.filter(s => s.status === 'Inactive').length;
  const averageProgress = Math.round(students.reduce((sum, s) => sum + s.overallProgress, 0) / totalStudents);

  const handleViewResume = (student: any) => {
    // In a real application, this would fetch the actual resume file
    // For now, we'll simulate having a resume
    setSelectedStudentResume({
      name: `${student.name}_Resume.pdf`,
      url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf', // Sample PDF
      type: 'application/pdf'
    });
    setShowResumePreview(true);
  };

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-none shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Students</p>
                <h3 className="text-2xl font-bold">{totalStudents}</h3>
              </div>
              <div className="p-2 bg-blue-100 rounded-full">
                <Users className="w-5 h-5 text-blue-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
              <span className="text-green-500 font-medium">12% increase</span>
              <span className="text-muted-foreground ml-1">from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Students</p>
                <h3 className="text-2xl font-bold">{activeStudents}</h3>
              </div>
              <div className="p-2 bg-green-100 rounded-full">
                <CheckCircle className="w-5 h-5 text-green-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-green-600 h-2 rounded-full" 
                  style={{ width: `${(activeStudents / totalStudents) * 100}%` }}
                ></div>
              </div>
              <span className="ml-2 text-muted-foreground">{Math.round((activeStudents / totalStudents) * 100)}%</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Graduated</p>
                <h3 className="text-2xl font-bold">{graduatedStudents}</h3>
              </div>
              <div className="p-2 bg-purple-100 rounded-full">
                <GraduationCap className="w-5 h-5 text-purple-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <Award className="w-4 h-4 text-yellow-500 mr-1" />
              <span className="text-muted-foreground">
                {graduatedStudents} students completed all courses
              </span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Avg. Progress</p>
                <h3 className="text-2xl font-bold">{averageProgress}%</h3>
              </div>
              <div className="p-2 bg-yellow-100 rounded-full">
                <BarChart className="w-5 h-5 text-yellow-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-yellow-500 h-2 rounded-full" 
                  style={{ width: `${averageProgress}%` }}
                ></div>
              </div>
              <span className="ml-2 text-muted-foreground">{averageProgress}%</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Student Profiles */}
      <Card className="border-none shadow-lg">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center space-x-2">
              <Users className="w-5 h-5 text-blue-600" />
              <span>Student Profiles</span>
            </CardTitle>
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search students..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8 w-64"
                />
              </div>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Students</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                  <SelectItem value="graduated">Graduated</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredStudents.map((student) => (
              <div key={student.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={student.avatar} alt={student.name} />
                      <AvatarFallback>{student.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-semibold text-gray-900">{student.name}</h4>
                      <p className="text-sm text-gray-600">{student.email}</p>
                      <div className="flex items-center space-x-4 mt-1">
                        <span className="text-sm text-gray-500">Courses: {student.coursesEnrolled}</span>
                        <span className="text-sm text-gray-500">Progress: {student.overallProgress}%</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant={student.status === 'Active' ? 'default' : student.status === 'Graduated' ? 'secondary' : 'outline'}>
                      {student.status}
                    </Badge>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleViewResume(student)}
                      className="flex items-center space-x-1"
                    >
                      <FileText className="w-4 h-4" />
                      <span>View Resume</span>
                    </Button>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Resume Preview Dialog */}
      <Dialog open={showResumePreview} onOpenChange={setShowResumePreview}>
        <DialogContent className="max-w-5xl w-[90vw] h-[85vh] flex flex-col">
          <DialogHeader className="flex-shrink-0">
            <DialogTitle className="text-center">
              Resume Preview - {selectedStudentResume?.name}
            </DialogTitle>
          </DialogHeader>
          <div className="flex-1 flex items-center justify-center overflow-hidden">
            {selectedStudentResume?.type === 'application/pdf' && selectedStudentResume.url ? (
              <iframe
                src={selectedStudentResume.url}
                className="w-full h-full border-0 rounded-lg"
                title="Resume Preview"
              />
            ) : (
              <div className="text-center py-12">
                <FileText className="w-20 h-20 mx-auto mb-6 text-gray-400" />
                <h3 className="text-lg font-semibold text-gray-700 mb-2">
                  Resume Preview Not Available
                </h3>
                <p className="text-gray-600 mb-4">
                  {selectedStudentResume?.name || 'No resume file found'}
                </p>
                <p className="text-sm text-gray-500">
                  The student hasn't uploaded a resume yet or the file format is not supported for preview.
                </p>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Detailed Analytics */}
      <Card className="border-none shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <BarChart className="w-5 h-5 text-blue-600" />
            <span>Student Analytics</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="courses">Courses</TabsTrigger>
              <TabsTrigger value="skills">Skills</TabsTrigger>
              <TabsTrigger value="projects">Projects</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border rounded-lg p-4">
                  <h4 className="font-medium mb-2">Student Status Distribution</h4>
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-sm">Active: {activeStudents}</span>
                  </div>
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                    <span className="text-sm">Graduated: {graduatedStudents}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
                    <span className="text-sm">Inactive: {inactiveStudents}</span>
                  </div>
                </div>
                
                <div className="border rounded-lg p-4">
                  <h4 className="font-medium mb-2">Progress Overview</h4>
                  <div className="space-y-2">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>0-25% Progress</span>
                        <span>{students.filter(s => s.overallProgress <= 25).length} students</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-red-500 h-2 rounded-full" 
                          style={{ width: `${(students.filter(s => s.overallProgress <= 25).length / totalStudents) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>26-50% Progress</span>
                        <span>{students.filter(s => s.overallProgress > 25 && s.overallProgress <= 50).length} students</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-yellow-500 h-2 rounded-full" 
                          style={{ width: `${(students.filter(s => s.overallProgress > 25 && s.overallProgress <= 50).length / totalStudents) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>51-75% Progress</span>
                        <span>{students.filter(s => s.overallProgress > 50 && s.overallProgress <= 75).length} students</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-500 h-2 rounded-full" 
                          style={{ width: `${(students.filter(s => s.overallProgress > 50 && s.overallProgress <= 75).length / totalStudents) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>76-100% Progress</span>
                        <span>{students.filter(s => s.overallProgress > 75).length} students</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-green-500 h-2 rounded-full" 
                          style={{ width: `${(students.filter(s => s.overallProgress > 75).length / totalStudents) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="courses" className="space-y-4">
              <div className="flex justify-between items-center mb-4">
                <h4 className="font-medium">Popular Courses</h4>
                <Button size="sm" onClick={() => setShowAddCourseDialog(true)}>
                  <Plus className="w-4 h-4 mr-1" /> Add Course
                </Button>
              </div>
              <div className="border rounded-lg divide-y">
                <div className="p-3 flex justify-between items-center">
                  <div className="flex items-center space-x-3">
                    <BookOpen className="w-5 h-5 text-blue-600" />
                    <div>
                      <p className="font-medium">Web Development Fundamentals</p>
                      <p className="text-sm text-gray-500">12 students enrolled</p>
                    </div>
                  </div>
                  <Badge>Popular</Badge>
                </div>
                <div className="p-3 flex justify-between items-center">
                  <div className="flex items-center space-x-3">
                    <BookOpen className="w-5 h-5 text-blue-600" />
                    <div>
                      <p className="font-medium">Data Science with Python</p>
                      <p className="text-sm text-gray-500">8 students enrolled</p>
                    </div>
                  </div>
                  <Badge variant="outline">New</Badge>
                </div>
                <div className="p-3 flex justify-between items-center">
                  <div className="flex items-center space-x-3">
                    <BookOpen className="w-5 h-5 text-blue-600" />
                    <div>
                      <p className="font-medium">Mobile App Development</p>
                      <p className="text-sm text-gray-500">6 students enrolled</p>
                    </div>
                  </div>
                  <Badge variant="secondary">Trending</Badge>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="skills" className="space-y-4">
              <div className="flex justify-between items-center mb-4">
                <h4 className="font-medium">Top Skills</h4>
                <Button size="sm" onClick={() => setShowAddSkillDialog(true)}>
                  <Plus className="w-4 h-4 mr-1" /> Add Skill
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                <Badge className="px-3 py-1">JavaScript (15)</Badge>
                <Badge className="px-3 py-1">Python (12)</Badge>
                <Badge className="px-3 py-1">React (10)</Badge>
                <Badge className="px-3 py-1">Node.js (8)</Badge>
                <Badge className="px-3 py-1">HTML/CSS (8)</Badge>
                <Badge className="px-3 py-1">SQL (7)</Badge>
                <Badge className="px-3 py-1">AWS (6)</Badge>
                <Badge className="px-3 py-1">Docker (5)</Badge>
                <Badge className="px-3 py-1">TensorFlow (4)</Badge>
                <Badge className="px-3 py-1">Git (4)</Badge>
                <Badge variant="outline" className="px-3 py-1">+12 more</Badge>
              </div>
            </TabsContent>
            
            <TabsContent value="projects" className="space-y-4">
              <div className="flex justify-between items-center mb-4">
                <h4 className="font-medium">Student Projects</h4>
                <Button size="sm" onClick={() => setShowAddProjectDialog(true)}>
                  <Plus className="w-4 h-4 mr-1" /> Add Project
                </Button>
              </div>
              <div className="border rounded-lg divide-y">
                <div className="p-3">
                  <div className="flex justify-between items-start mb-2">
                    <h5 className="font-medium">E-commerce Website</h5>
                    <Badge>Completed</Badge>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">A full-stack e-commerce platform with payment integration</p>
                  <div className="flex items-center text-sm text-gray-500">
                    <User className="w-4 h-4 mr-1" />
                    <span className="mr-3">Alex Johnson</span>
                    <Calendar className="w-4 h-4 mr-1" />
                    <span>Apr 2, 2024</span>
                  </div>
                </div>
                <div className="p-3">
                  <div className="flex justify-between items-start mb-2">
                    <h5 className="font-medium">Data Visualization Dashboard</h5>
                    <Badge variant="secondary">In Progress</Badge>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">Interactive dashboard for visualizing complex datasets</p>
                  <div className="flex items-center text-sm text-gray-500">
                    <User className="w-4 h-4 mr-1" />
                    <span className="mr-3">Samantha Lee</span>
                    <Calendar className="w-4 h-4 mr-1" />
                    <span>Mar 15, 2024</span>
                  </div>
                </div>
                <div className="p-3">
                  <div className="flex justify-between items-start mb-2">
                    <h5 className="font-medium">Cloud Infrastructure Setup</h5>
                    <Badge variant="outline">Planning</Badge>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">Setting up scalable cloud infrastructure for web applications</p>
                  <div className="flex items-center text-sm text-gray-500">
                    <User className="w-4 h-4 mr-1" />
                    <span className="mr-3">Michael Chen</span>
                    <Calendar className="w-4 h-4 mr-1" />
                    <span>Apr 5, 2024</span>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Add Project Dialog */}
      <Dialog open={showAddProjectDialog} onOpenChange={setShowAddProjectDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Student Project</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label htmlFor="project-name" className="text-sm font-medium">Project Name</label>
              <Input id="project-name" placeholder="Enter project name" />
            </div>
            <div className="space-y-2">
              <label htmlFor="project-description" className="text-sm font-medium">Description</label>
              <textarea 
                id="project-description" 
                className="w-full min-h-[100px] rounded-md border border-input bg-background px-3 py-2 text-sm"
                placeholder="Enter project description"
              ></textarea>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="project-student" className="text-sm font-medium">Student</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select student" />
                  </SelectTrigger>
                  <SelectContent>
                    {students.map(student => (
                      <SelectItem key={student.id} value={student.id.toString()}>
                        {student.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label htmlFor="project-status" className="text-sm font-medium">Status</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="planning">Planning</SelectItem>
                    <SelectItem value="in-progress">In Progress</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setShowAddProjectDialog(false)}>Cancel</Button>
            <Button>Add Project</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Add Course Dialog */}
      <Dialog open={showAddCourseDialog} onOpenChange={setShowAddCourseDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Course</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label htmlFor="course-name" className="text-sm font-medium">Course Name</label>
              <Input id="course-name" placeholder="Enter course name" />
            </div>
            <div className="space-y-2">
              <label htmlFor="course-description" className="text-sm font-medium">Description</label>
              <textarea 
                id="course-description" 
                className="w-full min-h-[100px] rounded-md border border-input bg-background px-3 py-2 text-sm"
                placeholder="Enter course description"
              ></textarea>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="course-instructor" className="text-sm font-medium">Instructor</label>
                <Input id="course-instructor" placeholder="Enter instructor name" />
              </div>
              <div className="space-y-2">
                <label htmlFor="course-duration" className="text-sm font-medium">Duration (weeks)</label>
                <Input id="course-duration" type="number" placeholder="Enter duration" />
              </div>
            </div>
          </div>
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setShowAddCourseDialog(false)}>Cancel</Button>
            <Button>Add Course</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Add Skill Dialog */}
      <Dialog open={showAddSkillDialog} onOpenChange={setShowAddSkillDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Skill</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label htmlFor="skill-name" className="text-sm font-medium">Skill Name</label>
              <Input id="skill-name" placeholder="Enter skill name" />
            </div>
            <div className="space-y-2">
              <label htmlFor="skill-category" className="text-sm font-medium">Category</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="programming">Programming</SelectItem>
                  <SelectItem value="design">Design</SelectItem>
                  <SelectItem value="data">Data Science</SelectItem>
                  <SelectItem value="cloud">Cloud Computing</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label htmlFor="skill-description" className="text-sm font-medium">Description</label>
              <textarea 
                id="skill-description" 
                className="w-full min-h-[100px] rounded-md border border-input bg-background px-3 py-2 text-sm"
                placeholder="Enter skill description"
              ></textarea>
            </div>
          </div>
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setShowAddSkillDialog(false)}>Cancel</Button>
            <Button>Add Skill</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default StudentPanel;
