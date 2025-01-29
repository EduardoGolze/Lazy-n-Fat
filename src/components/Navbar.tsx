import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import leafIcon from '/src/assets/icone.png';
import '../styles/Navbar.css';

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="navbar">
      <Link to="/" className="logo">
        <img 
          src={leafIcon}
          alt="Ícone Folha" 
          className="logo-icon"
        />
        <span className="logo-text">Lazy'n Fat</span>
      </Link>
      
      <div className="nav-links">
        {user ? (
          <>
            <Link to="/food" className="nav-item">Alimentos</Link>
            <Link to="/recipes" className="nav-item">Receitas</Link>
            <button onClick={logout} className="logout-btn">Sair</button>
          </>
        ) : (
          <Link to="/login" className="nav-item">Login</Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;