/* eslint-disable react/jsx-props-no-spreading */
import React, {
  useCallback,
  useMemo,
  useEffect,
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
  Icon,
} from '@chakra-ui/react';
import { PlusIcon } from '@heroicons/react/solid';
import { useAppDispatch, useAppSelector } from '../../state/redux-hooks';
import {
  createShoppingList,
  selectCreateShoppingListLoading,
  LoadingStates,
} from './shopping-list-duck';
import { setLockedRecipeIds } from '../grocery-bag/grocery-bag-duck';
import { Recipe, Ingredient } from '../../types/index';
import {
  capitalizeFirstLetter,
  getRandomEmoji,
} from '../../utils';

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
    formState: { errors },
  } = useForm();
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
        title: 'Inloggning krävs',
        description: 'Du måste vara inloggad för att skapa en matkasse.',
        status: 'info',
        duration: 9000,
        isClosable: true,
        position: 'top',
      });
    } else if (lockedRecipeIdsCount !== recipeCount) {
      toast({
        title: `${recipeCount - lockedRecipeIdsCount} olåsta recept`,
        description: 'Samtliga recept måste vara låsta innan en matkasse kan skapas.',
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
    dispatch(setLockedRecipeIds([]));
  }, [ingredients, dispatch]);

  useEffect(() => {
    if (createShoppingListLoading === LoadingStates.SUCCESS) {
      toast({
        title: 'Matkassen har skapats 🎉',
        description: 'Du hittar din matkasse i menyn för Inköpslistor.',
        status: 'success',
        duration: 9000,
        isClosable: true,
        position: 'top',
      });
      onClose();
    }
  }, [toast, createShoppingListLoading]);

  return (
    <>
      <Button
        w={{ base: '100%', lg: 'fit-content' }}
        aria-label="Skapa matkasse"
        leftIcon={<Icon as={PlusIcon} />}
        variant="solid"
        colorScheme="green"
        isActive={isCreateListAllowed}
        onClick={onClickFloatingButton}
      >
        Skapa matkasse
      </Button>
      <Modal
        size="xl"
        onClose={onClose}
        isOpen={isOpen}
        motionPreset="slideInBottom"
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
              placeholder="Namn på din inköpslista..."
              w="100%"
              isRequired
              defaultValue={`${capitalizeFirstLetter(formattedDate)} ${getRandomEmoji()}`}
              {...register('shoppingListTitle', { required: true })}
              autoFocus
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
                        {`(${i.quantity})`}
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
              isLoading={createShoppingListLoading === LoadingStates.PENDING}
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
