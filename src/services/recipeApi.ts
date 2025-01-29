import axios from 'axios';
import { translateText } from './translate';

interface RecipeApiResponse {
  hits: {
    recipe: {
      label: string;
      calories: number;
      image: string;
      url: string;
    };
  }[];
}

export const searchRecipes = async (query: string = 'saudável') => {
  const translatedQuery = await translateText(query, 'en'); 
  try {
    const response = await axios.get<RecipeApiResponse>(
      'https://api.edamam.com/search',
      {
        params: {
          q: translatedQuery,
          app_id: import.meta.env.VITE_EDAMAM_RECIPE_APP_ID,
          app_key: import.meta.env.VITE_EDAMAM_RECIPE_APP_KEY,
          from: 0,
          to: 12,
        },
      }
    );
    return response.data.hits;
  } catch (error) {
    console.error('Erro ao buscar receitas:', error);
    throw error;
  }
};