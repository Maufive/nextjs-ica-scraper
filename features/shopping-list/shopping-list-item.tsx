import React, { useState, useCallback } from 'react';
import {
  Flex,
  Text,
  Checkbox,
  useColorModeValue,
} from '@chakra-ui/react';

interface Props {
  title: string;
  value: string;
  id: string;
  initialChecked?: boolean;
  updateItem: (itemId: string, checked: boolean) => void;
  isDisabled: boolean;
}

const ShoppingListItem: React.FC<Props> = ({
  title,
  value,
  id,
  updateItem,
  initialChecked,
  isDisabled,
}) => {
  const [isChecked, setIsChecked] = useState<boolean>(initialChecked);
  const checkedTitleColor = useColorModeValue('gray.600', 'gray.400');
  const unCheckedTitleColor = useColorModeValue('gray.800', 'gray.100');

  const toggleItem = useCallback(() => {
    setIsChecked((prev) => !prev);
    updateItem(id, !isChecked);
  }, [updateItem, isChecked, id]);

  return (
    <Flex
      p={4}
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
    </Flex>
  );
};

ShoppingListItem.defaultProps = {
  initialChecked: false,
};

export default ShoppingListItem;
