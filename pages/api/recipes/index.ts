import type { NextApiRequest, NextApiResponse } from 'next';
// import { getSession } from 'next-auth/client';
import prisma from '../../../lib/prisma';

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  // const session = await getSession({ req });
  const result = await prisma.recipe.findMany({
    include: {
      ingredients: true,
    },
  });

  console.log(result);
  return res.json(result);
}
