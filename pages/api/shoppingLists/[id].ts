import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  const shoppingList = await prisma.shoppingList.findUnique({
    where: {
      id: String(req.query.id),
    },
    include: {
      items: {
        orderBy: { name: 'desc' }
      },
      recipes: {
        select: {
          title: true,
          imageSrc: true,
          url: true,
          id: true,
        },
      },
    },
  });

  // shoppingList.createdAt = Date.parse(shoppingList.createdAt.toString());
  // shoppingList.items.sort((a, b) => {
  //   if (a.name < b.name) { return -1; }
  //   if (a.name > b.name) { return 1; }
  //   return 0;
  // });

  return res.json(shoppingList);
}
