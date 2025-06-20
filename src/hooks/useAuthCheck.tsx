
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

  useEffect(() => {
    // Mock authentication check - replace with real authentication logic
    const user = localStorage.getItem('user');
    setIsAuthenticated(!!user);
  }, []);

  const checkAuthAndExecute = (callback: () => void) => {
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
