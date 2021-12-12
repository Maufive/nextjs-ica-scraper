import React from 'react';
import { NextPage, GetStaticProps } from 'next';
import Layout from '../../components/Layout';
import prisma from '../../lib/prisma';
import { Recipe } from '../../types';
import RecipesContainer from '../../features/recipes/recipes-container';

const INITIAL_RECIPE_COUNT = 8; // Will increase this when more recipes available
const REQUIRED_RECIPE_PROPS = {
  imageSrc: true,
  id: true,
  title: true,
  rating: true,
  ratings: true,
  time: true,
};

interface PageProps {
  quickRecipes: Recipe[];
  newRecipes: Recipe[];
  everydayRecipes: Recipe[];
}

const RecipePage: NextPage<PageProps> = ({
  quickRecipes,
  newRecipes,
  everydayRecipes,
}) => (
  <Layout>
    <RecipesContainer
      quickRecipes={quickRecipes}
      newRecipes={newRecipes}
      everydayRecipes={everydayRecipes}
    />
  </Layout>
);

export const getStaticProps: GetStaticProps = async () => {
  const quickRecipes = await prisma.recipe.findMany({
    take: INITIAL_RECIPE_COUNT,
    where: { time: { equals: 'Under 30 min' } },
    select: REQUIRED_RECIPE_PROPS,
  });
  const newRecipes = await prisma.recipe.findMany({
    take: INITIAL_RECIPE_COUNT,
    select: REQUIRED_RECIPE_PROPS,
    orderBy: { createdAt: 'desc' },
  });
  const everydayRecipes = await prisma.recipe.findMany({
    take: INITIAL_RECIPE_COUNT,
    where: { categories: { has: 'Vardag' } },
    orderBy: { createdAt: 'asc' },
    select: REQUIRED_RECIPE_PROPS,
  });

  return {
    props: {
      quickRecipes,
      newRecipes,
      everydayRecipes,
    },
  };
};

export default RecipePage;
