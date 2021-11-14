import React from 'react';
import { Flex } from '@chakra-ui/react';
import Layout from '../components/Layout';

const PageMatkasse: React.FC = () => {
  const fetchRecipes = async () => {
    console.log('hello');
    const response = await fetch('/api/recipes');
    const json = await response.json();
    console.log(json);
  };

  React.useEffect(() => {
    fetchRecipes();
  }, []);

  return (
    <Layout>
      <Flex w="100%" align="center" justify="center">
        <h1>Hello world!</h1>
      </Flex>
    </Layout>
  );
};

export default PageMatkasse;
