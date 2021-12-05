import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { AnimatePresence } from 'framer-motion';
import {
  VStack, Flex, Heading, Text, useColorModeValue, Icon, Box,
} from '@chakra-ui/react';
import { BookOpenIcon } from '@heroicons/react/solid';
import { ShoppingList } from '../../types';
import ShoppingListItem from './shopping-list-item';

interface Props {
  shoppingList: ShoppingList
}

const ShoppingListContainer: React.FC<Props> = ({ shoppingList: { items, title, recipes } }) => {
  const [isUpdateLoading, setIsUpdateLoading] = useState<boolean>(false);
  const [unCheckedItems, setUncheckedItems] = useState(items.filter((i) => !i.checked));
  const [checkedItems, setCheckedItems] = useState(items.filter((i) => i.checked));

  const updateShoppingListItem = async (itemId: string, checked: boolean) => {
    if (checked) {
      const item = items.find((i) => i.id === itemId);
      setUncheckedItems((prev) => prev.filter((i) => i.id !== item.id));
      setCheckedItems((prev) => [...prev, item]);
    } else {
      const item = items.find((i) => i.id === itemId);
      setCheckedItems((prev) => prev.filter((i) => i.id !== item.id));
      setUncheckedItems((prev) => [...prev, item]);
    }

    setIsUpdateLoading(true);

    const url = `/api/shoppingLists/updateListItem?id=${itemId}&checked=${checked}`;
    await fetch(url, {
      method: 'PATCH',
    }).then((res) => res.json());
    setIsUpdateLoading(false);
  };

  const showUncheckedItems: boolean = unCheckedItems.length > 0;
  const showCheckedItems: boolean = checkedItems.length > 0;

  return (
    <Flex direction="column" w="100%">
      <Heading fontSize="2xl" mb={6}>{title}</Heading>
      {showUncheckedItems && (
        <Flex direction="column" w="100%" mb={5}>
          <Text
            fontSize="sm"
            textTransform="uppercase"
            fontWeight="700"
            py={3}
          >
            Varor
          </Text>
          <VStack spacing={2} align="flex-start" w="100%">
            <AnimatePresence>
              {unCheckedItems.map((item) => (
                <ShoppingListItem
                  key={item.id}
                  title={item.name}
                  value={item.name}
                  id={item.id}
                  updateItem={updateShoppingListItem}
                  isDisabled={isUpdateLoading}
                  isChecked={false}
                />
              ))}
            </AnimatePresence>
          </VStack>
        </Flex>
      )}
      {showCheckedItems && (
        <Flex direction="column" align="start" w="100%" mb={5}>
          <Flex
            pos="sticky"
            top="-1px"
            zIndex="2"
            py={3}
            w="100%"
            bg={useColorModeValue('gray.100', 'gray.800')}
            align="flex-end"
          >
            <Heading size="md" mr={2}>
              Handlat
            </Heading>
            <Text fontSize="sm" color={useColorModeValue('gray.400', 'gray.400')}>
              {`(${checkedItems.length}) st`}
            </Text>
          </Flex>
          <VStack spacing={2} align="flex-start" w="100%">
            <AnimatePresence>
              {checkedItems.map((item) => (
                <ShoppingListItem
                  key={item.id}
                  title={item.name}
                  value={item.name}
                  id={item.id}
                  updateItem={updateShoppingListItem}
                  isDisabled={isUpdateLoading}
                  isChecked
                />
              )).reverse()}
            </AnimatePresence>
          </VStack>
        </Flex>
      )}
      <Flex direction="column" w="100%" mb={5}>
        <Flex align="center" py={3}>
          <Heading size="md" mr={2}>
            Tillagda recept
          </Heading>
          <Icon as={BookOpenIcon} ml={1} h={5} w={5} />
        </Flex>
        <VStack spacing={2} align="flex-start" w="100%">
          {recipes.map((recipe) => (
            <Link passHref href={`/recept/${recipe.id}`}>
              <Flex
                key={recipe.id}
                rounded="md"
                justify="space-between"
                w="100%"
                bg={useColorModeValue('gray.100', 'gray.900')}
                p={1}
              >
                <Flex p={2} flex="1">
                  <Text fontSize="sm">{recipe.title}</Text>
                </Flex>
                <Box
                  h="60px"
                  w="60px"
                  bg="gray.100"
                  pos="relative"
                >
                  <Image
                    src={recipe.imageSrc}
                    layout="fill"
                    objectFit="cover"
                    priority
                  />
                </Box>
              </Flex>
            </Link>
          ))}
        </VStack>
      </Flex>
    </Flex>
  );
};

export default ShoppingListContainer;
