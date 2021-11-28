import React, { useState, useCallback } from 'react';
import Image from 'next/image';
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
  ClockIcon, RefreshIcon, StarIcon, LockOpenIcon, LockClosedIcon,
} from '@heroicons/react/solid';

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
  onClick: (id: string) => void;
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
  onClick,
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const handleOnClick = useCallback(() => {
    onClickFetchNewRecipe(id);
    setIsLoading(true);
  }, [onClickFetchNewRecipe]);

  return (
    <AnimatedFlex
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      flexDirection="column"
      flex="0 0 300px"
      bg={useColorModeValue('gray.50', 'gray.900')}
      boxShadow={{ base: '2xl', lg: 'md' }}
      rounded="md"
      p={{ base: 2, lg: 4 }}
      overflow="hidden"
      css={{
        scrollSnapAlign: 'start',
      }}
    >
      <Box
        h="210px"
        bg="gray.100"
        mt={-6}
        mx={-6}
        mb={4}
        pos="relative"
        onClick={() => onClick(id)}
      >
        <Image
          src={imageSrc}
          layout="fill"
          objectFit="cover"
          priority
        />
      </Box>
      <Stack minH="100px" onClick={() => onClick(id)}>
        <Flex direction="column">
          <HStack>
            <Icon as={StarIcon} color="yellow.400" w="4" h="4" />
            <Text
              color={useColorModeValue('gray.800', 'gray.300')}
              textTransform="uppercase"
              fontWeight={500}
              fontSize="xs"
            >
              {`${rating} / 5`}
            </Text>
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
      <HStack mt={6} align="center" spacing={6}>
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
          onClick={handleOnClick}
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
