import React, { useEffect } from 'react';
import { NextPage } from 'next';
import { useSession } from 'next-auth/client';
import {
  VStack,
  Heading,
  Text,
  useToast,
} from '@chakra-ui/react';
import Layout from '../../components/Layout';
import ShoppingListCard from '../../features/shopping-list/shopping-list-card';
import { useAppDispatch, useAppSelector } from '../../state/redux-hooks';
import {
  LoadingStates,
  fetchAllShoppingLists,
  selectShoppingLists,
  selectShoppingListsLoading,
  selectDeleteShoppingListLoading,
} from '../../features/shopping-list/shopping-list-duck';
import SkeletonCards from '../../features/shopping-list/shopping-list-card-skeletons';

const PageShoppingList: NextPage = () => {
  const [session, loading] = useSession();
  const dispatch = useAppDispatch();
  const shoppingListsLoading = useAppSelector(selectShoppingListsLoading);
  const deleteListLoading = useAppSelector(selectDeleteShoppingListLoading);
  const shoppingLists = useAppSelector(selectShoppingLists);
  const toast = useToast();

  useEffect(() => {
    dispatch(fetchAllShoppingLists());
  }, [dispatch]);

  useEffect(() => {
    if (deleteListLoading === LoadingStates.SUCCESS) {
      toast({
        title: 'Inköpslistan har tagits bort',
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: 'top',
      });
    }
  }, [dispatch, deleteListLoading, toast]);

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
      <VStack
        align="flex-start"
        w="100%"
        px={{ base: 2, md: 4 }}
        py={6}
      >
        <Heading fontSize="2xl" marginBottom={2}>Mina inköpslistor</Heading>
        {shoppingListsLoading === LoadingStates.PENDING && (
          <SkeletonCards />
        )}
        {shoppingListsLoading === LoadingStates.SUCCESS && shoppingLists.map((list) => (
          <ShoppingListCard
            key={list.id}
            title={list.title}
            itemCount={list._count.items}
            id={list.id}
          />
        ))}
      </VStack>
    </Layout>
  );
};

export default PageShoppingList;
