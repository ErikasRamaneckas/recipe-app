import { createContext, useState } from 'react';
import { useNavigate } from 'react-router';
import { getUserByUsername } from '../apis/userApi';

const AuthContext = createContext({
  isAuthenticated: false,
  user: '',
  onLogin: () => {},
  onLogout: () => {},
});

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('isAuthenticated');
  });
  const [user, setUser] = useState(() => {
    if (localStorage.getItem('user')) {
      return JSON.parse(localStorage.getItem('user'));
    } else {
      return null;
    }
  });

  const handleLogin = async (username, password) => {
    const user = await getUserByUsername(username);
    if (!user) {
      return;
    }

    if (user.password === password) {
      setIsAuthenticated(true);
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem(
        'user',
        JSON.stringify({
          id: user.id,
          username: user.username,
        })
      );
      setUser(JSON.parse(localStorage.getItem('user')));
      navigate('/dashboard');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUser('');
    localStorage.setItem('isAuthenticated', 'false');
    localStorage.setItem('user', '');
    navigate('/login');
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        onLogin: handleLogin,
        onLogout: handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
