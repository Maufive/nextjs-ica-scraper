import React from 'react';
import Link from 'next/link';
import {
  Icon,
  Flex,
  Text,
  IconButton,
  useColorModeValue,
  Center,
} from '@chakra-ui/react';
import { DotsHorizontalIcon } from '@heroicons/react/solid';
import { ClipboardListIcon } from '@heroicons/react/outline';

interface Props {
  title: string;
  itemCount: number;
  //   onClickDots?: () => void;
  id: string;
}

const ShoppingListCard: React.FC<Props> = ({
  title,
  itemCount,
  id,
}) => (
  <Link href={`/inkopslistor/${id}`}>
    <Flex
      width="100%"
      align="center"
      px={4}
      py={4}
      rounded="sm"
      bg={useColorModeValue('gray.100', 'gray.900')}
    >
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
      <IconButton
        size="md"
                // onClick={() => toggleLockRecipe(id)}
        icon={<Icon as={DotsHorizontalIcon} />}
        aria-label="Submeny för inköpslista"
        variant="ghost"
      />
    </Flex>
  </Link>
);

export default ShoppingListCard;
