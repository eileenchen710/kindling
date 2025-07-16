import { Button, useColorModeValue } from '@chakra-ui/react';
import { ReactNode, useRef } from 'react';

interface AnimatedButtonProps {
  children: ReactNode;
  [key: string]: any;
}

export default function AnimatedButton({ children, ...props }: AnimatedButtonProps) {
  const bg = useColorModeValue('black', 'white');
  const color = useColorModeValue('white', 'black');
  const ref = useRef<HTMLButtonElement>(null);

  // 处理鼠标进入和移动，设置扩散起点
  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const btn = ref.current;
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    btn.style.setProperty('--hover-x', `${x}px`);
    btn.style.setProperty('--hover-y', `${y}px`);
    btn.style.setProperty('--hover-origin', `${x}px ${y}px`);
    // 计算最大直径，保证正圆能覆盖整个按钮
    const d = Math.max(
      Math.hypot(x, y),
      Math.hypot(rect.width - x, y),
      Math.hypot(x, rect.height - y),
      Math.hypot(rect.width - x, rect.height - y)
    );
    btn.style.setProperty('--hover-diameter', `${d * 2}px`);
  };

  return (
    <Button
      ref={ref}
      color={color}
      bg={bg}
      border="none"
      borderRadius="999px"
      position="relative"
      overflow="hidden"
      transition="background 0.3s, color 0.3s"
      _before={{
        content: '""',
        position: 'absolute',
        left: 'calc(var(--hover-x, 50%) - var(--hover-diameter, 0px) / 2)',
        top: 'calc(var(--hover-y, 50%) - var(--hover-diameter, 0px) / 2)',
        width: 'var(--hover-diameter, 0px)',
        height: 'var(--hover-diameter, 0px)',
        borderRadius: '50%',
        pointerEvents: 'none',
        background:
          'radial-gradient(circle, #52dafcff 0%, #1FA9FF 56%, #8980F6 100%)',
        opacity: 0.7,
        transform: 'scale(0)',
        transition: 'transform 0.45s cubic-bezier(.4,0,.2,1), opacity 0.3s',
        zIndex: 1,
      }}
      _hover={{
        color: 'black',
        _before: {
          transform: 'scale(1)',
          opacity: 1,
        },
      }}
      _active={{
        color: 'black',
        _before: {
          transform: 'scale(1)',
          opacity: 1,
        },
      }}
      onMouseEnter={handleMouseMove}
      onMouseMove={handleMouseMove}
      {...props}
      sx={{
        position: 'relative',
        zIndex: 0,
      }}
    >
      <span style={{ position: 'relative', zIndex: 2, fontSize: '.8rem' }}>{children}</span>
    </Button>
  );
}