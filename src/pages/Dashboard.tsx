import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import DashboardWrapper from '@/components/DashboardWrapper';

const Dashboard = () => {
  const auth = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth.isLoggedIn) {
      // redirect to home or show login prompt
      navigate('/', { replace: true });
      // optionally: show info toast (if use-toast is available)
      // toast.info('Please log in to access Dashboard');
    }
  }, [auth.isLoggedIn, navigate]);

  if (!auth.isLoggedIn) return null; // don't render before redirect

  return (
    <DashboardWrapper title="Dashboard">
      {/* Your dashboard content here */}
    </DashboardWrapper>
  );
};

export default Dashboard;
