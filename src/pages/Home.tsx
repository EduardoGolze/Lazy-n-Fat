import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import '../styles/Home.css';

const Home = () => {
  const { user } = useAuth();

  return (
    <div className="home-container">
      <div className="hero">
        <div className="hero-content">
          <h1>Transforme Sua Alimentação</h1>
          <p className="hero-text">
            {user 
              ? `Bem-vindo de volta, ${user.displayName || 'usuário'}!`
              : 'Sua jornada para uma vida saudável começa aqui'
            }
          </p>
        </div>
      </div>

      <div className="features container">
        <Link to="/food" className="feature-card">
          <div className="feature-icon">🥑</div>
          <div className="feature-text">
            <h3>Análise Nutricional</h3>
            <p>Descubra os valores caloricos de qualquer alimento</p>
          </div>
        </Link>

        <Link to="/recipes" className="feature-card">
          <div className="feature-icon">🍽️</div>
          <div className="feature-text">
            <h3>Receitas Saudáveis</h3>
            <p>Explore receitas equilibradas para seu estilo de vida</p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Home;