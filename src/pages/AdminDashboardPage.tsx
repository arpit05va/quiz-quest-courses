
import DashboardWrapper from '@/components/DashboardWrapper';
import AdminSidebar from '@/components/admin/AdminSidebar';
import { useSearchParams } from 'react-router-dom';
import UserManagement from '@/components/admin/UserManagement';
import CourseManagement from '@/components/admin/CourseManagement';
import HRVerification from '@/components/admin/HRVerification';
import AnalyticsDashboard from '@/components/admin/AnalyticsDashboard';
import SystemSettings from '@/components/admin/SystemSettings';

const AdminDashboardPage = () => {
  const [searchParams] = useSearchParams();
  const activeTab = searchParams.get('tab') || 'analytics';

  const renderContent = () => {
    switch (activeTab) {
      case 'analytics':
        return <AnalyticsDashboard />;
      case 'users':
        return <UserManagement />;
      case 'courses':
        return <CourseManagement />;
      case 'hr-verification':
        return <HRVerification />;
      case 'settings':
        return <SystemSettings />;
      default:
        return <AnalyticsDashboard />;
    }
  };

  return (
    <DashboardWrapper title="Admin Dashboard">
      <div className="flex gap-6 h-full">
        <AdminSidebar activeTab={activeTab} />
        <div className="flex-1 space-y-6">
          {renderContent()}
        </div>
      </div>
    </DashboardWrapper>
  );
};

export default AdminDashboardPage;
