import React, { useState } from 'react';
import {
  Flex,
  Text,
  Checkbox,
  useColorModeValue,
} from '@chakra-ui/react';

interface Props {
  title: string;
  value: string;
  isChecked?: boolean;
}

const ShoppingListItem: React.FC<Props> = ({
  title,
  value,
}) => {
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const checkedTitleColor = useColorModeValue('gray.600', 'gray.400');
  const unCheckedTitleColor = useColorModeValue('gray.800', 'gray.100');

  return (
    <Flex
      p={4}
      bg={useColorModeValue('gray.200', 'gray.900')}
      w="100%"
      rounded="md"
      onClick={() => setIsChecked((prev) => !prev)}
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

export default ShoppingListItem;
