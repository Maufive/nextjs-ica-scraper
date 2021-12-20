import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/client';
import prisma from '../../../lib/prisma';

// DELETE /api/shoppingLists/:id
export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  const shoppingListId = req.query.id;

  const session = await getSession({ req });

  if (req.method === 'DELETE') {
    if (session) {
      const shoppingList = await prisma.shoppingList.delete({
        where: { id: String(shoppingListId) },
      });
      res.json(shoppingList);
    } else {
      res.status(401).send({ message: 'Unauthorized' });
    }
  } else {
    throw new Error(
      `The HTTP ${req.method} method is not supported at this route.`,
    );
  }
}
