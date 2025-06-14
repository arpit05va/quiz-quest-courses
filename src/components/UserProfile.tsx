
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { toast } from '@/components/ui/sonner';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { 
  User, 
  Mail, 
  Phone, 
  Building, 
  Upload, 
  Edit,
  Save,
  X,
  BookOpen,
  Award,
  Calendar,
  ExternalLink,
  FileText,
  Check,
  Eye
} from 'lucide-react';

const UserProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
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

  const enrolledCourses = [
    {
      id: 1,
      title: 'Introduction to Web Development',
      progress: 75,
      status: 'In Progress',
      enrolledDate: '2024-01-15',
      completionDate: null,
      instructor: 'John Smith'
    },
    {
      id: 2,
      title: 'Data Science Fundamentals',
      progress: 45,
      status: 'In Progress',
      enrolledDate: '2024-02-01',
      completionDate: null,
      instructor: 'Jane Wilson'
    },
    {
      id: 3,
      title: 'Digital Marketing Mastery',
      progress: 100,
      status: 'Completed',
      enrolledDate: '2023-12-01',
      completionDate: '2024-01-10',
      instructor: 'Mike Johnson'
    }
  ];

  const handleSave = () => {
    // Here you would typically save to backend
    setIsEditing(false);
    toast.success('Profile updated successfully!');
  };

  const handleCancel = () => {
    // Reset to original data if needed
    setIsEditing(false);
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

    // Check file type
    const allowedTypes = ['.pdf', '.doc', '.docx'];
    const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase();
    
    if (!allowedTypes.includes(fileExtension)) {
      toast.error('Invalid file type. Please upload PDF, DOC, or DOCX files only.');
      return;
    }

    // Check file size (5MB = 5 * 1024 * 1024 bytes)
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      toast.error('File size too large. Please upload a file smaller than 5MB.');
      return;
    }

    setUploadedResume(file);
    
    // Create preview URL for the file
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    
    toast.success('Resume uploaded successfully!');
    console.log('File uploaded:', file.name, 'Size:', file.size, 'Type:', file.type);
  };

  const handleRemoveResume = () => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    setUploadedResume(null);
    setPreviewUrl(null);
    toast.success('Resume removed successfully!');
  };

  const handlePreview = () => {
    if (!uploadedResume || !previewUrl) return;
    
    // For PDF files, we can display them directly
    if (uploadedResume.type === 'application/pdf') {
      return;
    }
    
    // For DOC/DOCX files, we'll show a message since they can't be previewed directly in browser
    toast.info('DOC/DOCX files cannot be previewed directly. Click to download and view externally.');
  };

  const handleSubmitToServer = async () => {
    if (!uploadedResume) {
      toast.error('No file selected to submit.');
      return;
    }

    // Here you would implement the actual server submission
    // For now, we'll just show a success message
    toast.success('Resume submitted to server successfully!');
    console.log('Submitting file to server:', uploadedResume.name);
  };

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <Card className="border-none shadow-lg">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center space-x-2">
              <User className="w-5 h-5" />
              <span>User Profile</span>
            </CardTitle>
            <Button
              variant={isEditing ? "destructive" : "outline"}
              size="sm"
              onClick={isEditing ? handleCancel : () => setIsEditing(true)}
              className="flex items-center space-x-2"
            >
              {isEditing ? <X className="w-4 h-4" /> : <Edit className="w-4 h-4" />}
              <span>{isEditing ? 'Cancel' : 'Edit Profile'}</span>
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Profile Photo and Basic Info */}
          <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6">
            <div className="relative">
              <Avatar className="w-24 h-24">
                <AvatarImage src={profileData.profilePhoto} alt="Profile" />
                <AvatarFallback>{profileData.firstName[0]}{profileData.lastName[0]}</AvatarFallback>
              </Avatar>
              {isEditing && (
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
                  {isEditing ? (
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
                  {isEditing ? (
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
                  {isEditing ? (
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
                  {isEditing ? (
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
                {isEditing ? (
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

          {isEditing && (
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={handleCancel}>
                Cancel
              </Button>
              <Button onClick={handleSave} className="flex items-center space-x-2">
                <Save className="w-4 h-4" />
                <span>Save Changes</span>
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Social Media & Resume */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="border-none shadow-lg">
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
                {isEditing ? (
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

        <Card className="border-none shadow-lg">
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

      {/* Enrolled Courses */}
      <Card className="border-none shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <BookOpen className="w-5 h-5" />
            <span>Enrolled Courses</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {enrolledCourses.map((course) => (
              <div key={course.id} className="border border-border rounded-lg p-4">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-2 md:space-y-0">
                  <div className="flex-1">
                    <h4 className="font-semibold text-lg">{course.title}</h4>
                    <p className="text-sm text-muted-foreground">Instructor: {course.instructor}</p>
                    <div className="flex items-center space-x-4 mt-2">
                      <Badge variant={course.status === 'Completed' ? 'default' : 'secondary'}>
                        {course.status}
                      </Badge>
                      <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                        <Calendar className="w-4 h-4" />
                        <span>Enrolled: {new Date(course.enrolledDate).toLocaleDateString()}</span>
                      </div>
                      {course.completionDate && (
                        <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                          <Award className="w-4 h-4" />
                          <span>Completed: {new Date(course.completionDate).toLocaleDateString()}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="md:w-48">
                    <div className="flex justify-between text-sm mb-1">
                      <span>Progress</span>
                      <span>{course.progress}%</span>
                    </div>
                    <Progress value={course.progress} className="h-2" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserProfile;
