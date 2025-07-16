import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Box,
  Text,
  Tag,
  HStack,
  Image,
  VStack,
  useColorModeValue,
} from '@chakra-ui/react';
import { Company } from '@/lib/data';
import { motion, AnimatePresence } from 'framer-motion';

interface Props {
  company: Company | null;
  isOpen: boolean;
  onClose: () => void;
}

const MotionModalContent = motion(ModalContent);

export default function CompanyDetail({ company, isOpen, onClose }: Props) {
  const mainText = useColorModeValue('gray.700', 'gray.100');
  const subText = useColorModeValue('gray.500', 'gray.300');
  if (!company) return null;
  return (
    <AnimatePresence>
      {isOpen && (
        <Modal isOpen={isOpen} onClose={onClose} isCentered size="lg">
          <ModalOverlay />
          <MotionModalContent
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.2 }}
          >
            <ModalHeader color={mainText} fontWeight={700}>
              {company.name}
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={10}>
              <VStack align="start" spacing={4}>
                <HStack spacing={4}>
                  <Image
                    src={company.logo}
                    alt={`${company.name} logo`}
                    boxSize={{ base: '80px', md: '120px' }}
                    borderRadius="md"
                    objectFit="contain"
                    bg="none"
                    loading="lazy"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/file.svg';
                    }}
                    aria-label={`${company.name} logo`}
                  />
                  <Box>
                    <Text fontWeight={700} color={mainText}>
                      {company.tagline}
                    </Text>
                    <HStack spacing={1} mt={1} flexWrap="wrap">
                      {company.focus.map((tag) => (
                        <Tag
                          key={tag}
                          size="sm"
                          colorScheme="blue"
                          fontWeight={600}
                        >
                          {tag}
                        </Tag>
                      ))}
                    </HStack>
                  </Box>
                </HStack>
                <Text color={mainText} fontWeight={600}>
                  {company.description}
                </Text>
                <Text fontSize="sm" color={subText} fontWeight={600}>
                  Founded: {company.founded} | Founders:{' '}
                  {company.founders.join(', ')}
                </Text>
                <Text fontSize="sm" color={subText} fontWeight={600}>
                  Headquarters: {company.location} | Employees:{' '}
                  {company.employeeCount}
                </Text>
                <a
                  href={`https://${company.domain}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: '#2398ec', fontWeight: 600 }}
                >
                  Visit Website
                </a>
              </VStack>
            </ModalBody>
          </MotionModalContent>
        </Modal>
      )}
    </AnimatePresence>
  );
}
