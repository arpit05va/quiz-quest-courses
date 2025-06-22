
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  UserCheck,
  Building,
  Clock,
  CheckCircle,
  XCircle,
  Eye,
  Globe,
  Mail,
  Phone,
  MapPin,
  Users
} from 'lucide-react';

const HRVerification = () => {
  const [selectedApplication, setSelectedApplication] = useState<any>(null);

  // Mock HR verification data
  const hrApplications = [
    {
      id: 1,
      companyName: 'TechCorp Inc.',
      hrName: 'Mike Johnson',
      email: 'mike.j@techcorp.com',
      phone: '+1 (555) 123-4567',
      website: 'https://techcorp.com',
      location: 'San Francisco, CA',
      employeeCount: '500-1000',
      industry: 'Technology',
      status: 'pending',
      submittedDate: '2024-01-20',
      documents: ['business_license.pdf', 'company_profile.pdf'],
      description: 'Leading technology company focused on AI and machine learning solutions.',
      avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face'
    },
    {
      id: 2,
      companyName: 'StartupX',
      hrName: 'Sarah Davis',
      email: 'sarah@startupx.io',
      phone: '+1 (555) 987-6543',
      website: 'https://startupx.io',
      location: 'Austin, TX',
      employeeCount: '50-100',
      industry: 'Fintech',
      status: 'pending',
      submittedDate: '2024-01-18',
      documents: ['registration.pdf', 'tax_id.pdf'],
      description: 'Innovative fintech startup revolutionizing digital payments.',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b789?w=150&h=150&fit=crop&crop=face'
    },
    {
      id: 3,
      companyName: 'GreenTech Solutions',
      hrName: 'David Wilson',
      email: 'david@greentech.com',
      phone: '+1 (555) 456-7890',
      website: 'https://greentech.com',
      location: 'Seattle, WA',
      employeeCount: '100-500',
      industry: 'Clean Energy',
      status: 'approved',
      submittedDate: '2024-01-15',
      documents: ['license.pdf', 'certification.pdf'],
      description: 'Sustainable energy solutions for a greener future.',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return <Badge variant="default" className="bg-green-500">Approved</Badge>;
      case 'pending':
        return <Badge variant="secondary" className="bg-yellow-500">Pending Review</Badge>;
      case 'rejected':
        return <Badge variant="destructive">Rejected</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const handleApprove = (id: number) => {
    console.log('Approving HR application:', id);
    // Implementation for approval
  };

  const handleReject = (id: number) => {
    console.log('Rejecting HR application:', id);
    // Implementation for rejection
  };

  const pendingApplications = hrApplications.filter(app => app.status === 'pending');
  const approvedApplications = hrApplications.filter(app => app.status === 'approved');

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">HR Verification Center</h1>
          <p className="text-muted-foreground">Review and approve company registrations</p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="outline" className="flex items-center space-x-1">
            <Clock className="w-3 h-3" />
            <span>{pendingApplications.length} Pending</span>
          </Badge>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { title: 'Total Applications', value: '156', icon: Building, color: 'text-blue-600' },
          { title: 'Pending Review', value: pendingApplications.length.toString(), icon: Clock, color: 'text-yellow-600' },
          { title: 'Approved', value: '128', icon: CheckCircle, color: 'text-green-600' },
          { title: 'Active HRs', value: '115', icon: Users, color: 'text-purple-600' }
        ].map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="hover:shadow-lg transition-all duration-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.title}</p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                  </div>
                  <Icon className={`h-8 w-8 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Pending Applications */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Clock className="w-5 h-5" />
            <span>Pending Applications</span>
            <Badge variant="secondary">{pendingApplications.length}</Badge>
          </CardTitle>
          <CardDescription>Companies awaiting verification and approval</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Company & HR</TableHead>
                  <TableHead>Industry</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Submitted</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pendingApplications.map((application) => (
                  <TableRow key={application.id} className="hover:bg-muted/50">
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <Avatar>
                          <AvatarImage src={application.avatar} alt={application.hrName} />
                          <AvatarFallback>{application.hrName.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{application.companyName}</p>
                          <p className="text-sm text-muted-foreground">{application.hrName}</p>
                          <p className="text-sm text-muted-foreground">{application.email}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{application.industry}</p>
                        <p className="text-sm text-muted-foreground">{application.employeeCount} employees</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-1">
                        <MapPin className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm">{application.location}</span>
                      </div>
                    </TableCell>
                    <TableCell>{application.submittedDate}</TableCell>
                    <TableCell>{getStatusBadge(application.status)}</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm" onClick={() => setSelectedApplication(application)}>
                              <Eye className="w-4 h-4 mr-1" />
                              Review
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl">
                            <DialogHeader>
                              <DialogTitle className="flex items-center space-x-2">
                                <Building className="w-5 h-5" />
                                <span>{application.companyName} - Verification Details</span>
                              </DialogTitle>
                              <DialogDescription>
                                Review company information and documents before making a decision
                              </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-6">
                              {/* Company Information */}
                              <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-3">
                                  <h4 className="font-semibold">Company Information</h4>
                                  <div className="space-y-2 text-sm">
                                    <div className="flex items-center space-x-2">
                                      <Building className="w-4 h-4 text-muted-foreground" />
                                      <span>{application.companyName}</span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                      <Globe className="w-4 h-4 text-muted-foreground" />
                                      <a href={application.website} className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
                                        {application.website}
                                      </a>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                      <MapPin className="w-4 h-4 text-muted-foreground" />
                                      <span>{application.location}</span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                      <Users className="w-4 h-4 text-muted-foreground" />
                                      <span>{application.employeeCount} employees</span>
                                    </div>
                                  </div>
                                </div>
                                <div className="space-y-3">
                                  <h4 className="font-semibold">HR Contact</h4>
                                  <div className="space-y-2 text-sm">
                                    <div className="flex items-center space-x-2">
                                      <UserCheck className="w-4 h-4 text-muted-foreground" />
                                      <span>{application.hrName}</span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                      <Mail className="w-4 h-4 text-muted-foreground" />
                                      <span>{application.email}</span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                      <Phone className="w-4 h-4 text-muted-foreground" />
                                      <span>{application.phone}</span>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              {/* Company Description */}
                              <div>
                                <h4 className="font-semibold mb-2">Company Description</h4>
                                <p className="text-sm text-muted-foreground">{application.description}</p>
                              </div>

                              {/* Documents */}
                              <div>
                                <h4 className="font-semibold mb-2">Submitted Documents</h4>
                                <div className="flex flex-wrap gap-2">
                                  {application.documents.map((doc, index) => (
                                    <Badge key={index} variant="outline" className="cursor-pointer hover:bg-muted">
                                      {doc}
                                    </Badge>
                                  ))}
                                </div>
                              </div>

                              {/* Action Buttons */}
                              <div className="flex justify-end space-x-2 pt-4 border-t">
                                <Button variant="outline" onClick={() => handleReject(application.id)}>
                                  <XCircle className="w-4 h-4 mr-2" />
                                  Reject
                                </Button>
                                <Button onClick={() => handleApprove(application.id)}>
                                  <CheckCircle className="w-4 h-4 mr-2" />
                                  Approve
                                </Button>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Recent Approvals */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <CheckCircle className="w-5 h-5" />
            <span>Recently Approved</span>
          </CardTitle>
          <CardDescription>Companies that have been verified and approved</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {approvedApplications.slice(0, 3).map((application) => (
              <div key={application.id} className="flex items-center justify-between p-4 rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800">
                <div className="flex items-center space-x-3">
                  <Avatar>
                    <AvatarImage src={application.avatar} alt={application.hrName} />
                    <AvatarFallback>{application.hrName.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{application.companyName}</p>
                    <p className="text-sm text-muted-foreground">{application.hrName} • {application.industry}</p>
                  </div>
                </div>
                <div className="text-right">
                  <Badge variant="default" className="bg-green-500">Approved</Badge>
                  <p className="text-sm text-muted-foreground mt-1">Approved on {application.submittedDate}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default HRVerification;
