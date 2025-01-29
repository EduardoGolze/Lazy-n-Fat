import { useState } from 'react';
import { searchFood } from '../services/FoodApi';
import '../styles/FoodSearch.css';

const FoodSearch = () => {
  const [query, setQuery] = useState('');
  const [quantity, setQuantity] = useState(100);
  const [results, setResults] = useState<any[]>([]);

  const handleSearch = async () => {
    if (!query.trim()) return;
    
    try {
      const data = await searchFood(query);
      setResults(data.map(item => ({
        ...item,
        baseQuantity: 100
      })));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="food-search">
      <h2>Pesquisa Nutricional</h2>
      <div className="search-controls">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Ex: arroz, frango..."
        />
        <div className="quantity-control">
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            min="1"
          />
          <span>gramas</span>
        </div>
        <button onClick={handleSearch}>Buscar</button>
      </div>
      <p className="disclaimer">
        Valores de referência: 100g. Insira a quantidade desejada para cálculo preciso.
      </p>
      <div className="results">
        {results.map((item, index) => (
          <div key={index} className="food-card">
            <h3>{item.food.label}</h3>
            <div className="nutrition-info">
              <div>
                <span className="quantity">{quantity}g contém:</span>
                <span className="calories">
                  {Math.round(item.food.nutrients.ENERC_KCAL * (quantity/100))} kcal
                </span>
              </div>
              <div className="nutrients">
                <span>Proteínas: {Math.round(item.food.nutrients.PROCNT * (quantity/100))}g</span>
                <span>Carboidratos: {Math.round(item.food.nutrients.CHOCDF * (quantity/100))}g</span>
                <span>Gorduras: {Math.round(item.food.nutrients.FAT * (quantity/100))}g</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FoodSearch;