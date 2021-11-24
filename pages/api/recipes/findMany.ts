import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';

function randomNoRepeats(array) {
  let copy = array.slice(0);
  return () => {
    if (copy.length < 1) { copy = array.slice(0); }
    const index = Math.floor(Math.random() * copy.length);
    const item = copy[index];
    copy.splice(index, 1);
    return item;
  };
}

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
    include: {
      ingredients: true,
    },
  });

  const filteredResults = result
    .filter((item) => currentlyShowingRecipeIds.indexOf(item.id) === -1);

  const chooser = randomNoRepeats(filteredResults);

  const recipes = filteredResults.map(() => chooser()).slice(0, recipeCount);

  return res.json(recipes);
}
