import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  const {
    ids: currentlyShowingRecipeIds,
    recipeCount,
    categories,
    time,
  } = req.body;

  const filters = {
    ...(time) && { time: { equals: time } },
    ...(categories) && { categories: { hasSome: categories } },
  };

  const result = await prisma.recipe.findMany({
    where: {
      ...filters,
    },
    select: {
      id: true,
      imageSrc: true,
      title: true,
      time: true,
    },
  });

  const filteredResults = result
    .filter((item) => currentlyShowingRecipeIds.indexOf(item.id) === -1);
  const recipes = filteredResults.map(() => {
    // Find a random recipe in the filtered results
    const randomRecipe = filteredResults[Math.floor(Math.random() * filteredResults.length)];
    // Remove that recipe from the filtered results so it cannot be picked again
    // Start by finding the randomRecipe index in the list of elgible recipes
    const index = filteredResults.indexOf(randomRecipe);
    filteredResults.splice(index, 1);
    return randomRecipe;
    // Only return the requested amount of recipes
  }).slice(0, recipeCount);

  return res.json(recipes);
}
