import type { NextApiRequest, NextApiResponse } from 'next';
// import { getSession } from 'next-auth/client';
import prisma from '../../../lib/prisma';

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  // const session = await getSession({ req });

  const result = await prisma.recipe.findMany({
    take: 4,
    include: {
      ingredients: true,
    },
  });

  // const recipes = result
  //   .map(() => {
  //     const randomRecipe = result[Math.floor(Math.random() * result.length)];
  //     const index = result.indexOf(randomRecipe);
  //     result.splice(index, 1);
  //     return randomRecipe;
  //   })
  //   .slice(0, INITIAL_RECIPE_COUNT);

  return res.json(result);
}
