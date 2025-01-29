import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import '../styles/Login.css';

const Login = () => {
  const { user, loginWithGoogle, loginWithGithub } = useAuth();
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (authFunction: () => Promise<void>) => {
    try {
      await authFunction();
      navigate('/');
    } catch (error) {
      setError('Erro ao fazer login. Tente novamente.');
      console.error(error);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1>Lazy'n Fat</h1>
        <p>Faça login para continuar</p>
        {error && <div className="error-message">{error}</div>}
        <button onClick={() => handleLogin(loginWithGoogle)} className="google-btn">
          <i className="fab fa-google"></i> Entrar com Google
        </button>
        <button onClick={() => handleLogin(loginWithGithub)} className="github-btn">
          <i className="fab fa-github"></i> Entrar com GitHub
        </button>
      </div>
    </div>
  );
};

export default Login;