
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import {
  Users,
  BookOpen,
  TrendingUp,
  DollarSign,
  UserCheck,
  AlertCircle,
  Activity,
  Target
} from 'lucide-react';

const AnalyticsDashboard = () => {
  // Mock data
  const monthlyUserData = [
    { month: 'Jan', users: 1200, jobSeekers: 800, students: 400 },
    { month: 'Feb', users: 1350, jobSeekers: 900, students: 450 },
    { month: 'Mar', users: 1500, jobSeekers: 1000, students: 500 },
    { month: 'Apr', users: 1680, jobSeekers: 1120, students: 560 },
    { month: 'May', users: 1850, jobSeekers: 1230, students: 620 },
    { month: 'Jun', users: 2050, jobSeekers: 1350, students: 700 }
  ];

  const courseEnrollmentData = [
    { name: 'React Development', students: 450, completion: 78 },
    { name: 'Python Basics', students: 380, completion: 85 },
    { name: 'Data Science', students: 320, completion: 72 },
    { name: 'UI/UX Design', students: 280, completion: 90 },
    { name: 'DevOps', students: 220, completion: 68 }
  ];

  const userTypeData = [
    { name: 'Job Seekers', value: 1350, color: '#8884d8' },
    { name: 'Students', value: 700, color: '#82ca9d' },
    { name: 'HR/Recruiters', value: 180, color: '#ffc658' },
    { name: 'Experts', value: 95, color: '#ff7300' }
  ];

  const statCards = [
    {
      title: 'Total Users',
      value: '2,543',
      change: '+12.5%',
      icon: Users,
      color: 'text-blue-600'
    },
    {
      title: 'Active Courses',
      value: '128',
      change: '+8.2%',
      icon: BookOpen,
      color: 'text-green-600'
    },
    {
      title: 'Monthly Revenue',
      value: '$24,680',
      change: '+15.3%',
      icon: DollarSign,
      color: 'text-purple-600'
    },
    {
      title: 'HR Verifications',
      value: '23',
      change: '+5 pending',
      icon: UserCheck,
      color: 'text-orange-600'
    }
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Analytics Dashboard</h1>
          <p className="text-muted-foreground">Platform overview and insights</p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="outline" className="flex items-center space-x-1">
            <Activity className="w-3 h-3" />
            <span>Live Data</span>
          </Badge>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="hover:shadow-lg transition-all duration-200 hover-scale">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <Icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-600">{stat.change}</span> from last month
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* User Growth Chart */}
        <Card className="hover:shadow-lg transition-all duration-200">
          <CardHeader>
            <CardTitle>User Growth Trends</CardTitle>
            <CardDescription>Monthly user registration and growth</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyUserData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="users" 
                  stroke="#8884d8" 
                  strokeWidth={2}
                  dot={{ fill: '#8884d8' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="jobSeekers" 
                  stroke="#82ca9d" 
                  strokeWidth={2}
                  dot={{ fill: '#82ca9d' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="students" 
                  stroke="#ffc658" 
                  strokeWidth={2}
                  dot={{ fill: '#ffc658' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* User Distribution */}
        <Card className="hover:shadow-lg transition-all duration-200">
          <CardHeader>
            <CardTitle>User Distribution</CardTitle>
            <CardDescription>Breakdown by user type</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={userTypeData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {userTypeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Course Performance */}
      <Card className="hover:shadow-lg transition-all duration-200">
        <CardHeader>
          <CardTitle>Course Enrollment & Completion</CardTitle>
          <CardDescription>Top performing courses with completion rates</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={courseEnrollmentData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="students" fill="#8884d8" name="Enrolled Students" />
              <Bar dataKey="completion" fill="#82ca9d" name="Completion Rate %" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card className="hover:shadow-lg transition-all duration-200">
        <CardHeader>
          <CardTitle>Recent Platform Activity</CardTitle>
          <CardDescription>Latest system events and notifications</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { action: 'New HR registration from TechCorp Inc.', time: '2 minutes ago', type: 'info' },
              { action: 'Course "Advanced React" reached 500 enrollments', time: '15 minutes ago', type: 'success' },
              { action: 'System maintenance scheduled for tonight', time: '1 hour ago', type: 'warning' },
              { action: 'Expert verification completed for John Smith', time: '2 hours ago', type: 'success' },
              { action: 'Payment issue reported by user', time: '3 hours ago', type: 'error' }
            ].map((activity, index) => (
              <div key={index} className="flex items-center space-x-3 p-3 rounded-lg bg-muted/30">
                <div className={`w-2 h-2 rounded-full ${
                  activity.type === 'success' ? 'bg-green-500' :
                  activity.type === 'warning' ? 'bg-yellow-500' :
                  activity.type === 'error' ? 'bg-red-500' : 'bg-blue-500'
                }`} />
                <div className="flex-1">
                  <p className="text-sm">{activity.action}</p>
                  <p className="text-xs text-muted-foreground">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AnalyticsDashboard;
