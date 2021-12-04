/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import { NextPage } from 'next';
import { useSession } from 'next-auth/client';
import { VStack, Heading, Text } from '@chakra-ui/react';
// import prisma from '../../lib/prisma';
import Layout from '../../components/Layout';
// import ShoppingListContainer from '../../features/shopping-list/shopping-list-container';
import ShoppingListCard from '../../features/shopping-list/shopping-list-card';
import { ShoppingList } from '../../types';
import { useAppDispatch, useAppSelector } from '../../state/redux-hooks';
import {
  LoadingStates,
  fetchAllShoppingLists,
  selectShoppingLists,
  selectShoppingListsLoading,
  clearShoppingList,
} from '../../features/shopping-list/shopping-list-duck';

interface PageProps {
  initialShoppingLists: ShoppingList[];
}

const PageShoppingList: NextPage<PageProps> = () => {
  const [session, loading] = useSession();
  const dispatch = useAppDispatch();
  const shoppingListsLoading = useAppSelector(selectShoppingListsLoading);
  const shoppingLists = useAppSelector(selectShoppingLists);

  useEffect(() => {
    dispatch(fetchAllShoppingLists());
  }, [dispatch]);

  useEffect(() => {
    dispatch(clearShoppingList());
  }, [dispatch]);

  if (loading) {
    return (
      <Layout>
        <VStack>
          <Heading>Verifierar inloggning...</Heading>
        </VStack>
      </Layout>
    );
  }

  if (!session) {
    return (
      <Layout>
        <VStack>
          <Heading>Mina inköpslistor</Heading>
          <Text>Du måste vara inloggad för att se dina inköpslistor</Text>
        </VStack>
      </Layout>
    );
  }

  return (
    <Layout>
      <VStack w="100%">
        {shoppingListsLoading === LoadingStates.SUCCESS && shoppingLists.map((list) => (
          <ShoppingListCard
            key={list.id}
            title={list.title}
            // eslint-disable-next-line no-underscore-dangle
            itemCount={list._count.items}
            id={list.id}
          />
        ))}
      </VStack>
      {/* <ShoppingListContainer /> */}
    </Layout>
  );
};

// export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
//   const session = await getSession({ req });

//   if (!session) {
//     res.statusCode = 403;
//     return { props: { initialShoppingLists: [] } };
//   }

//   const result = await prisma.shoppingList.findMany({
//     where: {
//       author: { email: session.user.email },
//     },
//     include: {
//       items: true,
//       recipes: {
//         select: {
//           title: true,
//           imageSrc: true,
//           url: true,
//         },
//       },
//     },
//   });

//   const initialShoppingLists = result.map((s) => ({
//     ...s,
//     createdAt: Date.parse(s.createdAt.toString()),
//   }));

//   return {
//     props: {
//       initialShoppingLists,
//     },
//   };
// };

export default PageShoppingList;
