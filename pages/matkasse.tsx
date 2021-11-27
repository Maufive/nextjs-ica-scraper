import React from 'react';
import { useSession } from 'next-auth/client';
import Layout from '../components/Layout';
import GroceryBagContainer from '../features/grocery-bag/grocery-bag-container';

const PageMatkasse: React.FC = () => {
  const [session] = useSession();

  return (
    <Layout>
      <GroceryBagContainer session={session} />
    </Layout>
  );
};

export default PageMatkasse;
