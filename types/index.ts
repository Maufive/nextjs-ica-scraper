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

export interface Session {
  user?: User;
  expires?: string;
  accessToken?: string;
}

export interface User {
  image?: string;
  name?: string;
  email?: string;
}

export interface Filters {
  categories?: string[] | (() => string[]);
  recipeCount?: number;
  time?: string;
  ids?: string[];
  idToReplace?: string;
  idsToReplace?: string[];
}
