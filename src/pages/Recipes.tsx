import { useEffect, useState } from 'react';
import { searchRecipes } from '../services/recipeApi';
import RecipeCard from '../components/RecipeCard';
import '../styles/Recipes.css';

const Recipes = () => {
  const [recipes, setRecipes] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('healthy');
  const [loading, setLoading] = useState(true);

  const handleSearch = async () => {
    setLoading(true);
    try {
      const data = await searchRecipes(searchTerm);
      setRecipes(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleSearch();
  }, []);

  return (
    <div className="recipes-page container">
      <div className="search-header">
        <h2>Receitas Saudáveis</h2>
        <div className="search-box">
          <input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar receitas em inglês..."
          />
          <button onClick={handleSearch} disabled={loading}>
            {loading ? 'Buscando...' : 'Buscar'}
          </button>
        </div>
        <p className="language-note">
          Para melhores resultados, busque em inglês (ex: chicken, salad)
        </p>
      </div>

      <div className="recipes-grid">
        {recipes.map((recipe, index) => (
          <RecipeCard
            key={index}
            title={recipe.recipe.label}
            calories={recipe.recipe.calories}
            image={recipe.recipe.image}
            url={recipe.recipe.url}
          />
        ))}
      </div>
    </div>
  );
};

export default Recipes;