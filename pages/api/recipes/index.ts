import type { NextApiRequest, NextApiResponse } from 'next';
// import { getSession } from 'next-auth/client';
import prisma from '../../../lib/prisma';
import { GROCERY_BAG_INITIAL_FILTERS as INITIAL_FILTERS } from '../../../constants';

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  // const session = await getSession({ req });

  const result = await prisma.recipe.findMany({
    select: {
      id: true,
      imageSrc: true,
      title: true,
      time: true,
    },
  });

  const recipes = result
    .map(() => {
      const randomRecipe = result[Math.floor(Math.random() * result.length)];
      const index = result.indexOf(randomRecipe);
      result.splice(index, 1);
      return randomRecipe;
    })
    .slice(0, INITIAL_FILTERS.recipeCount);

  return res.json(recipes);
}
