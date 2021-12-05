/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { NextPage, GetServerSideProps } from 'next';
import {
  Heading, VStack, Flex,
} from '@chakra-ui/react';
import Layout from '../../components/Layout';
import { ShoppingList } from '../../types';
import prisma from '../../lib/prisma';
import ShoppingListItem from '../../features/shopping-list/shopping-list-item';

interface PageProps {
  shoppingList: ShoppingList;
}

const ShoppingListPage: NextPage<PageProps> = ({ shoppingList }) => {
  const [isUpdateLoading, setIsUpdateLoading] = useState<boolean>(false);

  const updateShoppingListItem = async (itemId: string, checked: boolean) => {
    setIsUpdateLoading(true);
    const url = `/api/shoppingLists/updateListItem?id=${itemId}&checked=${checked}`;
    await fetch(url, {
      method: 'PATCH',
    }).then((res) => res.json());
    setIsUpdateLoading(false);
  };

  return (
    <Layout>
      <Flex direction="column" w="100%">
        <Heading fontSize="2xl" mb={6}>{shoppingList.title}</Heading>
        {/* <HStack
        flexWrap="nowrap"
        overflowX="auto"
        spacing={4}
        align="flex-start"
        paddingBottom={4}
        css={{
          scrollSnapType: 'x mandatory',
        }}
      >
        {shoppingList.recipes.map((recipe) => (
          <Flex
            key={recipe.id}
            flexDirection="column"
            flex="0 0 150px"
            bg={useColorModeValue('gray.50', 'gray.900')}
            boxShadow={{ base: '2xl', lg: 'md' }}
            rounded="md"
            p={{ base: 2, lg: 4 }}
            overflow="hidden"
            h="100%"
            css={{
              scrollSnapAlign: 'start',
            }}
          >
            <Box
              h="100px"
              bg="gray.100"
              mt={-6}
              mx={-6}
              mb={4}
              pos="relative"
            >
              <Image
                src={recipe.imageSrc}
                layout="fill"
                objectFit="cover"
                priority
              />
            </Box>
            <Text fontSize="sm">{recipe.title}</Text>
          </Flex>
        ))}
      </HStack> */}
        <VStack spacing={2} align="flex-start">
          {shoppingList.items.map((item) => (
            <ShoppingListItem
              key={item.id}
              title={item.name}
              value={item.name}
              id={item.id}
              updateItem={updateShoppingListItem}
              initialChecked={item.checked}
              isDisabled={isUpdateLoading}
            />
          ))}
        </VStack>
      </Flex>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const result = await prisma.shoppingList.findUnique({
    where: {
      id: String(params?.id),
    },
    include: {
      items: {
        orderBy: { name: 'asc' },
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

  return {
    props: {
      shoppingList: JSON.parse(JSON.stringify(result)),
    },
  };
};

export default ShoppingListPage;
