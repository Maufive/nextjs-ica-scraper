export interface Ingredient {
  quantity: string;
  name: string;
  recipeId: string;
  id: string;
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
  id: string;
  checked?: boolean;
}

export interface ShoppingList {
  title: string;
  items: ShoppingListItem[];
  recipeIds: string[];
  id?: string;
  recipes?: Recipe[];
  _count?: any;
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
