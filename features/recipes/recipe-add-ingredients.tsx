import React from 'react';
import {
  ModalBody,
  Button,
  Text,
  VStack,
  Box,
  Flex,
  Checkbox,
} from '@chakra-ui/react';
import { Ingredient } from '../../types';

interface Props {
  ingredients: Ingredient[];
  register: (name: string) => void;
  handleSubmit: (callback: ({ itemNames }: { itemNames: string[] }) => void) =>
  React.FormEventHandler<HTMLDivElement>;
  onSubmit: ({ itemNames }: { itemNames: string[] }) => void;
}

const AddIngredientsStep: React.FC<Props> = ({
  ingredients, register, handleSubmit, onSubmit,
}) => (
  <>
    <ModalBody
      py={4}
      as="form"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Box w="100%">
        <VStack align="start" spacing={4}>
          {ingredients.map((i) => (
            <Flex
              key={i.id}
              align="center"
              w="100%"
              borderBottom={1}
              borderStyle="solid"
              borderColor="rgba(45, 55, 72, 0.6)"
              pb={4}
              _last={{ border: 'none' }}
            >
              <Checkbox
                defaultChecked
                size="lg"
                colorScheme="green"
                spacing={4}
                flex={1}
                value={i.name}
                  // eslint-disable-next-line react/jsx-props-no-spreading
                {...register('itemNames')}
              >
                {i.name}
              </Checkbox>
              {i.quantity && (
                <Text color="gray.500">
                  {`(${i.quantity})`}
                </Text>
              )}
            </Flex>
          ))}
        </VStack>
      </Box>
      <Button
        marginTop={8}
        w="100%"
        colorScheme="green"
        isActive
        type="submit"
      >
        Välj inköpslista
      </Button>
    </ModalBody>
  </>
);

export default AddIngredientsStep;
