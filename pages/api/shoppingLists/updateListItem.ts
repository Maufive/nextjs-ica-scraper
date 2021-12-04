import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  const shoppingListItemId = req.query.id;
  const shoppingListItemValue = req.query.checked;

  const updatedShoppingListItem = await prisma.shoppingListItem.update({
    where: {
      id: String(shoppingListItemId),
    },
    data: {
      checked: Boolean(shoppingListItemValue),
    },
  });

  return res.json(updatedShoppingListItem);
}
