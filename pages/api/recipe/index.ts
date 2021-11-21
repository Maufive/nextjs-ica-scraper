import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  const {
    ids,
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
  });

  const filteredResult = result.filter((item) => ids.indexOf(item.id) === -1);
  const randomRecipe = filteredResult[Math.floor(Math.random() * filteredResult.length)];

  return res.json(randomRecipe);
}
