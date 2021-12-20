import React, { useState, useEffect, useRef } from 'react';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Icon,
  IconButton,
  Button,
  useToast,
} from '@chakra-ui/react';
import { TrashIcon } from '@heroicons/react/solid';
import { useAppDispatch, useAppSelector } from '../../state/redux-hooks';
import {
  selectDeleteShoppingListLoading,
  deleteShoppingList,
  LoadingStates,
} from './shopping-list-duck';

const ShoppingListCardPopover: React.FC<{ id: string }> = ({ id }) => {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(selectDeleteShoppingListLoading);
  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => setIsOpen(false);
  const cancelRef = useRef();
  const toast = useToast();

  const onClickDelete = () => {
    dispatch(deleteShoppingList(id));
  };

  useEffect(() => {
    if (isLoading === LoadingStates.SUCCESS) {
      setIsOpen(false);
    }
  }, [dispatch, isLoading, toast]);

  return (
    <>
      <IconButton
        size="md"
        icon={<Icon as={TrashIcon} />}
        aria-label="Ta bort inköpslista"
        variant="ghost"
        colorScheme="red"
        onClick={() => setIsOpen(true)}
      />

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Ta bort inköpslista
            </AlertDialogHeader>

            <AlertDialogBody>
              Är du säker på att du vill ta bort inköpslistan?
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Avbryt
              </Button>
              <Button
                colorScheme="red"
                aria-label="Bekräfta ta bort inköpslista"
                onClick={onClickDelete}
                isLoading={isLoading === LoadingStates.PENDING}
                ml={3}
              >
                Ta bort
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

export default ShoppingListCardPopover;
