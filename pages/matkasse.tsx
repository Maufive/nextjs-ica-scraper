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
  const result = await prisma.recipe.findMany({
    include: {
      ingredients: true,
    },
  });

  const recipes = result
    .map(() => {
      const randomRecipe = result[Math.floor(Math.random() * result.length)];
      const index = result.indexOf(randomRecipe);
      result.splice(index, 1);
      return randomRecipe;
    })
    .slice(0, INITIAL_RECIPE_COUNT);

  const initialRecipes = recipes.map((r) => ({
    ...r,
    createdAt: Date.parse(r.createdAt.toString()),
  }));

  return {
    props: {
      initialRecipes,
    },
  };
};

export default PageMatkasse;
