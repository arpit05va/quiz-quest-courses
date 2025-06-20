
import { useState, useEffect } from 'react';
import LoginDialog from '@/components/LoginDialog';

interface UseAuthCheckReturn {
  isAuthenticated: boolean;
  showLoginDialog: boolean;
  setShowLoginDialog: (show: boolean) => void;
  checkAuthAndExecute: (callback: () => void) => void;
  AuthDialog: () => JSX.Element;
}

export const useAuthCheck = (): UseAuthCheckReturn => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showLoginDialog, setShowLoginDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check authentication on mount
    const checkAuth = () => {
      const user = localStorage.getItem('user');
      console.log('Auth check - user from localStorage:', user);
      setIsAuthenticated(!!user);
      setIsLoading(false);
    };

    checkAuth();

    // Listen for storage changes (when user logs in/out in another tab)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'user') {
        console.log('Storage change detected for user:', e.newValue);
        setIsAuthenticated(!!e.newValue);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    
    // Also listen for custom login events
    const handleLoginEvent = () => {
      console.log('Login event detected, rechecking auth');
      checkAuth();
    };

    window.addEventListener('userLoggedIn', handleLoginEvent);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('userLoggedIn', handleLoginEvent);
    };
  }, []);

  const checkAuthAndExecute = (callback: () => void) => {
    console.log('checkAuthAndExecute called, isAuthenticated:', isAuthenticated);
    if (isAuthenticated) {
      callback();
    } else {
      setShowLoginDialog(true);
    }
  };

  const AuthDialog = () => (
    <LoginDialog 
      open={showLoginDialog} 
      onOpenChange={setShowLoginDialog}
    />
  );

  return {
    isAuthenticated,
    showLoginDialog,
    setShowLoginDialog,
    checkAuthAndExecute,
    AuthDialog
  };
};
