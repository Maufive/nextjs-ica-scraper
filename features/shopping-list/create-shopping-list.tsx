/* eslint-disable react/jsx-props-no-spreading */
import React, {
  useCallback, useRef, useMemo, useEffect,
} from 'react';
import { useForm } from 'react-hook-form';
import { useSession } from 'next-auth/client';
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  Box,
  Heading,
  useDisclosure,
  useToast,
  useColorModeValue,
  Input,
  Checkbox,
  VStack,
  Text,
  Flex,
  FormErrorMessage,
} from '@chakra-ui/react';
import FloatingButton from '../../components/floating-button';
import { useAppDispatch, useAppSelector } from '../../state/redux-hooks';
import { createShoppingList, selectCreateShoppingListLoading, LoadingStates } from './shopping-list-duck';
import { Recipe, Ingredient } from '../../types/index';

const EMOJIS = [
  '🧀', '🥦', '🍅',
  '🌶', '🥒', '🍔',
  '🥗', '🌮', '🥪',
  '🍋', '🍎', '🍐',
  '🍉', '🥬', '🥔',
  '🥕', '🥘', '🥙',
  '🍲', '🌯', '🍓',
];

function getRandomEmoji() {
  const index = Math.floor(Math.random() * EMOJIS.length);
  return EMOJIS[index];
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

interface Props {
  isCreateListAllowed: boolean;
  recipeCount: number;
  lockedRecipeIdsCount: number;
  recipes: Recipe[];
}

const CreateShoppingList: React.FC<Props> = ({
  isCreateListAllowed,
  recipeCount,
  lockedRecipeIdsCount,
  recipes,
}) => {
  const today = new Date(Date.now());
  const formattedDate = new Intl.DateTimeFormat('sv-SE', {
    month: 'long',
    weekday: 'long',
    day: 'numeric',
  }).format(today);
  const dispatch = useAppDispatch();
  const createShoppingListLoading = useAppSelector(selectCreateShoppingListLoading);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();
  const initialRef = useRef();
  const [session] = useSession();
  const toast = useToast();
  const {
    isOpen,
    onOpen,
    onClose,
  } = useDisclosure();

  const ingredients: Ingredient[] = useMemo(() => recipes?.map((recipe) => recipe.ingredients)
    .flat()
    .map((ingredient) => ({
      ...ingredient,
      name: capitalizeFirstLetter(ingredient.name),
    }))
    .sort((a, b) => {
      if (a.name < b.name) { return -1; }
      if (a.name > b.name) { return 1; }
      return 0;
    }),
  [recipes]);

  const onClickFloatingButton = useCallback((): void => {
    if (!session?.user) {
      toast({
        title: 'Inloggning krävs.',
        description: 'Du måste vara inloggad för att skapa en inköpslista',
        status: 'info',
        duration: 9000,
        isClosable: true,
        position: 'top',
      });
    } else if (lockedRecipeIdsCount !== recipeCount) {
      toast({
        title: 'Obekräftade recept.',
        description: 'Samtliga recept måste vara bekräftade innan en inköpslista kan skapas.',
        status: 'info',
        duration: 9000,
        isClosable: true,
        position: 'top',
      });
    } else {
      onOpen();
    }
  }, [session, lockedRecipeIdsCount, recipeCount, toast]);

  const onSubmit = useCallback(({ itemNames, shoppingListTitle }): void => {
    const items = ingredients.filter((i) => itemNames.includes(i.name));
    // Look for ingredients with unique receipIds, get those recipeIds
    const recipeIds = ingredients
      .filter((v, i, a) => a.findIndex((t) => (t.recipeId === v.recipeId)) === i)
      .map((i) => i.recipeId);

    const shoppingList = {
      title: shoppingListTitle,
      items,
      recipeIds,
    };

    dispatch(createShoppingList(shoppingList));
  }, [ingredients, dispatch]);

  useEffect(() => {
    if (createShoppingListLoading === LoadingStates.SUCCESS) {
      onClose();
    }
  }, [dispatch, createShoppingListLoading]);

  return (
    <>
      <FloatingButton isActive={isCreateListAllowed} onClick={onClickFloatingButton} />
      <Modal
        size="xl"
        onClose={onClose}
        isOpen={isOpen}
        motionPreset="slideInBottom"
        initialFocusRef={initialRef}
      >
        <ModalOverlay />
        <ModalContent
          rounded="lg"
          bg={useColorModeValue('gray.100', 'gray.800')}
          as="form"
          onSubmit={handleSubmit(onSubmit)}
        >
          <ModalHeader>
            <Heading as="h2" size="md" color={useColorModeValue('gray.700', 'gray.400')}>
              Skapa ny inköpslista
            </Heading>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody py={4}>
            <Input
              mb={6}
              ref={initialRef}
              placeholder="Namn på din inköpslista..."
              w="100%"
              isRequired
              defaultValue={`${capitalizeFirstLetter(formattedDate)} ${getRandomEmoji()}`}
              {...register('shoppingListTitle', { required: true })}
            />
            <FormErrorMessage>
              {errors.name && errors.name.message}
            </FormErrorMessage>
            <Box mb={6} w="100%">
              <VStack align="start" spacing={4}>
                {ingredients?.map((i) => (
                  <Flex
                    key={i.id}
                    align="center"
                    w="100%"
                    borderBottom={1}
                    borderStyle="solid"
                    borderColor="rgba(45, 55, 72, 0.6)"
                    pb={4}
                  >
                    <Checkbox
                      defaultChecked
                      size="lg"
                      colorScheme="green"
                      spacing={4}
                      flex={1}
                      value={i.name}
                      {...register('itemNames')}
                    >
                      {i.name}
                    </Checkbox>
                    {i.quantity && (
                      <Text color="gray.500">
                        (
                        {i.quantity}
                        )
                      </Text>
                    )}
                  </Flex>
                ))}
              </VStack>
            </Box>
          </ModalBody>
          <ModalFooter>
            <Button
              w="100%"
              colorScheme="green"
              isActive
              type="submit"
              isLoading={isSubmitting}
            >
              Skapa inköpslista
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreateShoppingList;
