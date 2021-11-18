import React from 'react';
import { Flex, useToast } from '@chakra-ui/react';
import Layout from '../components/Layout';
import { useAppSelector, useAppDispatch } from '../state/redux-hooks';
import {
  submitNewRecipe, selectRecipeLoading,
} from '../components/Submit/SubmitRecipeSlice';
import SubmitRecipe from '../components/Submit/SubmitRecipe';

const Home: React.FC = () => {
  const dispatch = useAppDispatch();
  const loading = useAppSelector(selectRecipeLoading);
  // const recipe = useAppSelector(selectRecipe);
  const toast = useToast();

  React.useEffect(() => {
    if (loading === 'success') {
      toast({
        title: 'Receptet har sparats',
        description: 'Du kan nu lägga till receptet till din Matkasse',
        status: 'success',
        variant: 'left-accent',
        duration: 9000,
        isClosable: true,
      });
    }
    if (loading === 'duplicate') {
      toast({
        title: 'Receptet finns redan',
        description: 'Prova igen med ett annat recept',
        status: 'warning',
        variant: 'left-accent',
        duration: 9000,
        isClosable: true,
      });
    }
  }, [loading, toast]);

  const handleSubmit = React.useCallback((url: string) => {
    dispatch(submitNewRecipe(url));
  }, [dispatch]);

  return (
    <Layout>
      <Flex w="100%" align="center" justify="center">
        <SubmitRecipe handleSubmit={handleSubmit} isLoading={loading} />
      </Flex>
    </Layout>
  );
};

export default Home;
