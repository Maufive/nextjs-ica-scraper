export interface Ingredient {
  quantity: string;
  name: string;
}

export interface Recipe {
  title: string;
  description: string | null;
  imageSrc: string | null;
  rating: string;
  ratings: string;
  time: string;
  difficulty: string;
  amountOfIngredients: string;
  ingredients: Ingredient[];
  url: string;
  categories: string[];
  id: string;
  steps?: string[];
}

export interface ShoppingListItem {
  name: string;
  quantity: string | null;
  recipeId: string;
}

export interface ShoppingList {
  title: string;
  items: ShoppingListItem[];
  recipeIds: string[];
}
