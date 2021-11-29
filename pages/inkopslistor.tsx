import React from 'react';
import { useSession } from 'next-auth/client';
import Layout from '../components/Layout';

const PageShoppingList: React.FC = () => {
  const [session] = useSession();

  return (
    <Layout>
      <div>Hello world</div>
    </Layout>
  );
};

export default PageShoppingList;
