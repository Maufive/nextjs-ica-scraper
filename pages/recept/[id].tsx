import React from 'react';
import { GetServerSideProps, NextPage } from 'next';
import Image from 'next/image';
import {
  Stack, Box, Heading, Text, useColorModeValue,
} from '@chakra-ui/react';
import Layout from '../../components/Layout';
import prisma from '../../lib/prisma';
import { Recipe } from '../../types';
import Ratings from '../../components/ratings';

interface PageProps {
  recipe: Recipe;
}

const RecipePage: NextPage<PageProps> = ({ recipe }) => {
  console.log('hello');

  return (
    <Layout>
      <Stack px={{ base: 2, md: 4 }}>
        <Heading fontSize="2xl">{recipe.title}</Heading>
        <Stack direction="row">
          <Ratings value={Number(recipe.rating)} max={5} />
          <Text
            color={useColorModeValue('gray.600', 'gray.500')}
            fontWeight={400}
            fontSize="xs"
            marginLeft="0.25rem !important"
          >
            {`(${recipe.ratings})`}
          </Text>
        </Stack>
        <Box
          h="250px"
          pos="relative"
          overflow="hidden"
          rounded="md"
        >
          <Image
            src={recipe.imageSrc}
            layout="fill"
            objectFit="cover"
            priority
          />
        </Box>
      </Stack>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const result = await prisma.recipe.findUnique({
    where: {
      id: String(params?.id),
    },
    include: {
      ingredients: true,
    },
  });
  return {
    props: {
      recipe: JSON.parse(JSON.stringify(result)),
    },
  };
};

export default RecipePage;
