import type { NextApiRequest, NextApiResponse } from 'next';
// import { getSession } from 'next-auth/client';
import prisma from '../../../lib/prisma';

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

  const items = result.slice(0, 3);

  return res.json(items);
}
