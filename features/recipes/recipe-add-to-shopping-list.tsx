import React from 'react';
import {
  ModalBody,
  Text,
  VStack,
  Box,
  Flex,
  Center,
  Icon,
  useColorModeValue,
} from '@chakra-ui/react';
import { ClipboardListIcon } from '@heroicons/react/solid';
import { ShoppingList } from '../../types';

interface Props {
  shoppingLists: ShoppingList[];
  onSelectShoppingList: (id: string, recipeIds: string[]) => void;
}

const AddToShoppingListStep: React.FC<Props> = ({
  shoppingLists,
  onSelectShoppingList,
}) => (
  <>
    <ModalBody py={4}>
      <Box w="100%">
        <Text
          as="h2"
          fontSize="xl"
          fontWeight={700}
          marginBottom={6}
        >
          Välj inköpslista
        </Text>
        <VStack align="start" spacing={4}>
          {shoppingLists.map((shoppingList) => (
            <Flex
              key={shoppingList.id}
              align="center"
              w="100%"
              borderBottom={1}
              borderStyle="solid"
              borderColor="rgba(45, 55, 72, 0.6)"
              pb={4}
              _last={{ border: 'none' }}
              onClick={() => onSelectShoppingList(shoppingList.id, shoppingList.recipeIds)}
            >

              <Center rounded="full" bg="green.100" p={2}>
                <Icon as={ClipboardListIcon} color="green.600" bg="green.100" w={6} h={6} rounded="full" />
              </Center>
              <Flex
                flex="2"
                flexDirection="column"
                align="flex-start"
                justify="space-around"
                marginLeft={4}
              >
                <Text fontWeight={700}>
                  {shoppingList.title}
                </Text>
                <Text
                  fontWeight={500}
                  fontSize="sm"
                  margin="0"
                  color={useColorModeValue('gray.500', 'gray.400')}
                >
                  {`${shoppingList._count.items} varor`}
                </Text>
              </Flex>
            </Flex>
          ))}
        </VStack>
      </Box>
    </ModalBody>
  </>
);

export default AddToShoppingListStep;
