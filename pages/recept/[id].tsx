import React from 'react';
import { GetServerSideProps, NextPage } from 'next';
import Image from 'next/image';
import {
  Stack, Box,
  Heading, Text,
  useColorModeValue, HStack,
  Icon, VStack, Flex, Link,
} from '@chakra-ui/react';
import { ClockIcon, ExternalLinkIcon } from '@heroicons/react/solid';
import Layout from '../../components/Layout';
import prisma from '../../lib/prisma';
import { Recipe } from '../../types';
import Ratings from '../../components/ratings';

interface PageProps {
  recipe: Recipe;
}

const RecipePage: NextPage<PageProps> = ({ recipe }) => (
  <Layout>
    <Stack w="100%">
      <Box
        h="250px"
        pos="relative"
        overflow="hidden"
      >
        <Image
          src={recipe.imageSrc}
          layout="fill"
          objectFit="cover"
          priority
        />
      </Box>
      <Stack p={4}>
        <Heading>{recipe.title}</Heading>
        <Stack direction="row" align="center">
          <HStack>
            <Ratings value={Number(recipe.rating)} max={5} />
            <Text
              color={useColorModeValue('gray.600', 'gray.500')}
              fontWeight={400}
              fontSize="sm"
              marginLeft="0.25rem !important"
            >
              {`(${recipe.ratings})`}
            </Text>
          </HStack>
          <HStack align="center">
            <Icon as={ClockIcon} color="green.500" w="4" h="4" />
            <Text
              color="green.500"
              textTransform="uppercase"
              fontWeight={800}
              fontSize="xs"
            >
              {recipe.time}
            </Text>
          </HStack>
        </Stack>
        <Stack paddingTop={4}>
          <Text>
            {recipe.description}
          </Text>
        </Stack>
      </Stack>
      <HStack align="center" px={4}>
        <Link href={recipe.url} isExternal color="blue.400">
          Läs hela receptet på ica.se
          <Icon as={ExternalLinkIcon} mx="2px" />
        </Link>
      </HStack>
      <Box p={2}>
        <Box
          display="flex"
          alignItems="center"
          py={6}
        >
          <Heading
            marginRight={2}
            fontSize="xl"
          >
            Ingredienser
          </Heading>
          <Heading
            color={useColorModeValue('gray.600', 'gray.500')}
            fontWeight={400}
            fontSize="md"
          >
            {`(${recipe.ingredients.length} st)`}
          </Heading>
        </Box>
        <VStack align="start" spacing={2}>
          {recipe.ingredients?.map((i) => (
            <Flex
              key={i.id}
              width="100%"
              align="center"
              p={4}
              rounded="md"
              bg={useColorModeValue('gray.100', 'gray.900')}
            >
              {i.quantity && (
              <Text
                fontWeight={600}
                marginRight={1}
                color={useColorModeValue('gray.900', 'gray.50')}
              >
                {i.quantity}
              </Text>
              )}
              <Text color={useColorModeValue('gray.900', 'gray.300')}>{i.name}</Text>
            </Flex>
          ))}
        </VStack>
      </Box>
    </Stack>
  </Layout>
);

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
