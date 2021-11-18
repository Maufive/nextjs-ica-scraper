import React from 'react';
import { motion } from 'framer-motion';
import {
  Button,
  Modal as ChakraModal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Box,
  Heading,
  Text,
  Icon,
} from '@chakra-ui/react';
import { CheckCircleIcon } from '@heroicons/react/solid';

const AnimatedCheckmark = () => (
  <motion.div
    initial={{ scale: 0.8, opacity: 0, y: 10 }}
    animate={{ scale: 1, opacity: 1, y: 0 }}
    transition={{ delay: 0.2 }}
  >
    <Icon as={CheckCircleIcon} boxSize="4rem" color="green.400" />
  </motion.div>
);

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
}) => (
  <ChakraModal
    isCentered
    onClose={onClose}
    isOpen={isOpen}
    motionPreset="slideInBottom"
  >
    <ModalOverlay />
    <ModalContent>
      <ModalCloseButton />
      <ModalBody>
        <Box textAlign="center" py={10} px={6}>
          <AnimatedCheckmark />
          <Heading as="h2" size="lg" mt={6} mb={2}>
            Ditt recept är nu sparat!
          </Heading>
          <Text color="gray.500">
            Du kan nu börja använda receptet och lägga till det i din Matkasse.
          </Text>
        </Box>
      </ModalBody>
      <ModalFooter justifyContent="center">
        <Button mr={3} onClick={onClose}>
          Stäng
        </Button>
      </ModalFooter>
    </ModalContent>
  </ChakraModal>
);

export default Modal;
