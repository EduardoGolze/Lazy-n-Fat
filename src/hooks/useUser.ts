import { useEffect, useState } from 'react';
import { User } from 'firebase/auth';
import { signInWithGoogle, signInWithGithub, logout } from '../services/auth';

const useUser = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const handleLogin = async (authFunction: () => Promise<User>) => {
    try {
      const user = await authFunction();
      localStorage.setItem('user', JSON.stringify(user));
      setUser(user);
    } catch (error) {
      console.error('Erro ao fazer login:', error);
    }
  };

  const handleLogout = async () => {
    await logout();
    localStorage.removeItem('user');
    setUser(null);
  };

  return {
    user,
    loading,
    loginWithGoogle: () => handleLogin(signInWithGoogle),
    loginWithGithub: () => handleLogin(signInWithGithub),
    logout: handleLogout,
  };
};

export default useUser;