import React, { useEffect } from 'react';
import { NextPage, GetServerSideProps } from 'next';
import { useSession, getSession } from 'next-auth/client';
import {
  VStack,
  Heading,
  Text,
  useToast,
} from '@chakra-ui/react';
import prisma from '../../lib/prisma';
import Layout from '../../components/Layout';
import ShoppingListCard from '../../features/shopping-list/shopping-list-card';
import { useAppDispatch, useAppSelector } from '../../state/redux-hooks';
import {
  LoadingStates,
  selectDeleteShoppingListLoading,
} from '../../features/shopping-list/shopping-list-duck';
import { ShoppingList } from '../../types';

interface PageProps {
  shoppingLists: ShoppingList[];
}

const PageShoppingList: NextPage<PageProps> = ({ shoppingLists }) => {
  const [session, loading] = useSession();
  const dispatch = useAppDispatch();
  const deleteListLoading = useAppSelector(selectDeleteShoppingListLoading);
  const toast = useToast();

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
        {shoppingLists.map((list) => (
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

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
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
      _count: {
        select: {
          items: true,
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return {
    props: {
      shoppingLists: JSON.parse(JSON.stringify(result)),
    },
  };
};

export default PageShoppingList;
