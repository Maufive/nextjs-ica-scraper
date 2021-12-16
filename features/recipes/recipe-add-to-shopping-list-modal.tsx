import React, {
  useState, useMemo, useEffect, useCallback,
} from 'react';
import { useForm } from 'react-hook-form';
import { useSession } from 'next-auth/client';
import {
  Button,
  ModalOverlay,
  ModalHeader,
  ModalContent,
  ModalCloseButton,
  Modal,
  useColorModeValue,
  Heading,
  Box,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import AddIngredientsStep from './recipe-add-ingredients';
import AddToShoppingListStep from './recipe-add-to-shopping-list';
import { Ingredient } from '../../types';
import {
  capitalizeFirstLetter,
} from '../../utils';
import { useAppDispatch, useAppSelector } from '../../state/redux-hooks';
import {
  selectShoppingLists,
  fetchAllShoppingLists,
  updateShoppingList,
  selectUpdateShoppingListLoading,
  LoadingStates,
} from '../shopping-list/shopping-list-duck';

const Steps = {
  INGREDIENTS: 'ingredients',
  SHOPPINGLIST: 'shoppingList',
};

interface Props {
  ingredients: Ingredient[];
  recipeId: string;
}

const AddToShoppingListModal: React.FC<Props> = ({ ingredients, recipeId }) => {
  const dispatch = useAppDispatch();
  const toast = useToast();
  const shoppingLists = useAppSelector(selectShoppingLists);
  const updateShoppingListLoading = useAppSelector(selectUpdateShoppingListLoading);
  const [step, setStep] = useState<string>(Steps.INGREDIENTS);
  const [itemsToAdd, setItemsToAdd] = useState<Ingredient[]>([]);
  const {
    register,
    handleSubmit,
  } = useForm();
  const [session] = useSession();
  const {
    isOpen,
    onOpen,
    onClose,
  } = useDisclosure();

  useEffect(() => {
    dispatch(fetchAllShoppingLists());
  }, [dispatch]);

  useEffect(() => {
    if (updateShoppingListLoading === LoadingStates.SUCCESS) {
      toast({
        title: 'Inköpslistan har uppdaterats',
        description: 'Dina varor har sparats i din inköpslista',
        status: 'success',
        duration: 9000,
        isClosable: true,
        position: 'top',
      });
      onClose();
    }
  }, [toast, updateShoppingListLoading]);

  const preparedIngredients: Ingredient[] = useMemo(() => ingredients
    .flat()
    .map((ingredient) => ({
      ...ingredient,
      name: capitalizeFirstLetter(ingredient.name),
    }))
    .sort((a, b) => {
      if (a.name < b.name) { return -1; }
      if (a.name > b.name) { return 1; }
      return 0;
    }), [ingredients]);

  const onSubmitIngredients = ({ itemNames }: { itemNames: string[] }) => {
    const items = preparedIngredients.filter((i) => itemNames.includes(i.name));
    setItemsToAdd(items);
    setStep(Steps.SHOPPINGLIST);
  };

  const onSelectShoppingList = useCallback((shoppingListId, currentRecipeIds) => {
    const recipeIds = [...currentRecipeIds, recipeId];
    dispatch(updateShoppingList({
      shoppingListId,
      itemsToAdd,
      recipeIds,
    }));
  }, [dispatch, itemsToAdd, recipeId]);

  const onCloseModal = () => {
    setItemsToAdd([]);
    setStep(Steps.INGREDIENTS);
    onClose();
  };

  return (
    <>
      <Box px={{ base: 2, md: 4 }}>
        <Button
          w={{ base: '100%', lg: '200px' }}
          isActive={!!session?.user}
          colorScheme="green"
          onClick={onOpen}
        >
          Lägg till varor i inköpslista
        </Button>
      </Box>

      <Modal
        size="lg"
        onClose={onCloseModal}
        isOpen={isOpen}
        motionPreset="slideInBottom"
      >
        <ModalOverlay />
        <ModalContent
          rounded="lg"
          bg={useColorModeValue('gray.100', 'gray.800')}
        >
          <ModalHeader>
            <Heading as="h2" size="md" color={useColorModeValue('gray.700', 'gray.400')}>
              Lägg till varor i inköpslista
            </Heading>
          </ModalHeader>
          <ModalCloseButton onClick={onCloseModal} />

          {/* MODAL CONTENT */}
          {step === Steps.INGREDIENTS && (
            <AddIngredientsStep
              ingredients={preparedIngredients}
              register={register}
              handleSubmit={handleSubmit}
              onSubmit={onSubmitIngredients}
            />
          )}
          {step === Steps.SHOPPINGLIST && (
            <AddToShoppingListStep
              shoppingLists={shoppingLists}
              onSelectShoppingList={onSelectShoppingList}
            />
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddToShoppingListModal;
