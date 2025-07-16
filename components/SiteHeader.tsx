'use client';
import { Box, Flex, Text, useColorModeValue } from '@chakra-ui/react';
import { useEffect, useRef, useState } from 'react';
import ColorModeToggle from './ColorModeToggle';

export default function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);

  // ❗️Hooks 必须在组件顶层调用，不能放在条件/回调/副作用等内部
  const bg = useColorModeValue('rgba(255,255,255,0.45)', 'rgba(0,0,0,0.45)');
  const textColor = useColorModeValue('#000', '#fff');
  const logoFilter = useColorModeValue('invert(1)', 'none');
  const borderColor = useColorModeValue('#ddd', '#fff'); // 用于下边框

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const headerHeight = scrolled ? 56 : 76;

  return (
    <Box
      as="header"
      ref={headerRef}
      w="100%"
      h={`${headerHeight}px`}
      px={scrolled ? 6 : 12}
      py={0}
      bg={bg}
      boxShadow={scrolled ? 'none' : 'none'}
      position="fixed"
      top={0}
      left={0}
      zIndex={999}
      style={{
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        borderBottom: scrolled ? `1px solid ${borderColor}` : 'none',
        transition:
          'height 0.25s cubic-bezier(.4,0,.2,1), padding 0.25s cubic-bezier(.4,0,.2,1), box-shadow 0.25s cubic-bezier(.4,0,.2,1), border-bottom 0.25s cubic-bezier(.4,0,.2,1)',
      }}
    >
      <Flex align="center" justify="space-between" h="100%">
        <Flex align="center" minW={0} h="100%" flex="1">
          <img
            src="/vercel.svg"
            alt="Logo"
            width={40}
            height={40}
            style={{
              transition: 'transform 0.5s cubic-bezier(.4,0,.2,1), opacity 0.5s, filter 0.3s',
              transform: scrolled ? 'rotate(90deg)' : 'rotate(0deg)',
              opacity: !scrolled ? 1 : 0,
              display: 'block',
              filter: logoFilter,
            }}
          />
          <Text
            fontWeight={700}
            fontSize={scrolled ? '2xl' : '3xl'}
            color={textColor}
            letterSpacing="wider"
            transition="font-size 0.25s cubic-bezier(.4,0,.2,1), color 0.25s, opacity 0.5s"
            ml={scrolled ? 2 : 0}
            opacity={scrolled ? 1 : 0}
            style={{ whiteSpace: 'nowrap' }}
          >
            Kindling.
          </Text>
        </Flex>
        <Flex align="center" justify="flex-end" h="100%" flex="1">
          <ColorModeToggle />
        </Flex>
      </Flex>
    </Box>
  );
}