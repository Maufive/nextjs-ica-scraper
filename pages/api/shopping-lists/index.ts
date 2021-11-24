import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/client';
import prisma from '../../../lib/prisma';

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req });

  if (!session) {
    res.statusCode = 403;
    return { props: { shoppingLists: [] } };
  }

  const result = await prisma.shoppingList.findMany({
    where: {
      author: { email: session.user.email },
    },
    include: {
      recipes: {
        select: {
          title: true,
          imageSrc: true,
          id: true,
        },
      },
      ingredients: {
        select: {
          quantity: true,
          name: true,
          id: true,
        },
      },
    },
  });

  return res.json(result);
}
