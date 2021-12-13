import React from 'react';
import Link from 'next/link';
import {
  Flex,
  Box,
  Heading,
  Container,
  Text,
  Button,
  Stack,
} from '@chakra-ui/react';
import Layout from '../components/Layout';

const Home: React.FC = () => (
  <Layout>
    <Flex direction="column" w="100%">
      <Container maxW="3xl">
        <Stack
          as={Box}
          textAlign="center"
          spacing={{ base: 8, md: 14 }}
          py={{ base: 20, md: 36 }}
        >
          <Heading
            fontWeight={600}
            fontSize={{ base: '2xl', sm: '4xl', md: '6xl' }}
            lineHeight="110%"
          >
            Planera veckohandlingen
            <br />
            <Text as="span" color="green.400">
              snabbt och enkelt
            </Text>
          </Heading>
          <Text color="gray.500">
            Skräddarsy din egen matkasse och blanda dina favoritrecept tillsamans med nya recept.
            Spara matkassen som en inköpslista för att veckohandlingen snabbt och enkelt.
          </Text>
          <Stack
            direction="column"
            spacing={3}
            align="center"
            alignSelf="center"
            position="relative"
          >
            <Link href="/matkasse" passHref>
              <Button
                colorScheme="green"
                bg="green.400"
                rounded="full"
                px={6}
                _hover={{
                  bg: 'green.500',
                }}
              >
                Skapa matkasse
              </Button>
            </Link>
            <Link passHref href="/recept">
              <Button variant="link" colorScheme="blue" size="sm">
                Recept
              </Button>
            </Link>
          </Stack>
        </Stack>
      </Container>
    </Flex>
  </Layout>
);

export default Home;
