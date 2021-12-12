import React, { useState, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Box,
  Heading,
  Text,
  Stack,
  useColorModeValue,
  Icon,
  HStack,
  Flex,
  Button,
} from '@chakra-ui/react';
import {
  ClockIcon, RefreshIcon, LockOpenIcon, LockClosedIcon,
} from '@heroicons/react/solid';
import Ratings from '../../ratings';

const AnimatedFlex = motion(Flex);

export interface CardProps {
  title: string;
  imageSrc: string;
  toggleLockRecipe: (id: string) => void;
  isLocked: boolean;
  time: string;
  onClickFetchNewRecipe: (id: string) => void;
  id: string;
  rating: string;
  ratings: string;
}

const Card: React.FC<CardProps> = ({
  title,
  time,
  imageSrc,
  toggleLockRecipe,
  isLocked,
  onClickFetchNewRecipe,
  id,
  rating,
  ratings,
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const handeClickFetchNew = useCallback(() => {
    onClickFetchNewRecipe(id);
    setIsLoading(true);
  }, [onClickFetchNewRecipe]);

  return (
    <AnimatedFlex
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      flexDirection="column"
      flex="0 0 280px"
      bg={useColorModeValue('gray.50', 'gray.900')}
      boxShadow="md"
      rounded="md"
      overflow="hidden"
      css={{
        scrollSnapAlign: 'start',
      }}
    >
      <Link passHref href={`/recept/${id}`}>
        <Box
          h="200px"
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
      </Link>
      <Link passHref href={`/recept/${id}`}>
        <Stack
          minH="100px"
          p={{ base: 2, md: 4 }}
        >
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
            fontSize="lg"
            noOfLines={[2, 2, 1]}
          >
            {title}
          </Heading>
        </Stack>
      </Link>
      <HStack
        align="center"
        spacing={6}
        p={{ base: 4, md: 6 }}
      >
        <Button
          size="sm"
          onClick={() => toggleLockRecipe(id)}
          leftIcon={isLocked ? <Icon as={LockClosedIcon} /> : <Icon as={LockOpenIcon} />}
          aria-label="Lås recept"
          variant="ghost"
          colorScheme={!isLocked ? 'green' : 'orange'}
          isDisabled={isLoading}
          justifyContent="flex-start"
        >
          {isLocked ? 'Lås upp' : 'Lås'}
        </Button>
        <Button
          size="sm"
          onClick={handeClickFetchNew}
          leftIcon={<Icon as={RefreshIcon} />}
          aria-label="Slumpa recept"
          variant="ghost"
          color={useColorModeValue('gray.500', 'gray.300')}
          isDisabled={isLocked}
          isLoading={isLoading}
        >
          Slumpa
        </Button>
      </HStack>
    </AnimatedFlex>
  );
};

export default Card;
