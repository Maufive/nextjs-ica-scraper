import React, { useState, useEffect, useCallback } from 'react';
import { motion, useViewportScroll } from 'framer-motion';
import {
  Box, IconButton, Icon, useMediaQuery,
} from '@chakra-ui/react';
import { PlusIcon } from '@heroicons/react/solid';

const AnimatedBox = motion(Box);
const AnimatedButton = motion(IconButton);

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
    <AnimatedButton
      size="lg"
      isActive={isActive}
      onClick={onClick}
      icon={<Icon as={PlusIcon} />}
      aria-label="Skapa inköpslista"
      variant="solid"
      colorScheme="green"
      rounded="full"
      boxShadow="md"
      animate={{ scale: isActive ? [1, 0.6, 1.4, 1, 1, 1] : 1 }}
    />
  </Box>
);

const MobileButton: React.FC<Props> = ({ isActive, onClick }) => {
  const { scrollY } = useViewportScroll();
  const [hidden, setHidden] = useState<boolean>(false);

  const update = useCallback(() => {
    if (scrollY?.current < scrollY?.prev) {
      setHidden(false);
    } else if (scrollY?.current > 100 && scrollY?.current > scrollY?.prev) {
      setHidden(true);
    }
  }, [scrollY]);

  useEffect(() => scrollY.onChange(() => update()), [update]);

  return (
    <AnimatedBox
      pos="fixed"
      zIndex="2"
      right="20px"
      bottom="75px"
      animate={{ bottom: hidden ? '20px' : '75px' }}
    >
      <AnimatedButton
        size="lg"
        isDisabled={!isActive}
        isActive={isActive}
        onClick={onClick}
        icon={<Icon as={PlusIcon} />}
        aria-label="Skapa inköpslista"
        variant="solid"
        colorScheme="green"
        rounded="full"
        boxShadow="md"
        animate={{ scale: isActive ? [1, 0.6, 1.4, 1, 1, 1] : 1 }}
      />
    </AnimatedBox>
  );
};

const FloatingButton: React.FC<Props> = ({ onClick, isActive }) => {
  const [isSmaller] = useMediaQuery('(max-width: 480px)');

  if (isSmaller) return <MobileButton onClick={onClick} isActive={isActive} />;
  return <DesktopButton onClick={onClick} isActive={isActive} />;
};

export default FloatingButton;
