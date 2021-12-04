import React, { useEffect } from 'react';
import { GetStaticProps, NextPage } from 'next';
import { useSession } from 'next-auth/client';
import Layout from '../components/Layout';
import GroceryBagContainer from '../features/grocery-bag/grocery-bag-container';
import prisma from '../lib/prisma';
import { Recipe } from '../types';
import { INITIAL_RECIPE_COUNT } from '../constants';
import { setRecipes, selectRecipes } from '../features/grocery-bag/grocery-bag-duck';
import { useAppDispatch, useAppSelector } from '../state/redux-hooks';

interface PageProps {
  initialRecipes: Recipe[];
}

// eslint-disable-next-line react/prop-types
const PageMatkasse: NextPage<PageProps> = ({ initialRecipes }) => {
  const [session] = useSession();
  const dispatch = useAppDispatch();
  const recipes = useAppSelector(selectRecipes);

  useEffect(() => {
    if (!recipes || recipes.length === 0) {
      dispatch(setRecipes(initialRecipes));
    }
  }, [recipes]);

  return (
    <Layout>
      <GroceryBagContainer session={session} />
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const totalRecipeCount = await prisma.recipe.count();
  const skip = Math.max(0, Math.floor(Math.random() * totalRecipeCount) - INITIAL_RECIPE_COUNT);

  const result = await prisma.recipe.findMany({
    take: INITIAL_RECIPE_COUNT,
    skip,
    select: {
      createdAt: false,
      id: true,
      title: true,
      description: true,
      imageSrc: true,
      rating: true,
      ratings: true,
      time: true,
      amountOfIngredients: true,
      difficulty: true,
      ingredients: true,
      url: true,
    },
  });

  return {
    props: {
      initialRecipes: result,
    },
  };
};

export default PageMatkasse;
