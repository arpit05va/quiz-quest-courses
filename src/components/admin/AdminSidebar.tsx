
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  BarChart3,
  Users,
  BookOpen,
  UserCheck,
  Settings,
  Shield,
  TrendingUp,
  FileText,
  Bell
} from 'lucide-react';

interface AdminSidebarProps {
  activeTab: string;
}

const AdminSidebar = ({ activeTab }: AdminSidebarProps) => {
  const navigate = useNavigate();

  const menuItems = [
    {
      id: 'analytics',
      label: 'Analytics Dashboard',
      icon: BarChart3,
      description: 'Overview & insights'
    },
    {
      id: 'users',
      label: 'User Management',
      icon: Users,
      description: 'Job seekers & students'
    },
    {
      id: 'courses',
      label: 'Course Management',
      icon: BookOpen,
      description: 'Courses & enrollments'
    },
    {
      id: 'hr-verification',
      label: 'HR Verification',
      icon: UserCheck,
      description: 'Company onboarding'
    },
    {
      id: 'settings',
      label: 'System Settings',
      icon: Settings,
      description: 'Platform configuration'
    }
  ];

  const handleTabChange = (tabId: string) => {
    navigate(`/admin/dashboard?tab=${tabId}`);
  };

  return (
    <Card className="w-80 p-6 h-fit animate-fade-in">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-orange-500 rounded-lg flex items-center justify-center">
          <Shield className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="text-xl font-bold">Admin Panel</h2>
          <p className="text-sm text-muted-foreground">System Management</p>
        </div>
      </div>

      <div className="space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          
          return (
            <Button
              key={item.id}
              variant={isActive ? "default" : "ghost"}
              className={`w-full justify-start h-auto p-4 transition-all duration-200 ${
                isActive 
                  ? 'bg-primary text-primary-foreground shadow-md' 
                  : 'hover:bg-muted/50'
              }`}
              onClick={() => handleTabChange(item.id)}
            >
              <Icon className="w-5 h-5 mr-3" />
              <div className="text-left">
                <div className="font-medium">{item.label}</div>
                <div className="text-xs opacity-70">{item.description}</div>
              </div>
            </Button>
          );
        })}
      </div>

      {/* Quick Stats */}
      <div className="mt-6 p-4 bg-muted/30 rounded-lg">
        <h3 className="font-semibold mb-3 flex items-center">
          <TrendingUp className="w-4 h-4 mr-2" />
          Quick Stats
        </h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span>Active Users</span>
            <span className="font-medium">2,543</span>
          </div>
          <div className="flex justify-between">
            <span>Total Courses</span>
            <span className="font-medium">128</span>
          </div>
          <div className="flex justify-between">
            <span>Pending HRs</span>
            <span className="font-medium text-orange-500">23</span>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default AdminSidebar;
