/* eslint-disable react/prop-types */
import React from 'react';
import { NextPage, GetServerSideProps } from 'next';
import Layout from '../../components/Layout';
import { ShoppingList } from '../../types';
import prisma from '../../lib/prisma';
import ShoppingListContainer from '../../features/shopping-list/shopping-list-container';

interface PageProps {
  shoppingList: ShoppingList;
}

const ShoppingListPage: NextPage<PageProps> = ({ shoppingList }) => (
  <Layout>
    <ShoppingListContainer shoppingList={shoppingList} />
  </Layout>
);

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const result = await prisma.shoppingList.findUnique({
    where: {
      id: String(params?.id),
    },
    include: {
      items: {
        orderBy: { name: 'asc' },
      },
      recipes: {
        select: {
          title: true,
          imageSrc: true,
          url: true,
          id: true,
        },
      },
    },
  });

  return {
    props: {
      shoppingList: JSON.parse(JSON.stringify(result)),
    },
  };
};

export default ShoppingListPage;
