import React from 'react';
import Link from 'next/link';
import {
  Icon,
  Flex,
  Text,
  useColorModeValue,
  Center,
  Link as LinkStyles,
} from '@chakra-ui/react';
import { ClipboardListIcon } from '@heroicons/react/outline';
import ShoppingListDeleteModal from './shopping-list-card-delete-modal';

interface Props {
  title: string;
  itemCount: number;
  id: string;
}

const ShoppingListCard: React.FC<Props> = ({
  title,
  itemCount,
  id,
}) => (
  <Link href={`/inkopslistor/${id}`} passHref>
    <Flex
      as={LinkStyles}
      width="100%"
      align="center"
      p={4}
      rounded="md"
      bg={useColorModeValue('gray.100', 'gray.900')}
    >
      <>
        <Center rounded="full" bg="green.100" p={2}>
          <Icon as={ClipboardListIcon} color="green.600" bg="green.100" w={6} h={6} rounded="full" />
        </Center>
        <Flex
          flex="2"
          flexDirection="column"
          align="flex-start"
          justify="space-around"
          marginLeft={4}
        >
          <Text fontWeight={700}>
            {title}
          </Text>
          <Text
            fontWeight={500}
            fontSize="sm"
            margin="0"
            color={useColorModeValue('gray.500', 'gray.400')}
          >
            {`${itemCount} varor`}
          </Text>
        </Flex>
      </>
      <ShoppingListDeleteModal id={id} />
    </Flex>
  </Link>
);

export default ShoppingListCard;
