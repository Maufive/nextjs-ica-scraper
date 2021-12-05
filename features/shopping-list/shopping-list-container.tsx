import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import {
  VStack, Flex, Heading, Text, useColorModeValue,
} from '@chakra-ui/react';
import { ShoppingList } from '../../types';
import ShoppingListItem from './shopping-list-item';

interface Props {
  shoppingList: ShoppingList
}

const ShoppingListContainer: React.FC<Props> = ({ shoppingList: { items, title } }) => {
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
        <Flex direction="column" w="100%" mb={4}>
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
        <Flex direction="column" align="start" w="100%" mb={4}>
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
    </Flex>
  );
};

export default ShoppingListContainer;
