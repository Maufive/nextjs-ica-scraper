/* eslint-disable react/jsx-props-no-spreading */
import React, { useCallback, useState } from 'react';
import {
  Button,
  Modal as ChakraModal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Box,
  Heading,
  Text,
  Flex,
  useNumberInput,
  Input,
  HStack,
  useColorModeValue,
  Tag,
  TagLeftIcon,
  TagLabel,
  Select,
  Icon,
} from '@chakra-ui/react';
import { PlusIcon, MinusIcon, SaveIcon } from '@heroicons/react/solid';
import { POPULAR_CATEGORIES, GROCERY_BAG_INITIAL_FILTERS as INITIAL_FILTERS } from '../../constants';

interface ModalProps {
  isOpen: boolean;
  onClickSaveFilters: ({
    selectedTags,
    recipeCount,
    time,
  }) => void;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClickSaveFilters,
}) => {
  const [selectedTags, setSelectedTags] = useState<string[]>(INITIAL_FILTERS.selectedTags);
  const [recipeCount, setRecipeCount] = useState<number>(INITIAL_FILTERS.recipeCount);
  const [time, setTime] = useState<string>(INITIAL_FILTERS.time);

  const {
    getInputProps,
    getIncrementButtonProps,
    getDecrementButtonProps,
  } = useNumberInput({
    step: 1,
    defaultValue: 3,
    min: 1,
    max: 7,
    precision: 0,
    onChange: (value: string) => setRecipeCount(parseInt(value, 10)),
  });

  const inc = getIncrementButtonProps();
  const dec = getDecrementButtonProps();
  const input = getInputProps({ readOnly: true });

  const handleChangeTimeRequired = useCallback((event: React.FormEvent<HTMLSelectElement>) => {
    setTime(event.currentTarget.value);
  }, []);

  const handleClickTag = useCallback((tag: string) => {
    const isActive = selectedTags.includes(tag);

    if (isActive) {
      const newArr = selectedTags.filter((t) => t !== tag);
      return setSelectedTags(newArr);
    }

    setSelectedTags((prev) => [...prev, tag]);
  }, [selectedTags]);

  const onClickSave = useCallback(() => {
    onClickSaveFilters({ recipeCount, time, selectedTags });
  }, [onClickSaveFilters, time, selectedTags, recipeCount]);

  return (
    <ChakraModal
      isCentered
      onClose={onClickSave}
      isOpen={isOpen}
      motionPreset="slideInBottom"
      size="lg"
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Heading as="h2" size="md" color={useColorModeValue('gray.700', 'gray.400')}>
            Filter
          </Heading>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Flex direction="column">
            <Box mb={6}>
              <Heading as="h2" size="md" mb={2}>
                Populära filter
              </Heading>
              <Text color={useColorModeValue('gray.700', 'gray.400')}>Här kan du sätta några filter för att bättre anpassa dina förslag på olika recept</Text>
            </Box>
            <Flex direction="row" justify="space-between" align="center" mb={10}>
              <Text fontWeight="700">Antal recept</Text>
              <HStack w="10rem">
                <Button {...dec}>-</Button>
                <Input textAlign="center" {...input} />
                <Button {...inc}>+</Button>
              </HStack>
            </Flex>
            <Flex w="100%" justify="space-between" align="center" mb={10}>
              <Text fontWeight="700">Tillagningstid</Text>
              <Select placeholder="Välj tillagningstid" w="12rem" onChange={handleChangeTimeRequired}>
                <option value="Under 30 min">Under 30 min</option>
                <option value="Under 45 min">Under 45 min</option>
                <option value="Över 60 min">Över 60 min</option>
              </Select>
            </Flex>
            <Flex direction="column" w="100%">
              <Text fontWeight="700" mb={4}>Kategorier</Text>
              <Flex w="100%" wrap="wrap">
                {POPULAR_CATEGORIES.map((category) => {
                  const isActive = selectedTags.includes(category);
                  return (
                    <Tag
                      as={Button}
                      onClick={() => handleClickTag(category)}
                      size="lg"
                      variant={isActive ? 'solid' : 'ghost'}
                      colorScheme="green"
                      borderRadius="full"
                      key={category}
                      mb={4}
                      mr={2}
                      _hover={{
                        bg: 'green.500',
                        color: 'white',
                      }}
                    >
                      <TagLeftIcon boxSize="12px" as={isActive ? MinusIcon : PlusIcon} />
                      <TagLabel>{category}</TagLabel>
                    </Tag>
                  );
                })}
              </Flex>
            </Flex>
          </Flex>
        </ModalBody>
        <ModalFooter justifyContent="center">
          <Button
            w="100%"
            colorScheme="green"
            variant="solid"
            leftIcon={<Icon as={SaveIcon} />}
            mr={3}
            onClick={onClickSave}
          >
            Spara
          </Button>
        </ModalFooter>
      </ModalContent>
    </ChakraModal>
  );
};

export default Modal;
