import React, { FormEvent, ChangeEvent, useState } from 'react';
import {
  Stack,
  FormControl,
  Input,
  Button,
  useColorModeValue,
  Heading,
  Text,
  Container,
  Flex,
} from '@chakra-ui/react';
import { CheckIcon } from '@chakra-ui/icons';

interface SubmitRecipeProps {
  handleSubmit: (url: string) => void;
  isLoading: string;
}

const SubmitRecipe: React.FC<SubmitRecipeProps> = ({ handleSubmit, isLoading }) => {
  const [value, setValue] = useState('');

  return (
    <Flex
      align="center"
      justify="center"
      bg={useColorModeValue('gray.50', 'gray.800')}
      width={{ base: '100%', md: '40rem' }}
    >
      <Container
        maxW="lg"
        bg={useColorModeValue('white', 'whiteAlpha.100')}
        boxShadow="xl"
        rounded="lg"
        p={6}
        direction="column"
      >
        <Heading
          as="h2"
          fontSize={{ base: 'xl', sm: '2xl' }}
          textAlign="center"
          mb={5}
        >
          Lägg till ett recept
        </Heading>
        <Stack
          direction={{ base: 'column', md: 'row' }}
          as="form"
          spacing="12px"
          onSubmit={(e: FormEvent) => {
            e.preventDefault();
            handleSubmit(value);
          }}
        >
          <FormControl>
            <Input
              variant="solid"
              borderWidth={1}
              color="gray.800"
              _placeholder={{
                color: 'gray.400',
              }}
              borderColor={useColorModeValue('gray.300', 'gray.700')}
              id="recept"
              type="url"
              required
              placeholder="https://www.ica.se/recept/..."
              pattern="https://www.ica.se/recept/.*"
              aria-label="Länk till recept"
              value={value}
              disabled={isLoading !== 'idle'}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setValue(e.target.value)}
            />
          </FormControl>
          <FormControl w={{ base: '100%', md: '40%' }}>
            <Button
              colorScheme={isLoading === 'success' ? 'green' : 'blue'}
              isLoading={isLoading === 'pending'}
              w="100%"
              type={isLoading === 'success' ? 'button' : 'submit'}
            >
              {isLoading === 'success' ? <CheckIcon /> : 'Submit'}
            </Button>
          </FormControl>
        </Stack>
        <Text
          mt={2}
          textAlign="center"
          color={isLoading === 'failed' ? 'red.500' : 'gray.500'}
        >
          {isLoading === 'failed'
            ? 'Åh nej, något gick fel! 😢 Prova igen snart.'
            : ''}
        </Text>
      </Container>
    </Flex>
  );
};

export default SubmitRecipe;