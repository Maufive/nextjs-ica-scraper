import React from 'react';
import { Flex } from '@chakra-ui/react';
import Layout from '../components/Layout';
import { useAppSelector, useAppDispatch } from '../state/redux-hooks';
import { submitNewRecipe, selectRecipeLoading, selectRecipe } from '../components/Submit/SubmitRecipeSlice';
import SubmitRecipe from '../components/Submit/SubmitRecipe';

const Home: React.FC = () => {
  const dispatch = useAppDispatch();
  const loading = useAppSelector(selectRecipeLoading);
  const recipe = useAppSelector(selectRecipe);

  const handleSubmit = React.useCallback((url: string) => {
    dispatch(submitNewRecipe(url));
  }, [dispatch]);

  console.log(recipe);
  console.log(loading);

  return (
    <Layout>
      <Flex w="100%" align="center" justify="center">
        <SubmitRecipe handleSubmit={handleSubmit} isLoading={loading} />
      </Flex>
    </Layout>
  );
};

export default Home;
