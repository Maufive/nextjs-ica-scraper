import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/client';
import prisma from '../../../lib/prisma';
import { ShoppingListItem } from '../../../types';

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req });

  if (!session) {
    console.error('Du måste vara inloggad för att uppdatera en inköpslista');
    res.statusCode = 403;
    return { message: 'Du måste vara inloggad för att uppdatera en inköpslista' };
  }

  const data = JSON.parse(req.body);

  console.log('Starting update on shopping list', data.shoppingListId);

  const {
    shoppingListId,
    itemsToAdd,
    recipeIds,
  } = data;

  const shoppingListItems = itemsToAdd.map((i: ShoppingListItem) => ({
    name: i.name,
    quantity: i.quantity,
    shoppingListId,
  }));

  const createdShoppingListItems = await prisma.shoppingListItem.createMany({
    data: shoppingListItems,
  });

  const updatedShoppingList = await prisma.shoppingList.update({
    where: {
      id: String(shoppingListId),
    },
    data: {
      recipeIds,
    },
  });

  console.log(`Successfully created ${shoppingListItems.length} shoppinglist items`);
  console.log(`Successfully updated shopping list: "${shoppingListId}"`);

  return res.json({
    createdShoppingListItems,
    updatedShoppingList,
  });
}
