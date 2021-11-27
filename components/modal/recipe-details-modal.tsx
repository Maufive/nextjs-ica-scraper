import React, { useRef } from 'react';
import Image from 'next/image';
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalFooter,
  Box,
  Heading,
  Text,
  Icon,
  useColorModeValue,
  Tag,
  TagLabel,
  TagLeftIcon,
  HStack,
  Link,
} from '@chakra-ui/react';
import {
  ClockIcon, StarIcon, ShoppingCartIcon, ExternalLinkIcon,
} from '@heroicons/react/solid';
import { Recipe } from '../../types/index';

interface RecipeDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  details: Recipe;
}

const RecipeDetailsModal: React.FC<RecipeDetailsModalProps> = ({
  isOpen,
  onClose,
  details,
}) => {
  const initialRef = useRef();

  if (!details) return null;
  return (
    <Modal
      isCentered
      onClose={onClose}
      isOpen={isOpen}
      motionPreset="slideInBottom"
      initialFocusRef={initialRef}
    >
      <ModalOverlay />
      <ModalContent rounded="lg" bg={useColorModeValue('gray.100', 'gray.800')}>
        <ModalBody>
          <Box
            h="250px"
            bg="gray.100"
            mt={-6}
            mx={-6}
            mb={4}
            pos="relative"
          >
            <Image
              src={details.imageSrc}
              layout="fill"
              objectFit="cover"
              priority
            />
          </Box>
          <Box>
            <Heading as="h2" size="lg" mt={6} mb={4}>
              {details.title}
            </Heading>
            <HStack mb={2}>
              <Icon as={StarIcon} color="yellow.400" w={6} h={6} />
              <Text
                color="gray.300"
                textTransform="uppercase"
                fontWeight={500}
                fontSize="md"
              >
                {`${details.rating} / 5`}
              </Text>
              <Text
                color="gray.500"
                fontWeight={400}
                fontSize="md"
                marginLeft="0.25rem !important"
              >
                {`(${details.ratings})`}
              </Text>
            </HStack>
            <HStack justify={{ base: 'space-between', md: 'start' }} mb={4}>
              <Tag size="lg" variant="subtle" colorScheme="green" mr={{ md: 4 }}>
                <TagLeftIcon as={ClockIcon} />
                <TagLabel>{details.time}</TagLabel>
              </Tag>
              <Tag size="lg" variant="subtle" colorScheme="green">
                <TagLeftIcon as={ShoppingCartIcon} />
                <TagLabel>{details.amountOfIngredients}</TagLabel>
              </Tag>
            </HStack>
            <Box mb={4}>
              <Text fontSize="md" color="gray.300" lineHeight="1.5">
                {details.description}
              </Text>
            </Box>
            <HStack align="center">
              <Link href={details.url} isExternal color="blue.400">
                Läs hela receptet på ica.se
                <Icon as={ExternalLinkIcon} mx="2px" />
              </Link>
            </HStack>
          </Box>
        </ModalBody>
        <ModalFooter justifyContent="center">
          <Button onClick={onClose} ref={initialRef} w="100%">
            Stäng
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default RecipeDetailsModal;
