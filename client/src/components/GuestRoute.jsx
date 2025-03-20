import useAuth from '../hooks/useAuth';
import { useNavigate } from 'react-router';
import { useEffect } from 'react';

export default function GuestRoute({ children }) {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  if (isAuthenticated) {
    return null;
  }

  return children;
}
