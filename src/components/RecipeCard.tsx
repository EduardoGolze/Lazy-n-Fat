import '../styles/RecipeCard.css';

interface RecipeCardProps {
  title: string;
  calories: number;
  image: string;
  url: string;
}

const RecipeCard = ({ title, calories, image, url }: RecipeCardProps) => {
  return (
    <div className="recipe-card">
      <div className="card-image">
        <img src={image || '/placeholder-food.jpg'} alt={title} />
      </div>
      <div className="card-content">
        <h3>{title}</h3>
        <div className="card-details">
          <span className="calories">{Math.round(calories)} kcal</span>
          <a href={url} target="_blank" rel="noopener noreferrer" className="recipe-btn">
            Ver Receita
          </a>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;