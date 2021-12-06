import React from 'react';
import { motion } from 'framer-motion';
import {
  HStack,
} from '@chakra-ui/react';
import Card from './recipe-card';
import { Recipe } from '../../types';

const AnimatedStack = motion(HStack);

const variants = {
  show: {
    transition: { staggerChildren: 0.09, delayChildren: 0.3 },
  },
  initial: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
  },
};

interface Props {
  recipes: Recipe[];
}

const RecipeCardGroup: React.FC<Props> = ({ recipes }) => (
  <AnimatedStack
    flexWrap="nowrap"
    overflowX="auto"
    spacing={4}
    align="flex-start"
    paddingBottom={4}
    css={{
      scrollSnapType: 'x mandatory',
    }}
    variants={variants}
    animate="show"
    initial="initial"
  >
    {recipes.map((recipe) => (
      <Card
        key={recipe.id}
        id={recipe.id}
        title={recipe.title}
        time={recipe.time}
        rating={recipe.rating}
        ratings={recipe.ratings}
        imageSrc={recipe.imageSrc}
      />
    ))}
  </AnimatedStack>
);

export default RecipeCardGroup;
