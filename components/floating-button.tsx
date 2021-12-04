import React from 'react';
import {
  Box, IconButton, Icon, useMediaQuery,
} from '@chakra-ui/react';
import { PlusIcon } from '@heroicons/react/solid';

interface Props {
  isActive: boolean;
  onClick: () => void;
}

const DesktopButton: React.FC<Props> = ({ isActive, onClick }) => (
  <Box
    pos="fixed"
    zIndex="2"
    right="20px"
    bottom="20px"
  >
    <IconButton
      size="lg"
      isActive={isActive}
      onClick={onClick}
      icon={<Icon as={PlusIcon} />}
      aria-label="Skapa inköpslista"
      variant="solid"
      colorScheme="green"
      rounded="full"
      boxShadow="md"
    />
  </Box>
);

const MobileButton: React.FC<Props> = ({ isActive, onClick }) => (
  <Box
    pos="fixed"
    zIndex="2"
    right="20px"
    bottom="75px"
  >
    <IconButton
      size="lg"
      isActive={isActive}
      onClick={onClick}
      icon={<Icon as={PlusIcon} />}
      aria-label="Skapa inköpslista"
      variant="solid"
      colorScheme="green"
      rounded="full"
      boxShadow="md"
    />
  </Box>
);

const FloatingButton: React.FC<Props> = ({ onClick, isActive }) => {
  const [isSmaller] = useMediaQuery('(max-width: 480px)');

  if (isSmaller) return <MobileButton onClick={onClick} isActive={isActive} />;
  return <DesktopButton onClick={onClick} isActive={isActive} />;
};

export default FloatingButton;
