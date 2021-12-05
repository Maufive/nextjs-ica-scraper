import React, { useCallback } from 'react';
import { motion } from 'framer-motion';
import {
  Flex,
  Text,
  Checkbox,
  useColorModeValue,
} from '@chakra-ui/react';

const AnimatedFlex = motion(Flex);

interface Props {
  title: string;
  value: string;
  id: string;
  updateItem: (itemId: string, checked: boolean) => void;
  isDisabled: boolean;
  isChecked: boolean;
}

const ShoppingListItem: React.FC<Props> = ({
  title,
  value,
  id,
  updateItem,
  isDisabled,
  isChecked,
}) => {
  const checkedTitleColor = useColorModeValue('gray.600', 'gray.400');
  const unCheckedTitleColor = useColorModeValue('gray.800', 'gray.100');

  const toggleItem = useCallback(() => {
    updateItem(id, !isChecked);
  }, [updateItem, isChecked, id]);

  return (
    <AnimatedFlex
      exit={{ opacity: 0 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      // layoutId={`list-item-${id}`}
      p={3}
      bg={useColorModeValue('gray.200', 'gray.900')}
      w="100%"
      rounded="md"
      onClick={isDisabled ? undefined : toggleItem}
      cursor={isDisabled && 'not-allowed'}
    >
      <Checkbox
        mr={6}
        size="lg"
        variant="solid"
        colorScheme="green"
        value={value}
        isChecked={isChecked}
      />
      <Flex flex="4">
        <Text
          fontWeight={isChecked ? 400 : 500}
          color={isChecked ? checkedTitleColor : unCheckedTitleColor}
        >
          {title}
        </Text>
      </Flex>
    </AnimatedFlex>
  );
};

export default ShoppingListItem;
