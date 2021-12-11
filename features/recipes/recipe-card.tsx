import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  Box,
  Heading,
  Text,
  Stack,
  useColorModeValue,
  HStack,
  Icon,
  Flex,
} from '@chakra-ui/react';
import {
  ClockIcon,
} from '@heroicons/react/solid';
import Ratings from '../../components/ratings';

const AnimatedFlex = motion(Flex);

const variants = {
  show: {
    opacity: 1,
    transition: {
      y: { stiffness: 600, velocity: -100 },
    },
  },
  initial: {
    opacity: 0,
    transition: {
      y: { stiffness: 600 },
    },
  },
};

export interface CardProps {
  title: string;
  imageSrc: string;
  time: string;
  id: string;
  rating: string;
  ratings: string;
}

const Card: React.FC<CardProps> = ({
  title,
  time,
  imageSrc,
  id,
  rating,
  ratings,
}) => (
  <Link passHref href={`/recept/${id}`}>
    <AnimatedFlex
      variants={variants}
      flex="0 0 200px"
      overflow="hidden"
      css={{
        scrollSnapAlign: 'start',
      }}
      flexDirection="column"
      bg={useColorModeValue('gray.50', 'gray.900')}
      boxShadow="md"
      rounded="md"
    >
      <Box
        h="130px"
        pos="relative"
        overflow="hidden"
        roundedTop="md"
      >
        <Image
          src={imageSrc}
          layout="fill"
          objectFit="cover"
          priority
        />
      </Box>
      <Stack p={{ base: 2, lg: 4 }} minH="150px">
        <Flex direction="column">
          <HStack>
            <Ratings value={Number(rating)} max={5} />
            <Text
              color={useColorModeValue('gray.600', 'gray.500')}
              fontWeight={400}
              fontSize="xs"
              marginLeft="0.25rem !important"
            >
              {`(${ratings})`}
            </Text>
          </HStack>
          <HStack>
            <Icon as={ClockIcon} color="green.500" w="4" h="4" />
            <Text
              color="green.500"
              textTransform="uppercase"
              fontWeight={800}
              fontSize="xs"
            >
              {time}
            </Text>
          </HStack>
        </Flex>
        <Heading
          color={useColorModeValue('gray.700', 'gray.100')}
          fontSize="sm"
          noOfLines={[3, 3, 2]}
        >
          {title}
        </Heading>
      </Stack>
    </AnimatedFlex>
  </Link>
);

export default Card;
