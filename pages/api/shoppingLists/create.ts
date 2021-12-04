import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/client';
import prisma from '../../../lib/prisma';
import { ShoppingListItem } from '../../../types';

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req });

  if (!session) {
    console.error('Du måste vara inloggad för att skapa en inköpslista');
    res.statusCode = 403;
    return { message: 'Du måste vara inloggad för att skapa en inköpslista' };
  }

  const {
    title,
    items,
    recipeIds,
  } = req.body;

  const shoppingListItems = items.map((i: ShoppingListItem) => ({
    name: i.name,
    quantity: i.quantity,
  }));

  const result = await prisma.shoppingList.create({
    data: {
      title,
      items: { create: shoppingListItems },
      recipeIds,
      author: { connect: { email: session?.user?.email } },
    },
  });

  console.log(`Successfully saved shopping list: "${title}"`);

  return res.json(result);
}
