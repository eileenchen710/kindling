import {
  Card,
  CardBody,
  Image,
  Text,
  Tag,
  HStack,
  Box,
  useColorModeValue,
  Tooltip,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { Company } from '@/lib/data';
import AnimatedButton from './AnimatedButton';

interface Props {
  company: Company;
  onClick?: () => void;
}

const MotionCard = motion(Card);

export default function CompanyCard({ company, onClick }: Props) {
  const cardBg = useColorModeValue('white', 'black');
  const textColor = useColorModeValue('gray.900', 'gray.100');
  const taglineColor = useColorModeValue('gray.500', 'gray.400');
  const border = useColorModeValue('1px solid #ececec', 'none');

  return (
    <MotionCard
      whileHover={{ y: -4, boxShadow: '0 8px 24px rgba(36,152,236,0.10)' }}
      transition={{ type: 'spring', stiffness: 300 }}
      borderRadius="xl"
      bg={cardBg}
      border={border}
      cursor="pointer"
      onClick={onClick}
      _hover={{
        borderColor: 'rgb(36,152,236)',
        bg: useColorModeValue('white', '#000'),
      }}
      boxShadow="none"
      w="100%"
    >
      <CardBody p={5}>
        <HStack spacing={4} align="center">
          <Image
            src={company.logo}
            alt={company.name}
            boxSize="72px"
            borderRadius="md"
            objectFit="contain"
            bg="none"
          />
          <Box flex={1} minW={0}>
            <Text
              fontWeight={700}
              fontSize="lg"
              noOfLines={1}
              color={textColor}
            >
              {company.name}
            </Text>
            <Text
              fontSize="sm"
              color={taglineColor}
              noOfLines={1}
              fontWeight={600}
              as="div"
            >
              <Tooltip
                label={company.tagline}
                isDisabled={company.tagline.length <= 40}
                hasArrow
                placement="top"
              >
                <span
                  style={{
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    maxWidth: '100%',
                  }}
                >
                  {company.tagline}
                </span>
              </Tooltip>
            </Text>
            <HStack spacing={1} mt={1} flexWrap="wrap">
              {company.focus.map((tag) => (
                <Tag key={tag} size="sm" colorScheme="blue" fontWeight={700}>
                  {tag}
                </Tag>
              ))}
            </HStack>
          </Box>
          <AnimatedButton size="sm" fontWeight={700}>
            View
          </AnimatedButton>
        </HStack>
      </CardBody>
    </MotionCard>
  );
}
