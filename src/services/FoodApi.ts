import axios from 'axios';
import { translateText } from './translate';

interface Food {
  foodId: string;
  label: string;
  nutrients: {
    ENERC_KCAL: number;
  };
}

export interface FoodApiResponse {
  hints: {
    food: Food;
  }[];
}

export const searchFood = async (query: string) => {
  try {
    const response = await axios.get<FoodApiResponse>(
      'https://api.edamam.com/api/food-database/v2/parser',
      {
        params: {
          app_id: import.meta.env.VITE_EDAMAM_FOOD_APP_ID,
          app_key: import.meta.env.VITE_EDAMAM_FOOD_APP_KEY,
          ingr: query, 
          nutrition_type: 'logging',
        },
      }
    );
    return response.data.hints;
  } catch (error) {
    console.error('Erro na busca de alimentos:', error);
    throw error;
  }
};