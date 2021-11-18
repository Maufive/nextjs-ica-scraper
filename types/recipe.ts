export interface Ingredient {
  amount: string;
  name: string;
}

export interface Recipe {
  title: string;
  description: string | null;
  imageSrc: string | null;
  ratings: string;
  time: string;
  difficulty: string;
  amountOfIngredients: string;
  ingredients: Ingredient[];
  url: string;
  categories: string[];
  id: string;
}
