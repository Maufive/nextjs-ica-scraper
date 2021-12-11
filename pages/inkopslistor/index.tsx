/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import { NextPage } from 'next';
import { useSession } from 'next-auth/client';
import { VStack, Heading, Text } from '@chakra-ui/react';
import Layout from '../../components/Layout';
import ShoppingListCard from '../../features/shopping-list/shopping-list-card';
import { useAppDispatch, useAppSelector } from '../../state/redux-hooks';
import {
  LoadingStates,
  fetchAllShoppingLists,
  selectShoppingLists,
  selectShoppingListsLoading,
} from '../../features/shopping-list/shopping-list-duck';
import SkeletonCards from '../../features/shopping-list/shopping-list-card-skeletons';

const PageShoppingList: NextPage = () => {
  const [session, loading] = useSession();
  const dispatch = useAppDispatch();
  const shoppingListsLoading = useAppSelector(selectShoppingListsLoading);
  const shoppingLists = useAppSelector(selectShoppingLists);

  useEffect(() => {
    if (shoppingLists.length < 1) {
      dispatch(fetchAllShoppingLists());
    }
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
      <VStack w="100%" px={{ base: 2, md: 4 }}>
        {shoppingListsLoading === LoadingStates.PENDING && (
          <SkeletonCards />
        )}
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
    </Layout>
  );
};

export default PageShoppingList;
